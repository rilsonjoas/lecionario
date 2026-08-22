import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(
      `ErrorBoundary caught error in widget [${this.props.name || 'Component'}]:`,
      error,
      {
        componentStack: errorInfo.componentStack,
      },
    );
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-2xl text-center my-4 shadow-sm">
            <p className="text-sm font-medium text-destructive font-display">
              Não foi possível carregar este bloco.
            </p>
            <p className="text-xs text-foreground/50 font-body mt-1">
              Por favor, recarregue a página ou tente mais tarde.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
