import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

const DesignSystemPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl font-sans text-slate-800 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-4">Lecionário — Design System Litúrgico</h1>
      <p className="text-lg mb-6 text-slate-600 dark:text-slate-300">
        Design System baseado no Calendário Litúrgico Cristão. Cada estação do ano (Advento, Natal,
        Quaresma, Páscoa, Pentecostes, etc.) possui um esquema de cores, tipografia e contraste
        acessível próprio.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Estações Litúrgicas Supported</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-purple-300 bg-purple-50 text-purple-900 font-medium">
          Advento
        </div>
        <div className="p-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 font-medium">
          Natal / Epifania
        </div>
        <div className="p-4 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-900 font-medium">
          Quaresma
        </div>
        <div className="p-4 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-900 font-medium">
          Páscoa
        </div>
        <div className="p-4 rounded-lg border border-red-300 bg-red-50 text-red-900 font-medium">
          Pentecostes
        </div>
        <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 font-medium">
          Tempo Comum
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Acessibilidade e Boas Práticas</h2>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
        <li>
          Testado com <code>@storybook/addon-a11y</code> (axe-core)
        </li>
        <li>Suporte total a navegação por teclado e leitores de tela (WCAG AA)</li>
        <li>Tema adaptativo em tempo real via CSS Variables</li>
      </ul>
    </div>
  );
};

const meta: Meta<typeof DesignSystemPage> = {
  title: 'Design System/Introdução',
  component: DesignSystemPage,
};

export default meta;
type Story = StoryObj<typeof DesignSystemPage>;

export const VisaoGeral: Story = {
  name: 'Visão Geral',
};
