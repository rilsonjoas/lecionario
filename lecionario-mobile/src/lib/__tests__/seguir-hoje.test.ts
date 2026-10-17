import { describe, expect, it } from 'vitest';
import { devePularParaHoje, msAteProximaMeiaNoite } from '../seguir-hoje';

const sabado = new Date(2026, 9, 17, 10, 0); // 17/10/2026 10:00
const domingoDeManha = new Date(2026, 9, 18, 8, 0);

describe('devePularParaHoje', () => {
  it('não pula enquanto ainda é o mesmo dia', () => {
    expect(devePularParaHoje(sabado, '2026-10-17', new Date(2026, 9, 17, 23, 59))).toBe(false);
  });

  it('pula quando o dia virou e a tela estava no "hoje" anterior (o caso do app aberto)', () => {
    expect(devePularParaHoje(sabado, '2026-10-17', domingoDeManha)).toBe(true);
  });

  it('respeita a data que a pessoa escolheu: navegou para outro dia, não pula', () => {
    expect(devePularParaHoje(new Date(2026, 9, 12), '2026-10-17', domingoDeManha)).toBe(false);
    expect(devePularParaHoje(new Date(2026, 9, 20), '2026-10-17', domingoDeManha)).toBe(false);
  });

  it('app esquecido por dias: a tela estava no último "hoje", então pula para o de agora', () => {
    const quartaDeManha = new Date(2026, 9, 21, 7, 0);
    expect(devePularParaHoje(sabado, '2026-10-17', quartaDeManha)).toBe(true);
  });

  it('a hora da data exibida não importa, só o dia', () => {
    expect(devePularParaHoje(new Date(2026, 9, 17, 23, 59), '2026-10-17', domingoDeManha)).toBe(
      true,
    );
  });
});

describe('msAteProximaMeiaNoite', () => {
  it('conta até 00:00:01 do dia seguinte', () => {
    expect(msAteProximaMeiaNoite(new Date(2026, 9, 17, 23, 59, 0))).toBe(61_000);
    expect(msAteProximaMeiaNoite(new Date(2026, 9, 17, 0, 0, 0))).toBe(24 * 3600 * 1000 + 1000);
  });

  it('atravessa fim de mês e de ano', () => {
    expect(msAteProximaMeiaNoite(new Date(2026, 11, 31, 23, 59, 59))).toBe(2_000);
  });
});
