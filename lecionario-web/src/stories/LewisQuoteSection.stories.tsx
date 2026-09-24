import type { Meta, StoryObj } from '@storybook/nextjs';
import { LewisQuoteSection } from '@/components/devotional/LewisQuoteSection';

const meta: Meta<typeof LewisQuoteSection> = {
  title: 'Devotional/LewisQuoteSection',
  component: LewisQuoteSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'LewisQuoteSection exibe a citação do dia do cluster "A Biblioteca" (ADR 001) — a API do Scriptorium resolve a data de hoje em America/Sao_Paulo (não recebe data por prop).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LewisQuoteSection>;

export const Default: Story = {
  name: 'Citação padrão',
};
