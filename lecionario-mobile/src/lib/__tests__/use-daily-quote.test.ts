import { describe, expect, it } from 'vitest';
import { deveAtualizarCitacao, QUOTE_REFRESH_MS } from '../use-daily-quote';

const manha = new Date(2026, 9, 17, 9, 0, 0); // 17/10/2026 09:00 (hora local)
const dia = '2026-10-17';

describe('deveAtualizarCitacao', () => {
  it('busca quando ainda não houve nenhuma busca bem-sucedida', () => {
    expect(deveAtualizarCitacao(null, manha)).toBe(true);
  });

  it('não busca de novo logo ao voltar ao app no mesmo dia', () => {
    const ultima = { em: manha.getTime() - 60_000, dia };
    expect(deveAtualizarCitacao(ultima, manha)).toBe(false);
  });

  it('busca de novo quando passou o intervalo mínimo, mesmo no mesmo dia', () => {
    const ultima = { em: manha.getTime() - QUOTE_REFRESH_MS, dia };
    expect(deveAtualizarCitacao(ultima, manha)).toBe(true);
  });

  it('busca de novo quando o dia mudou, mesmo que tenham passado só alguns minutos', () => {
    const ultima = { em: new Date(2026, 9, 16, 23, 58).getTime(), dia: '2026-10-16' };
    const depoisDaMeiaNoite = new Date(2026, 9, 17, 0, 3);
    expect(deveAtualizarCitacao(ultima, depoisDaMeiaNoite)).toBe(true);
  });

  it('app deixado aberto por dias (o caso do bug): o dia é outro, então atualiza', () => {
    const ultima = { em: new Date(2026, 9, 12, 8, 0).getTime(), dia: '2026-10-12' };
    expect(deveAtualizarCitacao(ultima, manha)).toBe(true);
  });
});
