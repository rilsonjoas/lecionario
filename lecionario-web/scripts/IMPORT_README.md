# Script de Importação do Lecionário

## Como Usar

### 1. Testar com Dry Run (Recomendado)

Primeiro, teste sem inserir dados no banco:

```bash
bun run scripts/import-lectionary.ts 2026-01-01 2026-01-07 --dry-run
```

### 2. Importar uma Semana

```bash
bun run scripts/import-lectionary.ts 2026-01-01 2026-01-07
```

### 3. Importar um Mês

```bash
bun run scripts/import-lectionary.ts 2026-01-01 2026-01-31
```

### 4. Importar um Ano Completo

```bash
bun run scripts/import-lectionary.ts 2026-01-01 2026-12-31
```

### 5. Importar Apenas Domingos

Para economizar tempo e API calls, importe apenas domingos primeiro:

```bash
# Janeiro 2026 - Domingos
bun run scripts/import-lectionary.ts 2026-01-04 2026-01-04  # 1º domingo
bun run scripts/import-lectionary.ts 2026-01-11 2026-01-11  # 2º domingo
bun run scripts/import-lectionary.ts 2026-01-18 2026-01-18  # 3º domingo
bun run scripts/import-lectionary.ts 2026-01-25 2026-01-25  # 4º domingo
```

## O que o Script Faz

1. **Busca dados do LectServe API**
   - Referências bíblicas para cada dia
   - Informações litúrgicas (tempo, ciclo)

2. **Busca textos em português**
   - Tenta buscar da Bible API (Almeida)
   - Se falhar, insere placeholder para tradução manual

3. **Insere no Supabase**
   - Tabela `readings`
   - Com todas as informações litúrgicas

## Limitações Atuais

- ⚠️ **Textos em inglês**: LectServe retorna referências, mas textos podem estar em inglês
- ⚠️ **Bible API limitada**: Nem todas as referências estão disponíveis
- ⚠️ **Rate limiting**: Script aguarda 2s entre datas para não sobrecarregar APIs

## Próximos Passos

1. **Revisar textos importados**
   ```sql
   SELECT date, reading_type, reference, 
          LEFT(text, 50) as preview 
   FROM readings 
   WHERE date BETWEEN '2026-01-01' AND '2026-01-31'
   ORDER BY date, reading_type;
   ```

2. **Substituir placeholders**
   - Buscar textos que começam com `[Texto bíblico para`
   - Adicionar traduções manualmente ou via outra API

3. **Adicionar orações e meditações**
   - Usar script separado (a criar)

## Troubleshooting

### Erro: "Missing Supabase environment variables"
```bash
# Verifique se .env.local existe e tem as variáveis corretas
cat .env.local
```

### Erro: "new row violates row-level security policy"
```bash
# Execute o SQL de políticas de INSERT
# Veja: supabase/add-insert-policies.sql
```

### Muitas falhas na importação
```bash
# Teste com dry-run primeiro
bun run scripts/import-lectionary.ts 2026-01-25 2026-01-25 --dry-run

# Verifique os logs para ver onde está falhando
```

## Monitoramento

Durante a importação, você verá:

```
📅 Processando 2026-01-25 (Terceiro Domingo após a Epifania)...
   Ciclo: A, Tempo: epiphany
  🌐 Buscando dados do LectServe para 2026-01-25...
  📖 first_reading: Amos 3:1-11
  📖 psalm: Psalm 139:1-16
  📖 second_reading: 1 Corinthians 1:10-17
  📖 gospel: Matthew 4:12-22
  ✅ 4 leituras inseridas com sucesso!
```

## Estimativa de Tempo

- **1 dia**: ~10 segundos (com rate limiting)
- **1 semana**: ~1-2 minutos
- **1 mês**: ~5-10 minutos
- **1 ano**: ~1-2 horas
