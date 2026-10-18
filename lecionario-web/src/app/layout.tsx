import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/providers';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { getLiturgicalSeason } from '@/lib/liturgical-calendar';

const cormorantGaramond = localFont({
  src: './fonts/CormorantGaramond-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
});

const ebGaramond = localFont({
  src: './fonts/EBGaramond-Variable.woff2',
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 1.4.4 Resize Text (AA) — `userScalable: false` + `maximumScale: 1`
  // bloqueavam o zoom de pinça, num app cujo propósito é LER TEXTO.
  // Achado 2026-09-25: o mesmo projeto tem 8px e 9px em badges e
  // rótulos (text-[8px] na home, no logo e no DatePicker), então sem
  // zoom não há caminho nenhum para enlarger esse texto. O app mobile
  // nunca bloqueou (não usa allowFontScaling={false} e o scale() já
  // multiplica pelo fator do sistema) — agora o web também não.
  // themeColor era #7C3BED (roxo), que não existe na paleta: quem tem
  // a aba de navegador pinada viava uma cor que não é do Design
  // Narniano. A cor por estação é aplicada em applySeasonBranding().
  themeColor: '#4F6350',
};

export const metadata: Metadata = {
  // Domínio canônico real do deploy (VPS/Traefik) — antes apontava pra
  // lecionario.app, que não é nosso (corrigido 2026-08-22 junto com o
  // sitemap.xml)
  metadataBase: new URL('https://lecionario.narniano.com'),
  title: {
    default: 'Lecionário — Devocional Litúrgico Diário',
    template: '%s — Lecionário',
  },
  description:
    'Devocional diário imersivo baseado no calendário litúrgico cristão e no Lecionário Comum Revisado (RCL). Leituras bíblicas, coletas, orações e meditações.',
  keywords: [
    'lecionário',
    'lecionário comum revisado',
    'RCL',
    'devocional litúrgico',
    'calendário litúrgico',
    'leituras do dia',
    'oração diária',
    'ofício diário',
    'lectio divina',
    'coleta litúrgica',
  ],
  authors: [{ name: 'Lecionário', url: 'https://lecionario.narniano.com' }],
  creator: 'Narniano',
  publisher: 'Narniano',
  category: 'Religion & Spirituality',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lecionário',
  },
  formatDetection: {
    telephone: false,
  },
  // Verificação de propriedade no Google Search Console (2026-08-22)
  verification: {
    google: 'GZKfUeS1__5B7yeJQ0mV3q72MYtwx7mg25uIngyYVME',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://lecionario.narniano.com',
    title: 'Lecionário — Devocional Litúrgico Diário',
    description:
      'Devocional diário imersivo baseado no calendário litúrgico cristão e no Lecionário Comum Revisado (RCL). Leituras bíblicas, coletas, orações e meditações.',
    siteName: 'Lecionário',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Logomarca do Lecionário',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lecionário — Devocional Litúrgico Diário',
    description:
      'Devocional diário imersivo baseado no calendário litúrgico cristão e no Lecionário Comum Revisado (RCL).',
    images: ['/icons/icon-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lecionário',
  url: 'https://lecionario.narniano.com',
  description:
    'Devocional diário imersivo baseado no calendário litúrgico cristão e no Lecionário Comum Revisado (RCL).',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
  },
  inLanguage: 'pt-BR',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine liturgical season on server side for default SSR theme
  const season = getLiturgicalSeason(new Date());
  const liturgicalClass = `season-${season}`;

  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${liturgicalClass}`}>
      <head>
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5482566824255473" />
        <Script
          id="adsense-loader"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5482566824255473"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Opt-out de anúncios automáticos invasivos no nível da página.

            CORREÇÃO 2026-10-18 (mesmo erro e mesma solução do Gerador, commit 7f99adc de
            2026-10-16): um `<script dangerouslySetInnerHTML>` dentro do `<head>` faz o React
            acusar descasamento de hidratação (#418/#423: "Prop `dangerouslySetInnerHTML` did
            not match. Server: \"\"") e remontar a árvore inteira no cliente. Isso NÃO aparecia
            antes porque a CSP bloqueava o AdSense e o Umami em silêncio; ao liberar os dois,
            o erro surgiu (medido: some quando o AdSense é bloqueado, continua se só o Umami é).
            `next/script` é a forma canônica de carregar script de terceiros no App Router.

            Os três scripts (loader do AdSense, este opt-out e o Umami) usam `afterInteractive`:
            medido em navegador real, `beforeInteractive` ainda deslocava o descasamento para o
            JSON-LD, porque o loader do AdSense insere nós no `<head>` antes da hidratação.
            Carregados depois dela, não há descasamento. A ordem loader → push é preservada
            (o push cria a fila `window.adsbygoogle`, que o loader consome ao iniciar). */}
        <Script id="adsense-page-level" strategy="afterInteractive">
          {`(window.adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-5482566824255473",
              enable_page_level_ads: false,
            });`}
        </Script>
        {/* Umami Analytics — cookieless, self-hosted */}
        <Script
          id="umami"
          strategy="afterInteractive"
          src="https://umami.narniano.com/script.js"
          data-website-id="67a850b8-81af-4927-a4af-f55396c35855"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
