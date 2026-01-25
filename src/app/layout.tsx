import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { getLiturgicalSeason } from "@/lib/liturgical-calendar";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Lecionário",
  description: "Devocional diário imersivo baseado no calendário litúrgico.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
