'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { buildPixBrCode, PIX_CONFIG } from '@/lib/pix';

// Parte interativa da doação (fase 1: Pix estático EMV gerado
// localmente, sem intermediário). O server component da página mantém o
// metadata; isto aqui precisa de "use client" por causa do useState.
export function PixDonationCard() {
  const [copied, setCopied] = useState(false);
  const brCode = buildPixBrCode(PIX_CONFIG);

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(brCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-5">
      <h2 className="text-lg md:text-xl font-display text-secondary italic text-center">
        Doe via Pix em segundos
      </h2>

      <div className="bg-white rounded-lg p-4 w-fit mx-auto shadow-md border border-accent/10">
        {/* QR estático EMV (BR Code do Bacen), sem valor fixado */}
        <QRCodeSVG value={brCode} size={180} level="M" />
      </div>
      <p className="text-center text-xs text-muted-foreground -mt-2">
        Escaneie com o app do seu banco — ou copie o código abaixo
      </p>

      <div className="space-y-3 max-w-xl mx-auto">
        <div className="flex items-center gap-2 bg-bege-areia/40 border border-accent/20 rounded-md px-3 py-2">
          <code className="text-xs break-all flex-1 text-foreground/70 select-all">{brCode}</code>
        </div>
        <Button
          onClick={handleCopyKey}
          className="w-full gap-2"
          aria-label={copied ? 'Código Pix copiado' : 'Copiar código Pix'}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copiar código Pix (copia e cola)
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
