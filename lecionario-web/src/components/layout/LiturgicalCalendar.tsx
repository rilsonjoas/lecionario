'use client';

import { useState } from 'react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { seasonBrandColors as seasonColors } from '@/lib/theme';
import type { LiturgicalSeason } from '@/types';

const seasonLabels: Record<LiturgicalSeason, string> = {
  advent: 'Advento',
  christmas: 'Natal',
  epiphany: 'Epifania',
  lent: 'Quaresma',
  easter: 'Páscoa',
  pentecost: 'Pentecostes',
  ordinary: 'Tempo Comum',
};

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface LiturgicalCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function LiturgicalCalendar({ currentDate, onDateChange }: LiturgicalCalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(startOfMonth(currentDate));

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let cursor = calendarStart;
  while (cursor <= calendarEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return (
    <div className="bg-card border border-accent/20 rounded-xl shadow-lg p-4 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMonth((p: Date) => subMonths(p, 1))}
          className="text-accent hover:text-primary hover:bg-accent/10"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-display text-secondary capitalize">
          {format(viewMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMonth((p: Date) => addMonths(p, 1))}
          className="text-accent hover:text-primary hover:bg-accent/10"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center py-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
              {wd}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {days.map((d) => {
          const info = getLiturgicalDayInfo(d);
          const seasonColor = seasonColors[info.season];
          const inMonth = isSameMonth(d, viewMonth);
          const isToday = isSameDay(d, today);
          const isSelected = isSameDay(d, currentDate);

          return (
            <button
              key={d.toISOString()}
              onClick={() => onDateChange(d)}
              className={`
                relative flex items-center justify-center py-2 text-sm font-body transition-colors
                ${inMonth ? 'text-foreground' : 'text-muted-foreground/30'}
                ${isToday ? 'font-bold' : ''}
                ${isSelected ? 'bg-accent/20 rounded-lg' : 'hover:bg-accent/10 rounded-lg'}
              `}
              title={`${format(d, 'dd/MM/yyyy')} — ${info.dayName}`}
              aria-label={`${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} — ${info.dayName}`}
            >
              <span
                className="absolute top-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: seasonColor }}
              />
              <span>{format(d, 'd')}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-accent/10">
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block mb-2">
          Cores Litúrgicas
        </span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(seasonColors) as LiturgicalSeason[]).map((season) => (
            <div key={season} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: seasonColors[season] }}
              />
              <span className="text-[11px] text-muted-foreground">{seasonLabels[season]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
