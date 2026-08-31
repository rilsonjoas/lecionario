# UMA — A prática do segundo ângulo

Receita de escrita do **"voz autoral"** do Lecionário (Fase 5, item 5.5).
Como não há curadores, o próprio autor escreve, no seu ritmo, um segundo
Ângulo (`UMA`) para cada entrada — o dia volta a acontecer a cada triênio
e volta a merecer um olhar novo.

> O nome vem de _Use it, then make it your own_: a leitura-base é a mesma
> (o RCL), mas o título, a oração e a pergunta da 2ª ocorrência são
> escritos de novo. Você não transcreve — você responde de novo à mesma
> Palavra, anos depois.

---

## 1. O modelo (como a mecânica funciona)

Todo slot de conteúdo no gerador é um destes:

```ts
// DevotionalEntry — o conteúdo único de hoje (estado atual, imutável)
{
  prayer: { title, text, author?, source? },
  meditation: { prompt, questions?[] },
}

// DevotionalSlot — um slot pode começar a variar sem quebrar nada:
{
  default: DevotionalEntry,             // o conteúdo que está lá hoje
  occurrences?: Record<number, DevotionalEntry>, // só os que você escreveu
}
```

O gerador escolhe assim (`resolveSlot`):

```
se NÃO tem `default`/`occurrences` → usa o conteúdo comum como sempre;
se tem → usa occurrences[ocorrência]  OU  default quando essa ocorrência
  ainda não foi escrita.
```

Ou seja: **escrever uma variação nunca piora nada.** Os anos que não têm
a variação continuam recebendo o conteúdo atual. A única coisa que muda
é o ano cuja ocorrência passou a ter você lá.

### Índice de ocorrências (o que é "ocorrência 1/2/…")

- **Conteúdo por ciclo** (Advento, Tempo Comum, Epifania, Quaresma,
  Páscoa, Pentecostes, Trindade, Natal 1º/2º domingo): usa
  `getCycleOccurrence` — **1** na 1ª vez do ciclo, **2** na 2ª, e assim
  por diante.
  - `A`: 2026 = 1, **2029 = 2**, 2032 = 3…
  - `B`: 2027 = 1, **2030 = 2**…
  - `C`: 2025 = 1, **2028 = 2**…
- **Conteúdo fixo que repete todo ano** (Epifania, Tríduo, Natal comum,
  dias entre festas): usa `getYearOccurrence` — **1..6** (2025=1 …
  2030=6). É conteúdo que acontece uma vez por ano civil, então cada ano
  é uma ocorrência nova.

> ⚠️ **Ano litúrgico ≠ data de calendário.** Os rótulos acima (2026=1,
> 2029=2…) são o **ano litúrgico** do ciclo. O ano litúrgico A, por
> exemplo, começa no Advento de nov/dez do ano civil anterior — na
> prática, o 1º domingo do Advento A cai em **30/nov/2025 (oc1)** e em
> **3/dez/2028 (oc2)**. Não escreva "a ocorrência cai em tal data"
> sem olhar o JSON gerado; o calendário real só aparece quando você roda
> `generateYear`.

> A receita fala de "2ª ocorrência" o tempo todo porque é a primeira
> escrita de variação; mas a mecânica aceita quantas quiser
> (`occurrences: { 2: …, 3: … }`).

---

## 2. O que é um "ângulo" diferente

O texto-base (leituras do RCL) e o fato litúrgico (o dia ser Natal,
Dom. de Ramos, 3ª do Tempo Comum…) **não mudam**. O que deve ser novo
na 2ª ocorrência:

| Parte                                  | Regra                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| **Título** (`prayer.title`)            | Novo. Uma frase curta dizendo o cerne do teu segundo olhar.                             |
| **Oração** (`prayer.text`)             | Nova. Mesma leitura, outra direção de oração — outra fome, outro medo, outra esperança. |
| **Prompt** (`meditation.prompt`)       | Novo. Outro fio a puxar; outro detalhe da leitura que ficou na sombra.                  |
| **Perguntas** (`meditation.questions`) | Novas. Outros endereços de vida pra mesma Palavra.                                      |

### O que NÃO é ângulo (armadilhas)

- **Jamais repetir o versículo-central igualzinho** (mesmo `prompt` com
  as mesmas palavras, ou a mesma oração de outra forma). Se o que você
  escreveu parece "o mesmo com outras palavras", não é ângulo — é cópia.
- **Não copiar o 1ª ocorrência** pra "completar" o `occurrences`. Prefira
  deixar sem variação (o `default` cobre) a escrever uma segunda versão
  que não diz nada novo. O usuário nota repetição pior que "só uma vez".
- **Não mudar a leitura, referência ou facto litúrgico** — isso é 5.1/5.6,
  não 5.5. A rotação é sobre o olhar, não sobre o dado canônico.
- **Não quebrar o registro do dia** (autor/source da oração, tom
  devocional de 1ª pessoa como hoje).

### Checklist de um ângulo bom

- [ ] Três anos depois, alguém relê o dia e pensa "esta é outra entrada,
      merecida, não um eco".
- [ ] O prompt tem um gancho identificável na leitura (um personagem, uma
      imagem, uma tensão) diferente do 1º.
- [ ] As perguntas abrem caminhos que o 1º não abria.
- [ ] Título cabe no card sem truncar (padrão atual: curto, com verbo).
- [ ] Não repetiu, em nenhum ponto, o versículo-central igualzinho.

---

## 3. Prioridade (o que escrever primeiro)

Do ROADMAP 5.5 — a razão é contraste: quanto mais vezes algo se repete,
mais o usuário sente a repetição, e menor é o custo de escrever.

### 1ª prioridade — as 31 festas de data fixa (6x cada; o maior ganho)

São os dias que voltam **todo ano** (`getYearOccurrence`, ocorrências
1–6): a repetição é mais densa (a cada 12 meses). Escrever 5 variações
por festa (ocorrências 2–6) mata a maior percepção de repetição com o
menor volume.

Famílias que existem hoje no gerador (ancoradas no cálculo real):

- **Natal** (`getGroundedChristmasContent`): Dia de Natal (por ciclo),
  1º/2º domingo depois (1º por ciclo, 2º fixo), dias de semana entre
  Natal e Epifania (`christmasSunday2`, `christmasWeekdays`).
- **Epifania** (`epiphanyDay`, `epiphanyGapWeek`).
- **Tríduo** (`triduumContent` no `generate-devotionals.ts`): Domingo de
  Ramos, Quinta Santa, Sexta Santa, Sábado Santo — fixos, `getYearOccurrence`.
- **Pentecostes/Trindade** (`pentecost.ts`): Domingo de Pentecostes e
  Domingo da Trindade são por ciclo; o pentecostes-gapweek é fixo.

> Nota: as 31 festas **fixas do calendário** (Santos etc.) ainda não têm
> slot no gerador — o roadmap as lista como alvo porque, quando existirem
> como conteúdo, devem seguir a mesma regra de ocorrência anual. A
> prioridade aqui significa: mantenha o olho nelas quando a camada de
> conteúdo for criada; neste arquivo, o chassis a usar já é
> `getYearOccurrence`.

### 2ª prioridade — Tempo Comum por Próprio (~890 slots, em lotes)

Separe em semanas: **3 Próprios por sessão** (ex.: Próprios 3, 11 e 19).
Por ciclo → `getCycleOccurrence`, só precisa da ocorrência **2** (2029
pro A, 2030 pro B, 2028 pro C). Não precisa fechar um Próprio inteiro
de uma vez — um slot por vez já publica.

### 3ª prioridade — feriados do ciclo móvel

Ascensão (por ciclo), Pentecostes/Trindade (por ciclo), Natal 1º/2º
domingo (por ciclo). Ocorrência 2 de cada.

---

## 4. Onde mora o conteúdo (arquivos)

Tudo em `lecionario-web/scripts/`:

- **`grounded-content/advent-{A,B,C}.ts`**, **`ordinary-{A,B,C}.ts`**,
  **`epiphany-{A,B,C}.ts`**, **`lent-{A,B,C}.ts`**, **`easter-{A,B,C}.ts`**:
  semana por semana, `array[7]` indexado por `date.getDay()` (0=domingo).
  Cada item do array vira `DevotionalSlot`.
- **`grounded-content/christmas.ts`**: dia de Natal + domingos +
  semana (escolha dinâmica).
- **`grounded-content/epiphany-shared.ts`**, **`lent-shared.ts`**,
  **`pentecost.ts`**: conteúdo fixo (Epifania, Quaça de Cinzas, Tríduo
  não — o Tríduo vive no `generate-devotionals.ts`).
- **`generate-devotionals.ts`**: o Tríduo (`triduumContent`), os mapas
  que ligam ciclo→arquivo, e as regras de resolução.

### Como transformar um `DevotionalEntry` em slot rotacionável

O tipo já aceita. No arquivo de conteúdo:

```ts
// ANTES (comportamento atual, não mexa no default)
week1[0] = {
  prayer: { title: 'Subamos ao Monte do Senhor', text: t('…') },
  meditation: { prompt: t('…'), questions: ['…'] },
};

// DEPOIS (2ª ocorrência escrita)
week1[0] = {
  default: {
    prayer: { title: 'Subamos ao Monte do Senhor', text: t('…') },
    meditation: { prompt: t('…'), questions: ['…'] },
  },
  occurrences: {
    2: {
      prayer: { title: 'O Monte que Não se Abala', text: t('…') },
      meditation: { prompt: t('…'), questions: ['…'] },
    },
  },
};
```

> Depois de escrever, rode o gerador de novo (seção 6): o `default`
> segue intacto, a ocorrência entra só no ano dela, e o teste de
> regressão apaga a dúvida.

---

## 5. Como descobrir a ocorrência de uma data

Rode (na raiz de `lecionario-web`) para inspecionar um ano/ciclo:

```bash
npx tsx -e "import('./scripts/generate-devotionals.js')"  # (dispara main — evite)
```

Melhor: use o bloco de índice do próprio arquivo de teste de regressão
(`src/lib/__tests__/generate-devotionals.test.ts`) — lá os casos
esperados já estão documentados:

```
Ciclo A:  2026 = oc1,  2029 = oc2
Ciclo B:  2027 = oc1,  2030 = oc2
Ciclo C:  2025 = oc1,  2028 = oc2
Ano fixo: 2025=1 … 2030=6
```

Para achar **qual slot** corresponde a uma data, olhe o comentário de
topo do arquivo da estação (ex.: semana 1 do Advento do ciclo A começa
na semana do dom. 27/nov–3/dez) ou consulte o calendar gerado.

---

## 6. Publicar (workflow completo, do jeito certo)

A cada escrita — mesmo uma entrada só — o app continua perfeito. O
roteiro:

```bash
cd lecionario-web

# 1. Edita o slot (adiciona a ocorrência 2, ou 2..6)
# 2. Regenera os 6 JSONs
npx tsx scripts/generate-devotionals.ts

# 3. Revalida o conjunto com o validador da 5.1
npm run validate:content

# 4. Confere que nenhum outro teste quebrou (regressão da 5.4 incluída)
npm test

# 5. tsc (só os tipos dos arquivos que você tocou precisam compilar)
npx tsc --noEmit
```

O teste de regressão (`generate-devotionals.test.ts`) compara os 6 anos
gerados contra o que está publicado: se o `default` ficou intacto e só
entrou a variação, ele passa. Se algo "vazou" prum ano errado, ele pega.

> Publicar não é automático: é você decidindo. Não basta o teste verde —
> olhe o diff dos `devotionals-*.json` de propósito antes de subir.

---

## 7. Ritmo sugerido (sem prazos duros)

Do ROADMAP: o roadmap registra prioridade, não compromissos. Uma rotina
viável, dado o ritmo atual:

- **Sessão de festa fixa** (ganho maior): 1 festa por sessão — escreva
  as **5 variações** (2–6) de uma vez. Você "saca" a direção da festa
  uma única vez e a repete 5x com olhares diferentes.
- **Sessão de Tempo Comum**: 3 Próprios por sessão, 1º slot (domingo)
  primeiro, depois os 6 da semana.
- Sempre: 1 pronúncia mínima por dia para sustentar o hábito — mas isso
  é você quem diz; a receita não cobra.

---

## 8. "Feito quando" (critério do roadmap)

A 2ª ocorrência de cada data tem conteúdo distinto da 1ª, sem que a
validação de repetição/lacuna levante nada. Enquanto não houver variação
num slot, o `default` cumpre — e o app está perfeito mesmo assim: 5.5
é um enriquecimento contínuo, não uma dívida.

---

## 9. Exemplo real comentado (Advento A, semana 1, domingo)

Leitura-base: Isaías 2:1-5 · Salmo 122 · Romanos 13:11-14 · Mateus 24:36-44.
Slot atual (`advent-A.ts`, 2026-08-18). Ângulo 2 proposto como modelo de
_como_ se faz (não precisa ser aprovado nem é conteúdo oficial):

```ts
week1[0] = {
  default: {
    prayer: {
      title: 'Subamos ao Monte do Senhor',
      text: t(`Senhor, Isaías vê um futuro em que todas as nações
        "concorrerão a ele" para aprender teus caminhos, e as espadas se
        transformam em relhas de arado. Neste início do Advento,
        desperta em mim o mesmo desejo: subir ao teu monte, não por
        obrigação, mas por fome genuína de aprender contigo. Amém.`),
    },
    meditation: {
      prompt: t(`A visão de Isaías não é de fuga do mundo, mas de
        transformação dele — nações inteiras, não apenas indivíduos,
        convertendo instrumentos de guerra em instrumentos de sustento.`),
      questions: [
        'O que significaria "subir ao monte do Senhor" concretamente nesta primeira semana de Advento?',
        'Que "espada" — conflito, rivalidade, mágoa guardada — você poderia começar a transformar?',
        'Como a esperança de paz entre nações se conecta com a paz que você busca nas suas próprias relações?',
      ],
    },
  },
  occurrences: {
    2: {
      prayer: {
        title: 'A Paz que Sobe Antes de Descer',
        text: t(`Senhor, a visão de Isaías começa em alta: "exalçará o
          Senhor a montanha acima de todos os montes". Mas a paz prometida
          desce — nenhuma nação levantará espada contra nação. Corrige em
          mim o orgulho de querer a paz dos cumes sem passar pelo vale de
          fazer as pazes. Amém.`),
      },
      meditation: {
        prompt: t(`Três anos depois da primeira leitura deste texto, o
          detalhe que fica é o caminho: a palavra de Deus não apenas
          ilumina — ela desce e reorganiza a vida no chão, onde as armas
          são forjadas.`),
        questions: [
          'Onde você mais sente a tentação de "subir" para não precisar "descer"?',
          'Qual relação sua está esperando menos uma torre e mais uma trégua concreta?',
          'Como seria "transformar uma espada" — não em poema, mas em relha — no seu quintal de verdade?',
        ],
      },
    },
  },
},
```

Repare: mesmo versículo-central (Isaías 2), **outra** pergunta, **outro**
título, **outro** gancho (a direção da paz: sobe e desce). É isso que um
ângulo é — e é só isso que 5.5 pede.
