import { describe, it, expect } from 'vitest';
import { act } from 'react';
import { createRoot } from 'test-renderer';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { CollectSection } from '@/components/devotional/CollectSection';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import type { Reading, DailyPrayer } from '@/types';

/**
 * Snapshot baseline de UI — mobile (ROADMAP 5.4, Camada 2).
 *
 * Mesma regra do web: trava a aparência dos cards que a rotação por
 * ciclo (5.4) e a escrita por estação (5.5) podem tocar. Os primitivos
 * de `react-native` viram `<div>`/`<text>` (ver `src/test/rn-native-stub.tsx`,
 * apontado via alias no vitest.config) e os contexts são stubados em
 * `src/test/setup.ts`; então o snapshot é legível, mas muda se a
 * estrutura for alterada. Se o visual mudar de propósito, rode
 * `vitest -u` e revise o diff — sem propósito, o CI quebra.
 *
 * Usa o renderer universal `test-renderer` (o mesmo que o
 * `@testing-library/react-native` usa por baixo) via `createRoot` +
 * `act`. O Salmo entra com o ornamento de resposta (5.3, nota musical
 * entre traços) e `importantForAccessibility="no-hide-descendants"`.
 */

interface TestRenderer {
  render: (element: React.ReactNode) => void;
  container: { toJSON: () => unknown };
}

async function renderTree(element: React.ReactElement): Promise<TestRenderer> {
  const root = createRoot({ textComponentTypes: ['text'] }) as TestRenderer;
  await act(async () => {
    root.render(element as never);
  });
  return root;
}

const psalmReading: Reading = {
  type: 'psalm',
  reference: 'Salmo 85:1-2, 8-13',
  citation: 'Salmo 85',
  text: 'Senhor, foste propício à tua terra; fizeste voltar o cativeiro de Jacó.',
};

const gospelReading: Reading = {
  type: 'gospel',
  reference: 'Marcos 1:1-8',
  citation: 'Marcos 1:1-8',
  text: 'Princípio do evangelho de Jesus Cristo, Filho de Deus.',
};

const samplePrayer: DailyPrayer = {
  title: 'Oração do Segundo Domingo do Advento',
  text: 'Deus Todo-Poderoso, concede que possamos lançar fora as obras das trevas.',
  author: 'Livro de Oração Comum',
  source: 'Tradição Anglicana',
};

describe('Snapshot baseline — componentes do ofício do dia (mobile)', () => {
  it('ReadingCard — Salmo Responsorial com ornamento de resposta', async () => {
    const root = await renderTree(<ReadingCard reading={psalmReading} index={0} season="advent" />);
    expect(root.container.toJSON()).toMatchSnapshot();
  });

  it('ReadingCard — Evangelho (card de leitura comum)', async () => {
    const root = await renderTree(
      <ReadingCard reading={gospelReading} index={1} season="ordinary" />,
    );
    expect(root.container.toJSON()).toMatchSnapshot();
  });

  it('CollectSection — Oração de Coleta', async () => {
    const root = await renderTree(
      <CollectSection collect="Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento." />,
    );
    expect(root.container.toJSON()).toMatchSnapshot();
  });

  it('PrayerSection — Oração do Dia', async () => {
    const root = await renderTree(<PrayerSection prayer={samplePrayer} />);
    expect(root.container.toJSON()).toMatchSnapshot();
  });
});
