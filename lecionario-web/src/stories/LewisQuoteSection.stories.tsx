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
          'LewisQuoteSection exibe a citação diária de C.S. Lewis com base na data fornecida.',
      },
    },
  },
  argTypes: {
    date: {
      control: 'date',
      description: 'Data para determinar qual citação exibir',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LewisQuoteSection>;

export const Default: Story = {
  name: 'Citação padrão',
  args: {
    date: new Date('2026-12-01'),
  },
};

export const OutraCitacao: Story = {
  name: 'Outra citação (Páscoa)',
  args: {
    date: new Date('2026-04-05'),
  },
};

export const TerceiraCitacao: Story = {
  name: 'Terceira citação (Quaresma)',
  args: {
    date: new Date('2026-03-01'),
  },
};
