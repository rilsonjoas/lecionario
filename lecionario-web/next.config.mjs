import withPWAInit from 'next-pwa';
import { withSentryConfig } from '@sentry/nextjs';

const withPWA = withPWAInit({
  dest: 'public',
  register: false, // Registro manual via componente React
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      // Cache de páginas HTML - Network First (sempre tenta buscar o mais recente)
      urlPattern: /^https?.*\/$/,
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
};

export default withSentryConfig(withPWA(nextConfig), {
  // Upload de source maps em silêncio — evita logs verbosos no build do CI.
  silent: true,
  // Desabilita o Sentry CLI no build local (sem SENTRY_AUTH_TOKEN definido).
  // Em produção/CI, definir SENTRY_AUTH_TOKEN no ambiente do runner pra ativar.
  disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
});
