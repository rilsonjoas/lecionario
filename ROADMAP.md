# Roadmap — Lecionário

Este documento descreve o que falta para o app se tornar maduro, profissional e completo. Cada fase tem critérios claros de "feito" e prioridade baseada no impacto para o usuário final.

---

## Situação atual (atualizado 2026-08-16 — a versão de 28/06 abaixo
ficou desatualizada por quase 2 meses; vários itens listados como
"incompleto" já foram feitos nesse intervalo e não estavam refletidos
aqui, achado ao auditar os roadmaps de todos os projetos)

### O que está funcionando

- Motor litúrgico completo: cálculo de Páscoa, estações, cores, ciclos A/B/C, nomes dos dias em PT-BR
- Dados RCL em JSON para os três ciclos (leituras por data + coletas)
- **Textos bíblicos completos** (Almeida ARC) — 4337 textos inseridos, 0 referências canônicas faltando
- **Devocionais gerados** — 2191 orações + meditações (2025–2030), Tempo Comum dos três ciclos ancorado no RCL real (ver 1.2), demais estações com templates sazonais
- **Conteúdo de Semana Santa** (2026-08-15/16) — Domingo de Ramos,
  Quinta/Sexta-Feira Santa, Sábado Santo, com orações e meditações
  originais pro Tríduo (ver 1.1) — estava listado como ausente na
  versão de 28/06, já não é mais o caso
- App mobile com três telas: Hoje, Calendário Litúrgico, Configurações
- **Dados 100% locais** — Supabase removido do app principal, sem dependência de backend
- Cache offline com AsyncStorage e TTL de 24h
- Temas sazonais (cor de fundo, acento, primária por estação)
- **Logo real + identidade sazonal aplicada** (web e mobile, 2026-08-14/15)
  — ícones, splash screen, favicon, manifests recoloridos por estação
  (ver 1.6/1.7); a versão de 28/06 ainda listava isso como "placeholder"
- **Build mobile corrigido e testado em dispositivo Android físico**
  (2026-08-15/16, `NoSuchMethodError` resolvido — ver 1.3)
- ErrorBoundary global
- CI com TypeScript, ESLint, Prettier e testes (GitHub Actions)

### O que está incompleto ou ausente

- Conteúdo devocional do Tempo Comum: **os três ciclos (A, B, C)
  completos e precisos, ancorados no Próprio real do RCL, sem
  repetição e sem lacuna** (2026-08-16/17/18) — Ciclo A (27 semanas,
  189 dias, Próprios 3-29), Ciclo B (26 semanas, 182 dias, Próprios
  4-29) e Ciclo C (26 semanas, 182 dias, Próprios 4-29), cada um
  validado programaticamente contra suas duas ocorrências reais no
  período gerado (2026/2029, 2024/2027/2030 e 2025/2028
  respectivamente) — zero repetição, zero dia faltando. Esse trabalho
  incluiu descobrir e consertar um bug estrutural na atribuição de
  leituras que afetava os três ciclos, não só o devocional (ver 1.2a).
  Os templates genéricos por estação (Advento, Natal, Epifania,
  Quaresma, Páscoa, Pentecostes) seguem fora do escopo desta rodada
  (ver 1.2)
- Leituras RCL de Natal e Epifania: **três bugs estruturais achados e
  corrigidos (2026-08-18)** ao auditar as demais estações em busca do
  mesmo padrão de erro do Tempo Comum — ver 1.2b
- **iOS nunca testado em dispositivo físico** (foco consciente em Android por enquanto — ver 1.3)
- Notificações push ausentes
- Compartilhamento nativo ausente
- Config screen com apenas limpar cache
- Cobertura de testes baixa (só motor litúrgico)
- Sem crash reporting, sem analytics
- Admin panel depende de Supabase (inativo atualmente)
- Web app ainda não totalmente limpo dos dados antigos — `useEffect`
  async desnecessário, dependência `@supabase/supabase-js` ainda no
  build de produção (ver 1.4)
- Ícone/nome novos exigem um novo build EAS pra valerem no app já
  instalado — o trabalho em si está pronto, falta só empacotar (ver 1.7)

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
- [ ] Revisar/aposentar os templates genéricos por estação assim que a
      cobertura ancorada for completa (hoje ainda são o fallback pra
      Advento, Natal, Epifania, Quaresma, Páscoa e Pentecostes — fora
      do escopo desta rodada, que tratou só do Tempo Comum)
- [ ] Considerar Devocionais Feriados Nacionais (Natal, Ano Novo, Páscoa)

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

- [ ] `page.tsx` — já usa `getSampleDevotional` (agora sync), mas o `useEffect` ainda tem async desnecessário
- [ ] Verificar que todos os componentes consomem dados corretamente com o novo formato RCL (date-based)
- [ ] Remover dependência `@supabase/supabase-js` do build de produção (tree-shake admin)

---

### 1.5 Indicadores de loading

- [ ] Adicionar estado de loading na CalendarScreen enquanto calcula dias do mês
- [ ] Manter loading mínimo de UX: não mostrar conteúdo em flash antes de ter dados

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
- [ ] **Pendente de verdade**: novo build EAS pro ícone/nome valerem
      no app instalado — o app já instalado só atualiza JS via
      `eas update`/mesma rede de dev; ícone nativo exige rebuild
      completo. Fica pra quando fizer sentido publicar uma nova
      versão.

---

## Fase 2 — Features essenciais (v1.1)

*O que transforma o app de utilitário em produto.*

### 2.1 Notificações push diárias

- [ ] Instalar `expo-notifications`
- [ ] Implementar notificação local às 6h com o nome do dia litúrgico e referências
- [ ] Adicionar toggle nas Configurações: ativar/desativar notificações
- [ ] Adicionar seletor de horário (padrão 6h)
- [ ] Solicitar permissão de notificação no primeiro uso, com explicação clara

**Exemplo da notificação:**
```
Título: Quinta após o Pentecostes
Corpo: Rm 8,14-17 · Jo 8,31-47
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

- [ ] **Notificações** — toggle on/off + seletor de horário
- [ ] **Tamanho da fonte** — pequeno / médio / grande
- [ ] **Tema** — claro / escuro / seguir sistema
- [ ] **Sobre** — versão atual, link para repositório, licença

---

### 2.4 Deep links

- [ ] Permitir que a notificação push abra diretamente o devocional do dia ao ser tocada (depende de 2.1)

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

---

### 3.2 Cobertura de testes

- [ ] Testes para `rcl-fetcher.ts` — busca por data, ciclo, texto bíblico
- [ ] Testes para `cache.ts` — TTL expirado, cache miss, clear
- [ ] Testes para `devotional-content.ts` — lookup por data, ano sem dados
- [ ] Testes para `getSampleDevotional` — fallback chain
- [ ] Testes de snapshot para `ReadingCard`, `PrayerSection`, `CollectSection`
- [ ] Meta: 70%+ de cobertura no `src/lib/`

---

### 3.3 Crash reporting

- [ ] Instalar `@sentry/react-native`
- [ ] Inicializar Sentry no `App.tsx` com DSN de produção
- [ ] Configurar source maps no EAS

---

### 3.4 CI/CD para mobile

- [ ] Adicionar job EAS Build no GitHub Actions em push para `main`
- [ ] Adicionar `eas update` para OTA updates

---

### 3.5 Estados de erro com UI dedicada

- [ ] Criar componente `EmptyState` (ícone + título + subtítulo + ação opcional)
- [ ] Criar componente `ErrorState` para falhas (distinto do ErrorBoundary)
- [ ] Adicionar pull-to-refresh com feedback visual

---

## Fase 4 — Features avançadas (v2.0)

### 4.1 Favoritos e marcadores

- [ ] Persistir dias favoritos em AsyncStorage
- [ ] Aba "Favoritos" na CalendarScreen
- [ ] Botão de favoritar no HomeScreen

### 4.2 Busca

- [ ] Busca por referência bíblica (ex: "João 3")
- [ ] Busca por data
- [ ] Busca por palavra-chave nas leituras

### 4.3 Widget (Android 12+ / iOS 14+)

- [ ] Widget de tela inicial com leitura do dia e estação litúrgica
- [ ] Atualização diária automática

### 4.4 Versões bíblicas múltiplas

- [ ] Permitir escolha de tradução (ARC, NVI, NTLH, ACF)
- [ ] Configuração por leitura ou global

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
- [ ] Parser de referência → extrair livro + capítulo do texto livre
      (cuidado com casos como "Gênesis 1:1–2:4", que cruza capítulo)
- [ ] Tabela de tradução nome-do-livro-em-português → `bookSlug` em
      inglês (lista fechada, 66 livros, trabalho de fazer uma vez)
- [ ] Card "Pintura do Dia" — thumbnail + título + artista, toque abre
      o Bíblia na Arte (link externo, sem WebView)

**Decisão de arquitetura, não negociável sem repensar tudo:** Lecionário
é offline-first de propósito — o card **só aparece quando online**
(reaproveitar o `isOffline` que o `HomeScreen` já rastreia) e fica
ausente com graça quando não tem rede. Núcleo do app continua
funcionando 100% sem internet; isso é enriquecimento, não dependência.

Ver também: `biblia-na-arte/docs/ROADMAP.md`, seção "Fase 5 — Produto"
(lado recíproco desta integração).

---

### 4.6 "Leia mais sobre isso" — integração com Scriptorium Divinum (2026-08-16)

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

- [ ] Confirmar se o Gerador tem os dados de citação num formato
      reaproveitável (JSON estático seria ideal)
- [ ] Espaço pequeno no `ConfigScreen` ou rodapé do dia, não competir
      com o conteúdo litúrgico principal

Ver também: `GeradorCSLewis/README.md` (lado recíproco).

---

### 4.8 Rodapé/menu cruzado — cluster "A Biblioteca" (2026-08-16)

Nunca virou item de roadmap em nenhum dos 4 projetos, só foi discutido
em conceito. Rodapé simples com link pros outros 3 (Bíblia na Arte,
Scriptorium, Gerador C.S. Lewis) — ajuda SEO (autoridade cruzada de
domínio) e retenção, sem depender de nenhuma integração de dado, só
link estático. Mesmo item registrado nos outros 3.

- [ ] Componente de rodapé "parte da mesma biblioteca" com os 4 links

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
| `getSampleDevotional` agora síncrono mas chamado com `await` | `page.tsx` | Cosmético — funciona |
| RCL JSONs com 2MB+ cada | `src/data/rcl/` | Pode impactar tempo de build/bundle |
| Admin panel quebrado (Supabase inativo) | `src/app/admin/` | Funcionalidade admin indisponível |
| Devocionais repetem mesma oração 7 dias seguidos fora do Tempo Comum (Advento, Natal, Epifania, Quaresma, Páscoa, Pentecostes) | `generate-devotionals.ts` | Conteúdo pouco variado nessas estações; Tempo Comum dos três ciclos já resolvido (ver 1.2) |
| Sem testes para a camada de dados local | `src/lib/*.ts` | Confiança menor em refactors |

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

- [ ] **Decidir o destino do admin panel.** Hoje ele existe no bundle
      (`src/app/admin/`), depende de Supabase, e está "inativo" (débito
      técnico já listado acima). Duas opções: remover do build de
      produção (já está na Fase 1.4 deste roadmap:
      "Remover dependência `@supabase/supabase-js` do build de
      produção") ou reconstruir com auth própria — mas só faz sentido
      reconstruir se o admin panel for realmente necessário pra alguma
      operação (parece que não, já que o conteúdo é gerado por script,
      não editado manualmente)
- [ ] Headers de segurança no self-host (CSP, HSTS, `X-Frame-Options`) —
      hoje o `next start`/container não define nenhum
- [ ] `npm audit` — não está no `ci.yml` atual, fácil de adicionar

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

- [ ] Não auditado — categoria nova (fusão com o SHIELD, 2026-08-09).
      Next.js não tem `SIGTERM`/health check no mesmo sentido que uma
      API tradicional; vale confirmar como o container reage a restart

### P3 — CI/CD

- [x] `ci.yml` já roda TypeScript, ESLint, Prettier e testes (Vitest) pro web **e** pro mobile em cada push/PR.
- [x] Já builda e publica imagem Docker no GHCR em cada tag `v*`.
- [x] **CI e push do Docker corrigidos (2026-08-14).** Resolvido o erro de push para o GHCR (`denied: installation not allowed to Create organization package`) ajustando as permissões do workflow e o escopo da imagem no GitHub para `github.repository_owner`.
- [ ] CI/CD do mobile via EAS Build — já está na Fase 3.4 deste
      roadmap, ainda não feito

### P4 — Testes

- Cobertura hoje é baixa (só motor litúrgico) — já mapeado na Fase 3.2
  deste roadmap, meta de 70%+ em `src/lib/`. Sem mudança aqui, só
  linkando pro contexto de infra

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

### P5 — Monitoramento & Logs

- [ ] **Uptime Kuma** — ainda não aplicável: o app não está no ar no VPS,
      então não existe monitor pra ele ainda. Assim que o deploy (P1)
      sair, é só adicionar o monitor — o canal de alerta (**Telegram +
      e-mail**) já está configurado centralmente no Uptime Kuma do VPS
      (mesmo usado por bancada, biblia-na-arte e scriptorium), não exige
      nenhuma configuração nova, só cadastrar a URL.
- [ ] **Sentry no mobile (`@sentry/react-native`) — instalado e inicializado (2026-08-14), falta terminar a configuração**: SDK instalado, `Sentry.init` em `App.tsx` (lê `EXPO_PUBLIC_SENTRY_DSN`), raiz embrulhada com `Sentry.wrap(App)`. **Pendente**: criar o DSN no sentry.io, definir `EXPO_PUBLIC_SENTRY_DSN` no build do app e configurar source maps no EAS (Fase 3.3)
- [ ] **Sentry no web (`@sentry/nextjs`) — instalado e inicializado (2026-08-14), falta terminar a configuração**: SDK instalado, arquivos `sentry.client.config.ts`, `sentry.server.config.ts` e `sentry.edge.config.ts` criados, `next.config.mjs` embrulhado com `withSentryConfig` (typecheck passou). **Pendente**: criar o DSN no sentry.io, definir `NEXT_PUBLIC_SENTRY_DSN` no `docker-compose.yml` do deploy e validar que eventos chegam
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
- [ ] `sitemap.xml` — não existe (`app/sitemap.ts` do Next.js resolveria
      isso nativamente, sem lib extra)
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
  publicado
- **Monetização**: não mapeada. Se fizer sentido algum dia, o caminho
  mais coerente com o propósito do projeto não é ads/assinatura
  agressiva — mais provável fazer sentido como doação voluntária
  (Pix/link) do que freemium, dado o perfil da audiência (comunidade
  religiosa, não consumidor de app comum)
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
