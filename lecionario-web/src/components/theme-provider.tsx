'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Mesma arquitetura do Gerador C.S. Lewis (referência de madurez do
// cluster): next-themes com estratégia de classe, respeitando o SO por
// padrão e permitindo troca manual no botão do Header.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
