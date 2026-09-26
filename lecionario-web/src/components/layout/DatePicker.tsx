'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'h-auto flex-col items-center p-2 hover:bg-transparent hover:text-primary group',
            !date && 'text-muted-foreground',
          )}
        >
          <div className="flex items-center gap-1.5 md:gap-2 text-vinho dark:text-[hsl(336,28%,78%)] font-bold text-[11px] md:text-xs uppercase tracking-wider md:tracking-widest group-hover:text-accent-texto transition-colors">
            <CalendarIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span>Devocional Diário</span>
          </div>
          <span className="text-secondary font-display text-xs md:text-sm italic border-b border-transparent group-hover:border-accent/50 transition-all">
            {date ? (
              format(date, "d 'de' MMMM, yyyy", { locale: ptBR })
            ) : (
              <span>Escolha uma data</span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => day && onDateChange(day)}
          initialFocus
          locale={ptBR}
          className="rounded-md border bg-card text-card-foreground shadow-sm"
          classNames={{
            day_selected:
              'bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            // Era `text-accent-foreground` sobre `bg-accent/20`. No escuro
            // o --accent-foreground é quase preto (30 10% 8%) e o /20
            // deixava o card em ~#3A352C: 1.62:1 — o dia de hoje ficava
            // ilegível justamente no tema escuro. `text-foreground`
            // acompanha o tema (grafite no claro, pergaminho no escuro)
            // e o tom do /20 continua marcando qual dia é hoje.
            day_today: 'bg-accent/20 text-foreground font-semibold',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
