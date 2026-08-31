import type { MetadataRoute } from 'next';

// Domínio canônico real do deploy (VPS/Traefik, ver ROADMAP P1) — o
// openGraph do layout apontava errado pra lecionario.app e foi corrigido
// na mesma rodada (2026-08-22).
const BASE_URL = 'https://lecionario.narniano.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/metodo`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/apoiar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
