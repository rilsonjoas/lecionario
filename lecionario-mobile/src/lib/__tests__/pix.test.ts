import { describe, it, expect } from 'vitest';
import { buildPixBrCode, crc16, PIX_CONFIG } from '../pix';

// Mesma bateria do lecionario-web (implementação duplicada de propósito)
describe('crc16', () => {
  // Vetor de referência do CRC-16/CCITT-FALSE ("123456789" -> 29B1),
  // mesmo algoritmo exigido pelo BR Code do Bacen
  it('calcula CRC16-CCITT-FALSE corretamente', () => {
    expect(crc16('123456789')).toBe('29B1');
  });

  it('retorna sempre 4 dígitos hex maiúsculos', () => {
    expect(crc16('')).toMatch(/^[0-9A-F]{4}$/);
  });
});

describe('buildPixBrCode', () => {
  it('gera payload idêntico ao do web (sincronia entre apps)', () => {
    // Valor capturado da implementação web com a mesma config — quebra
    // se as duas cópias divergirem
    expect(buildPixBrCode(PIX_CONFIG)).toBe(
      '000201262D000Ebr.gov.bcb.pix0117lecionario@narniano.com5204000053039865802BR5912Rilson Joas Guedes6006Recife6304F599',
    );
  });

  it('termina com o CRC e inclui GUI + chave', () => {
    const code = buildPixBrCode(PIX_CONFIG);
    expect(code.slice(-4)).toMatch(/^[0-9A-F]{4}$/);
    expect(code).toContain('br.gov.bcb.pix');
    expect(code).toContain(PIX_CONFIG.key);
  });
});
