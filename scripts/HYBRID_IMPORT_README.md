# Importador Híbrido de Lecionário

## 🎯 O Que Faz

Este script combina **3 fontes diferentes** para garantir cobertura completa:

1. **LectServe** - API para domingos (inglês)
2. **Liturgia.pt** - Scraping para todos os dias (português) ⭐
3. **Bible API** - Textos bíblicos em português

## 🚀 Como Usar

### 1. Teste Primeiro (Dry Run)

```bash
# Testar uma semana sem inserir no banco
bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-07 --dry-run
```

### 2. Importar Período Curto

```bash
# Uma semana
bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-07

# Um mês
bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-31
```

### 3. Importar Ano Completo

```bash
# Ano inteiro (365 dias)
bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-12-31
```

**⏱️ Tempo estimado:** ~2-3 horas para ano completo

## 📊 O Que Esperar

### Saída do Console

```
==================================================================
🌱 IMPORTAÇÃO HÍBRIDA DO LECIONÁRIO
==================================================================

📆 Período: 2026-01-01 → 2026-01-07
🔧 Modo: PRODUÇÃO (inserir no banco)

📡 Fontes:
   1️⃣  LectServe (domingos)
   2️⃣  Liturgia.pt (todos os dias)
   3️⃣  Bible API (textos em português)

==================================================================

📅 2026-01-01 (Primeiro de Janeiro)
   📖 Dia de semana | Ciclo: A | Tempo: christmas
  🇵🇹 Tentando Liturgia.pt...
  ✅ Liturgia.pt: 4 leituras
  📖 Buscando textos em português...
  ✅ 4 leituras inseridas!

📅 2026-01-04 (Segundo Domingo após o Natal)
   🔔 DOMINGO | Ciclo: A | Tempo: christmas
  🌐 Tentando LectServe...
  ✅ LectServe: 4 leituras
  📖 Buscando textos em português...
  ✅ 4 leituras inseridas!
```

### Estatísticas Finais

```
==================================================================
🎉 IMPORTAÇÃO CONCLUÍDA!
==================================================================

📊 Estatísticas:
   Total de dias: 365
   🔔 Domingos: 52
   📖 Dias de semana: 313
   ✅ Sucesso: 350 (95.9%)
   ❌ Falhas: 15

==================================================================
```

## ⚙️ Estratégia de Importação

### Para Domingos (52 dias/ano)
1. Tenta **LectServe** primeiro
2. Se falhar, tenta **Liturgia.pt**
3. Busca textos em português via **Bible API**

### Para Dias de Semana (313 dias/ano)
1. Tenta **Liturgia.pt** diretamente
2. Textos já vêm em português ✅

## 🔧 Configurações

### Rate Limiting
- **Máximo 2 requisições simultâneas**
- **500ms de delay** entre buscas de texto bíblico
- Respeita `robots.txt` dos sites

### Timeout
- **5 segundos** por requisição de texto bíblico
- Evita travamentos em APIs lentas

## ⚠️ Possíveis Problemas

### 1. Liturgia.pt Bloqueou Acesso

**Sintoma:** Muitas falhas consecutivas

**Solução:**
```bash
# Aumentar delay entre requisições
# Editar script: setTimeout(resolve, 2000) em vez de 500
```

### 2. Textos com "[Texto para... - adicionar tradução]"

**Causa:** Bible API não tem essa referência

**Solução:**
```sql
-- Ver quais precisam de tradução manual
SELECT reference, COUNT(*) 
FROM readings 
WHERE translation = 'PENDING'
GROUP BY reference;
```

### 3. Erro "Too Many Requests"

**Solução:** Importar em lotes menores
```bash
# Janeiro
bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-31

# Fevereiro
bun run scripts/import-lectionary-hybrid.ts 2026-02-01 2026-02-28

# etc...
```

## 📋 Checklist de Importação

- [ ] Testar com dry-run primeiro
- [ ] Importar uma semana de teste
- [ ] Verificar dados no Supabase
- [ ] Importar mês completo
- [ ] Verificar taxa de sucesso (>90%)
- [ ] Importar ano completo
- [ ] Revisar textos pendentes
- [ ] Adicionar orações e meditações

## 🎯 Próximos Passos

Após importar as leituras:

1. **Revisar textos pendentes**
   ```sql
   SELECT * FROM readings WHERE translation = 'PENDING' LIMIT 10;
   ```

2. **Adicionar orações** (script separado)

3. **Adicionar meditações** (script separado)

4. **Testar navegação** no app

## 💡 Dicas

- **Comece pequeno**: Teste com 1 semana antes de importar o ano todo
- **Monitore logs**: Veja quais fontes estão funcionando melhor
- **Backup**: Faça backup do Supabase antes de importações grandes
- **Horário**: Rode à noite para evitar sobrecarga nas APIs

## 🆘 Suporte

Se encontrar problemas:

1. Verifique logs do console
2. Teste com `--dry-run`
3. Verifique conexão com Supabase
4. Confirme que as políticas de INSERT estão ativas
