
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { DayEditor } from '@/components/admin/DayEditor';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  
  // Dashboard state
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date()); // Start at current month
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [populatedDays, setPopulatedDays] = useState<string[]>([]);
  const [stats, setStats] = useState({ totalReadings: 0, totalPrayers: 0, totalCollects: 0 });

  useEffect(() => {
    // Check auth status
    const checkUser = async () => {
      try {
        console.log('Checking auth session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        console.log('Session found:', !!session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user ?? null);
      setLoading(false); // Ensure loading is off on change
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchMonthData(selectedMonth);
    }
  }, [user, selectedMonth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });
    if (error) {
      alert('Erro ao enviar link: ' + error.message);
    } else {
      setMagicLinkSent(true);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchStats = async () => {
    const { count: readings } = await supabase.from('readings').select('*', { count: 'exact', head: true });
    const { count: prayers } = await supabase.from('prayers').select('*', { count: 'exact', head: true });
    const { count: collects } = await supabase.from('collects').select('*', { count: 'exact', head: true });
    
    setStats({
      totalReadings: readings || 0,
      totalPrayers: prayers || 0,
      totalCollects: collects || 0
    });
  };

  const fetchMonthData = async (date: Date) => {
    const start = format(startOfMonth(date), 'yyyy-MM-dd');
    const end = format(endOfMonth(date), 'yyyy-MM-dd');
    
    console.log(`Fetching data for ${start} to ${end}`);

    // Fetch days that have readings
    const { data } = await supabase
      .from('readings')
      .select('date')
      .gte('date', start)
      .lte('date', end);

    if (data) {
      // Unique dates
      const days = Array.from(new Set(data.map(d => d.date)));
      setPopulatedDays(days);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center font-display text-2xl text-secondary">
              Admin Lecionário
            </CardTitle>
          </CardHeader>
          <CardContent>
            {magicLinkSent ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                <p>Link mágico enviado para <strong>{email}</strong></p>
                <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada.</p>
                <Button variant="ghost" onClick={() => setMagicLinkSent(false)}>Voltar</Button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar com Magic Link'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-display text-xl text-secondary">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leituras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReadings}</div>
              <p className="text-xs text-muted-foreground">versículos importados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Orações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPrayers}</div>
              <p className="text-xs text-muted-foreground">cadastradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Coletas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCollects}</div>
              <p className="text-xs text-muted-foreground">cadastradas</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Calendário</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <div className="w-full max-w-full">
                  <Calendar
                    mode="single"
                    month={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                    modifiers={{
                      populated: (date) => populatedDays.includes(format(date, 'yyyy-MM-dd')),
                    }}
                    modifiersStyles={{
                      populated: { 
                        fontWeight: 'bold', 
                        color: 'var(--primary)',
                        backgroundColor: 'var(--accent)',
                        opacity: 0.8
                      }
                    }}
                  />
                </div>
                <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Dias com conteúdo</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Editando: ${format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}` 
                  : 'Selecione um dia'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 border-0 shadow-none">
              {selectedDate ? (
                <DayEditor date={selectedDate} />
              ) : (
                <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <AlertCircle className="w-8 h-8 opacity-20" />
                  <p>Selecione uma data no calendário para visualizar ou editar o conteúdo litúrgico.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
