import type { Meta, StoryObj } from '@storybook/nextjs';
import { MeditationSection } from '@/components/devotional/MeditationSection';

const meta: Meta<typeof MeditationSection> = {
  title: 'Devotional/MeditationSection',
  component: MeditationSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MeditationSection** exibe a meditação devocional diária com:
- Texto principal com **capitular iluminada** (técnica de manuscrito medieval)
- Perguntas de reflexão numeradas com estilo de pergaminho
- Badge de duração opcional
- Player de áudio para meditação guiada (quando disponível)
- Botão de cópia do texto completo

O efeito de capitular (primeira letra aumentada) é implementado via classe CSS
\`.capitular\` — uma escolha deliberada de identidade visual sobre a mais comum
aspas decorativa, por ser a técnica real dos manuscritos litúrgicos.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MeditationSection>;

export const ComPerguntas: Story = {
  name: 'Com perguntas de reflexão',
  args: {
    meditation: {
      prompt:
        'Em tempo de Advento, somos chamados a aguardar com esperança ativa — não a passividade do que espera sem fazer nada, mas a vigilância de quem prepara o coração. Como João Batista preparou o caminho do Senhor no deserto, somos chamados a preparar o caminho em nosso próprio interior.',
      duration: '10 min',
      questions: [
        'O que em minha vida precisa ser endireitado para receber o Senhor?',
        'Como tenho aguardado a vinda de Cristo — com ansiedade ou com esperança?',
        'Que "voz no deserto" tenho ouvido em minha vida recentemente?',
      ],
    },
  },
};

export const SemPerguntas: Story = {
  name: 'Só texto (sem perguntas)',
  args: {
    meditation: {
      prompt:
        'A paz de Deus não é a ausência de conflito, mas a presença de Deus no meio do conflito. É possível estar em plena tormenta e ainda assim repousar na certeza de que Aquele que fez o mar e o vento está presente.',
    },
  },
};

export const ComDuracao: Story = {
  name: 'Com badge de duração',
  args: {
    meditation: {
      prompt:
        'Aquietai-vos e sabei que eu sou Deus. O silêncio não é vazio — é o espaço onde a voz de Deus pode ser ouvida. Neste momento de meditação, permita que sua mente descanse das demandas do dia e se volte para a presença divina.',
      duration: '5 min',
      questions: [
        'Como você pratica o silêncio em sua rotina diária?',
        'O que tem impedido você de se aquietar diante de Deus?',
      ],
    },
  },
};

export const TextoCurto: Story = {
  name: 'Texto curto (caso extremo)',
  args: {
    meditation: {
      prompt: 'Deus é amor.',
      duration: '2 min',
    },
  },
};
