import { describe, expect, it } from 'vitest';
// Módulo .mjs compartilhado com o next.config.mjs.
import { CSP_DIRECTIVES, ORIGENS, buildCsp } from '../../../csp.mjs';

const diretiva = (nome: string): string[] => (CSP_DIRECTIVES as Record<string, string[]>)[nome];

describe('CSP do Lecionário', () => {
  it('permite o Umami em script-src e connect-src', () => {
    expect(diretiva('script-src')).toContain(ORIGENS.umami);
    expect(diretiva('connect-src')).toContain(ORIGENS.umami);
  });

  it('permite o AdSense em script-src, connect-src e frame-src', () => {
    expect(diretiva('script-src')).toContain(ORIGENS.adsense);
    expect(diretiva('connect-src')).toContain(ORIGENS.adsense);
    expect(diretiva('frame-src')).toContain(ORIGENS.adsenseQuadro);
    expect(diretiva('frame-src')).toContain(ORIGENS.adsenseQuadroConteudo);
  });

  it('permite o pixel de qualidade do AdSense em img-src', () => {
    expect(diretiva('img-src')).toContain(ORIGENS.adsenseQualidade);
  });

  it('permite as APIs do cluster em connect-src', () => {
    expect(diretiva('connect-src')).toContain(ORIGENS.biblianaarteApi);
    expect(diretiva('connect-src')).toContain(ORIGENS.scriptoriumApi);
  });

  it('proíbe embutir o site em outro (frame-ancestors none)', () => {
    expect(diretiva('frame-ancestors')).toEqual(["'none'"]);
  });

  it('serializa uma diretiva por bloco, separadas por ponto e vírgula', () => {
    const cabecalho = buildCsp();
    expect(cabecalho).toContain(`script-src ${diretiva('script-src').join(' ')}`);
    expect(cabecalho.split('; ').length).toBe(Object.keys(CSP_DIRECTIVES).length);
  });
});
