'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GLOSSARY, type GlossaryTermKey } from '@/lib/glossary';

interface GlossaryTermProps {
  term: GlossaryTermKey;
}

// ⓘ tocável com definição curta de termos litúrgicos — paridade web do
// GlossaryTerm mobile (fase 1 do plano de terminologia, ROADMAP
// 2026-08-22). Dialog no lugar do Modal nativo, mesmo espírito.
export function GlossaryTerm({ term }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[term];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`O que significa ${entry.term}?`}
        // Era um botão com SÓ o ícone de 14px, sem padding: alvo de 14×14
        // px. O AA (2.5.8) pede 24×24 e a NBR 17060 5.1.2.13 pede 44×44
        // (medido 2026-09-25). A caixa vai a 44×44 e a margem negativa
        // devolve os 8px ao layout, para a fileira não andar: o alvo
        // cresce, o desenho não.
        className="-m-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent-texto"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      <DialogContent className="max-w-sm border-accent/25 bg-card text-card-foreground shadow-2xl sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-display italic text-secondary">{entry.term}</DialogTitle>
          <DialogDescription className="pt-2 leading-relaxed text-muted-foreground">
            {entry.definition}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
