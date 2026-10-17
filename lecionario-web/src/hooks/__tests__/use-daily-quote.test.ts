import { describe, expect, it } from 'vitest';
import { deveAtualizarCitacao, diaLocal, QUOTE_REFRESH_MS } from '../use-daily-quote';

const manha = new Date(2026, 9, 17, 9, 0, 0);

describe('diaLocal', () => {
  it('formata o dia local com zeros à esquerda', () => {
    expect(diaLocal(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });
});

describe('deveAtualizarCitacao', () => {
  it('busca quando ainda não houve busca bem-sucedida', () => {
    expect(deveAtualizarCitacao(null, manha)).toBe(true);
  });
  it('não busca de novo logo ao voltar no mesmo dia', () => {
    expect(deveAtualizarCitacao({ em: manha.getTime() - 60_000, dia: '2026-10-17' }, manha)).toBe(
      false,
    );
  });
  it('busca quando passou o intervalo mínimo', () => {
    expect(
      deveAtualizarCitacao({ em: manha.getTime() - QUOTE_REFRESH_MS, dia: '2026-10-17' }, manha),
    ).toBe(true);
  });
  it('busca quando o dia mudou, mesmo com poucos minutos de diferença', () => {
    const ultima = { em: new Date(2026, 9, 16, 23, 58).getTime(), dia: '2026-10-16' };
    expect(deveAtualizarCitacao(ultima, new Date(2026, 9, 17, 0, 3))).toBe(true);
  });
  it('aba ou PWA deixado aberto por dias (o caso do bug): atualiza', () => {
    expect(
      deveAtualizarCitacao({ em: new Date(2026, 9, 12, 8, 0).getTime(), dia: '2026-10-12' }, manha),
    ).toBe(true);
  });
});
