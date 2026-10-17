// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useSeguirHoje } from '../use-seguir-hoje';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 9, 17, 23, 59, 30)); // sábado, 30 s antes da meia-noite
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useSeguirHoje', () => {
  it('pula para o novo hoje quando a meia-noite chega com a aba aberta no hoje anterior', () => {
    const aoVirar = vi.fn();
    renderHook(() => useSeguirHoje(new Date(2026, 9, 17), aoVirar));

    act(() => {
      vi.advanceTimersByTime(40_000); // passa da meia-noite
    });

    expect(aoVirar).toHaveBeenCalledTimes(1);
  });

  it('respeita a data escolhida: quem estava em outro dia não é puxado para hoje', () => {
    const aoVirar = vi.fn();
    renderHook(() => useSeguirHoje(new Date(2026, 9, 12), aoVirar));

    act(() => {
      vi.advanceTimersByTime(40_000);
    });

    expect(aoVirar).not.toHaveBeenCalled();
  });

  it('PWA em segundo plano por dias: ao voltar à aba, pula para o hoje de agora', () => {
    const aoVirar = vi.fn();
    renderHook(() => useSeguirHoje(new Date(2026, 9, 17), aoVirar));

    // o navegador congela os timers em segundo plano: o relógio anda sem o timer disparar
    vi.setSystemTime(new Date(2026, 9, 21, 7, 0, 0));
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(aoVirar).toHaveBeenCalledTimes(1);
  });

  it('não dispara de novo no mesmo dia, nem depois de já ter pulado', () => {
    const aoVirar = vi.fn();
    renderHook(() => useSeguirHoje(new Date(2026, 9, 17), aoVirar));

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(aoVirar).not.toHaveBeenCalled(); // ainda é o mesmo dia

    vi.setSystemTime(new Date(2026, 9, 18, 8, 0, 0));
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(aoVirar).toHaveBeenCalledTimes(1); // a segunda volta no mesmo dia novo não repete
  });

  it('limpa o timer e o listener ao desmontar', () => {
    const aoVirar = vi.fn();
    const { unmount } = renderHook(() => useSeguirHoje(new Date(2026, 9, 17), aoVirar));
    unmount();

    act(() => {
      vi.advanceTimersByTime(40_000);
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(aoVirar).not.toHaveBeenCalled();
  });
});
