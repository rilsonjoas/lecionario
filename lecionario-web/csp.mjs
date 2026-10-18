// Content Security Policy do Lecionário, em módulo próprio para poder ser TESTADA
// (src/lib/__tests__/csp.test.ts) e importada pelo next.config.mjs.
//
// Por que existe um teste: esta lista já bloqueou, em silêncio, três coisas legítimas
// (a Pintura do dia em 2026-08-23, a Citação do dia em 2026-09-24, o Umami e o AdSense
// até 2026-10-18). O navegador não mostra erro ao visitante: o card ou a analítica
// simplesmente nunca aparece. Quem acrescenta uma chamada externa nova (script, API,
// imagem, iframe) tem de acrescentar o domínio aqui; o teste confere os já conhecidos e
// o canário do cluster (hetzner-infra) confere que todo script do HTML é permitido.

/** Domínios de terceiros que o Lecionário usa de propósito. Cada um com o motivo. */
export const ORIGENS = {
  sentry: 'https://browser.sentry-cdn.com', // monitoramento de erros (script)
  sentryIngest: 'https://*.ingest.sentry.io', // envio dos erros
  umami: 'https://umami.narniano.com', // analítica sem cookies (script e /api/send)
  adsense: 'https://pagead2.googlesyndication.com', // anúncios (script e pedidos de anúncio)
  adsenseQuadro: 'https://googleads.g.doubleclick.net', // quadro (iframe) onde o anúncio aparece
  adsenseQuadroConteudo: 'https://tpc.googlesyndication.com', // quadro de conteúdo do anúncio
  adsenseQualidade: 'https://*.adtrafficquality.google', // verificação de qualidade de tráfego do AdSense (script e conexão)
  adsenseMedicao: 'https://csi.gstatic.com', // medições de desempenho do AdSense (conexão)
  google: 'https://www.google.com', // quadro de verificação que o AdSense cria dentro da página
  biblianaarteApi: 'https://api-biblianaarte.narniano.com', // Pintura do dia (API)
  biblianaarteSite: 'https://biblianaarte.narniano.com', // imagem da Pintura do dia
  scriptoriumApi: 'https://api-scriptorium.narniano.com', // Citação do dia (API)
};

/** Diretivas da política. Valores em lista para o teste poder conferir cada origem. */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    ORIGENS.sentry,
    ORIGENS.umami,
    ORIGENS.adsense,
    ORIGENS.adsenseQualidade,
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  // Pintura do Dia (Bíblia na Arte, 2026-08-23): imagem vem do domínio do site dele
  // (Next.js, public/images), a busca vai direto na API dele: sem isso o navegador
  // bloqueia os dois calados (sem erro visível, só a imagem/card nunca aparece).
  // O AdSense carrega um pixel de verificação de tráfego (adtrafficquality).
  'img-src': ["'self'", 'data:', 'blob:', ORIGENS.biblianaarteSite, ORIGENS.adsenseQualidade],
  'font-src': ["'self'"],
  // Citação do dia (Scriptorium, 2026-09-24): a busca vai na API do Scriptorium
  // (ADR 001): sem isso o navegador bloqueia o fetch calado e o card da citação nunca
  // aparece (mesmo bug da pintura em 2026-08-23).
  'connect-src': [
    "'self'",
    ORIGENS.sentryIngest,
    ORIGENS.biblianaarteApi,
    ORIGENS.scriptoriumApi,
    ORIGENS.umami,
    ORIGENS.adsense,
    ORIGENS.adsenseQualidade,
    ORIGENS.adsenseMedicao,
  ],
  // Quadros (iframes) que o AdSense cria dentro da página. Sem `frame-src` o navegador usa o
  // `default-src 'self'` e bloqueia o anúncio calado, como as outras vezes.
  'frame-src': [
    ORIGENS.adsenseQuadro,
    ORIGENS.adsenseQuadroConteudo,
    ORIGENS.adsenseQualidade,
    ORIGENS.google,
  ],
  'frame-ancestors': ["'none'"],
};

/** Monta o valor do cabeçalho a partir das diretivas. */
export function buildCsp(diretivas = CSP_DIRECTIVES) {
  return Object.entries(diretivas)
    .map(([nome, valores]) => `${nome} ${valores.join(' ')}`)
    .join('; ');
}
