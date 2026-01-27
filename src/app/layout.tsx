import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { getLiturgicalSeason } from "@/lib/liturgical-calendar";

const cormorantGaramond = localFont({
  src: "./fonts/CormorantGaramond-Variable.woff2",
  variable: "--font-display",
  display: "swap",
});

const ebGaramond = localFont({
  src: "./fonts/EBGaramond-Variable.woff2",
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7A4E2D",
};

export const metadata: Metadata = {
  title: "Lecionário - Devocional Litúrgico",
  description: "Devocional diário imersivo baseado no calendário litúrgico. Leituras, orações e meditações seguindo o ritmo da Igreja.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lecionário",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lecionario.app",
    title: "Lecionário - Devocional Litúrgico",
    description: "Devocional diário imersivo baseado no calendário litúrgico. Leituras, orações e meditações seguindo o ritmo da Igreja.",
    siteName: "Lecionário",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lecionário - Devocional Litúrgico",
    description: "Devocional diário imersivo baseado no calendário litúrgico.",
  },
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
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
    <html lang="pt-BR" className={`${liturgicalClass}`}>
      <body className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} antialiased`}>
        <ServiceWorkerRegistration />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
