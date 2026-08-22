'use client';

import { useSearchParams } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Botão HOJE do header — componente CLIENTE de propósito: o Header é
 * server component e não re-renderiza na navegação cliente (o botão
 * ficava fantasma depois do clique, report 2026-08-22). Lendo a URL
 * aqui, ele desaparece sozinho quando o dia exibido volta a ser hoje.
 */
export function TodayButton({ todayStr }: { todayStr: string }) {
  const searchParams = useSearchParams();
  const viewedDate = searchParams.get('date');

  // Sem ?date= na URL = estamos em hoje; nada a fazer
  if (!viewedDate || viewedDate === todayStr) return null;

  return (
    <a
      href="/"
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-dourado/40 px-3 py-1 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-dourado-texto transition-colors hover:bg-dourado/15 hover:text-white"
      aria-label="Voltar para hoje"
    >
      <CalendarCheck className="w-3 h-3" />
      Hoje
    </a>
  );
}

export function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd');
}
