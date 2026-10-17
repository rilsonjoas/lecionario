/** Gera a tabela `{data ISO: {season, refs[]}}` consumida pelo Bíblia
 *  na Arte pra ligar a "Pintura do Dia" à leitura litúrgica real E à
 *  estação (ver `biblia-na-arte/server/src/lib/lectionary-refs.ts` e
 *  ROADMAP "Pintura do Dia sumindo em alguns dias + sincronizar..." e
 *  "Afinidade litúrgica da Pintura do Dia", ambos 2026-09-02/03). A
 *  estação entra pra permitir interseccionar o pool com tema
 *  (Natividade/Ressurreição/etc.) e alargar pra "a estação inteira"
 *  quando o pool do dia específico for pequeno demais.
 *
 *  Roda a lógica REAL de calendário litúrgico deste repo
 *  (`getLiturgicalCycle`/`getLiturgicalSeason` + `getRCLReadings`, que
 *  já lida com Páscoa móvel/ciclo A-B-C por ano) em vez de reimplementar
 *  essa conta do lado do Bíblia na Arte — só o RESULTADO é copiado pra
 *  lá.
 *
 *  Uso: `npx tsx scripts/export-daily-refs.ts` grava o arquivo OFICIAL
 *  (`data/daily-readings-refs.json`, versionado); depois copiar pra
 *  `biblia-na-arte/server/src/data/daily-readings-refs.json`. Dois testes
 *  fecham a corrente (2026-10-17, Fase 2 de docs/CONTRATOS no hetzner-infra):
 *  aqui, `daily-refs-table.test.ts` falha se o calendário mudar sem regerar
 *  este arquivo; no Bíblia na Arte, `lectionary-refs-sync.test.ts` falha se a
 *  cópia de lá divergir deste arquivo. Sem pipeline automático de propósito — o calendário litúrgico é fixo,
 *  só precisa rodar de novo se as tabelas do RCL forem estendidas além
 *  de 2030 (domingos) / 2028 (dias de semana). */
import { buildDailyRefsTable } from '../src/lib/daily-refs-table';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const table = buildDailyRefsTable();
const outDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'daily-readings-refs.json');
fs.writeFileSync(outPath, JSON.stringify(table));

console.log(`✅ ${Object.keys(table).length} datas exportadas para ${outPath}`);
console.log('Copiar pra: biblia-na-arte/server/src/data/daily-readings-refs.json');
