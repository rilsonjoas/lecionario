'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

// Porta do ModeToggle do Gerador C.S. Lewis, vestido na paleta
// Lecionário (dourado sobre papel escuro).
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Evita mismatch de hidratação: até montar no client, não sabemos o
  // tema resolvido (depende de localStorage/SO).
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={resolvedTheme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={resolvedTheme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dourado/30 bg-preto-ébano/30 text-dourado-texto backdrop-blur-md transition-colors hover:bg-dourado/15 hover:text-white"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  );
}
