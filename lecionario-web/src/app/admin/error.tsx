'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro no painel admin:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-display text-destructive">Erro no Painel</h1>
        <p className="text-foreground/70 font-body leading-relaxed">
          Ocorreu um erro ao carregar o painel administrativo.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Página Inicial
          </Button>
          <Button onClick={reset}>Tentar Novamente</Button>
        </div>
      </div>
    </div>
  );
}
