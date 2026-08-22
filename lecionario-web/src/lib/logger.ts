import * as Sentry from '@sentry/nextjs';

type LogLevel = 'info' | 'warn' | 'error';

type LogContext = Record<string, unknown>;

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: unknown;
}

const isProduction = process.env.NODE_ENV === 'production';

function formatLog({ level, message, timestamp, context, error }: LogMessage): string {
  const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
  const errorStr = error
    ? ` | Error: ${error instanceof Error ? error.stack || error.message : String(error)}`
    : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}${errorStr}`;
}

export const logger = {
  info(message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logData: LogMessage = { level: 'info', message, timestamp, context };

    if (isProduction) {
      console.log(JSON.stringify(logData));
    } else {
      console.log(formatLog(logData));
    }
  },

  warn(message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logData: LogMessage = { level: 'warn', message, timestamp, context };

    if (isProduction) {
      console.warn(JSON.stringify(logData));
    } else {
      console.warn(formatLog(logData));
    }

    // Envia para o Sentry
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  },

  error(message: string, error?: unknown, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logData: LogMessage = { level: 'error', message, timestamp, context, error };

    if (isProduction) {
      console.error(JSON.stringify(logData));
    } else {
      console.error(formatLog(logData));
    }

    // Envia para o Sentry
    if (error) {
      Sentry.captureException(error, {
        extra: { ...context, message },
      });
    } else {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: context,
      });
    }
  },
};
