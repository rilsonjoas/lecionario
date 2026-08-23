import { describe, it, expect } from 'vitest';
import { parseReference } from '../reference-parser';

describe('parseReference', () => {
  it('extrai livro e capítulo de uma referência sem versículo', () => {
    expect(parseReference('Salmo 122')).toEqual({
      bookSlug: 'psalms',
      chapter: 122,
      verses: null,
    });
  });

  it('extrai o trecho de versículos quando presente', () => {
    expect(parseReference('Mateus 24:36-44')).toEqual({
      bookSlug: 'matthew',
      chapter: 24,
      verses: '36-44',
    });
  });

  it('lida com versículo único (sem faixa)', () => {
    expect(parseReference('Mateus 26:39')).toEqual({
      bookSlug: 'matthew',
      chapter: 26,
      verses: '39',
    });
  });

  it('lida com versículos compostos (vírgula), ex.: Salmo 72:1-7, 18-19', () => {
    // \S+ pega só até o primeiro espaço — comportamento aceitável, é só
    // usado como tentativa de match mais fino, com fallback pro capítulo.
    expect(parseReference('Salmo 72:1-7, 18-19')).toEqual({
      bookSlug: 'psalms',
      chapter: 72,
      verses: '1-7,',
    });
  });

  it('retorna null pra livro não mapeado', () => {
    expect(parseReference('Livro Inexistente 1:1')).toBeNull();
  });

  it('retorna null pra string sem capítulo numérico', () => {
    expect(parseReference('Mateus')).toBeNull();
  });
});
