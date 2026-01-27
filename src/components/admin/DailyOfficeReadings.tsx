'use client';

import { useEffect, useState } from 'react';
import { getDailyOfficeReadings, type DailyOfficeReading } from '@/lib/lectserve-api';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DailyOfficeReadingsProps {
  date: Date;
}

export function DailyOfficeReadings({ date }: DailyOfficeReadingsProps) {
  const [readings, setReadings] = useState<DailyOfficeReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReadings();
  }, [date]);

  const loadReadings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getDailyOfficeReadings(date);
      setReadings(data);
    } catch (err) {
      setError('Erro ao carregar leituras do Ofício Diário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>{error}</p>
        <button 
          onClick={loadReadings}
          className="mt-4 text-sm text-primary hover:underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!readings) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>Nenhuma leitura disponível para esta data.</p>
      </div>
    );
  }

  const hasMorningPsalms = readings.psalms.morning.length > 0;
  const hasEveningPsalms = readings.psalms.evening.length > 0;
  const hasLessons = readings.lessons.first || readings.lessons.second;

  if (!hasMorningPsalms && !hasEveningPsalms && !hasLessons) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>Nenhuma leitura disponível para esta data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Morning Office */}
      {hasMorningPsalms && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ofício da Manhã</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Salmos</h4>
              <p className="text-foreground">{readings.psalms.morning.join(', ')}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lessons */}
      {hasLessons && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leituras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {readings.lessons.first && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Primeira Leitura</h4>
                <p className="text-foreground">{readings.lessons.first}</p>
              </div>
            )}
            
            {readings.lessons.second && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Segunda Leitura</h4>
                <p className="text-foreground">{readings.lessons.second}</p>
              </div>
            )}
            
            {readings.lessons.gospel && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Evangelho</h4>
                <p className="text-foreground">{readings.lessons.gospel}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Evening Office */}
      {hasEveningPsalms && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ofício da Tarde</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Salmos</h4>
              <p className="text-foreground">{readings.psalms.evening.join(', ')}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Source attribution */}
      <p className="text-xs text-muted-foreground text-center">
        Leituras do Ofício Diário via{' '}
        <a 
          href="https://lectserve.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LectServe
        </a>
        {' '}(ACNA Daily Office Lectionary)
      </p>
    </div>
  );
}
