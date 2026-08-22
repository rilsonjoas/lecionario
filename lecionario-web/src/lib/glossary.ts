// Glossário de termos litúrgicos (fase 1 do plano de terminologia,
// ROADMAP 2026-08-22): cada termo técnico ganha um ⓘ tocável com
// explicação em linguagem universal — clareza sem apagar a identidade.
export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  coleta: {
    term: 'Oração de Coleta',
    definition:
      'A oração que "recolhe" e resume as intenções de todo o dia. Tradição milenar presente no Livro de Oração Comum e nos missais antigos.',
  },
  lectio: {
    term: 'Lectio Divina',
    definition:
      '"Leitura divina": a antiga prática da igreja de orar com as Escrituras — ler com atenção, meditar, orar e contemplar.',
  },
  perguntas: {
    term: 'Perguntas para refletir',
    definition:
      'Momento de examinar o coração à luz das leituras do dia — no silêncio e sem pressa.',
  },
  oracaoDia: {
    term: 'Oração do Dia',
    definition:
      'Orações fixas que moldam a rotina de oração da igreja há séculos, inspiradas na Liturgia das Horas.',
  },
  anoLiturgico: {
    term: 'Ano Litúrgico',
    definition:
      'O calendário cristão que organiza o tempo em torno da vida de Cristo: Advento, Natal, Quaresma, Páscoa e Pentecostes.',
  },
};

export type GlossaryTermKey = keyof typeof GLOSSARY;
