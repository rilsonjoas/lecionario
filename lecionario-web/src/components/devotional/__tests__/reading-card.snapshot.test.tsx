// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { CollectSection } from '@/components/devotional/CollectSection';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import type { Reading, DailyPrayer } from '@/types';

/**
 * Snapshot baseline de UI (ROADMAP 5.4, Camada 2):
 *
 * Trava a aparência dos cards que a rotação por ciclo (5.4) e a escrita
 * por estação (5.5) podem tocar sem querer. Regra: se o visual MUDAR de
 * propósito (novo estilo, novo ornamento), rode `vitest -u` para atualizar
 * o snapshot e revise o diff com cuidado. Se mudar sem propósito, o CI
 * quebra — é exatamente o que este baseline existe pra pegar.
 *
 * O Salmo é testado com o ornamento de resposta (5.3, nota musical entre
 * traços), que é o tratamento que nunca deve ser perdido.
 */

const psalmReading: Reading = {
  type: 'psalm',
  reference: 'Salmo 85:1-2, 8-13',
  citation: 'Salmo 85',
  text: 'Senhor, foste propício à tua terra; fizeste voltar o cativeiro de Jacó. Perdoaste a iniquidade do teu povo; cobriste todos os seus pecados.',
};

const gospelReading: Reading = {
  type: 'gospel',
  reference: 'Marcos 1:1-8',
  citation: 'Marcos 1:1-8',
  text: 'Princípio do evangelho de Jesus Cristo, Filho de Deus. Como está escrito nos profetas: Eis que eu envio o meu anjo ante a tua face.',
};

const samplePrayer: DailyPrayer = {
  title: 'Oração do Segundo Domingo do Advento',
  text: 'Deus Todo-Poderoso, concede que possamos lançar fora as obras das trevas e nos revestir da armadura da luz.',
  author: 'Livro de Oração Comum',
  source: 'Tradição Anglicana',
};

describe('Snapshot baseline — componentes do ofício do dia (web)', () => {
  it('ReadingCard — Salmo Responsorial com ornamento de resposta', () => {
    const { container } = render(<ReadingCard reading={psalmReading} index={0} />);
    expect(container).toMatchSnapshot();
  });

  it('ReadingCard — Evangelho (card de leitura comum)', () => {
    const { container } = render(<ReadingCard reading={gospelReading} index={1} />);
    expect(container).toMatchSnapshot();
  });

  it('CollectSection — Oração de Coleta', () => {
    const { container } = render(
      <CollectSection collect="Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento." />,
    );
    expect(container).toMatchSnapshot();
  });

  it('PrayerSection — Oração do Dia', () => {
    const { container } = render(<PrayerSection prayer={samplePrayer} />);
    expect(container).toMatchSnapshot();
  });
});
