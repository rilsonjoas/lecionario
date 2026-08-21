'use client';
import { logger } from '@/lib/logger';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Erro crítico na aplicação:', error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <img
          src="/icons/icon-192x192.png"
          alt="Lecionário"
          width={96}
          height={96}
          className="w-24 h-24 mx-auto rounded-2xl bg-creme p-3 shadow-xl"
        />
        <h1 className="text-3xl font-display text-secondary">Algo deu errado</h1>
        <p className="text-foreground/70 font-body leading-relaxed">
          Não foi possível carregar esta página. Tente novamente ou volte mais tarde.
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
