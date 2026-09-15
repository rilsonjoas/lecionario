import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReadingCard } from '@/components/devotional/ReadingCard';

const meta: Meta<typeof ReadingCard> = {
  title: 'Devotional/ReadingCard',
  component: ReadingCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**ReadingCard** exibe uma leitura bíblica litúrgica com suporte a 4 tipos:
\`first_reading\`, \`psalm\`, \`second_reading\` e \`gospel\`.

Cada tipo tem ícone, label e cor próprios, derivados dos tokens
\`liturgical-primary\`, \`liturgical-secondary\` e \`liturgical-accent\`,
que mudam automaticamente conforme a estação litúrgica selecionada na toolbar.

Use o seletor **⛪ Estação** na toolbar para ver o componente em todas as
8 estações litúrgicas, e **🌗 Tema** para alternar entre claro e escuro.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReadingCard>;

const baseReading = {
  reference: 'Isaías 40:1-11',
  citation: 'Is 40.1-11',
  sourceUrl: 'https://www.bible.com',
};

export const PrimeiraLeitura: Story = {
  name: 'Primeira Leitura',
  args: {
    index: 0,
    reading: {
      ...baseReading,
      type: 'first_reading',
      text: 'Consolai, consolai o meu povo, diz o vosso Deus. Falai ao coração de Jerusalém e proclamai-lhe que a sua servidão chegou ao fim, que a sua culpa foi expiada, que recebeu da mão do Senhor o dobro de todos os seus pecados.',
    },
  },
};

export const SalmoResponsorial: Story = {
  name: 'Salmo Responsorial',
  args: {
    index: 1,
    reading: {
      ...baseReading,
      reference: 'Salmo 85 (84)',
      citation: 'Sl 85.9-14',
      type: 'psalm',
      text: 'Mostra-nos, Senhor, a tua misericórdia e dá-nos a tua salvação.',
    },
  },
};

export const SegundaLeitura: Story = {
  name: 'Segunda Leitura',
  args: {
    index: 2,
    reading: {
      ...baseReading,
      reference: '2 Pedro 3:8-14',
      citation: '2Pd 3.8-14',
      type: 'second_reading',
      text: 'Mas não ignoreis, caríssimos, que diante do Senhor, um dia é como mil anos, e mil anos como um dia.',
    },
  },
};

export const Evangelho: Story = {
  name: 'Evangelho',
  args: {
    index: 3,
    reading: {
      ...baseReading,
      reference: 'Marcos 1:1-8',
      citation: 'Mc 1.1-8',
      type: 'gospel',
      text: 'Início do Evangelho de Jesus Cristo, Filho de Deus. Como está escrito no profeta Isaías: Eis que envio meu mensageiro à tua frente, para te preparar o caminho.',
    },
  },
};

export const SemTexto: Story = {
  name: 'Sem texto (só referência)',
  args: {
    index: 0,
    reading: {
      ...baseReading,
      type: 'first_reading',
      text: undefined,
    },
  },
};

export const TodosOsTipos: Story = {
  name: 'Todos os tipos (galeria)',
  render: () => (
    <div className="grid gap-6 max-w-2xl">
      <ReadingCard
        index={0}
        reading={{
          ...baseReading,
          type: 'first_reading',
          text: 'A palavra do Senhor nos consola e nos fortalece para o caminho.',
        }}
      />
      <ReadingCard
        index={1}
        reading={{
          ...baseReading,
          reference: 'Salmo 96',
          citation: 'Sl 96.1-3',
          type: 'psalm',
          text: 'Cantai ao Senhor um cântico novo, cantai ao Senhor toda a terra.',
        }}
      />
      <ReadingCard
        index={2}
        reading={{
          ...baseReading,
          reference: 'Filipenses 4:4-7',
          citation: 'Fl 4.4-7',
          type: 'second_reading',
          text: 'Alegrai-vos sempre no Senhor; repito: alegrai-vos.',
        }}
      />
      <ReadingCard
        index={3}
        reading={{
          ...baseReading,
          reference: 'João 1:6-8,19-28',
          citation: 'Jo 1.6-8.19-28',
          type: 'gospel',
          text: 'Houve um homem enviado por Deus: chamava-se João.',
        }}
      />
    </div>
  ),
};
