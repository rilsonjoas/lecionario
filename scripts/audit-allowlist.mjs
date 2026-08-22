#!/usr/bin/env node
// Auditoria de dependências de PRODUÇÃO com allowlist (mesmo padrão do
// scriptorium-divinum). Falha o CI se sobrar advisory high/critical que
// não esteja na allowlist por app.
//
// Uso: node scripts/audit-allowlist.mjs <web|mobile>

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Allowlist por app. Entradas são NOME DE MÓDULO, não GHSA — os pacotes
// abaixo só têm correção via upgrade breaking de framework, já registrado
// no ROADMAP.md (débito técnico). Advisory em módulo fora da lista = CI vermelho.
const ALLOWLIST = {
  // Resolvidos todos pelo upgrade Next.js 14 -> 16 (breaking):
  // next (21 advisories DoS/XSS/SSRF/cache poisoning), postcss embutido
  // no next, serialize-javascript via next-pwa.
  web: ['next', 'postcss', 'serialize-javascript'],
  // Resolvidos pelo upgrade do Expo SDK (54 -> futuro):
  // image-size e postcss são dependências internas do expo/@expo/cli.
  mobile: ['image-size', 'postcss'],
};

const app = process.argv[2];
if (!app || !ALLOWLIST[app]) {
  console.error('Uso: node scripts/audit-allowlist.mjs <web|mobile>');
  process.exit(2);
}

const result = spawnSync('npm', ['audit', '--omit=dev', '--json'], {
  cwd: join(root, `lecionario-${app}`),
  encoding: 'utf8',
});

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  console.error('Falha ao interpretar a saída do npm audit:', result.stderr?.slice(0, 400));
  process.exit(2);
}

const accepted = new Set(ALLOWLIST[app]);
const remaining = [];
for (const [name, vuln] of Object.entries(report.vulnerabilities ?? {})) {
  // via pode ser: advisory real ({ url, severity, ... }) ou string com o
  // nome de outro pacote vulnerável (cabeça de cadeia, ex. next-pwa ->
  // workbox-*). Só advisories reais contam pra falha — a cadeia inteira
  // some quando a fonte é corrigida ou allowlisted.
  const advisories = (vuln.via ?? []).filter((v) => typeof v === 'object' && v.url);
  if (advisories.length === 0) continue;
  const worst = advisories.some((a) => ['high', 'critical'].includes(a.severity));
  if (worst && !accepted.has(name)) {
    remaining.push({ name, severity: vuln.severity });
  }
}

const meta = report.metadata?.vulnerabilities ?? {};
console.log(
  `[${app}] Auditoria de produção: ${meta.high ?? 0} high, ${meta.moderate ?? 0} moderate ` +
    `(allowlist: ${[...accepted].join(', ') || 'vazia'})`,
);

if (remaining.length > 0) {
  console.error(`\nVulnerabilidades high/critical FORA da allowlist:`);
  for (const r of remaining) console.error(`  - ${r.name} (${r.severity})`);
  console.error('\nCorrija com `npm audit fix` ou adicione à allowlist com justificativa.');
  process.exit(1);
}

console.log('OK — nenhuma vulnerabilidade high/critical fora da allowlist.');
