# Roadmap — Lecionário

Este documento descreve o que falta para o app se tornar maduro, profissional e completo. Cada fase tem critérios claros de "feito" e prioridade baseada no impacto para o usuário final.

---

## Situação atual (atualizado 2026-08-21)

> [!DONE] Hardening concluído (2026-08-21)
> ErrorBoundary (P2), E2E Playwright offline (P4), logger Sentry estruturado (P5) — ver seções abaixo.
> Único pendente: **projetos criados no sentry.io (2026-08-22)** — falta
> só colar o DSN nas env vars (EAS pro mobile, docker-compose pro web) e
> validar o primeiro evento. Passo a passo no item P5 de cada plataforma.

### O que está funcionando

- Motor litúrgico completo: cálculo de Páscoa, estações, cores, ciclos A/B/C, nomes dos dias em PT-BR
- Dados RCL em JSON para os três ciclos (leituras por data + coletas)
- **Textos bíblicos (Almeida ARC)** — 4613 textos restaurados (2026-08-21), depois de terem sido perdidos silenciosamente no commit `817ed23`. Causa raiz corrigida (ver débito técnico): `generate-rcl-data.ts` agora preserva `text` ao regenerar em vez de sobrescrever, o XML fonte saiu de `/tmp` (efêmero) pra dentro do repo (`lecionario-web/scripts/data/`), e um teste em `rcl-bible-text.test.ts` (web + mobile) quebra o CI se a cobertura cair de novo
- **Devocionais gerados** — 2191 orações + meditações (2025–2030),
  todas as sete estações litúrgicas ancoradas no RCL real
- **Conteúdo de Semana Santa** — Domingo de Ramos, Tríduo, Sábado Santo
- App mobile com três telas: Hoje, Calendário Litúrgico, Configurações
- **Dados 100% locais** — Supabase removido, sem dependência de backend
- Cache offline com AsyncStorage e TTL de 24h
- Temas sazonais (cor de fundo, acento, primária por estação)
- **Logo real + identidade sazonal** (web e mobile)
- **Build mobile corrigido e testado em dispositivo Android físico**
- ErrorBoundary global
- CI com TypeScript, ESLint, Prettier, testes e **auditoria de dependências de produção com allowlist** (`scripts/audit-allowlist.mjs`, 2026-08-21) (GitHub Actions)
- **Notificações push** — permission, schedule, cancel, listener, time picker (2.1)
- **Compartilhamento** — ReadingCard (copy/share), PrayerSection (copy), welcome (copy) (2.2)
- **Config screen completa** — Tema/Fonte/Notificações/Sobre (2.3)
- **Deep links** — `lecionario://dia/:date` (2.4)
- **Testes** — 56 mobile (81% stmts, 100% funcs), 42 web (motor litúrgico + utils)
- **Crash reporting** — Sentry inicializado em web + mobile, plugin Expo configurado
- **CI/CD** — EAS Build + Update (`.github/workflows/eas.yml`), deploy automático no VPS via `deploy.yml`
- **Favoritos** — FavoritesContext, heart button, aba no CalendarScreen (4.1)
- **Busca** — indexa 6 anos de devotionals + 3 ciclos, por referência/data/palavra-chave (4.2)
- **Pintura do Dia** — ArtCard integrado à API Bíblia na Arte, só online (4.5)
- **QuoteCard** — 165 citações C.S. Lewis, seleção date-seeded, link Amazon (4.7)
- **Biblioteca** — mobile (ConfigScreen) e web (Footer), 4 projetos (4.8)
- **Error states reutilizáveis** — EmptyState, ErrorState

### O que está incompleto ou ausente

- ~~Conteúdo devocional do Tempo Comum~~ — **feito e estendido a todas as estações** (ver 1.2-1.2i)
- **iOS nunca testado em dispositivo físico** (foco em Android)
- ~~Textos bíblicos ARC perdidos nos JSONs~~ — **restaurados e causa raiz corrigida** (2026-08-21, ver débito técnico)
- Widget Android/iOS (adiado — ver 4.3)
- Scriptorium Divinum "Leia mais" (pausado — ver 4.6)

---

## Fase 1 — Pré-lançamento (v1.0)

*Tudo que bloqueia uma versão usável por terceiros.*

### 1.1 Conteúdo Semana Santa

- [x] Adicionar `triduumContent` com entradas fixas para Domingo de Ramos, Quinta-Feira Santa, Sexta-Feira Santa e Sábado Santo
- [x] Orações originais: Lava-pés (Quinta), Crucificação (Sexta), Descida ao Hades/Grande Silêncio (Sábado)
- [x] Meditações guiadas com 3 perguntas para cada dia do Tríduo
- [x] Override aplicado após o loop em `generateYear()` — garante conteúdo correto independente do seededPick
- [x] JSONs regenerados e copiados para mobile (2025–2030 validados)

**Validado:** Páscoa 2026 (5/abr) → Ramos=29/mar, Quinta=2/abr, Sexta=3/abr, Sábado=4/abr — todos com título e oração corretos.

---

### 1.2 Conteúdo devocional

**Causa raiz confirmada (2026-08-16):** cada semana do Tempo Comum
tinha só 1 oração no array de templates (`generate-devotionals.ts`),
então `seededPick` sempre "escolhia" a única opção — daí a repetição
idêntica por até 7 dias. Além disso 16 das 27 semanas não tinham
meditação própria (caíam no fallback genérico embutido no código), e
semanas 29+ reaproveitavam a semana 24. O devocional também nunca
usava o ciclo litúrgico A/B/C nem as leituras reais do RCL já
existentes em `cycle-A/B/C.json` — o mesmo texto valia pra qualquer
ano.

- [x] **Arquitetura ancorada no RCL implementada** — `generateForDate()`
      agora busca o domingo real do RCL que rege a semana
      (`findGoverningOrdinarySunday`, por data + ciclo, não por número
      de semana calculado localmente — os dois sistemas de numeração
      divergiam) e usa conteúdo por dia da semana (índice = `date.getDay()`)
      em vez de repetir o mesmo texto de domingo a sábado
- [x] **`getLiturgicalCycle()` corrigido** — a função existia no script
      mas estava com a fórmula errada e não era chamada em lugar
      nenhum; agora alinhada com `src/lib/liturgical-calendar.ts` e
      usada de fato
- [x] **Bônus:** a semana entre o Domingo da Trindade e o 1º Próprio
      real do Tempo Comum não tinha devocional nenhum. Depois do
      conserto de 1.2a essa lacuna reapareceu (era um efeito colateral
      do bug antigo, não uma correção de verdade) — resolvida agora
      com conteúdo próprio: `trinityWeekA` (6 dias, Trindade+1 a
      Trindade+6, sempre esse intervalo fixo todo ano), ancorado nas
      4 leituras do próprio Domingo da Trindade
- [x] **Ciclo A completo e preciso: 27 semanas do Tempo Comum
      (Próprios 3-29) ancoradas no RCL corrigido** (2026-08-16/17) —
      189 orações + 189 meditações originais, cada uma citando o
      texto real da leitura daquele domingo. Conteúdo em
      `scripts/grounded-content/ordinary-A.ts`, chaveado pelo número
      real do Próprio (não mais posição sequencial — ver 1.2a).
      **Validado sem nenhuma repetição e sem nenhum dia faltando** em
      2026 e 2029 (as duas ocorrências reais do Ciclo A no período
      gerado, 183 dias de Tempo Comum cada, checado programaticamente)
- [x] **Achado da semana 26 investigado a fundo — era só a ponta do
      iceberg (2026-08-16).** O que parecia um evangelho trocado numa
      semana era na verdade um bug estrutural na atribuição de
      leituras do Tempo Comum, presente nos **três ciclos**, afetando a
      tela de leituras ao vivo (não só o devocional). Detalhe completo
      da investigação e do conserto na seção **1.2a** abaixo.
- [x] **Re-ancoramento de `ordinary-A.ts` no Próprio real concluído
      (2026-08-17).** Comparei, entrada por entrada, as 24 semanas já
      escritas contra as leituras corretas: 19 batiam limpo (só
      renomeadas), mas 5 estavam de fato contaminadas (a antiga semana
      16 usava leitura errada em 3 dos 7 dias — Romanos 11/Mateus 19
      em vez do Filipenses 1/Mateus 20 real do Próprio 20 — e as
      antigas semanas 22-25 foram escritas em cima de combinações que
      não existem em nenhum domingo real do RCL). Reescrevi essas 5 do
      zero, mais os Próprios 3, 4 e 6 que nunca tinham sido cobertos —
      8 semanas novas ao todo (56 orações + 56 meditações), todas
      ancoradas no texto bíblico real confirmado contra a fonte
      oficial. `devotionals-2026/2029.json` regenerados e validados.
- [x] **Ciclo B estendido e validado (2026-08-17).** `ordinary-B.ts`
      escrito do zero (26 semanas, Próprios 4-29 — o Ciclo B nunca
      precisa do Próprio 3 entre 2015-2045) mais `trinityWeekB`, todo
      ancorado nas leituras reais (1 Samuel, 2 Samuel, 1 Reis, Jó, Rute
      + 2 Coríntios, Efésios, Tiago, Hebreus + Evangelho de Marcos).
      182 orações + 182 meditações originais. `tsc` limpo, validado sem
      repetição e sem lacuna em 2027 e 2030 (as duas ocorrências reais
      do Ciclo B no período gerado)
- [x] **Ciclo C estendido e validado (2026-08-18).** `ordinary-C.ts`
      escrito do zero (26 semanas, Próprios 4-29) mais `trinityWeekC`,
      ancorado nas leituras reais (1-2 Reis, Amós, Oséias, Isaías,
      Jeremias, Lamentações, Joel, Habacuque, Ageu + Gálatas,
      Colossenses, 1-2 Timóteo, Filemom, 1-2 Tessalonicenses +
      Evangelho de Lucas). 182 orações + 182 meditações originais.
      `tsc` limpo, validado sem repetição e sem lacuna em 2025 e 2028
      (as duas ocorrências reais do Ciclo C no período gerado, incluindo
      2028 que é ano bissexto)
- [x] `groundedOrdinary` e `trinityWeekByCycle` em
      `generate-devotionals.ts` trocados de `{ A: ordinaryA }` pros três
      ciclos (`A`, `B`, `C`). `devotionals-2025.json` a
      `devotionals-2030.json` regenerados (2191 devocionais),
      `prettier`/`tsc`/os 42 testes passando, `cycle-A/B/C.json` e
      `devotionals-*.json` sincronizados pro mobile
- [x] Revisar/aposentar os templates genéricos por estação (2026-08-20) —
      removidos 1278 linhas de código morto (`templates` inteiro,
      `seededPick`, fallback). Nenhuma estação caía mais nele; fallback
      agora é `return null` (melhor que mostrar conteúdo genérico errado).
      `generate-devotionals.ts` saiu de 2139 pra 855 linhas

---

### 1.2a Precisão das leituras do RCL (achado e corrigido em 2026-08-16)

**O problema real:** o Tempo Comum inteiro — os três ciclos, todo ano —
mostrava a leitura bíblica errada, sistematicamente 2 semanas
adiantada em relação à data certa do RCL oficial. Não era um bug
raro; era 100% dos domingos do Tempo Comum, todo ano, nos três
ciclos. Confirmado comparando o app contra o [Revised Common
Lectionary da Vanderbilt Divinity Library](https://lectionary.library.vanderbilt.edu/)
(a mesma fonte que o próprio `generate-rcl-data.ts` já citava) —
baixei os calendários oficiais de 2025-2026 (Ano A), 2026-2027 (Ano
B) e 2027-2028 (Ano C) e comparei domingo a domingo.

**Duas causas raiz combinadas** em `generate-rcl-data.ts`:
1. O Domingo da Trindade nunca existia como entrada própria — a
   primeira leitura do "Tempo Comum" era mostrada na própria data da
   Trindade, uma semana adiantada.
2. A tabela de leituras (`ordinary:N`, numeração sequencial desde a
   Trindade) pulava o Próprio 6 inteiro (Gênesis 18, "Sara ri") entre
   as posições 2 e 3 — mais uma semana de atraso acumulado.
3. Além disso, o fim da tabela (posições ~26-28) tinha conteúdo
   fabricado/remendado que não corresponde a nenhum domingo real do
   RCL (a origem do bug da Paixão na semana 26 do Ciclo A) — e o
   Ciclo B tinha um erro pior ainda: boa parte da tabela "ordinary"
   continha leituras da **Epifania**, coladas por engano no lugar das
   leituras pós-Pentecostes.

**Por que isso ia continuar quebrando todo ano:** o RCL real ancora
cada "Próprio" numa janela fixa de 7 dias do calendário civil
(Próprio 29 = Domingo de Cristo Rei = sempre o domingo entre 20-26 de
novembro, todo ano, sem exceção). O código antigo contava
sequencialmente a partir da Trindade — e como o número de domingos
entre a Trindade e o Advento varia todo ano (22 a 27, dependendo de
quando cai a Páscoa), a mesma "semana 2" caía em Próprios diferentes
dependendo do ano. Não tinha como isso um dia coincidir certo, exceto
por acaso.

**O conserto:**
- [x] Nova função `getProperNumberForDate()` — calcula o Próprio real
      a partir da data (ancorado em 20 de novembro = início da janela
      do Próprio 29), não mais por contagem sequencial
- [x] Domingo de Pentecostes e Domingo da Trindade agora são entradas
      próprias (a leitura de Pentecostes já existia na tabela mas
      ficava órfã, nunca usada — só faltava ligar)
- [x] Tabela de leituras do Tempo Comum **reconstruída do zero para
      os três ciclos**, chaveada por Próprio real (`proper3` a
      `proper29`), toda verificada contra a fonte oficial:
      - **Ciclo A**: completo, Próprios 3-29 (Próprios 3-4 via
        [crivoice.org](https://www.crivoice.org/lectionary/), Próprios
        5-29 confirmados linha a linha contra o PDF oficial da
        Vanderbilt)
      - **Ciclo B**: completo, Próprios 4-29 (confirmado contra o PDF
        oficial da Vanderbilt 2026-2027). Próprio 3 nunca é necessário
        entre 2015-2045 (calculado, não suposto)
      - **Ciclo C**: completo, Próprios 4-29 (Próprios 6-29 confirmados
        contra o PDF oficial da Vanderbilt 2027-2028; **Próprios 4-5
        via crivoice.org sem segunda confirmação cruzada** — sinalizado
        porque não achei uma segunda fonte pra checar, mas na prática
        quase não importa: nenhum ano entre 2015-2045 chega a precisar
        do Próprio 4 do Ciclo C, e o Próprio 3 nunca é necessário nesse
        intervalo)
- [x] `weekOfSeason` das entradas do Tempo Comum agora É o número do
      Próprio (3-29) — estável e com o mesmo significado todo ano, ao
      invés de uma posição sequencial que significava coisas
      diferentes dependendo do ano
- [x] **Validado programaticamente, não só "parece certo":** rodei um
      checador que compara cada domingo do Tempo Comum de 2026 (Ciclo
      A) contra o PDF oficial — **zero divergências** nas 4 leituras de
      todos os 25 Próprios daquele ano. Repeti pra todas as ocorrências
      reais de cada ciclo no intervalo gerado (A: 2026, 2029 · B: 2024,
      2027, 2030 · C: 2025, 2028) e para **2028, que é ano bissexto** —
      Cristo Rei caiu certinho no último domingo antes do Advento em
      todos os casos, sem exceção
- [x] Textos bíblicos completos rebuscados (`lookup-bible-text.ts`)
      pras citações novas/corrigidas — só ficaram sem texto as
      referências deuterocanônicas (esperado, o script já ignora essas
      de propósito) e nenhuma citação nova ficou sem texto
- [x] `cycle-A/B/C.json` regenerados e sincronizados pro mobile,
      `tsc`/`prettier`/os 42 testes passando

**Cobertura temporal:** a fórmula do Próprio 29 (ancorada em 20 de
novembro) é cálculo direto de data, não uma tabela fixa por ano —
funciona pra qualquer ano, incluindo bissextos, sem precisar de
manutenção. Validei contra 2015-2045 (31 anos, todos os bissextos do
intervalo inclusos) que o Tempo Comum nunca precisa de menos que o
Próprio 3 nem mais que o Próprio 29 — a tabela reconstruída cobre esse
intervalo inteiro.

**Atualização (2026-08-18):** os devocionais dos três ciclos (A, B, C)
já foram ancorados/escritos no novo mapeamento — ver 1.2 acima. Único
item em aberto do escopo original: revisar/aposentar os templates
genéricos por estação (Advento, Natal, Epifania, Quaresma, Páscoa,
Pentecostes), deliberadamente fora do escopo desta rodada.

---

### 1.2b Leituras do Natal e da Epifania (achado e corrigido em 2026-08-18)

Depois de fechar o Tempo Comum, auditei as demais estações (Advento,
Natal, Epifania, Quaresma, Páscoa) procurando o mesmo padrão de bug —
leitura certa existindo na tabela mas nunca ligada na geração, ou
numeração sequencial que não bate com o RCL real quando o intervalo de
tempo varia por ano. Achei três bugs reais, confirmados contra o RCL
oficial da Vanderbilt Divinity Library, todos em `generate-rcl-data.ts`:

1. **Domingo da Transfiguração nunca era gerado como caso especial.**
   É sempre o último domingo antes da Quarta-feira de Cinzas, com
   leituras fixas por ciclo (ex: Mateus 17:1-9 no Ciclo A) — mas o
   código antigo só numerava sequencialmente "Domingo após a
   Epifania" (2, 3, 4...), então esse domingo específico mostrava
   sempre a leitura genérica que calhasse de cair ali. Confirmado
   programaticamente: esse domingo varia entre a semana 6 e a 9 no
   intervalo 2024-2030 (e chega à semana 10 em 2038, dentro de
   2015-2045) — nunca a mesma, então nunca corrigia sozinho.
2. **O(s) domingo(s) depois do Natal nunca eram gerados.** A leitura
   do 1º Domingo depois do Natal (`christmas:2`) já existia na tabela
   do Ciclo A mas ficava órfã — nem essa nem as do Ciclo B/C (que nem
   existiam) eram ligadas na geração. Pior: a maioria dos anos
   (quando o Natal cai de quarta a sábado) tem **dois** domingos entre
   o Natal e a Epifania, não um — e o RCL real tem leitura própria pro
   segundo (`christmas:3`, igual nos 3 ciclos: Jeremias 31:7-14 /
   Salmo 147:12-20 / Efésios 1:3-14 / João 1:(1-9), 10-18). Confirmado
   programaticamente contra 2024-2030: só 2028 e 2029 têm 1 domingo,
   os outros 5 anos têm 2.
3. **Semana 8 da Epifania faltava inteira no Ciclo B**, silenciosamente
   — a tabela do Ciclo B só ia até `epiphany:7`, então em anos que
   precisam de 8 domingos regulares antes da Transfiguração (2025,
   2028, 2030 no intervalo gerado — inclusive 2030, uma ocorrência
   real do Ciclo B), esse domingo específico não tinha entrada
   nenhuma. Mesma classe de bug do achado original do Pentecostes/
   Trindade (1.2a): não conteúdo errado, ausência total.

**O conserto:**
- [x] Leituras da Transfiguração adicionadas por ciclo (`transfiguration:1`
      em A/B/C), confirmadas contra o RCL oficial da Vanderbilt:
      - **Ciclo A**: Êxodo 24:12-18 · Salmo 2 · 2 Pedro 1:16-21 · Mateus 17:1-9
      - **Ciclo B**: 2 Reis 2:1-12 · Salmo 50:1-6 · 2 Coríntios 4:3-6 · Marcos 9:2-9
      - **Ciclo C**: Êxodo 34:29-35 · Salmo 99 · 2 Coríntios 3:12-4:2 · Lucas 9:28-36, (37-43)
- [x] Loop da Epifania agora detecta o último domingo antes da
      Quarta-feira de Cinzas (comparando se o próximo domingo já cairia
      nela ou depois) e troca pela leitura fixa da Transfiguração, ano a
      ano, sem hardcoding
- [x] Geração de domingo(s) depois do Natal implementada — calcula
      dinamicamente quantos domingos existem entre 26/dez e a véspera
      da Epifania (1 ou 2, dependendo do ano) e usa `christmas:2` pro
      primeiro e `christmas:3` pro segundo
- [x] `christmas:2` adicionado pros Ciclos B (Isaías 61:10-62:3 · Salmo
      148 · Gálatas 4:4-7 · Lucas 2:22-40) e C (1 Samuel 2:18-20, 26 ·
      Salmo 148 · Colossenses 3:12-17 · Lucas 2:41-52); citação do
      evangelho do Ciclo A corrigida de Mateus 2:13-15 pra 2:13-23
      (citação oficial completa)
- [x] `christmas:3` adicionado aos 3 ciclos (mesmo conteúdo, é comum
      ao RCL todo)
- [x] `epiphany:8` adicionado ao Ciclo B (Oséias 2:14-20 · Salmo
      103:1-13, 22 · 2 Coríntios 3:1-6 · Marcos 2:13-22), confirmado
      contra o RCL oficial da Vanderbilt
- [x] **Validado programaticamente para 2024-2030:** todo ano agora
      tem exatamente um "Domingo da Transfiguração" (nunca mais
      conteúdo genérico de Epifania nesse domingo) e o número certo de
      domingos depois do Natal (1 em 2028/2029, 2 nos demais anos do
      intervalo) — sem exceção
- [x] Regressão checada: Tempo Comum (1.2/1.2a) continua zero
      repetição/zero lacuna depois do conserto — essa mudança não
      tocou naquela parte do código. `tsc`, `prettier` e os 42 testes
      passando; `cycle-A/B/C.json` sincronizados pro mobile

**Fora do escopo desta rodada:** não fiz uma reauditoria completa,
citação por citação, de todo o Advento/Epifania/Quaresma (só validei
o que já estava no código contra o RCL pontualmente, ao investigar
estes 3 bugs) — é possível que existam outras imprecisões menores
ainda não achadas nessas estações. O conteúdo devocional (orações/
meditações) dessas estações continua nos templates genéricos, sem o
mesmo tratamento ancorado no RCL que o Tempo Comum já tem.

---

### 1.2c Achado crítico: Ciclos B e C do Tempo Comum nunca estavam
sendo usados de verdade (achado e corrigido em 2026-08-18)

**Isto precisa ser dito com todas as letras: as validações "zero
repetição, zero lacuna" reportadas anteriormente pra `ordinary-B.ts` e
`ordinary-C.ts` (seções 1.2/1.2a) estavam checando o arquivo errado.**
Elas confirmaram que o CONTEÚDO escrito nesses arquivos era completo e
correto — mas nunca confirmaram que esse conteúdo realmente aparecia
nos `devotionals-*.json` publicados, que é o que o app de fato lê.

Ao investigar as outras estações, rodei a mesma checagem de repetição
só que desta vez direto no `devotionals-2027.json` (ocorrência real do
Ciclo B) — e o resultado foi devastador: o título "Deus Amou o Mundo
de Tal Maneira" (um dos 6 títulos de `trinityWeekB`) repetia **25
vezes** num único ano; outros títulos da mesma semana repetiam 24
vezes cada. Ou seja: apesar de `ordinary-B.ts` e `ordinary-C.ts`
estarem completos, corretos e testados isoladamente, **eles nunca
eram de fato consultados** na geração real dos devocionais — o Tempo
Comum inteiro dos Ciclos B e C caía no fallback de `trinityWeekByCycle`
(só 6 dias de conteúdo) repetido por toda a estação.

**Causa raiz:** em `generate-devotionals.ts`, o mapa `rclDataByCycle`
— usado por `findGoverningOrdinarySunday()` pra achar o domingo real
que rege cada semana — só tinha o Ciclo A importado e ligado
(`cycleAData`). Pra B e C, a função sempre retornava `null`, o que
fazia o código cair no branch de fallback da Trindade pra qualquer
dia de semana (segunda a sábado) e não achar nenhum domingo "regente"
pros domingos em si.

**O conserto:**
- [x] `cycle-B.json` e `cycle-C.json` importados e ligados em
      `rclDataByCycle` (antes só tinha `A: cycleAData`)
- [x] Regenerei `devotionals-2025.json` a `devotionals-2030.json` e
      validei de novo — desta vez direto nos arquivos publicados, com
      as datas exatas de Trindade+1 até o fim da semana do Próprio 29,
      calculadas independentemente (não hardcoded): **zero repetição,
      zero lacuna** nos 6 anos gerados (A: 2026/2029, B: 2027/2030, C:
      2025/2028)
- [x] Ao fazer essa varredura completa, achei e corrigi 2 títulos
      duplicados dentro dos próprios arquivos (`ordinary-A.ts` tinha
      "Eis-Me Aqui" usado em 2 semanas diferentes — Abraão e Moisés;
      `ordinary-C.ts` tinha "Antes de Todas as Coisas" em 2 semanas —
      Próprio 11 e Próprio 29, ambos sobre Colossenses 1:15-20). O
      conteúdo de cada dia já era diferente; só o título colidia.
      Renomeados pra ficarem únicos nos 195/188/188 títulos de cada
      ciclo (confirmado programaticamente, sem duplicata nenhuma)
- [x] `tsc`, `prettier` e os 42 testes passando; `devotionals-*.json`
      sincronizados pro mobile

**Lição pra próxima vez:** validar "o conteúdo que escrevi está
correto" não é o mesmo que validar "o conteúdo que escrevi está sendo
usado". A partir de agora, qualquer validação de repetição/lacuna
precisa ser feita direto no arquivo final publicado
(`devotionals-*.json`), nunca só no módulo de conteúdo isolado.

---

### 1.2d Advento ancorado no RCL, 3 ciclos (2026-08-18)

Estendendo o mesmo tratamento do Tempo Comum pro Advento — primeira
das estações genéricas restantes (Natal, Epifania, Quaresma, Páscoa
ainda pendentes).

- [x] `advent-A.ts`, `advent-B.ts`, `advent-C.ts` escritos —
      4 semanas fixas por ciclo (o Advento sempre tem exatamente 4
      domingos, ao contrário do Tempo Comum), 28 orações + 28
      meditações por ciclo, todas ancoradas no texto real das
      leituras (já verificadas corretas nas 3 tabelas — Isaías/Romanos/
      Mateus no Ciclo A, Isaías/1-2 Pedro/Marcos no Ciclo B, Jeremias-
      Malaquias-Sofonias-Miquéias/Filipenses-Hebreus/Lucas no Ciclo C)
- [x] `groundedAdvent` ligado em `generate-devotionals.ts`, mesmo
      padrão de `groundedOrdinary`
- [x] **Dois bugs de infraestrutura achados e corrigidos no caminho:**
      1. A fronteira 25/dez era tratada como "mês inteiro de dezembro
         = Advento", então o Natal e a semana seguinte nunca
         apareciam como estação "christmas" — sempre caíam no
         Advento. Trocado por comparação de data exata.
      2. Nos anos em que o Advento seguinte começa em novembro
         (27-30/nov, antes de 1/dez), esses últimos dias de novembro
         usavam o ciclo litúrgico do ano ATUAL em vez do PRÓXIMO —
         mostrando conteúdo de Advento do ciclo errado (ex: Ciclo C
         em vez de A). Corrigido calculando o ciclo efetivo por data,
         não só por ano.
- [x] Validado programaticamente nos 6 anos gerados (2025-2030): zero
      repetição, zero lacuna no Advento inteiro de cada ciclo, e
      confirmado que o ciclo certo aparece em cada domingo (checado
      contra `getLiturgicalCycle` independentemente)
- [x] Regressão do Tempo Comum reconfirmada — continua zero
      repetição/zero lacuna nos 6 anos. `tsc`, `prettier` e os 42
      testes passando; sincronizado pro mobile

**Ainda faltam:** Natal, Epifania, Quaresma, Páscoa — mesma
metodologia, estruturas de semana diferentes (o Natal e a Epifania não
começam sempre num domingo, então não dá pra reusar o índice simples
por `date.getDay()` do Advento/Tempo Comum sem adaptação).

---

### 1.2e Natal ancorado no RCL, 3 ciclos (2026-08-18)

- [x] `christmas.ts` escrito com estrutura própria (diferente de
      Advento/Tempo Comum): 25/dez não cai sempre no mesmo dia da
      semana, então não dá pra indexar por `date.getDay()`. Em vez
      disso: conteúdo específico pro Dia de Natal (por ciclo), pro 1º
      Domingo depois do Natal (por ciclo — varia bastante: fuga pro
      Egito no A, apresentação no templo no B, Jesus menino no templo
      no C), pro 2º Domingo depois do Natal quando existe (comum aos
      3 ciclos — leitura igual no RCL), e 10 meditações de dia de
      semana sobre a narrativa da Natividade (Lucas 2 / prólogo de
      João), comuns aos 3 ciclos já que o RCL não distingue por ciclo
      nesses dias
- [x] `getGroundedChristmasContent()` calcula dinamicamente, pra
      qualquer data, se é o Dia de Natal, o 1º/2º Domingo (mesma
      lógica de `generate-rcl-data.ts`), ou um dia de semana comum —
      nesse caso conta quantos dias de semana já passaram desde
      26/dez pra escolher sem repetir
- [x] Validado nos 6 anos gerados: 12 dias cada, zero repetição, zero
      lacuna, conteúdo do ciclo certo no Dia de Natal e no 1º Domingo,
      domingo certo identificado corretamente ano a ano (checado
      contra o dia da semana real de cada 25/dez)
- [x] Regressão de Advento e Tempo Comum reconfirmada. `tsc`,
      `prettier` e os 42 testes passando; sincronizado pro mobile

**Ainda faltam:** Epifania, Quaresma, Páscoa.

---

### 1.2f Achado: leitura da Epifania (25/dez) e numeração dos domingos seguintes (2026-08-18)

Ao preparar o conteúdo devocional da Epifania, achei mais um bug do
mesmo tipo: a chave `epiphany:1` da tabela continha a leitura do
**Batismo do Senhor** (Mateus 3:13-17), não a leitura real do **Dia da
Epifania** (visita dos magos, Mateus 2:1-12) — que nunca existia na
tabela. Isso empurrava a numeração de todos os domingos seguintes uma
semana adiantada: 6/jan mostrava a leitura do Batismo; o 1º domingo
real depois (que deveria ser o próprio Batismo) mostrava a leitura do
"2º Domingo depois da Epifania"; e assim por diante, até a
Transfiguração (que já tinha sido corrigida separadamente em 1.2 —
essa parte continuou correta, só a numeração intermediária estava
errada).

- [x] Nova chave `epiphanyday:1` — leitura real da Epifania (Isaías
      60:1-6 · Salmo 72:1-7, 10-14 · Efésios 3:1-12 · Mateus 2:1-12),
      igual nos 3 ciclos (é uma das poucas leituras fixas do RCL, não
      cíclicas)
- [x] 6/jan agora usa `epiphanyday:1`; o 1º domingo real depois da
      Epifania (sempre "Batismo do Senhor", nome próprio — não existe
      "1º Domingo depois da Epifania" no RCL) usa a chave `epiphany:1`
      (conteúdo que já estava certo, só mal aproveitado); cada domingo
      seguinte usa `epiphany:${M}` onde M é o número real do domingo
      (2 = "2º Domingo", 3 = "3º Domingo", ...)
- [x] Validado nos 3 ciclos, múltiplos anos: 6/jan sempre mostra os
      magos, o domingo seguinte sempre "Batismo do Senhor" com a
      leitura certa por ciclo, e a numeração dos domingos seguintes
      bate com o RCL oficial (confirmado contra a Vanderbilt Divinity
      Library)
- [x] Regressão de Tempo Comum, Advento e Natal reconfirmada — essa
      mudança não toca nessas partes do código. `tsc`, `prettier` e os
      42 testes passando; `cycle-A/B/C.json` e `devotionals-*.json`
      sincronizados pro mobile

---

### 1.2g Epifania ancorada no RCL, 3 ciclos (2026-08-18)

Fecha o quarto bloco de conteúdo devocional ancorado no RCL (depois de
Tempo Comum, Advento e Natal).

- [x] `epiphany-shared.ts` — o próprio 6/jan (visita dos magos, leitura
      fixa igual nos 3 ciclos) e `epiphanyGapWeek` (6 entradas,
      mesmo padrão de `trinityWeek*`) pros dias entre 6/jan e o
      Batismo do Senhor, que variam de 0 a 6 dependendo do dia da
      semana em que cai a Epifania
- [x] `epiphany-{A,B,C}.ts` — do Batismo do Senhor (sempre o 1º
      domingo real depois de 6/jan) até o 7º Domingo, mesmo padrão de
      `ordinary-*.ts` (semana de 7 dias ancorada no domingo real,
      localizado por data). `transfigurationWeek` tratado à parte em
      cada arquivo, localizado por nome do dia ("Domingo da
      Transfiguração"), não por número de semana, porque essa semana
      pode cair em qualquer posição de 6 a 10 dependendo do ano — 56
      orações + 56 meditações por ciclo (7 semanas × 7 dias + semana
      da Transfiguração)
- [x] `findGoverningSunday()` generalizado (antes só
      `findGoverningOrdinarySunday`) pra servir também
      `findGoverningEpiphanySunday()`, com `weekOfSeason >= 2` pra
      nunca confundir a própria entrada de 6/jan com um "domingo
      regente"
- [x] Validado nos 6 anos gerados: zero repetição, zero lacuna na
      Epifania inteira de cada ano; 6/jan sempre com o conteúdo
      compartilhado certo; Batismo do Senhor e domingos seguintes com
      o conteúdo do ciclo certo (confirmado contra `getLiturgicalCycle`
      independentemente)
- [x] Regressão de Tempo Comum, Advento e Natal reconfirmada. `tsc`,
      `prettier` e os 42 testes passando; sincronizado pro mobile

**Ainda faltam:** Quaresma, Páscoa — últimas duas estações genéricas
restantes.

---

### 1.2h Quaresma ancorada no RCL, 3 ciclos (2026-08-18)

Quinto bloco de conteúdo devocional ancorado no RCL. A Semana Santa
(Domingo de Ramos, Quinta, Sexta e Sábado Santo) já tinha conteúdo
dedicado desde 2026-08-15/16 (`triduumContent`) — este bloco cobre o
resto: Quarta-feira de Cinzas até o 5º Domingo da Quaresma, e as três
primeiras leituras da Semana Santa (segunda a quarta) que ainda
caíam nos templates genéricos.

- [x] `lent-shared.ts`: Quarta-feira de Cinzas (leitura fixa, igual
      nos 3 ciclos), `ashWednesdayGap` (quinta a sábado seguintes, sem
      leitura própria no RCL) e `holyWeekEarly` (segunda a
      quarta-feira santa — os "Cânticos do Servo" de Isaías,
      também comuns aos 3 ciclos)
- [x] `lent-{A,B,C}.ts`: 5 semanas fixas (1º-5º Domingo da Quaresma),
      mesmo padrão de `advent-*.ts` — 35 orações + 35 meditações por
      ciclo
- [x] **Achado de infraestrutura no caminho:** `getWeekOfSeason`
      contava a semana da Quaresma a partir da própria Quarta-feira de
      Cinzas (sempre uma quarta-feira) — o que desalinhava a
      numeração do conteúdo ancorado, escrito por semana real
      domingo-sábado como nas outras estações. Corrigido pra contar a
      partir do 1º Domingo real da Quaresma (Cinzas+4 dias, sempre um
      domingo); a própria Quarta-feira de Cinzas e os 3 dias
      seguintes agora são tratados por data exata, não por essa
      numeração
- [x] Validado nos 6 anos gerados: 39 dias cada (Cinzas até a véspera
      do Domingo de Ramos), zero repetição, zero lacuna; confirmado
      que a Quarta-feira de Cinzas, o 1º Domingo da Quaresma e a
      transição pra Semana Santa (segunda/terça/quarta → já
      sobrescrito por `triduumContent` na quinta) encadeiam
      corretamente sem sobreposição nem buraco
- [x] Regressão de Tempo Comum, Advento, Natal e Epifania
      reconfirmada. `tsc`, `prettier` e os 42 testes passando;
      sincronizado pro mobile

**Ainda falta:** Páscoa (Domingo de Páscoa até Pentecostes) — última
estação genérica restante.

---

### 1.2i Páscoa e Pentecostes ancorados no RCL, 3 ciclos — todas as
estações litúrgicas agora ancoradas no RCL real (2026-08-18)

Sexto e último bloco de conteúdo devocional ancorado no RCL. Com este
bloco, **todas** as estações litúrgicas (Advento, Natal, Epifania,
Quaresma, Páscoa, Pentecostes/Trindade, Tempo Comum) têm conteúdo
próprio grounded nas leituras reais do RCL — o objetivo original desta
rodada inteira ("fechar os gargalos de conteúdo, nada de orações
repetidas, nada de conteúdo genérico") está cumprido.

- [x] `easter-{A,B,C}.ts`: 7 semanas fixas (Domingo da Ressurreição ao
      7º Domingo da Páscoa), mesmo padrão de `advent-*.ts` — 49
      orações + 49 meditações por ciclo (147 no total), sem
      adaptação de data necessária já que o Domingo de Páscoa é
      sempre domingo
- [x] `pentecost.ts`: Domingo de Pentecostes (leitura própria por
      ciclo), `pentecostGapWeek` (os 6 dias entre Pentecostes e a
      Trindade, sem leitura própria no RCL, compartilhados pelos 3
      ciclos) e Domingo da Santíssima Trindade em si — usando as
      mesmas 4 leituras de `trinityWeek{A,B,C}` (já existentes desde
      1.2c, mas cobrindo só os 6 dias DEPOIS da Trindade), com ângulos
      e títulos deliberadamente diferentes pra não repetir
- [x] `generateForDate`: a estação `'pentecost'` cobre sempre os
      mesmos 8 dias fixos (Domingo de Pentecostes ao Domingo da
      Trindade, ambos inclusive) — tratados por data exata
      (`pentecostDay`/`trinityDay` calculados a partir da Páscoa),
      não por número de semana
- [x] Validado nos 6 anos gerados (2025-2030): Páscoa até a véspera de
      Pentecostes (49 dias) + Pentecostes até a Trindade (8 dias) = 57
      dias por ano, zero repetição, zero lacuna, checado com datas de
      Páscoa/Pentecostes/Trindade calculadas de forma independente do
      próprio gerador (algoritmo de Páscoa em Python), não reaproveitando
      nenhuma lógica do `generate-devotionals.ts`
- [x] **10 duplicações de título entre estações achadas durante essa
      validação** (algumas introduzidas agora, outras pré-existentes
      desde blocos anteriores) — só apareciam ao checar o JSON final
      de um ano inteiro (não por estação isolada), que é exatamente a
      lição documentada em 1.2c. Exemplos: "Deus Não Faz Acepção de
      Pessoas" (Atos 10, usado tanto no Batismo do Senhor quanto no
      Domingo de Páscoa, Ciclo A), "O Tempo Está Cumprido" (Marcos
      1:15, usado idêntico em Epifania 3B e Quaresma 1B), "Antes Que
      Eu Te Formasse..." e "Tu És a Minha Rocha..." (Jeremias 1 e
      Salmo 71, repetidos entre Epifania C e um Próprio do Tempo
      Comum C). Todas renomeadas com ângulo/versículo diferente da
      mesma passagem, mantendo o texto grounded
- [x] **Achado de infraestrutura mais sutil, no fronteira dos
      arquivos anuais:** `generateYear(year)` gera de 1/dez do ano
      anterior a 30/nov do ano corrente, mas só tratava a fronteira do
      FIM do intervalo (Advento de fim de novembro que já pertence ao
      próximo ano litúrgico, ver 1.2c) — faltava o espelho no INÍCIO:
      quando o Advento do ano anterior começa depois de 1/dez (ex.:
      3/dez), os dias 1-2/dez ainda pertencem à cauda do ano litúrgico
      anterior (semana de Cristo Rei) e devem usar o ciclo desse ano
      anterior, não o ciclo do arquivo. Sem essa correção, esses 1-2
      dias por ano mostravam o ciclo errado — inofensivo na maioria
      dos anos, mas criava repetição exata de título quando esse ciclo
      errado coincidia com o ciclo usado no fim do MESMO arquivo
      (achado checando devotionals-2029.json/2030.json contra as datas
      reais, não contra os módulos isolados — mesma lição de sempre)
- [x] **Duplicação de conteúdo achada no mesmo processo:** os títulos
      de "Cristo Rei" (última semana do Tempo Comum) em `ordinary-A.ts`
      e `ordinary-B.ts` eram literalmente idênticos ("Cristo Rei"), ao
      contrário do `ordinary-C.ts` que já usava um título específico
      ("Este É o Rei dos Judeus"). Renomeado o de A pra "Vinde,
      Benditos de Meu Pai" (Mateus 25:34)
- [x] Regressão completa reconfirmada: **os 6 anos gerados (2025-2030),
      na janela exata de cada arquivo `devotionals-YYYY.json`
      (1/dez do ano anterior a 30/nov do ano corrente), têm zero dia
      faltando e zero título repetido** — validação cobrindo o ano
      litúrgico inteiro, não só Páscoa/Pentecostes. `tsc`, `prettier`
      e os 42 testes passando; sincronizado pro mobile

**Conclusão desta rodada:** as sete estações litúrgicas (Advento,
Natal, Epifania, Quaresma, Páscoa, Pentecostes/Trindade, Tempo Comum)
têm agora conteúdo devocional 100% ancorado nas leituras reais do RCL,
nos 3 ciclos, sem repetição e sem lacuna, validado diretamente contra o
JSON final publicado — não contra os módulos de conteúdo isolados. O
objeto genérico `templates` em `generate-devotionals.ts` ficou órfão
(nenhuma estação mais cai nele) e pode ser removido numa limpeza futura,
mas isso não foi feito nesta rodada por não ter sido pedido.

---

### 1.3 Correção de build (mobile)

- [x] **`NoSuchMethodError` resolvido (2026-08-15)** — não era teórico,
      aconteceu de verdade no primeiro build EAS real. Causa raiz e
      correção completas na seção "Identidade aplicada aqui" abaixo
      ("Achado crítico, primeiro build EAS real")
- [x] **Testado em dispositivo físico Android (2026-08-15/16)** — via
      `adb logcat` real, não simulação. iOS ainda não testado (decisão
      consciente, foco Android por enquanto — ver "Ainda pendente"
      abaixo)

---

### 1.4 Web — Atualizar componentes para dados locais

- [x] `page.tsx` — `useEffect` agora é síncrono (corrigido 2026-08-19)
- [x] Verificar que todos os componentes consomem dados corretamente com o novo formato RCL (date-based)
- [x] Remover dependência `@supabase/supabase-js` do build de produção (removido em commit `a3c205a`, 2026-07-09)
- [x] Remover admin panel (`src/app/admin/`) — deletado em commit `a3c205a`, 2026-07-09
- [x] Limpar `.env.example` (web + mobile) — referências Supabase removidas (2026-08-19)
- [x] Atualizar READMEs e CONTRIBUTING — referências a Supabase/admin removidas (2026-08-19)

---

### 1.5 Indicadores de loading

- [x] Adicionar estado de loading na CalendarScreen enquanto calcula dias do mês (2026-08-19)
- [x] Manter loading mínimo de UX: não mostrar conteúdo em flash antes de ter dados

---

### 1.6 Ícone e splash screen reais (mobile)

- [x] **Superada pela 1.7 abaixo** — ícone final (livro+chama), adaptive
      icon, splash screen e `app.json` já cobertos por
      `scripts/generate-logos.py`, rodando de verdade desde 2026-08-14/15
      e regenerado hoje com a paleta corrigida. Item antigo de 28/06
      ficou órfão sem ser marcado quando o trabalho real foi feito —
      corrigido agora ao revisar o roadmap

---

### 1.7 Logo sazonal e assets (web + mobile) — 2026-08-14/15

*Registrado como pendência às 2026-08-14, mas na verdade já estava
majoritariamente feito e só não commitado — corrigido em 2026-08-15
após conferir `git status` (a nota anterior dizia "não iniciado", o
que era falso).*

- [x] Script `scripts/generate-logos.py` gerando os assets a partir de
      `Logo.png`: recoloração por estação (corpo+chama, paleta web e
      mobile), ícones PWA, favicon, maskable icons, manifests
      sazonais, assets Expo e Android res por densidade
- [x] Web: `manifest.json`, `layout.tsx` (favicon/apple-touch-icon
      corrigido pra 180×180, `themeColor`) e Header/Footer/loading/error
      usando a nova logo
- [x] Web: troca dinâmica da logo/favicon/manifest por estação —
      `applySeasonBranding()` em `lib/theme.ts`, chamado de `page.tsx`
- [x] Mobile: assets gerados (icon, adaptive, splash, favicon, android
      res) e `app.json` atualizado (nome "Lecionário", cores de fundo
      `#F5F1E8`)
- [x] Mobile: logo sazonal no `HomeScreen` (`SEASON_LOGOS` por
      `require()` estático — necessário pro Metro resolver o asset;
      exceção de lint escopada em `eslint.config.cjs`)
- [x] Typecheck/lint limpos nos dois apps (corrigidos nesta sessão:
      comentários `eslint-disable` órfãos referenciando uma regra do
      `@next/eslint-plugin-next` que este projeto não usa; `Image`/
      `SEASON_LOGOS` declarados mas nunca renderizados no mobile)
- [x] **Pendente de verdade resolvido (2026-08-21)**: novo build EAS
      gerado com o ícone/nome novos valendo no app instalado

---

## Fase 2 — Features essenciais (v1.1)

*O que transforma o app de utilitário em produto.*

### 2.1 Notificações push diárias

- [x] Instalar `expo-notifications`
- [x] Implementar notificação local às 6h com o nome do dia litúrgico e referências (2026-08-20, `src/lib/notifications.ts`)
- [x] Adicionar toggle nas Configurações: ativar/desativar notificações (2026-08-20)
- [x] Adicionar seletor de horário (6h/7h/8h/9h) — integrado ao toggle (2026-08-20)
- [x] Solicitar permissão de notificação no primeiro uso, com explicação clara (2026-08-20)

**Exemplo da notificação:**
```
Título: Quinta após o Pentecostes
Corpo: 20 de agosto — Rm 8,14-17 · Jo 8,31-47
```

---

### 2.2 Compartilhamento nativo

- [x] Instalar `expo-clipboard` (Share de texto usa RN built-in `Share`)
- [x] Adicionar botão "Compartilhar" no `ReadingCard` (ícone no header do card)
- [x] Adicionar botão "Copiar" na `PrayerSection` (com feedback visual "Copiado!")
- [x] Compartilhar o dia inteiro como texto formatado (botão ao lado do título "Lecionário")
- [ ] Testar no Android (Intent) e iOS (Share Sheet)

---

### 2.3 Config screen completa

A tela atual tem apenas "Limpar cache". Adicionar:

- [x] **Tema** — claro / escuro / seguir sistema (SettingsContext + ThemeContext + FontContext, 2026-08-20)
- [x] **Tamanho da fonte** — pequeno / médio / grande (FontContext com scale, 2026-08-20)
- [x] **Notificações** — toggle on/off (permissions via expo-notifications, 2026-08-20)
- [x] **Sobre** — versão atual, dados litúrgicos, explicação de armazenamento (2026-08-20)

---

### 2.4 Deep links

- [x] Permitir que a notificação push abra diretamente o devocional do dia ao ser tocada (2026-08-20, `NotificationHandler` em `App.tsx` + `addNotificationResponseListener` em `notifications.ts`)

---

## Fase 3 — Qualidade e polimento (v1.2)

*O que separa um app de v1 de um app que as pessoas recomendam.*

### 3.1 Acessibilidade

- [x] **Auditoria de `accessibilityLabel`/`accessibilityRole` — feita (2026-08-15)**:
      todos os `TouchableOpacity` interativos dos 6 arquivos que tinham
      (Prayer/Reading/Home/Calendar/Config/ErrorBoundary) agora têm os
      dois. Faltavam: retry do `ErrorBoundary`, navegação de dia
      (anterior/próximo) e retry de erro no `HomeScreen` — corrigidos.
      `Meditation`/`CollectSection` não têm elemento interativo, não se
      aplica
- [x] `ReadingCard` — já tem (`accessibilityLabel` no botão de
      compartilhar, com tipo + referência)
- [x] `CalendarScreen` — já tem, label completo por célula (data por
      extenso + dia litúrgico) + navegação de mês (achado ao conferir,
      2026-08-15 — estava marcado pendente por engano)
- [ ] Testar com TalkBack (Android) e VoiceOver (iOS)
- [x] **Contraste mínimo 4.5:1 em todo texto sobre fundo — feito (2026-08-15)**:
      achado real em `PrayerSection`/`MeditationSection`/`CollectSection`/
      `ReadingCard` (gold sobre fundo escuro e claro reprovando WCAG AA,
      inclusive com opacidade reduzindo ainda mais); todos corrigidos e
      verificados com `tsc --noEmit`
- [x] **Mobile modo claro: texto preto sobre verde escuro — RESOLVIDO
      (2026-08-22, mesmo dia do report).** Causa real: o fundo da área de
      conteúdo da home É o `primaryColor` da estação, e os títulos de
      seção fora dos cards ("Lectio Divina", "Ano Litúrgico B • 4
      Estações", "Citação do dia") usavam `colors.text` — quase-preto no
      modo claro, direto sobre o verde. Header/badges já estavam certos.
      Solução: novo helper `getOnBrandTextColors(season)` em `theme.ts`
      com a mesma partição dos badges — estação de marca clara (ouro
      natalino/páscoa) pede texto escuro `#2A1810`; marca escura (verde,
      roxo, vermelho, azul) pede creme `#F4EFE1`. Empty/Error states
      também ganharam superfície de card (`colors.card`) pra serem
      legíveis em qualquer fundo

---

### 3.2 Cobertura de testes

- [x] Testes para `rcl-fetcher.ts` — busca por data, ciclo, texto bíblico (2026-08-20, 7 testes)
- [x] Testes para `cache.ts` — TTL expirado, cache miss, clear (2026-08-20, 7 testes)
- [x] Testes para `devotional-content.ts` — lookup por data, ano sem dados (2026-08-20, 4 testes)
- [ ] Testes para `getSampleDevotional` — fallback chain
- [ ] Testes de snapshot para `ReadingCard`, `PrayerSection`, `CollectSection`
- [x] Meta: 70%+ de cobertura no `src/lib/` (2026-08-20 — 81% stmts, 100% funcs)

---

### 3.3 Crash reporting

- [x] Instalar `@sentry/react-native` (2026-08-20)
- [x] Inicializar Sentry no `App.tsx` com DSN de produção (2026-08-20 — `Sentry.init()` + `Sentry.wrap(App)`)
- [x] Configurar source maps no EAS (2026-08-20 — `app.config.ts` com plugin `@sentry/react-native/expo`)

---

### 3.4 CI/CD para mobile

- [x] Adicionar job EAS Build no GitHub Actions em push para `main` (2026-08-20 — `eas.yml` com preview build + Sentry source maps)
- [x] Adicionar `eas update` para OTA updates (2026-08-20 — publica branch `preview` a cada deploy)

---

### 3.5 Estados de erro com UI dedicada

- [x] Criar componente `EmptyState` (ícone + título + subtítulo + ação opcional) (2026-08-20)
- [x] Criar componente `ErrorState` para falhas (distinto do ErrorBoundary) (2026-08-20)
- [x] Adicionar pull-to-refresh com feedback visual (2026-08-20 — já existia no HomeScreen via `RefreshControl`)

---

## Fase 4 — Features avançadas (v2.0)

### 4.1 Favoritos e marcadores

- [x] Persistir dias favoritos em AsyncStorage (2026-08-20 — `FavoritesContext` com toggle + persistência)
- [x] Aba "Favoritos" na CalendarScreen (2026-08-20 — tab toggle Calendário/Favoritos com lista cronológica)
- [x] Botão de favoritar no HomeScreen (2026-08-20 — heart outline/filled no header)

### 4.2 Busca

- [x] Busca por referência bíblica (ex: "João 3") (2026-08-20 — indexa leituras dos ciclos A/B/C)
- [x] Busca por data (2026-08-20 — match direto no formato yyyy-MM-dd)
- [x] Busca por palavra-chave nas leituras (2026-08-20 — também em orações e meditações)

> **Nota**: Busca integrada ao CalendarScreen (ícone de lupa no header). `src/lib/search.ts` indexa 6 anos de devotionals + 3 ciclos litúrgicos. Limitado a 50 resultados, mínimo 2 caracteres.

### 4.3 Widget (Android 12+ / iOS 14+)

- [ ] Widget de tela inicial com leitura do dia e estação litúrgica
- [ ] Atualização diária automática

### 4.4 Versões bíblicas múltiplas

**REMOVIDO** (2026-08-20) — decidido em conjunto: a complexidade de embutir múltiplas traduções no bundle (textos × 365 dias × 6 anos) não justifica. Offline-first é prioridade.

---

### 4.5 Pintura do Dia — integração com Bíblia na Arte (2026-08-16)

Ideia do Rilson: card opcional no dia mostrando uma obra de arte
relacionada à leitura principal, linkando pro Bíblia na Arte pra ver
mais. Conferido antes de registrar — a base técnica já existe dos dois
lados, não é especulação:

- Bíblia na Arte já tem `GET /api/v1/artworks?bookSlug=luke&chapter=10`
  (endpoint real, com teste de integração cobrindo)
- Lecionário já tem `reference: string` em cada leitura (ex. "Lucas
  10:25-37")

**O que falta construir:**
- [x] Parser de referência → extrair livro + capítulo do texto livre (2026-08-20 — `src/lib/reference-parser.ts`, regex `^(.+?)\s+(\d+)`)
- [x] Tabela de tradução nome-do-livro-em-português → `bookSlug` em inglês (2026-08-20 — `src/lib/bible-books.ts`, 66 livros + aliases)
- [x] Card "Pintura do Dia" — thumbnail + título + artista, toque abre o Bíblia na Arte (2026-08-20 — `src/components/ArtCard.tsx`, só aparece quando online)

**Decisão de arquitetura, não negociável sem repensar tudo:** Lecionário
é offline-first de propósito — o card **só aparece quando online**
(reaproveitar o `isOffline` que o `HomeScreen` já rastreia) e fica
ausente com graça quando não tem rede. Núcleo do app continua
funcionando 100% sem internet; isso é enriquecimento, não dependência.

Ver também: `biblia-na-arte/docs/ROADMAP.md`, seção "Fase 5 — Produto"
(lado recíproco desta integração).

---

### 4.6 "Leia mais sobre isso" — integração com Scriptorium Divinum (2026-08-16)

> **Status: PAUSADO** — API do Scriptorium será retomada em iteration futura.
> Registrado em 2026-08-20 a pedido do autor.

Mesmo espírito da 4.5, mais simples de implementar: `GET
/api/v1/search?q=` do Scriptorium já é real e testado (busca full-text
em português). O Lecionário busca por palavra-chave da meditação/leitura
do dia e sugere um trecho relacionado de um clássico (Agostinho, Kempis
etc.), com link pro Scriptorium. Mesma regra do card anterior: só
online, ausente com graça offline, reaproveitando `isOffline`.

- [ ] Extrair 1-2 palavras-chave relevantes da meditação/leitura do dia
- [ ] Card "Leia mais" — trecho + autor + link, mesmo lugar visual da
      Pintura do Dia (ou junto, num só bloco "Biblioteca do dia")

Ver também: `scriptorium-divinum/ROADMAP.md`, seção "Estratégia" (lado
recíproco).

---

### 4.7 Citação do dia — Gerador C.S. Lewis (2026-08-16)

Citação aleatória (não ligada à data, só rotativa) do mesmo pool de
dados do Gerador C.S. Lewis, com link "mais citações" pro gerador. Baixo
custo se os dados do Gerador forem exportáveis como JSON simples —
verificar formato antes de estimar esforço real.

- [x] Confirmar se o Gerador tem os dados de citação num formato
      reaproveitável (JSON estático seria ideal) (2026-08-20 — 165 citações, extraídas de `lewisQuotes`)
- [x] Espaço pequeno no `ConfigScreen` ou rodapé do dia, não competir
      com o conteúdo litúrgico principal (2026-08-20 — `QuoteCard` no HomeScreen + links Amazon com tag `rilson-20`)

Ver também: `GeradorCSLewis/README.md` (lado recíproco).

---

### 4.8 Rodapé/menu cruzado — cluster "A Biblioteca" (2026-08-16)

Nunca virou item de roadmap em nenhum dos 4 projetos, só foi discutido
em conceito. Rodapé simples com link pros outros 3 (Bíblia na Arte,
Scriptorium, Gerador C.S. Lewis) — ajuda SEO (autoridade cruzada de
domínio) e retenção, sem depender de nenhuma integração de dado, só
link estático. Mesmo item registrado nos outros 3.

- [x] Componente de rodapé "parte da mesma biblioteca" com os 4 links — mobile (2026-08-20 — seção "Biblioteca" no ConfigScreen com Bíblia na Arte, Scriptorium, Gerador C.S. Lewis) e **web** (2026-08-21 — seção "A Biblioteca" no `Footer.tsx`, mesmos 4 links; o checkbox tinha sido marcado feito só com o mobile pronto)
- [x] Correções de conteúdo (2026-08-21): URL do Gerador C.S. Lewis estava errada (`gerador-cs-lewis.vercel.app` → `cslewis.narniano.com`, mobile e web); descrição do Narniano trocada de "A casa de todos os projetos" pra "Portal sobre C.S. Lewis, Nárnia e fé cristã" (mobile e web); ícone do Narniano no mobile trocado de `home-heart` pra `crown` (nenhuma das duas libs de ícone tem leão — coroa referencia Aslan como Rei). No web, o rodapé ficou grande demais com ícone+descrição por link — reduzido pro formato compacto "Conheça também: A · B · C · D" (mesmo espírito do `ClusterFooter.tsx` do Gerador C.S. Lewis), sem ícones; "Lecionário Comum Revisado" também encurtado pra só "Lecionário"

---

## Pipeline de dados (referência)

```
generate-rcl-data.ts       →  cycle-{A,B,C}.json  (datas + referências + coletas)
lookup-bible-text.ts       →  popula textos ARC nos JSONs
generate-devotionals.ts    →  devotionals-{2025..2030}.json
```

Os JSONs são copiados do `lecionario-web/src/data/rcl/` para `lecionario-mobile/src/data/rcl/` e bundlados em ambos apps.

---

## Dependências a instalar (resumo)

| Pacote | Finalidade | Fase |
|---|---|---|
| `expo-notifications` | Notificações locais diárias | 2.1 |
| `expo-sharing` | Compartilhamento nativo | 2.2 |
| `expo-clipboard` | Copiar texto | 2.2 |
| `@sentry/react-native` | Crash reporting | 3.3 |

---

## Débito técnico conhecido

| Item | Localização | Impacto |
|---|---|---|
| **Upgrade Next.js 14 → 16 (breaking)** — achado no audit de segurança (2026-08-21): o `next@14` carrega ~21 advisories high/moderate (DoS, XSS, cache poisoning, SSRF) + `postcss` embutido + `serialize-javascript` via `next-pwa`; nenhum tem patch na linha 14.x. Estão em allowlist no `scripts/audit-allowlist.mjs` (CI passa, mas o débito é real e visível). O upgrade arrasta breaking changes do App Router e possivelmente a troca do `next-pwa` (mantenedor inativo) por solução própria de Service Worker | `lecionario-web/package.json` | Alto em produção self-hosted — priorizar quando houver janela pra testar build + E2E |
| **Upgrade do Expo SDK (54 → próxima major)** — achado no mesmo audit (2026-08-21): `image-size` (2 DoS high) e `postcss` vêm dentro da cadeia do `expo@54`/@expo/cli; só saem com upgrade de SDK. Em allowlist no script de auditoria | `lecionario-mobile/package.json` | Médio — app client-side, superfície de ataque menor que o web self-hosted |
| `getSampleDevotional` agora síncrono mas chamado com `await` | `page.tsx` | Cosmético — funciona |
| RCL JSONs com 2MB+ cada | `src/data/rcl/` | Pode impactar tempo de build/bundle |
| Sem testes para a camada de dados local | `src/lib/*.ts` | Confiança menor em refactors |
| ~~Textos ARC perdidos silenciosamente ao regenerar~~ **resolvido 2026-08-21**: `generate-rcl-data.ts` fazia sobrescrita cega dos `cycle-*.json`, sem preservar `text` já populado por `lookup-bible-text.ts` — foi assim que o commit `817ed23` apagou tudo sem ninguém notar. Consertado com merge-preserve (só reaproveita `text` se `date+type+ref` não mudou) + XML fonte movido de `/tmp` (efêmero) pra `scripts/data/por-almeida.usfx.xml` (no repo) + teste `rcl-bible-text.test.ts` (web e mobile) que quebra o CI se a cobertura de texto cair | `generate-rcl-data.ts`, `lookup-bible-text.ts` | Resolvido — 4613 textos restaurados |
| `getReferenceText()` não resolve refs com dois salmos separados por vírgula (ex. "Salmo 42, 43") | `lookup-bible-text.ts` | 7 leituras (1x/ano, Vigília Pascal do Ciclo C) sem texto — allowlisted no teste de cobertura, não bloqueia CI |
| ~~`eas.yml` rodava build de APK nativo (13min+) em toda mudança de JS/dado~~ **resolvido 2026-08-21**: split em `eas.yml` (só OTA, dispara em qualquer push de `src/**`) e `eas-build.yml` (só APK nativo, dispara só quando `app.config.ts`/`eas.json`/`package.json` mudam, ou manualmente) | `.github/workflows/eas.yml`, `eas-build.yml` | Resolvido — economiza tempo de CI e cota de build da Expo |
| Variáveis `SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_AUTH_TOKEN` passadas como env do job do GitHub Actions não chegam no container remoto onde o Gradle roda de fato — precisam ser [EAS Environment Variables](https://docs.expo.dev/eas/environment-variables/) cadastradas via `eas env:create <environment> --name X --value Y` (feito pro ambiente `preview` em 2026-08-21, causa de um build falhar) | `eas-build.yml` | Resolvido pro `preview`; replicar pro `production` quando esse profile for usado de verdade |

---

## Infraestrutura, segurança e produção (2026-08-08)

Levantamento feito na mesma sessão em que biblia-na-arte e meus-remedios
foram pro VPS Hetzner próprio. Este projeto é, dos quatro (junto com
biblia-na-arte, meus-remedios e scriptorium-divinum), **o mais pronto pra
subir** — já tem Dockerfile, `docker-compose.yml` e CI reais, e o app
principal **não depende de banco** (dados 100% locais/bundlados), então o
deploy não exige Postgres nem migração nenhuma, diferente dos outros três.

Segue o mesmo padrão de fases usado em todos os projetos pessoais —
categorias e justificativa completa em
`hetzner-infra/PADRAO-DE-ENGENHARIA.md`, risco real primeiro, polimento
depois. Numeração renumerada em 2026-08-09 (fusão com o SHIELD) — P2 e
P6 são categorias novas.

### P0 — Segurança

- [x] **Admin panel removido.** Decidido (2026-08-19): não é necessário,
      conteúdo é gerado por script, não editado manualmente. Deletado em
      commit `a3c205a` (2026-07-09); dependências e libs Supabase
      removidas dos `package.json`; `.env.example` e docs atualizados
      (2026-08-19)
- [x] **Headers de segurança no self-host** — CSP, X-Frame-Options,
      X-Content-Type-Options, Referrer-Policy, X-XSS-Protection
      adicionados em `next.config.mjs` (2026-08-19)
- [x] **`npm audit` no CI — feito (2026-08-21)**, mesmo padrão da Bancada/
      biblia-na-arte mas com allowlist (padrão do scriptorium): novo step
      `Audit dependencies` nos jobs web e mobile do `ci.yml`, rodando
      `scripts/audit-allowlist.mjs <web|mobile>` — audita só deps de
      produção (`--omit=dev`) e falha em advisory high/critical fora da
      allowlist. De quebra, `npm audit fix --legacy-peer-deps` aplicado nos
      dois apps antes (lockfiles atualizados, brace-expansion/fast-uri/
      nanoid resolvidos sem breaking change; mobile com override de
      `brace-expansion`; 45+59 testes e `tsc` verdes depois). O que ficou
      em allowlist (só resolvem com upgrade breaking de framework):
      web = next/postcss/serialize-javascript (Next.js 14→16), mobile =
      image-size/postcss (Expo SDK futuro) — ver débito técnico

### P1 — Infra & Deploy

- [x] Dockerfile multi-stage já existe e é bom (`node:22-alpine`,
      usuário não-root, `next build` standalone)
- [x] `docker-compose.yml` já existe na raiz do monorepo
- [x] **Remover as env vars `NEXT_PUBLIC_SUPABASE_*` do compose** (Concluído em 2026-08-14: variáveis obsoletas do Supabase removidas de `docker-compose.yml`, já que a base de código do web não referencia mais o Supabase).
- [x] Registrado em `hetzner-infra/` — já no ar em
      `lecionario.narniano.com`
- [x] Como não precisa de banco, este foi o deploy mais simples dos
      quatro — só o container web atrás do Traefik

### P2 — Saúde & Resiliência

- [x] **ErrorBoundary em todos os componentes críticos (2026-08-21)** —
      `LecionaryErrorBoundary` wrapping `ReadingsSection`, `PrayerSection`,
      `CollectSection`, `MeditationSection` em `page.tsx`. App não crasha
      totalmente se um widget falhar.
- [x] **Prefetch de datas adjacentes (2026-08-21)** — `router.prefetch`
      para ±3 dias no `useEffect`, navegação offline sem flash de loading
- [~] Comportamento de SIGTERM/restart do container — Next.js não tem
      health check no mesmo sentido de uma API tradicional, não é
      prioridade

### P3 — CI/CD

- [x] `ci.yml` já roda TypeScript, ESLint, Prettier e testes (Vitest) pro web **e** pro mobile em cada push/PR.
- [x] Já builda e publica imagem Docker no GHCR em cada tag `v*`.
- [x] **CI e push do Docker corrigidos (2026-08-14).** Resolvido o erro de push para o GHCR (`denied: installation not allowed to Create organization package`) ajustando as permissões do workflow e o escopo da imagem no GitHub para `github.repository_owner`.
- [ ] CI/CD do mobile via EAS Build — já está na Fase 3.4 deste
      roadmap, ainda não feito

### P4 — Testes

- [x] **56 testes mobile** (81% stmts, 100% funcs), **42 testes web** (motor litúrgico + utils)
- [x] **1 teste E2E Playwright (offline)** — `e2e/offline.spec.ts` (2026-08-21):
      sobe PWA, força modo offline via `context.setOffline(true)`,
      navega entre datas, confirma que leituras carregam sem rede.
      Usa `launchPersistentContext` pra persistir o Service Worker entre passos
- [x] **Teste de cobertura de textos bíblicos** — `rcl-bible-text.test.ts`
      quebra o CI se a cobertura de `text` cair abaixo do esperado

### Identidade aplicada aqui (2026-08-15, revisado)

> Fonte: `Identidade visual geral.md` e `Identidade Visual - Guia Técnico
> (Código).md` no vault. **Achado ao conferir o ícone real (2026-08-15):**
> o símbolo (livro + chama irradiando, `Logo.png`) já tem essa cara —
> livro cobre A Biblioteca, chama com raios já gesticula pra Os Céus. E
> `scripts/generate-logos.py` já implementa "um grammar, registros
> diferentes" de verdade (recolore por estação, gera todos os assets
> web/mobile/Android). **Não mexer no símbolo nem no estilo do ícone** —
> plano/geométrico está certo pra legibilidade em tamanho pequeno; a
> textura mais ornamentada (capitular, halo, moldura) é pra superfícies
> maiores (splash, hero, tela cheia), não pro ícone.

- [x] **Cor do Advento corrigida (2026-08-15)**: era roxo+rosa
      (`#EC4699`/`#C4A4E8`, "Rosa da Esperança" — decisão estética, não
      erro, mas o Rilson preferiu convenção real); agora é azul Sarum
      (`--graca-azul` #4A6FA5) com chama dourada, tradição anglicana/BCP
      1979 que o projeto já segue
- [x] **Paleta de estação unificada com os tokens compartilhados
      (2026-08-15)**: `WEB_PALETTE`/`MOBILE_PALETTE` eram hex soltos e
      **divergentes entre si** (achado real: Quaresma era roxa no web,
      marrom-avermelhada no mobile) — agora os dois usam exatamente os
      mesmos valores, alinhados aos tokens do Design Narniano. Rodado
      `generate-logos.py` de verdade, ícones/manifests/splash das 7
      estações regenerados e conferidos visualmente
- [x] **Capitular implementada nos dois lados (2026-08-15)**: web via
      `.capitular::first-letter` em `MeditationSection.tsx` (substituiu
      uma aspas decorativa simulada); mobile via aproximação nativa
      (RN não tem `::first-letter`/float — primeira letra como `<Text>`
      aninhado maior, mesma função, mecanismo diferente)
- [x] **Easing litúrgico — web (2026-08-15)**: `--ease-liturgico`/`--ease-vela`
      em `tailwind.config.ts`, aplicado nos 3 pontos que mudam de cor por
      estação (`ReadingCard`, `Header`)
- [~] **Easing — mobile: não aplicável, decisão consciente (2026-08-15)**:
      `HomeScreen.tsx` só lê `getThemeForSeason()` uma vez no render, sem
      observador nem transição ao vivo — não existe o momento de troca
      que isso animaria. App também não tem nenhuma lib de animação
      instalada; adicionar uma agora só pra isso seria dependência nativa
      nova sem ganho real, bem na véspera de gerar o APK. Reavaliar só se
      o app ganhar essa transição ao vivo no futuro

**Achado crítico, primeiro build EAS real (2026-08-15):** primeiro APK
gerado crashava na abertura, sempre — "Lecionário apresenta falhas
contínuas". Diagnosticado com `adb logcat` de verdade (não achismo):
`java.lang.NoSuchMethodError` em `expo.modules.kotlin.types.ReturnTypeKt`,
disparado por `FontLoaderModule.kt:98`. Causa raiz: `npm ls expo-font`
mostrou **duas versões** resolvidas — `57.0.1` (via `@expo/vector-icons`)
e `14.0.12` (via `expo@54.0.35`, a versão que o SDK realmente exige,
`~14.0.12`). O `npm install` que rodei mais cedo pra corrigir o lockfile
preencheu a entrada quebrada com `57.0.1` em vez de dedupar pra
`14.0.12` — módulo nativo Kotlin com duas versões JS não convive bem,
resultado é `NoSuchMethodError` num método que só existe numa das duas.
**Corrigido** com `overrides.expo-font: "~14.0.12"` no `package.json`,
forçando dedupe pra uma versão só. `npm ls expo-font` confirma: as duas
dependências agora resolvem pra `14.0.12`. Lição: depois de qualquer
`npm install` num projeto Expo, rodar `npx expo install --check` — ele
teria mostrado o built-in de compatibilidade de SDK que o `npm` sozinho
não sabe calcular.

**Sessão de teste real no aparelho (2026-08-16)** — 9 pontos levantados,
todos investigados no código antes de responder:

- [x] **EAS Update configurado**: `expo-updates` instalado + `eas
      update:configure` rodado — `runtimeVersion` por `appVersion`,
      canais `development`/`preview`/`production` em `eas.json`. A
      partir deste build, ajustes só-JS não precisam mais de build
      nativo completo — `eas update` publica em segundos
- [x] **Fonte do título/menus não batia com o design**: `navText`
      ("Anterior"/"Próximo") não tinha `fontFamily` nenhuma, caía no
      Roboto do sistema. Auditoria completa: **53 `<Text>` no mobile, só
      26 tinham `fontFamily`** — corrigido em 8 arquivos (pior caso:
      `ConfigScreen`, 9 de 12 sem fonte)
- [x] **"Lecionário" ilegível**: achado real, `theme.accentColor` como
      cor do título presumia fundo sempre escuro — Natal/Páscoa
      (dourado) e Epifania/Tempo Comum (sálvia) quase apagavam o texto.
      Criado `getHeaderTextColors(season)` em `lib/theme.ts`, adaptativo
      por estação (preto quente em fundo claro, creme em fundo escuro),
      aplicado em título/dia/ano/navegação/data
- [x] **Toque na data não navegava pro calendário**: era `View` sem
      `onPress`. Agora é `TouchableOpacity` com `navigation.navigate('Calendário')`
- [x] **"Voltar para hoje"**: botão novo no `HomeScreen` (só aparece
      fora do dia atual, volta a data) e no `CalendarScreen` (só aparece
      fora do mês atual, volta o mês)
- [x] **Fontes grandes demais**: `prayerText`/`collectText` em 18px +
      padding empilhado deixavam poucas palavras por linha. Reduzido
      pra 16px/lineHeight 26
- [x] **Ícones de Salmo (coração) e Evangelho (estrela)**: trocados por
      música (Salmos eram cantados) e cruz — nos dois lados (web +
      mobile), inclusive um `text-white` fixo no badge do Evangelho web
      que tinha o mesmo bug de contraste dos outros badges
- [x] **Texto não selecionável**: `selectable` adicionado nos 4
      componentes de conteúdo (Prayer/Meditation/Collect/Reading)
- [x] **"Limpar cache" confuso**: reescrito pra deixar claro que as
      leituras já vêm no app (nada de rede) — é só um cache técnico de
      cálculo, não um download. Renomeado "Limpar dados temporários"
- [x] **Achado extra, não fazia parte dos 9 pontos**: `CalendarScreen`
      (mobile) e `LiturgicalCalendar` (web) tinham **paleta de cor
      própria, nunca sincronizada** com `lib/theme.ts` — Advento
      continuava roxo na legenda de cores mesmo depois de virar azul em
      todo o resto do app. Terceira/quarta fonte de cor duplicada
      encontrada nesta investigação (depois de `theme.ts` x2 e o gerador
      de ícone) — ver item de arquitetura abaixo

**Segunda rodada, adiantado antes do próximo build (2026-08-16, foco
Android — iOS não tocado):**
- [x] **Cores de estação consolidadas**: `CalendarScreen` (mobile) e
      `LiturgicalCalendar` (web) agora **importam** de `lib/theme.ts` em
      vez de manter cópia própria — elimina a causa raiz do bug do
      Advento roxo (não tem mais como divergir, porque não existe mais
      cópia pra divergir). `generate-logos.py` continua com valores
      próprios de propósito — unificar com JSON compartilhado arriscava
      quebrar o Metro bundler bem na véspera do build; documentado como
      pendência de baixo risco, não urgente
- [x] **Densidade de leitura — auditoria completa do mobile**: conferido
      todo `fontSize` do app (14 valores distintos, de 9 a 34px) — os 2
      já corrigidos (`prayerText`/`collectText`) eram os únicos casos
      reais de texto corrido grande demais; resto é cabeçalho/label,
      tamanho correto pro papel. Web fica pendente (não testado nesta
      rodada, foco foi Android)
- [x] **Área de toque — auditoria completa (padrão 48dp)**: achados reais
      abaixo do mínimo — `shareButton` (32×32), `shareDayButton`
      (36×36), `copyButton` (altura 36), `navButton` (44), + os 2 botões
      "Voltar para hoje" novos. Corrigido com `hitSlop` em 8 pontos (não
      muda o visual, só a área clicável — mesmo padrão que já existia
      no `monthButton`)
- [x] **Halo-glow no ícone da vela** (`PrayerSection`) — Design Narniano;
      Android ignora `shadowColor` em `View` (só iOS respeita sombra
      colorida nativa), então é uma camada própria atrás do ícone
      (`rgba(212,160,23,0.25)`, 76×76 atrás do círculo de 56×56), sem
      dependência nova

**Ainda pendente, fica pra depois do build (retomar via `eas update`,
mais rápido agora):**
- [ ] Consolidar `generate-logos.py` (Python) com a fonte JS de cor —
      baixo risco, não urgente, documentado acima
- [ ] Densidade de leitura no **web** — não auditado nesta rodada
- [ ] Mais Design Narniano no resto do app (moldura em mais lugares,
      halo-glow só foi aplicado num ponto)
- [ ] Benchmark de UI/UX contra padrões de mercado — avaliação
      qualitativa feita em conversa, sem checklist formal registrado
- [ ] **iOS não foi tocado em nenhuma das duas rodadas** — safe-area,
      sombra nativa (que se comporta diferente lá) e teste geral ainda
      em aberto, por decisão consciente (foco Android por enquanto)
- [ ] TalkBack/VoiceOver — teste real com leitor de tela ligado, nunca
      feito

**Achado extra, fora do escopo original (2026-08-15):** ao conferir
contraste da capitular, achei que **todo uso de `--dourado` como cor de
texto/ícone no app reprovava WCAG AA** — 12 ocorrências no web (2.0-4.4:1,
mínimo é 4.5:1), e o mesmo padrão em 4 componentes do mobile (Prayer/
Meditation/Collect/ReadingCard, com cores hardcoded próprias, nem
compartilhadas com o web). Incluindo os badges de leitura por estação
(`ReadingCard`), onde texto branco fixo sobre Natal/Páscoa (dourado) e
Epifania/Tempo Comum (sálvia) dava 2.6-3.27:1. Tudo corrigido:
- [x] Web: token novo `--dourado-texto` (fundo escuro) + reuso de
      `--vinho` (fundo claro) nas 12 ocorrências + foreground adaptativo
      por estação nos badges (antes fixo em branco)
- [x] Mobile: mesma lógica, cores próprias corrigidas nos 4 componentes
      devocionais
- [x] Vault (`Identidade Visual - Guia Técnico`) também corrigido, pra
      não repetir o mesmo erro quando Bíblia na Arte/Scriptorium/CS
      Lewis implementarem a capitular
- Verificado com `tsc --noEmit` (limpo nos dois) e `next build` completo
  (web, sucesso) — não é só cálculo teórico de contraste, o código
  compila e builda de verdade

### P5 — Monitoramento & Logs & Logs

- [x] **Uptime Kuma** — implementado (confirmado 2026-08-21). Canal de
      alerta (**Telegram + e-mail**) já configurado centralmente no
      Uptime Kuma do VPS (mesmo usado por bancada, biblia-na-arte e
      scriptorium)
- [~] **Sentry no mobile (`@sentry/react-native`) — INTEGRAÇÃO COMPLETA
      (2026-08-22)**. Projeto criado pelo autor; DSN plugado nas envs EAS
      `EXPO_PUBLIC_SENTRY_DSN` (`preview` e `production`); OTA
      republicado com o DSN embutido (update `01a02798`, canal preview,
      2026-08-22 03:51 — verificado direto no manifest do u.expo.dev);
      eas.yml corrigido pra passar `--environment preview` (sem isso o job
      remoto publicava sem enxergar as env vars — achado verificado com
      export local: a env presente no momento do build aparece no .hbc
      compilado). Source maps no EAS ok (token org usado no build de
      21/08). **Único restante**: validar o primeiro evento chegando em
      Issues — abrir o app no aparelho (OTA aplica sozinho na próxima
      abertura) e conferir o dashboard após qualquer erro real
- [~] **Sentry no web (`@sentry/nextjs`) — INTEGRAÇÃO COMPLETA
      (2026-08-22)**. Projeto renomeado pelo autor pra `lecionario-web`;
      DSN commitado no `docker-compose.yml` (args de build + environment
      de runtime — DSN é credencial pública por design) e Dockerfile com
      `ARG/ENV NEXT_PUBLIC_SENTRY_DSN` nos stages builder e runner;
      deploy VPS já rodou com isso (2026-08-22 03:17, smoke test verde).
      Source maps upload no build docker segue desligado (sem
      SENTRY_AUTH_TOKEN no runner — refinamento futuro se precisar
      simbolizar stack traces de produção). **Único restante**: validar
      primeiro evento em Issues após uso real do site
- DSN é conta pessoal (sentry.io), só o Rilson cria — até lá, `Sentry.init`
  com `enabled: !!dsn` deixa tudo rodando normal sem a chave (mesmo
  padrão usado no meus-remedios)
- [ ] Rotação de log não se aplica do mesmo jeito aqui (Next.js/Vercel-
      style, não processo de longa duração com log em disco) — conferir
      se o log do container no VPS tem algum limite de tamanho mesmo assim

### P6 — Backups & Recuperação

- [ ] Não precisa de banco próprio (dados 100% locais/bundlados) — só o
      código no GitHub já é o "backup" de verdade aqui. Categoria nova,
      mas de baixo risco pra este projeto especificamente

### P7 — UI/UX, acessibilidade e SEO

- [~] **Internacionalização (i18n) — decisão consciente de adiar
      (2026-08-16)**: hoje zero infra (`grep` confirma: sem `i18next`,
      sem `expo-localization`, nenhum arquivo de locale, tudo string PT
      direto no JSX). Comparado ao Meus Remédios (i18n real, pt/en/es
      completo) porque a natureza dos dois projetos é diferente: Meus
      Remédios é interface neutra, tradução é troca de string. Lecionário
      é **100% conteúdo** — Bíblia em Almeida ARC, 2191 devocionais
      gerados em português. Traduzir só a UI sem traduzir o conteúdo
      bíblico/devocional seria teatro, não internacionalização de
      verdade — exigiria trocar a tradução bíblica de base (ESV/KJV em
      inglês, RVR em espanhol) **e regenerar todo o conteúdo devocional**
      por idioma, ordem de grandeza maior que instalar uma lib. Público
      definido (cristão litúrgico brasileiro) já é pequeno de propósito;
      expandir idioma sem expandir conteúdo não resolve nada. **Não
      prioridade agora.** Se um dia fizer sentido, inglês é candidato
      mais natural que espanhol (a tradição RCL/BCP 1979 que o app
      segue é mais comum no mundo anglicano de língua inglesa que no
      Brasil) — mas isso é decisão de expansão estratégica, não
      pendência técnica esquecida
- [x] **SEO do web já implementado**: `lecionario-web/src/app/layout.tsx`
      exporta `metadata` (Next.js App Router) com `openGraph` — mais
      maduro que o padrão estático de index.html, gerado por página.
      `public/robots.txt` também já existe
- [x] **Google Search Console** — verificação de propriedade via
      `metadata.verification.google` (2026-08-22), renderiza a meta
      `google-site-verification`; confirmado no HTML servido
- [x] `sitemap.xml` — RESOLVIDO (2026-08-22) via `app/sitemap.ts` nativo do
      Next.js, sem lib extra. Rotas: `/` (daily) e `/privacidade` (yearly);
      `robots.txt` ganhou linha `Sitemap:` apontando pra URL de produção.
      Achado no caminho: `openGraph.url` do layout apontava pra
      `lecionario.app` (domínio que não é nosso!) — corrigido pra
      `lecionario.narniano.com` com `metadataBase` definido
- [x] Já responsivo (breakpoint 768px, hook `useIsMobile`)
- [x] **Contraste de cor (web + mobile) — resolvido de verdade (2026-08-15)**:
      auditoria real encontrou e corrigiu falha sistêmica de WCAG AA em
      todo uso de dourado como texto/ícone, nos dois lados. Detalhe
      completo na seção "Identidade aplicada aqui" acima
- [x] **Acessibilidade do mobile — contraste + labels feitos (2026-08-15)**:
      auditoria completa de `accessibilityLabel`/`accessibilityRole` em
      todos os componentes com elemento interativo (ver Fase 3.1). Falta
      só o teste real com TalkBack/VoiceOver num aparelho físico — isso
      exige mão humana, não dá pra verificar por código
- [x] **Acessibilidade do web — contraste + aria-label feitos (2026-08-15)**:
      era "nunca foi mencionada"; contraste de cor resolvido, e auditados
      os botões só-com-ícone: `LiturgicalCalendar` (navegação de mês +
      célula de dia, sem `aria-label` nenhum antes) e os 3 botões de
      navegação de `page.tsx` (achado real: `hidden sm:inline` no texto
      removia da árvore de acessibilidade também, não só visualmente —
      no mobile web viravam ícone puro sem nome). Falta navegação por
      teclado (não testada) e teste com leitor de tela de verdade

### P8 — Contato e conformidade legal / LGPD (2026-08-22)

> Motivação: registro do autor — "nem sei se esse site/app está de acordo
> com as políticas de uso e LGPD". O app é offline-first sem backend e sem
> conta de usuário, o que simplifica MUITO a conformidade, mas não a
> anula: Sentry coleta diagnósticos, e a publicação em lojas exige
> política de privacidade formal. **Complemento do autor (2026-08-22):
> registrar também auditoria de conformidade Play Store — ver item
> dedicado abaixo.**

**Regra de contato:** todo lugar que mencionar contato usa
**`lecionario@narniano.com`** — decidido pelo autor em 2026-08-22.

- [x] **Pontos de contato implementados**: rodapé web (mailto discreto sob
      o ©) e seção Sobre do mobile (linha "Contato" com `Linking.openURL`
      mailto). Nenhum outro lugar do código mencionava contato antes —
      grep confirma; ao criar qualquer menção nova, usar esse endereço
- [x] **Política de Privacidade — RESOLVIDO (2026-08-22)**. Página
      `/privacidade` no web (`app/privacidade/page.tsx`, metadata própria
      pra SEO, estilo Narniano com classic-frame) cobrindo tudo que o P8
      exigia: dados locais no aparelho (favoritos/preferências/cache),
      relatórios de erro via Sentry (dados técnicos, sem vínculo com
      identidade pois não há cadastro), links de afiliado Amazon
      (`rilson-20`), seção "o que este serviço não faz" (sem analytics,
      sem anúncios, sem venda de dados), direitos do art. 18 da LGPD e
      contato `lecionario@narniano.com`. Link no rodapé web ao lado do
      contato + linha "Privacidade" na seção Sobre do mobile (abre a
      página no navegador). Falta pra fechar a conformidade: formulários
      das lojas (Data Safety/privacy labels) quando publicar
- [ ] **Auditoria LGPD** — mapear tratamentos: (1) favoritos/preferências =
      dados locais no dispositivo, sem sair dele, base legal = execução de
      serviço pedido pelo usuário; (2) Sentry (quando DSN ativar) =
      diagnóstico técnico, pode conter identificadores de device/IP —
      configurar `beforeSend` scrubbing e declarar na política; (3)
      afiliado Amazon = cookie de indicação, mencionar. Sem cookies de
      rastreamento/analytics hoje; se um dia entrar AdSense (adiado),
      reabrir esse item
- [ ] **Formulário de Segurança de Dados (Data Safety) da Play —
      pré-preenchido (2026-08-22), copiar na hora do cadastro**. Com a
      arquitetura atual do app, as respostas são:
      - O app coleta dados? **Sim** — apenas: *App info and performance →
        Crash logs* e *Diagnostics* (via Sentry: modelo do aparelho,
        versão do SO, stack traces, IP)
      - Os dados são compartilhados com terceiros? **Não**
      - Transmissão segura? **Sim** (HTTPS/TLS)
      - Usuário pode pedir exclusão? **Sim** — via
        `lecionario@narniano.com` (na prática, dados pessoais não saem
        do aparelho dele)
      - **Todos os demais tipos: "Não coletado"** — sem localização,
        financeiro, contatos, fotos, mensagens, histórico, identificadores
        publicitários, nada
      - Apple privacy labels idem, quando houver iOS
- [ ] **Portabilidade de dados (LGPD art. 18, §V) — resolvida por design
      (2026-08-22)**: nenhum dado pessoal é processado em servidor; tudo
      que é do usuário (favoritos, preferências) vive no APARELHO dele,
      sob controle direto. Não há o que exportar/portar enquanto não
      houver conta/servidor. **Reabrir este item** se um dia nascer
      sincronização ou login
- [ ] **Auditoria de conformidade Play Store — pré-publicação
      (2026-08-22)**. Checklist contra as Políticas do Google Play, na
      ordem que o Console cobra:
      1. Política de Privacidade com URL pública ✓ (temos
         `/privacidade` — requisito duro do Play pra TODO app)
      2. Formulário **Segurança de Dados**: declarar coleta de
         "Registros de diagnóstico" (Sentry = crash logs, IDs de
         dispositivo, IP) e nada mais — sem dados pessoais, financeiros
         ou de localização; criptografia em trânsito sim (HTTPS);
         opção de exclusão não se aplica (não há conta)
      3. **Classificação de conteúdo (IARC)**: questionário da Play —
         devocional religioso sem violência/aposta/UCG → expectativa
         "Livre"
      4. **Público-alvo e conteúdo**: marcar 13+ (religião não é
         categoria sensível a menores); NÃO marcar "direcionado a
         crianças"
      5. **Permissões**: revisar manifest — notificações (justificada no
         fluxo de opt-in), sem localização/câmera/contatos/storage
         sensível; permissões de mídia do Expo checar se são só de
         biblioteca para eventual compartilhamento
      6. **Metadados honestos**: título/descrição/screenshots batendo com
         a função real (revisor humano do Play testa o app)
      7. **Faixa de teste** antes da produção: internal/closed testing
         com alguns usuários reais por alguns dias — reduz risco de
         rejection e pega crash via Sentry com DSN já plugado
      8. LGPD sob ótica de controlador: registro das operações é este
         roadmap mesmo; base legal documentada acima; DPO não exigível
         (operação pequena, sem monitoramento sistemático em larga escala)
- [ ] **Termos de uso simples** — opcional nesta fase; pode nascer como
      seção dentro da página de Privacidade. O Play NÃO exige Termos pra
      esta categoria (exige só Política de Privacidade, que já temos)

## L — Lançamento e crescimento (2026-08-08)

Mesmo exercício feito pro meus-remedios ("quanto falta pra milhares de
usuários"), mas a resposta aqui é estruturalmente diferente — o Rilson
já esperava isso, e checagem real confirma: **zero estratégia de
monetização documentada** (diferente do biblia-na-arte, que já tem
AdSense/Amazon Associates planejados desde a concepção) e **público-alvo
muito mais restrito por natureza**.

### Por que o teto é mais baixo, de propósito

- Segue o **calendário litúrgico anglicano/ACNA** (RCL + BCP 1979) —
  escolha pessoal de prática devocional do Rilson (que não é de
  tradição litúrgica), não indica filiação denominacional. É uma
  tradição específica dentro do cristianismo, minoria mesmo dentro do
  protestantismo brasileiro (que é majoritariamente
  evangélico/pentecostal, não litúrgico). O público real é a
  interseção de "cristão praticante" + "tradição litúrgica" +
  "português" — bem menor que "quem toma remédio" (público do
  meus-remedios, universal)
- Isso não é defeito — é o propósito do projeto. Não faz sentido forçar
  "milhares de usuários" num app que existe pra servir uma tradição
  específica bem, não pra maximizar instalação
- **Estimativa de potencial (2026-08-15, teto plausível, não medição
  real):** cristãos litúrgicos praticantes no Brasil (anglicanos,
  luteranos, presbiterianos/reformados de linha mais litúrgica,
  metodistas) somam uma fração pequena do protestantismo brasileiro —
  ordem de grandeza de dezenas de milhares de praticantes reais, não
  milhões. Sucesso aqui é capturar algumas centenas a poucos milhares
  de usuários **ativos e fiéis** desse recorte, não uma fatia de
  mercado grande — já seria um resultado excelente pro propósito do
  projeto.

### O que muda no plano, então

- **Publicação web**: já é PWA funcional, sem fricção de loja — a
  distribuição real já está no ar (`lecionario.narniano.com` +
  Vercel), sem depender de review de app store pra alcançar gente
- **Publicação mobile**: `DEPLOY.md` já documenta o comando
  (`eas submit --platform android`), mas **não há confirmação de que já
  foi rodado de verdade** — conferir antes de assumir que está
  publicado. **Preferência do autor (2026-08-21): atualizações do app
  SEMPRE via `eas update` (OTA, segundos); novo APK/build nativo só
  quando estritamente necessário** (mudança nativa, ícone, permissão,
  versão de SDK). Tudo que é JS/dado já roda por OTA — ver split
  `eas.yml`/`eas-build.yml` no débito técnico resolvido
- **Monetização — decisão tomada em 2026-08-21** (deixou de ser "não
  mapeada"): monetizar por todas as formas que não sejam anúncio,
  anúncio (AdSense no web, AdMob no mobile) fica adiado pro futuro, não
  descartado — mas não é prioridade agora, e segue a mesma reserva já
  documentada acima (não amarrado ao conteúdo litúrgico/devocional em
  si, se algum dia acontecer).
  - [~] **Doação voluntária (Pix/link) — FASE 1 IMPLEMENTADA (2026-08-22)**.
        Continua o caminho mais coerente com o propósito e a audiência
        (comunidade religiosa, não consumidor de app comum) — "quem usa
        sustenta o projeto", sem paywall no conteúdo em si.
        **Implementado**: página `/apoiar` no web (QR Pix estático gerado
        localmente pelo padrão EMV/BR Code do Bacen com CRC16-CCITT
        testado, 6 testes; botão copia-e-cola; estilo classic-frame) +
        link "Apoie o projeto" no rodapé + entrada no sitemap. Mobile:
        linha "Apoie o projeto" na seção Sobre do ConfigScreen que copia
        o código Pix direto pra área de transferência (expo-clipboard,
        funciona offline). Gerador duplicado web/mobile de propósito
        (sem pacote compartilhado) com teste de sincronia entre os dois.
        **DADOS FINAIS CONFIRMADOS PELO AUTOR (2026-08-22)** — chave
        `lecionario@narniano.com` cadastrada na conta pessoal dele e
        **JÁ REGISTRADA NO BANCO** (confirmado pelo autor no mesmo dia —
        o QR/copia-e-cola está apto a receber de verdade)
        **Processo de decisão do nome do recebedor** (documentado pra
        não esquecer o porquê):
        1. O nome que aparece pra quem doa NÃO vem da chave nem do QR —
           vem do titular da CONTA registrado no DICT do Bacen. Chave
           nova ≠ identidade nova; não existe "chave no nome Lecionário"
           numa conta pessoa física.
        2. Pra exibir "Lecionário" como recebedor seria preciso CNPJ
           (caminho acessível: MEI + conta PJ) e migrar as chaves pra
           essa conta. Decisão: COMEÇAR NA PESSOA FÍSICA mesmo — custo
           zero, dinheiro chega igual, e pra audiência religiosa/
           comunitária "apoie o mantenedor" é normal e humaniza. A UI já
           é transparente: a página mostra "Recebedor: Rilson Joás".
           Se um dia o volume justificar, abre o MEI e troca só a chave
           no `PIX_CONFIG` dos dois apps + republica.
        3. Detalhe técnico: o campo 59 do BR Code (nosso `receiverName`)
           é cosmético — o banco ignora na confirmação e exibe o titular
           real. Escrever "Lecionário" lá seria enganoso sem efeito.
        4. O padrão EMV limita o campo 59 a 25 caracteres: o nome civil
           completo ("Rilson Joás Guedes Bezerra dos Santos", 37) não
           cabe e truncaria feio no meio ("...Guedes Bezerr"). Decisão:
           forma curta "Rilson Joás Guedes" (18 chars) no payload.
        Fase 2 futura se escalar: Stripe/Mercado Pago pra recorrência +
        recibos
  - [x] **Afiliado (Amazon) — CONCLUÍDO (2026-08-22), forma decidida pelo
        autor: pelas citações de C.S. Lewis.** O QuoteCard diário linka a
        obra-fonte da citação pra busca da Amazon com a tag `rilson-20`
        (reusada do Gerador C.S. Lewis) — o livro citado é exatamente o
        produto afim, sem interromper a experiência devocional. Mobile
        já tinha desde 2026-08-20; web em paridade agora (`LewisQuoteSection`
        na home, abaixo do versículo de II Timóteo, seleção date-seeded
        idêntica garantida por teste, `rel="sponsored"` no link). Lógica
        extraída em `lewis-quotes.ts` (web) com testes: determinismo,
        fórmula do seed igual à do mobile e cobertura do acervo inteiro
        num ano (curiosidade documentada: `yyyyMMdd` não é linear nos
        viradas de mês, então 165 dias corridos NÃO cobrem os 165
        índices — um ano sim). Outros produtos (BCP impresso, bíblias de
        estudo etc.) ficam pra reavaliar se houver tração de cliques —
        nunca como centro da experiência.
- **Aquisição**: diferente de competir em ASO genérico — o canal real
  aqui é comunidade (paróquias, grupos anglicanos/litúrgicos, indicação
  direta), não tráfego de busca de app store

### Resumo honesto

Não é "meus-remedios com público menor" — é um projeto de propósito
diferente, e está tudo bem ter um teto de centenas/poucos milhares de
usuários muito engajados em vez de milhões superficiais. Se algum dia
quiser crescer de propósito, o gargalo real não é técnico (já está no
ar, já é PWA) — é achar e servir bem essa comunidade específica.

### O que reaproveitar de biblia-na-arte/meus-remedios

- O padrão de `docker-compose.yml` + Traefik + `make deploy
  service=<nome>` do `hetzner-infra/` é genérico — só adicionar
  entrada nova, não inventar de novo
- Como não tem banco, não precisa do passo de criar role/usuário
  Postgres que os outros dois exigiram
- `RECUPERACAO.md` e o backup automático do `hetzner-infra/` — só
  adicionar a linha do lecionário quando for pro ar

## Nota: se este projeto ganhar conta de usuário final (2026-08-14)

Decisão registrada no `meus-remedios` (único projeto pessoal com auth
de usuário real hoje): OAuth (Google) como atalho **nunca substitui**
conta local (e-mail/senha) — mantenha os dois, por 3 motivos que valem
pra qualquer projeto, não só aquele: (1) ponto único de falha — se a
conta do provedor for bloqueada, comprometida, ou a pessoa não tiver,
fica sem acesso nenhum; (2) fluxo OAuth mobile depende de deep link +
Custom Tabs + `Promise` resolvendo certo — classe de bug inteira que
conta local não tem (achado real: `meus-remedios/README.md`, seção
"Decisão: Google OAuth + conta local"); (3) App Store exige "Entrar
com Apple" se você oferece "Entrar com Google" (Guideline 4.8) — "só
Google" não é viável em iOS de qualquer forma.

---

## Backlog de Produto — Issues e Bugs (levantamento 2026-08-21)

> Levantamento feito pelo Rilson ao usar o produto de verdade — web e mobile.
> Organizado por gravidade.
>
> **Auditoria de código (2026-08-21):** todos os itens abaixo foram checados
> contra o código e **confirmados ainda não implementados** — exceto o
> pre-commit hook (resolvido acima, causa raiz = erros de ESLint do logger).
> Evidências: zero matches de favoritos no web (`grep -ri favorit src/`),
> sem botão "Hoje" no `page.tsx`, capitular web com `--vinho` fixo e sem
> regra `.dark` em `globals.css`, capitular mobile com `#4B2E39` hardcoded,
> badges do `ReadingCard` mobile com cor fixa por tipo (não branco),
> ConfigScreen na ordem antiga (Aparência → Notificações → Armazenamento →
> Sobre → Biblioteca) com "Limpar dados temporários" ainda presente, sem
> `sitemap.xml`, sem step de `npm audit` em nenhum workflow, sem Pix/doação,
> DSN do Sentry só como placeholder no `.env.example`.

### 🔴 Crítico — bloqueios de uso

- [x] **pre-commit hook falhando — RESOLVIDO (2026-08-21)**. Causa raiz
      diagnosticada: o hook roda `cd lecionario-web && npx lint-staged` e o
      `eslint --fix` falhava nos 6 erros `@typescript-eslint/no-explicit-any`
      de `src/lib/logger.ts` — os mesmos erros que quebravam o CI. Corrigido:
      tipos trocados pra `unknown`/`Record<string, unknown>` com narrowing
      `instanceof Error`. Lint limpo (0 erros), `tsc` limpo, 45 testes
      passando, `lint-staged` reproduzido e validado com exit 0

### 🟠 Grave — UX quebrada

- [x] **"Voltar para Hoje" no web — RESOLVIDO (2026-08-21), com revisão
      do autor**. Primeira versão (botão outline à direita da barra) foi
      reprovada no teste real: desconectada do cluster de navegação e
      espremida no mobile. Versão final, decisão de UX registrada:
      **ações de navegação pertencem ao cluster da data; ações de
      conteúdo (favoritar/compartilhar) ficam na página**. Ficou como
      link discreto SEM borda sob a data ("✓ Voltar para hoje", caps
      espaçadas, cor accent), dentro do bloco central `< | data | >`,
      renderizado só quando a data ≠ hoje — compacto no mobile,
      elegante no desktop, sem órfãos na barra
- [x] **Favoritar existe só no mobile, não no web — RESOLVIDO
      (2026-08-21)**. `FavoritesContext` web (`src/contexts/`, paridade de
      API com o mobile: `favorites`/`toggleFavorite`/`isFavorite`),
      persistência em `localStorage` (chave `lecionario:favorites`),
      hidratação pós-mount pra não divergir do SSR. UI: botão
      "Favoritar este dia"/"Favoritado" (coração, vermelho preenchido
      quando ativo) ao lado do compartilhar na seção de boas-vindas +
      seção "Dias Favoritados" com chips clicáveis (mais recente primeiro,
      chip do dia atual destacado), só aparece quando há favoritos.
      Provider ligado em `providers.tsx`. Fora do escopo desta rodada:
      aba/tab dedicada de favoritos como no CalendarScreen mobile
- [x] **Botões de favoritar e compartilhar no mobile empurram o nome do
      app para a esquerda — RESOLVIDO (2026-08-21)**. Saíram do `titleRow`
      e viraram linha própria de pílulas centradas (`actionsRow` com
      `actionPill`: ícone + rótulo "Favoritar"/"Favoritado" e
      "Compartilhar"), logo abaixo do menu `anterior | data | próximo`,
      dentro da banda com véu. Estilo `shareDayButton` removido (código
      morto). Rótulo muda pra "Favoritado" + coração vermelho quando ativo.
      **Restyle do relato de teste real (2026-08-22)**: pílulas outline
      com borda fina sumiam sobre o véu — agora SÓLIDAS com tokens neutros
      do tema (`colors.card` + `colors.text`, adaptativas claro/escuro),
      deliberadamente NÃO acopladas a cor sazonal (critério do autor:
      combinar com todas as épocas); toque ≥40px. **Emenda de tom na
      status bar corrigida**: o `paddingTop: insets.top` migrou do
      container pai pra dentro do bloco tingido — o véu agora cobre desde
      o topo do aparelho, sem faixa crua acima do cabeçalho
- [x] **Tags "Salmo" e "Segunda leitura" ilegíveis no mobile — RESOLVIDO
      (2026-08-21)**. Antes: fundo dourado translúcido fixo (`accent` a 10%)
      + cor de texto escura fixa por tipo, 9px. Agora (`ReadingCard` +
      `getBadgeColors()` em `lib/theme.ts`): fundo sólido = cor primária da
      estação, foreground adaptativo (creme nas escuras, preto quente nas
      claras) — mesmo padrão do web (`--liturgical-primary-foreground`).
      Contraste WCAG AA ≥4.5:1 verificado nas 7 estações. Nota do autor ao
      revisar: o verde que ele via ilegível era o do HEADER/FOOTER (item
      🟡 abaixo), não das tags — mas a regra nova das tags ficou, alinhada
      ao que o web já fazia
- [x] **Primeira letra da Meditação (capitular) com cor ruim no modo escuro
      — RESOLVIDO (2026-08-21)**. Causa: `#4B2E39` hardcoded no
      `MeditationSection` mobile (vinho quaresmal sobre card escuro).
      Correção: `ThemeColors` ganhou campo `mode: 'light' | 'dark'` e a
      capitular agora é vinho no claro / `#F5F5F0` no escuro — igual ao
      resto do texto, como pedido. Web não precisou de mudança (não tem
      modo escuro; `--vinho` sobre bege-areia = 9.22:1)
- [x] **Fontes grandes demais nos cards de conteúdo — RESOLVIDO
      (2026-08-21)**. Escala de corpo de texto unificada no web: teto
      `lg:text-xl` (20px) pra todos os cards devocionais. Ofensores
      corrigidos: Oração do Dia (`PrayerSection` ia até `xl:text-3xl` =
      30px — o caso relatado que estragava print/compartilhamento) e
      Coleta (`CollectSection` ia até `md:text-2xl`). Meditação (20px) e
      ReadingCard (18px) já estavam na escala. Títulos display mantidos
      (identidade visual, não são corpo de leitura). Mobile já tinha sido
      auditado em 2026-08-16 (só prayerText/collectText, já corrigidos).
      **Segunda passada, a pedido do autor no teste real (mesmo dia):**
      títulos ainda gigantes + respiro largo demais — h1 do Header caiu de
      `lg:text-6xl` pra `lg:text-5xl` (e padding vertical reduzido),
      "A Liturgia como Tradição" de `lg:text-5xl` pra `lg:text-4xl`,
      "Oração do Dia" de `md:text-5xl` pra `md:text-4xl`, citação final
      perdeu o degrau `xl:text-3xl`, e o ritmo vertical da home baixou de
      `space-y-16/20 · py-12/16` pra `space-y-10/14 · py-8/12`

### 🟡 Melhoria — UX e produto

- [x] **"Conheça também" — design não conversa com o resto do site — RESOLVIDO (2026-08-22)**. Implementado exatamente o modelo aprovado abaixo: rótulo "Conheça também" em caps espaçadas (`text-[10px] font-bold tracking-[0.3em]`, dourado-texto), nav com pares atômicos ornamento+link (`flex items-baseline whitespace-nowrap`, ✦ dourado `mx-2.5` viajando com o link à esquerda), `flex-wrap` + `gap-y-2` + `max-w-md sm:max-w-none mx-auto` (responsivo de verdade — era um `<p>` inline único que estourava em tela estreita), hover underline com offset. Paleta adaptada à sazonalidade: links `text-bege-areia/80`, hover `hover:text-dourado`, separadores `dourado/70`. Copyright desceu pra bloco próprio com `pt-6`. Lint/tsc/testes verdes
- [x] **Verde do Tempo Comum com legibilidade baixa — RESOLVIDO
      (2026-08-21), header e footer**. Medição real (texto creme
      `--bege-areia` / `--dourado-texto` sobre `seasonBrandColors`):
      Tempo Comum/Epifania `#7A9178` = 2.58:1 ❌, Natal/Páscoa ouro
      `#B49A60` = 2.05:1 ❌, Advento azul = 3.86:1 ❌, Pentecostes =
      4.51 ✅, Quaresma = 9.07 ✅. Correção aplicada: verde escurecido
      pra **`#4F6350`** (mesmo hue, 4.91:1 ✅) no web (`seasonBrandColors`)
      e no mobile (`primaryColor`, que também vira fundo do header do
      HomeScreen); no mobile Epifania/Tempo Comum saíram de `LIGHT_SEASONS`
      (agora pedem texto creme como as escuras) e opacidade do texto muted
      subiu 0.80→0.85 (~4.4→5.2:1).       **Follow-up pendente, decisão de marca:
      ouro de Natal/Páscoa (2.05) e azul do Advento (3.86) também reprovam
      como fundo sob texto claro no web** — escurecer os tokens muda a
      identidade visual dessas estações; decidir entre escurecer, sobrepor
      camada escura no Header/Footer ou trocar cor do texto por estação.
      Análise feita com o autor (2026-08-21): trocar só a cor do texto NÃO
      resolve as duas — branco puro no ouro dá 2.72:1 (continua reprovado;
      só texto escuro funciona, 6.25:1) e texto escuro no azul dá 3.33:1
      (piora; lá só branco puro passa, 5.10:1). Ou seja, exigiria uma regra
      diferente por estação e quebraria a paleta creme.
- [x] **Camada escura implementada nos dois lados (2026-08-21)** — decisão
      do autor: véu `rgba(0,0,0,0.4)` sobre a cor de marca, mesma
      matemática no web e no mobile pra garantir paridade de cores entre
      plataformas. **Web**: `Header.tsx` (div absoluta `bg-black/40`;
      gradiente decorativo de topo reduzido de `/40` pra `/20` pra não
      empilhar escurecimento) e `Footer.tsx` (mesma div; container ganhou
      `relative z-10` pra ficar acima do véu — necessário porque o
      `.texture-leather` já usa `background-image` e um gradiente inline
      destruiria a textura). **Mobile**: banda superior do `HomeScreen`
      (header + navBar + "Voltar para hoje" + banner offline) embrulhada em
      `topTintedZone` com véu absoluto — escopo deliberadamente limitado à
      banda superior porque o fundo sazonal se estende por toda a tela
      atrás dos cards, e escurecer tudo iria além do combinado. Com o véu,
      TODAS as 7 estações passam AA sob texto claro (pior caso ouro
      natalino: bege 4.91 / título 5.66; melhor caso Quaresma: 12+);
      `getHeaderTextColors()` virou incondicional-clara (sem ramificação
      por estação), e `LIGHT_SEASONS`/`isLightSeason` restaram só pros
      badges (fora do véu).       Intencionalmente SEM camada: theme-color do
      browser (hue da marca puro), legenda de cores do calendário (swatches)
      e badges. Validado com lint/tsc/testes nos dois apps (45 web, 59 mobile)
- [x] **Ícones/logos sazonais sincronizados com o verde novo (2026-08-21,
      mesmo dia)** — achado do autor ao conferir no localhost: os PNGs
      gerados ainda usavam o sálvia antigo. Atualizado `WEB_PALETTE` no
      `generate-logos.py` (epiphany/ordinary → `#4F6350`; ícone é marca,
      não recebe véu) e regenerado tudo: logos web/mobile das duas estações
      verdes, 7 manifests sazonais e assets Android. Só os arquivos das
      estações verdes mudaram — troca cirúrgica confirmada no git status.
      Pendência remanescente (baixa): consolidar a paleta duplicada entre
      Python e JS numa fonte única compartilhada
      Pendência relacionada: regenerar ícones sazonais no
      `generate-logos.py` (ainda usa o sálvia antigo) ou consolidar paleta
- [ ] **"Tradição e Devoção" como lema** — avaliar se deve aparecer em outros lugares além de onde já está (splash, about?). Decisão de produto, não de engenharia.
- [x] **Botão de compartilhar em excesso na página inicial — RESOLVIDO
      (2026-08-22)**. Padrão final: **1 ação de copiar por card, centrada
      no rodapé** (posição ajustada pelo autor durante o teste: centrado,
      como sempre foi no card de Oração — não canto inferior direito como
      na proposta original). Web: `ReadingCard` migrou o copiar do header
      (ao lado do badge) pro rodapé centralizado; `PrayerSection` mantém
      cópia centrada; "Compartilhar este dia" segue único na seção de
      boas-vindas junto do Favoritar. Mobile: `ReadingCard` trocou o
      share-sheet duplicado por cópia direta (`expo-clipboard`, feedback
      "Copiado!" verde), alinhado ao centro abaixo do texto — o share
      do dia continua só nas pílulas do header. Auditoria final: web =
      day-share + 3 cópias (leituras/oração); mobile = day-share + 4
      cópias, zero share repetido
- [x] **Build nativo EAS disparado à toa por config de dev tooling —
      RESOLVIDO (2026-08-22, mesmo dia).** Adicionar a chave "lint-staged"
      ao package.json do mobile disparou um `EAS Build (Android)`
      completo (~17min + cota) sem nenhuma necessidade: nada nativo
      mudou. Correção em `.github/workflows/eas-build.yml`: package.json
      saiu dos gatilhos de push (o sinal de dependência real agora é
      package-lock.json) e um porteiro compara o bloco `dependencies`
      entre commits antes de construir — devDependency/script/config não
      contam. Disparo manual via workflow_dispatch segue sempre
      construindo. Regra operacional completa ("APK ou OTA?") com tabela
      e incidentes registrados agora vive no **DEPLOY.md**. Complemento:
      pre-commit passou a rodar lint-staged nos DOIS apps (antes só web,
      o que deixou passar Prettier quebrado no CI hoje de manhã).
- [x] **Header/footer grandes comendo a área de conteúdo (mobile) —
      RESOLVIDO (2026-08-22), opção 1 aprovada pelo autor: header
      colapsável.** O bloco rico (logo + dia + ano + navegação de data +
      pílulas de ação) agora ROLA junto com o conteúdo; uma barra compacta
      fixa (~48px + status bar, mesma cor da estação + véu) surge ao
      passar de ~100px de scroll com logo mini + nome do dia + ‹ › +
      atalho "hoje" quando fora do dia atual. Ganho de ~330px de conteúdo
      na leitura em telas pequenas. Implementação: Animated.Value +
      interpolate na opacidade, `pointerEvents`/acessibilidade ligados por
      estado ao cruzar o limiar, scroll volta ao topo ao trocar de dia
      (sem isso a barra compacta entregava o novo dia já rolado). Handler
      de scroll é função pura com `setValue` — o construtor
      `Animated.event` roda em render e quebra a regra `react-hooks/refs`
      v7 (mesmo motivo de `scrollY` ser `useMemo`, não `useRef().current`)
- [x] **Busca e Favoritos dentro do calendário mobile — RESOLVIDO (2026-08-22)**.
      Viraram telas próprias (`SearchScreen`, `FavoritesScreen`) e tabs
      de verdade na barra inferior, que agora tem 5 ícones: Hoje,
      Calendário, Busca, Favoritos, Config. Legendas removidas — só
      ícones (decisão do autor), com `tabBarAccessibilityLabel`
      preservando o leitor de tela. Calendário voltou a ser calendário
      puro (tabRow interno e busca inline removidos). Deep links
      `lecionario://busca` e `//favoritos` registrados
- [x] **Ordem das Configurações + remover "Limpar dados temporários" —
      RESOLVIDO (2026-08-22)**. Ordem nova conforme proposta do autor:
      (1) Notificações com horário personalizado, (2) Aparência
      (tema+fonte), (3) Biblioteca, (4) Sobre. Seção "Armazenamento"
      inteira removida junto com `handleClearCache`/estado/import de
      `clearCache` — o cache técnico se recalcula sozinho e o botão só
      gerava dúvida; a lib continua existindo pra uso interno
- [x] **Favicons da Biblioteca em formato circular — RESOLVIDO (2026-08-22)**.
      Baixados os favicons reais dos 4 projetos (apple-touch-icon/Lewis.png,
      128–192px) pra `src/assets/projects/` e renderizados como círculos
      28px no lugar dos ícones genéricos do Material. ConfigScreen entrou
      no override ESLint de `no-require-imports` (mapa de asset por chave,
      mesmo padrão das logos sazonais).
- [x] **Seção "Sobre" no app — remover "Dados litúrgicos calculados
      localmente" — RESOLVIDO (2026-08-22)**: linha removida; Sobre ficou
      Lecionário/versão → Ciclo Litúrgico → Apoie o projeto → Privacidade
      → Contato.
- [ ] **Login com OAuth Google para sincronizar favoritos** — avaliar: o que seria sincronizado? (favoritos, progresso de leitura, configurações). Seguir o padrão `meus-remedios`: OAuth Google + conta local (não só Google). Decisão de produto antes de implementar.
      🔔 **LEMBRETE PERMANENTE DO AUTOR (reforço 2026-08-22): se login
      entrar UM DIA, a PRIMEIRA tarefa antes do release é reabrir e
      atualizar as políticas — sem exceção.**
      ⚠️ **GATILHO DE CONFORMIDADE (2026-08-22)**: implementar login/sync
      REABRE OBRIGATORIAMENTE, antes de qualquer release com a feature:
      (1) Política de Privacidade (`/privacidade` — hoje diz "sem conta,
      sem dados em servidor"); (2) Formulário Data Safety da Play
      (dados de conta + sincronização passam a existir); (3)
      Portabilidade de dados (item P8 marcado "resolvido por design");
      (4) Auditoria LGPD (base legal muda, passa a haver dado pessoal em
      servidor); (5) nota na tela Sobre do mobile. A política atual é
      verdadeira pra realidade atual — o gatilho garante que não fique
      mentira quando a realidade mudar
- [ ] **Biblioteca: favicons circulares** — estilo mais premium, consistente com o Design Narniano.

### 🔵 Padrão cruzado — ver também

- [x] **`npm audit` no CI** — feito (2026-08-21), ver detalhes na seção
      P0 Segurança acima (script `scripts/audit-allowlist.mjs` + steps no
      `ci.yml`)
- [x] **"Conheça também" / Biblioteca** — lado Lecionário resolvido (2026-08-22): modelo aprovado implementado no `Footer.tsx`, ver item de UX acima. Falta o lado de lá: replicar as melhorias equivalentes no Gerador C.S. Lewis quando esse projeto for tocado (referência agora é dupla: `ClusterFooter.tsx` e o footer do Lecionário).

---

## Terminologia e tradições (2026-08-22, questionamento do autor)

> "Termos como 'Questões para silenciar', 'Oração de Coleta' são realmente
> os termos usados em português pelas comunidades que respeitam o
> calendário litúrgico? Algumas podem gerar atrito com os evangelicais
> mais tradicionais — não que deva ser mudado, mas talvez um plano pra
> deixar as coisas mais claras."

### Diagnóstico por termo

| Termo atual | Status | Risco |
|---|---|---|
| Coleta / Oração da Coleta | **Autêntico** — termo consagrado (BCP em PT, missais, liturgia anglicana/luterana; "coleta" = oração que recolhe as intenções do dia) | Baixo entre litúrgicos; soa "católico" só para quem nunca viu livro de orações |
| Lectio Divina | Autêntico e milenar (séc. III–VI); prática adotada também por evangélicos contemplativos | Médio — nome latino pode soar distante; já mitigado pelo subtítulo "Estações da Palavra" |
| Questões para silenciar | **Invenção do app** — não é termo tradicional | Alto relativo: "silenciar" como verbo de prática espiritual soa novo/místico para o evangelicalismo tradicional; "questões" é formal demais |
| Ano Litúrgico, Tempo Comum, Advento, Quaresma etc. | Padrão interdenominacional | Baixo |

### Plano combinado (fase 1 barata → fase 2 com evidência)

1. **NÃO renomear os termos centrais autênticos** (Coleta, Lectio Divina,
   Ano Litúrgico): eles SÃO o diferencial de credibilidade do produto
   para o público litúrgico. Renomear seria apagar a identidade.
2. **Subtítulos descritivos em todas as seções** (padrão já existente:
   "Meditação — Reflexão e Interiorização"): garantir um pra cada card
   traduzindo o termo técnico pra linguagem universal. Ex.: Coleta →
   "A oração que resume o dia"; Lectio Divina → "Leitura orante das
   Escrituras".
3. **Glossário inline**: termos técnicos com ícone ⓘ tocável abrindo
   mini-explicação (reusar o padrão visual do modal Pix). Fase 1 cobre
   5–7 termos-chave.
4. **"Questões para silenciar" → candidato a revisão com dados**: testar
   alternativas ("Perguntas para refletir", "Para refletir em silêncio")
   com 3–5 usuários reais de tradições diferentes antes de trocar.
5. **Seção "Como usar"** (Sobre ou onboarding 1x explicando a estrutura
   do dia devocional: leituras → coleta → oração → meditação).

- [x] Fase 1 — FEITA (2026-08-22, aprovação do autor no mesmo dia):
      "Questões para Silenciar" → **"Perguntas para Refletir"** (decisão
      do autor entre as alternativas) nos dois apps; glossário inline
      ⓘ com modal temático (reusa padrão visual do modal de doação)
      cobrindo Coleta, Lectio Divina, Oração do Dia e Perguntas — em
      `glossary.ts` + `GlossaryTerm.tsx` (mobile). Subtítulos
      explicativos já existentes mantidos. Web: renomeado; glossário
      ⓘ pendente de paridade.
- [ ] Fase 2: web ganhar o glossário ⓘ + validar rótulos com usuários
      reais de tradições diferentes

---

## Marketing e Distribuição (2026-08-22)

> Monetização decidida em 2026-08-21: doação + afiliado agora, anúncios
> adiados. Teto baixo de propósito não significa público zero — sem
> distribuição nem doação acontece.

### Motor central: a sazonalidade litúrgica É o calendário de marketing

- **Advento 2026 começa em 29/nov** — maior gancho do ano do nicho. Preparar push de divulgação ~2 semanas antes
- Cada estação (Natal → Quaresma → Páscoa → Pentecostes) é campanha de reativação natural: o produto já muda sozinho (pinturas, cores, logo sazonal)
- KPI de hábito: retorno semanal por estação (favoritos + pintura do dia dão razão de voltar)

### Canais

1. Comunidades anglicanas/litúrgicas em português (grupos de paróquias, leitores do BCP) — nicho pequeno, fiel e sub-atendido
2. Instagram devocional cruzando com @artecristadiaria e @narnianoexistencialista (manuais prontos no vault) — mesma audiência de profundidade
3. SEO cauda longa já em curso via sitemap/GSC: "lecionário hoje", "leituras do dia", "devocional advento"
4. Rodapé "A Biblioteca" cruza tráfego entre os 4 sites — adicionar UTMs pra medir o que cada vizinho manda

### Pós-publicação na Play Store

- [ ] **Botão "Baixar no Google Play" no site** — só DEPOIS do app estar
      publicado na loja (2026-08-22, pedido do autor): badge/link de
      download no header ou hero da home e nas páginas institucionais.
      Nada de link morto antes da publicação real. Badge oficial segue
      brand guidelines do Google Play.

### Monetização coerente com o público litúrgico

- Doação: botão discreto, tom de "sustentar o ministério" (nunca paywall) — [ ] implementar botão (decisão tomada em 21/08, ainda não vi implementação no código)
- Afiliado: livros devocionais/litúrgicos na Amazon reusando a tag `rilson-20` do Gerador
