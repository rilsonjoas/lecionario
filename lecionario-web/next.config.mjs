import withPWAInit from 'next-pwa';
import { withSentryConfig } from '@sentry/nextjs';

const withPWA = withPWAInit({
  dest: 'public',
  register: false, // Registro manual via componente React
  skipWaiting: true,
  clientsClaim: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      // Cache de páginas HTML - Network First (sempre tenta buscar o mais recente)
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 horas
        },
      },
    },
    {
      // Cache de API LectServe - Cache First (dados mudam raramente)
      urlPattern: /^https:\/\/.*lectserve.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'lectserve-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 horas
        },
      },
    },
    {
      // Cache de fontes - Cache First
      urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
        },
      },
    },
    {
      // Cache de imagens - Cache First
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    {
      // Cache de assets estáticos (JS/CSS) - Stale While Revalidate
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets-cache',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 dias
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://browser.sentry-cdn.com",
              "style-src 'self' 'unsafe-inline'",
              // Pintura do Dia (Bíblia na Arte, 2026-08-23): imagem vem do
              // domínio do site dele (Next.js, public/images), a busca vai
              // direto na API dele — sem isso o navegador bloqueia os dois
              // calados (sem erro visível, só a imagem/card nunca aparece).
              "img-src 'self' data: blob: https://biblianaarte.narniano.com",
              "font-src 'self'",
              "connect-src 'self' https://*.ingest.sentry.io https://api-biblianaarte.narniano.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(withPWA(nextConfig), {
  // Upload de source maps em silêncio — evita logs verbosos no build do CI.
  silent: true,
  // Desabilita o Sentry CLI no build local (sem SENTRY_AUTH_TOKEN definido).
  // Em produção/CI, definir SENTRY_AUTH_TOKEN no ambiente do runner pra ativar.
  disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
});
