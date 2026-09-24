import type { Reading, LiturgicalDayInfo } from '@/types';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getRCLReadings } from '@/lib/rcl-fetcher';

/**
 * Versículo do dia — fonte única para o card compartilhado pelo cluster
 * "A Biblioteca" (Lecionário, Scriptorium Divinum, Bíblia na Arte, Narniano).
 *
 * Regras acordadas (plano de interconexão, Fase 0):
 * 1. O dado É litúrgico: vem das leituras do RCL do dia (Lecionário Comum
 *    Revisado), tradução Almeida Revista e Corrigida — mesma fonte das
 *    leituras exibidas na home do Lecionário.
 * 2. Determinístico por data: a mesma `date` sempre retorna o mesmo versículo.
 * 3. Não existe campo "versículo do dia" nos dados do devocional (Meditation/
 *    Prayer) — o que o Lecionário tem por dia são as leituras RCL. O versículo
 *    do dia é UMA delas, na prioridade litúrgica: Evangelho > Salmo >
 *    1ª leitura > 2ª leitura. (Dias feriais do RCL costumam não ter Evangelho;
 *    aí o Salmo — o "versículo responsorial" — assume.)
 * 4. Datas fora da cobertura do RCL caem num pool fixo determinístico
 *    (FALLBACK_VERSICLES), marcado com `fallback: true`, para o endpoint nunca
 *    responder vazio. O pool não repete referências nem colide com a citação
 *    fixa de II Timóteo 3:16-17 do rodapé da home do Lecionário.
 * 5. Guarda anti-repetição (decisão do autor, 22/09): se o versículo exibido
 *    ontem for igual ao de hoje, sobe pra 1ª leitura do dia; senão 2ª. A
 *    intenção é nunca exibir o mesmo versículo em dias consecutivos (a
 *    liturgia reusa salmo responsorial em feriais seguidos — ex.: Salmo 124
 *    em 2025-12-01 e 2025-12-02). Só fura a liturgia quando houver repetição
 *    real; `shifted: true` marca as respostas desviadas. Casos sem alternativa
 *    (ex.: dia do pool, sem leituras pra trocar) permanecem litúrgicos.
 */

export type VerseSourceType = 'gospel' | 'psalm' | 'first_reading' | 'second_reading' | 'fallback';

export interface VerseOfTheDay {
  type: VerseSourceType;
  reference: string;
  citation: string;
  text: string;
}

export interface VersiculoDoDia {
  /** Data do dia no fuso de referência (America/Sao_Paulo), YYYY-MM-DD. */
  date: string;
  liturgicalDay: LiturgicalDayInfo;
  verse: VerseOfTheDay;
  /** true quando o dia não tem leitura RCL e o pool fixo assumiu. */
  fallback: boolean;
  /** true quando a guarda anti-repetição trocou o versículo litúrgico. */
  shifted: boolean;
}

export const TODAY_TIME_ZONE = 'America/Sao_Paulo';

const VERSE_TYPE_PRIORITY: Reading['type'][] = [
  'gospel',
  'psalm',
  'first_reading',
  'second_reading',
];

function typeToSource(type: Reading['type']): Exclude<VerseSourceType, 'fallback'> {
  return type === 'gospel'
    ? 'gospel'
    : type === 'psalm'
      ? 'psalm'
      : type === 'first_reading'
        ? 'first_reading'
        : 'second_reading';
}

function pickVerse(readings: Reading[]): VerseOfTheDay | null {
  for (const type of VERSE_TYPE_PRIORITY) {
    const reading = readings.find((r) => r.type === type);
    if (reading && reading.reference && reading.text) {
      return {
        type: typeToSource(reading.type),
        reference: reading.reference,
        citation: reading.citation || reading.reference,
        text: reading.text,
      };
    }
  }
  return null;
}

/**
 * Pool fixo de versículos ARC para datas sem cobertura RCL. Escolhidos por
 * serem clássicos e de texto público (Almeida Revista e Corrigida); nenhuma
 * referência se repete no pool, e II Timóteo 3:16-17 fica de fora de propósito
 * (é a citação estática do rodapé da home do Lecionário — não pode virar o
 * "versículo do dia" por baixo dos panos). O teste versiculo-do-dia.test.ts
 * trava as duas garantias.
 */
export const FALLBACK_VERSICLES: Array<{ reference: string; text: string }> = [
  { reference: 'Salmo 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
  {
    reference: 'João 3:16',
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  },
  {
    reference: 'Mateus 11:28',
    text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.',
  },
  {
    reference: 'Filipenses 4:13',
    text: 'Posso todas as coisas naquele que me fortalece.',
  },
  {
    reference: 'Isaías 41:10',
    text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.',
  },
  {
    reference: 'Romanos 8:28',
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.',
  },
  {
    reference: 'Salmo 46:1',
    text: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.',
  },
  {
    reference: 'Mateus 28:19',
    text: 'Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo.',
  },
];

/** Dia do ano (1-366) a partir de uma chain 'YYYY-MM-DD' — base do índice cíclico do pool. */
function dayOfYear(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  const start = Date.UTC(y, 0, 0);
  const day = Date.UTC(y, m - 1, d);
  return Math.floor((day - start) / 86_400_000);
}

function pickFallbackVerse(dateStr: string): VerseOfTheDay {
  const item = FALLBACK_VERSICLES[dayOfYear(dateStr) % FALLBACK_VERSICLES.length];
  return {
    type: 'fallback',
    reference: item.reference,
    citation: item.reference,
    text: item.text,
  };
}

/**
 * Data local 'YYYY-MM-DD' hoje num fuso específico (padrão
 * America/Sao_Paulo). O instante gira o dia; o retorno é usado para montar um
 * `Date` à meia-noite local e o restante do cálculo ignora fuso de novo —
 * mantendo a resposta determinística independente do fuso do servidor.
 */
export function dateKeyInTimeZone(date: Date, timeZone: string = TODAY_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Valida uma chain 'YYYY-MM-DD' e monta um `Date` local; null se inválida. */
export function parseDateKey(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const roundTrip = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  return roundTrip ? date : null;
}

/**
 * Leitura literal do dia: a de maior prioridade litúrgica (ou o pool, fora da
 * cobertura), SEM a guarda anti-repetição. Base para comparar com ontem.
 */
interface LiteralVerse {
  verse: VerseOfTheDay;
  fromLiturgy: boolean;
  rcl: { readings: Reading[] } | null;
}

function literalVerseFor(date: Date): LiteralVerse {
  const liturgicalDay = getLiturgicalDayInfo(date);
  const rcl = getRCLReadings(liturgicalDay.cycle, date);
  const picked = rcl ? pickVerse(rcl.readings) : null;
  return {
    verse: picked ?? pickFallbackVerse(liturgicalDay.date),
    fromLiturgy: picked !== null,
    rcl,
  };
}

/** Versículo do dia para uma data — nunca retorna vazio (usa o pool se preciso). */
export function getVerseOfTheDay(date: Date): VersiculoDoDia {
  const today = literalVerseFor(date);
  const yesterday = literalVerseFor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
  );
  const liturgicalDay = getLiturgicalDayInfo(date);

  // Guarda anti-repetição: se o literal de hoje igualar o literal de ontem,
  // sobe pra próxima leitura na prioridade (1ª, depois 2ª). Comparar
  // LITERAIS (e não resultados já corrigidos) é o que garante o contrato
  // "dois dias seguidos nunca exibem a mesma referência": exibir X exige
  // literal == X ≠ literal de ontem, logo o dia anterior não exibia X. Sem
  // recursão — a liturgia não vira memória serial infinita.
  if (today.verse.reference.trim() === yesterday.verse.reference.trim()) {
    if (today.fromLiturgy && today.rcl) {
      const alternative = pickAlternative(today.rcl.readings, yesterday.verse.reference.trim());
      if (alternative) {
        return {
          date: liturgicalDay.date,
          liturgicalDay,
          verse: alternative,
          fallback: false,
          shifted: true,
        };
      }
    }
  }

  return {
    date: liturgicalDay.date,
    liturgicalDay,
    verse: today.verse,
    fallback: !today.fromLiturgy,
    shifted: false,
  };
}

/**
 * Próxima leitura disponível na prioridade litúrgica cuja referência não
 * colide com `forbiddenRef` (a do dia anterior). Retorna null quando não há
 * alternativa — aí o dia fica com a leitura literal mesmo que repita.
 */
function pickAlternative(readings: Reading[], forbiddenRef: string): VerseOfTheDay | null {
  for (const type of VERSE_TYPE_PRIORITY) {
    const reading = readings.find(
      (r) => r.type === type && r.reference && r.text && r.reference.trim() !== forbiddenRef,
    );
    if (reading && reading.reference && reading.text) {
      return {
        type: typeToSource(reading.type),
        reference: reading.reference,
        citation: reading.citation || reading.reference,
        text: reading.text,
      };
    }
  }
  return null;
}
