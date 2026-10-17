import { format } from 'date-fns';

export const FORMATO_DIA = 'yyyy-MM-dd';

/**
 * Decide se a tela deve pular para o novo "hoje".
 *
 * O app (e o PWA) nascem com a data de hoje e só a mudam por gesto. Deixado aberto,
 * ele atravessava a meia-noite mostrando o dia anterior (existe o botão "Hoje"
 * justamente por isso), junto com a leitura, a pintura e a citação daquele dia.
 *
 * Regra: pula quando o dia virou E a tela estava mostrando o "hoje" anterior. Se a
 * pessoa tinha navegado para outra data (amanhã, uma semana atrás, um favorito), a
 * escolha dela é respeitada.
 *
 * @param dataExibida          data que a tela mostra agora
 * @param diaDaUltimaAtividade 'yyyy-MM-dd' de "hoje" na última vez que o app estava ativo
 * @param agora                relógio atual
 */
export function devePularParaHoje(
  dataExibida: Date,
  diaDaUltimaAtividade: string,
  agora: Date,
): boolean {
  if (format(agora, FORMATO_DIA) === diaDaUltimaAtividade) return false;
  return format(dataExibida, FORMATO_DIA) === diaDaUltimaAtividade;
}

/** Milissegundos até 00:00:01 do próximo dia local (para reagir à meia-noite com o app aberto). */
export function msAteProximaMeiaNoite(agora: Date): number {
  const alvo = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 0, 0, 1);
  return alvo.getTime() - agora.getTime();
}
