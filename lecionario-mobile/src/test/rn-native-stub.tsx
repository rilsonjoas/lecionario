import { createElement, type ReactNode } from 'react';

/**
 * Stub de `react-native` para render + snapshot no vitest (ROADMAP 5.4).
 *
 * O `react-native` real é escrito em Flow (`import typeof ...`), que nem o
 * Vite nem o Node sabem transformar — o vitest em `environment: 'node'`
 * não tem o transformador de Flow do Metro. Em vez de embutir um preset
 * Metro inteiro, trocamos os primitivos (View, Text, ..., StyleSheet) por
 * stubs compatíveis com o `test-renderer` universal: cada componente vira
 * um `<div>` (ou `<text>`, para o `Text`) com `data-component` +
 * `data-testid`, então `toJSON()` produz um snapshot legível da mesma
 * estrutura. Só o que os cards usam hoje está aqui — se um componente
 * novo precisar de outro primitivo, adicionar sob demanda.
 *
 * O alias está no `vitest.config.ts` (`react-native` -> este arquivo) e
 * vale para os componentes E para o `test-renderer`/RNTL.
 */
const element =
  (type: string) =>
  ({ children, accessibilityLabel, ...props }: Record<string, unknown>) =>
    createElement(
      type === 'Text' ? 'text' : 'div',
      {
        'data-component': type,
        'data-testid': type,
        ...props,
        'aria-label': accessibilityLabel as string | undefined,
      },
      children as ReactNode,
    );

export const View = element('View');
export const Text = element('Text');
export const TouchableOpacity = element('TouchableOpacity');
export const Modal = element('Modal');

export const StyleSheet = {
  create: (styles: unknown) => styles,
  flatten: (styles: unknown) => styles,
};
