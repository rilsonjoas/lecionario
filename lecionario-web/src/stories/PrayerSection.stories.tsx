import type { Meta, StoryObj } from '@storybook/nextjs';
import { PrayerSection } from '@/components/devotional/PrayerSection';

const meta: Meta<typeof PrayerSection> = {
  title: 'Devotional/PrayerSection',
  component: PrayerSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**PrayerSection** exibe a Oração do Dia com o visual "Sursum Corda" —
fundo vinho, tipografia em bege-areia, ícone de chama, borda dourada.

É o componente com a identidade visual mais forte do design system:
usa os tokens de marca (\`vinho\`, \`dourado\`, \`bege-areia\`, \`laranja-queimado\`)
diretamente, sem depender dos tokens litúrgicos sazonais.
        `,
      },
    },
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof PrayerSection>;

export const ComAutor: Story = {
  name: 'Com autor e fonte',
  args: {
    prayer: {
      title: 'Oração de Agostinho de Hipona',
      text: 'Senhor, fizeste-nos para ti, e o nosso coração está inquieto, enquanto não repousa em ti.',
      author: 'Agostinho de Hipona',
      source: 'Confissões, I.1',
    },
  },
};

export const SemAutor: Story = {
  name: 'Sem atribuição',
  args: {
    prayer: {
      title: 'Oração Matinal',
      text: 'Que esta manhã seja santificada pelo teu nome, Senhor. Guia meus passos, protege minha jornada e que tudo o que fizer hoje seja para tua glória.',
    },
  },
};

export const TextoLongo: Story = {
  name: 'Texto longo',
  args: {
    prayer: {
      title: 'Grande Oração de Intercessão',
      text: 'Pai celestial, neste dia nos apresentamos diante de ti com corações gratos. Lembramos dos que sofrem, dos que estão enfermos, dos que passam por tribulação e provação. Olha sobre eles com olhos de misericórdia e os sustenta pela tua graça infinita. Envia o teu Espírito para confortar os aflitos e dar força aos cansados. Que a tua paz, que excede todo o entendimento, guarde os seus corações e mentes em Cristo Jesus, nosso Senhor.',
      author: 'Compilação Litúrgica',
      source: 'Lecionário RCL',
    },
  },
};
