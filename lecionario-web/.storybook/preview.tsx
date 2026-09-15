import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';

// Decorador que injeta as variáveis CSS de cada estação litúrgica,
// permitindo visualizar qualquer componente em todos os 8 temas.
const SEASONS = [
  { name: 'Tempo Comum (Padrão)', className: '' },
  { name: 'Advento', className: 'season-advent' },
  { name: 'Natal', className: 'season-christmas' },
  { name: 'Epifania', className: 'season-epiphany' },
  { name: 'Quaresma', className: 'season-lent' },
  { name: 'Semana Santa', className: 'season-holy-week' },
  { name: 'Páscoa', className: 'season-easter' },
  { name: 'Pentecostes', className: 'season-pentecost' },
];

const preview: Preview = {
  globalTypes: {
    season: {
      description: 'Estação Litúrgica',
      toolbar: {
        title: '⛪ Estação',
        icon: 'circlehollow',
        items: SEASONS.map((s) => ({ value: s.className, title: s.name })),
        dynamicTitle: true,
      },
    },
    colorScheme: {
      description: 'Tema claro/escuro',
      toolbar: {
        title: '🌗 Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Escuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    season: '',
    colorScheme: 'light',
  },
  decorators: [
    (Story, context) => {
      const seasonClass = context.globals.season as string;
      const isDark = context.globals.colorScheme === 'dark';
      return (
        <div
          className={`${isDark ? 'dark' : ''} ${seasonClass} min-h-screen bg-background p-8 font-body`}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      // Executa axe-core automaticamente em todas as stories
      test: 'error',
    },
  },
};

export default preview;
