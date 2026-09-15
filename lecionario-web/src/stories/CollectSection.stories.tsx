import type { Meta, StoryObj } from '@storybook/nextjs';
import { CollectSection } from '@/components/devotional/CollectSection';

const meta: Meta<typeof CollectSection> = {
  title: 'Devotional/CollectSection',
  component: CollectSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**CollectSection** exibe a Oração de Coleta — a oração litúrgica
"coletiva" da semana, tradição presente desde o rito romano antigo.

Usa o ícone de coroa e a textura de pergaminho (\`texture-parchment\`),
com a conclusão litúrgica "Por Jesus Cristo, nosso Senhor. Amém."
sempre visível no rodapé. Inclui botão de cópia acessível.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CollectSection>;

export const Default: Story = {
  name: 'Oração de Coleta',
  args: {
    collect:
      'Deus todo-poderoso e eterno, aumenta em nós a tua graça, a fim de que, antecipando com uma fé justa o que a tua promessa assegura, possamos alcançar, sem qualquer impedimento, aquilo que esperas de nós.',
  },
};

export const TextoCurto: Story = {
  name: 'Texto curto',
  args: {
    collect: 'Senhor Deus, abre nossos corações ao teu Espírito hoje.',
  },
};

export const TextoLongo: Story = {
  name: 'Texto longo',
  args: {
    collect:
      'Pai misericordioso, que nos amaste primeiro e enviaste teu Filho unigênito para nos salvar, concede-nos, neste tempo sagrado, a graça de nos afastar de tudo o que nos separa de ti. Que possamos, por tua graça, viver de tal modo que nosso amor por ti se manifeste no amor que oferecemos ao próximo. Guarda-nos de todo o mal, fortifica-nos em todo o bem, e conduz-nos, finalmente, ao descanso eterno contigo.',
  },
};
