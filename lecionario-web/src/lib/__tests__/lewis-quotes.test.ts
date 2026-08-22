import { describe, it, expect } from 'vitest';
import { format } from 'date-fns';
import { buildAmazonUrl, getDailyQuote, AFFILIATE_TAG } from '../lewis-quotes';
import quotes from '@/data/lewis-quotes.json';

// Mesma bateria do QuoteCard mobile (implementação duplicada de
// propósito) — garante que web e mobile mostram a mesma citação no dia.
describe('getDailyQuote', () => {
  it('seleciona pelo seed yyyyMMdd % tamanho do acervo (fórmula do mobile)', () => {
    const date = new Date(2026, 7, 22);
    const seed = parseInt(format(date, 'yyyyMMdd'), 10);
    expect(getDailyQuote(date)).toBe(quotes[seed % quotes.length]);
  });

  it('é determinístico: mesmo dia, mesma citação', () => {
    const date = new Date(2024, 0, 15);
    expect(getDailyQuote(date)).toEqual(getDailyQuote(new Date(2024, 0, 15)));
  });

  it('todo índice gerado cai dentro do acervo com quote e source', () => {
    for (let d = 0; d < 400; d++) {
      const q = getDailyQuote(new Date(2026, 0, 1 + d));
      expect(q.quote).toBeTruthy();
      expect(q.source).toBeTruthy();
    }
  });

  it('cobre o acervo inteiro ao longo de um ano', () => {
    // yyyyMMdd não é linear nos viradas de mês (31/jan → 1/fev pula o
    // inteiro), então 165 dias corridos NÃO bastam; um ano cobre tudo
    const vistos = new Set<number>();
    for (let d = 0; d < 365; d++) {
      const dia = new Date(2026, 0, 1 + d);
      vistos.add(quotes.indexOf(getDailyQuote(dia)));
    }
    expect(vistos.size).toBe(quotes.length);
  });
});

describe('buildAmazonUrl', () => {
  it('monta URL de busca com a tag de afiliado', () => {
    const url = buildAmazonUrl('Cristianismo Puro e Simples');
    expect(url).toBe(
      `https://www.amazon.com.br/s?k=${encodeURIComponent('Cristianismo Puro e Simples')}&tag=${AFFILIATE_TAG}`,
    );
    expect(url).toContain('tag=rilson-20');
  });
});
