
"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date
  onDateChange: (date: Date) => void
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "h-auto flex-col items-center p-2 hover:bg-transparent hover:text-primary group",
            !date && "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-1.5 md:gap-2 text-dourado font-bold text-[8px] md:text-[10px] uppercase tracking-wider md:tracking-widest group-hover:text-accent transition-colors">
            <CalendarIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span>Devocional Diário</span>
          </div>
          <span className="text-secondary font-display text-xs md:text-sm italic border-b border-transparent group-hover:border-accent/50 transition-all">
            {date ? format(date, "d 'de' MMMM, yyyy", { locale: ptBR }) : <span>Escolha uma data</span>}
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
            day_selected: "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            day_today: "bg-accent/20 text-accent-foreground",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
