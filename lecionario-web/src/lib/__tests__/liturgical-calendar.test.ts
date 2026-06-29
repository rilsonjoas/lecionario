import { describe, it, expect } from 'vitest';
import {
  calculateEaster,
  calculateAdventStart,
  getLiturgicalCycle,
  getLiturgicalSeason,
  getLiturgicalColor,
  getLiturgicalDayName,
  getLiturgicalDayInfo,
} from '../liturgical-calendar';

describe('calculateEaster', () => {
  it('calculates Easter 2024 (March 31)', () => {
    const easter = calculateEaster(2024);
    expect(easter.getFullYear()).toBe(2024);
    expect(easter.getMonth()).toBe(2); // March is 0-indexed (2)
    expect(easter.getDate()).toBe(31);
  });

  it('calculates Easter 2025 (April 20)', () => {
    const easter = calculateEaster(2025);
    expect(easter.getFullYear()).toBe(2025);
    expect(easter.getMonth()).toBe(3);
    expect(easter.getDate()).toBe(20);
  });

  it('calculates Easter 2026 (April 5)', () => {
    const easter = calculateEaster(2026);
    expect(easter.getFullYear()).toBe(2026);
    expect(easter.getMonth()).toBe(3);
    expect(easter.getDate()).toBe(5);
  });

  it('calculates Easter 2027 (March 28)', () => {
    const easter = calculateEaster(2027);
    expect(easter.getFullYear()).toBe(2027);
    expect(easter.getMonth()).toBe(2);
    expect(easter.getDate()).toBe(28);
  });

  it('calculates Easter 2028 (April 16)', () => {
    const easter = calculateEaster(2028);
    expect(easter.getFullYear()).toBe(2028);
    expect(easter.getMonth()).toBe(3);
    expect(easter.getDate()).toBe(16);
  });

  it('calculates Easter 2029 (April 1)', () => {
    const easter = calculateEaster(2029);
    expect(easter.getFullYear()).toBe(2029);
    expect(easter.getMonth()).toBe(3);
    expect(easter.getDate()).toBe(1);
  });

  it('calculates Easter 2030 (April 21)', () => {
    const easter = calculateEaster(2030);
    expect(easter.getFullYear()).toBe(2030);
    expect(easter.getMonth()).toBe(3);
    expect(easter.getDate()).toBe(21);
  });
});

describe('calculateAdventStart', () => {
  it('calculates Advent 2024 start (December 1)', () => {
    const advent = calculateAdventStart(2024);
    expect(advent.getFullYear()).toBe(2024);
    expect(advent.getMonth()).toBe(11);
    expect(advent.getDate()).toBe(1);
  });

  it('calculates Advent 2025 start (November 30)', () => {
    const advent = calculateAdventStart(2025);
    expect(advent.getFullYear()).toBe(2025);
    expect(advent.getMonth()).toBe(10);
    expect(advent.getDate()).toBe(30);
  });

  it('calculates Advent 2026 start (November 29)', () => {
    const advent = calculateAdventStart(2026);
    expect(advent.getFullYear()).toBe(2026);
    expect(advent.getMonth()).toBe(10);
    expect(advent.getDate()).toBe(29);
  });
});

describe('getLiturgicalCycle', () => {
  it('returns A for dates in 2023 liturgical year (ADVENT 2022)', () => {
    const date = new Date(2023, 0, 1);
    expect(getLiturgicalCycle(date)).toBe('A');
  });

  it('returns B for dates in 2024 liturgical year', () => {
    const date = new Date(2024, 5, 15);
    expect(getLiturgicalCycle(date)).toBe('B');
  });

  it('returns C for dates in 2025 liturgical year', () => {
    const date = new Date(2025, 5, 15);
    expect(getLiturgicalCycle(date)).toBe('C');
  });

  it('returns A for dates in 2026 liturgical year', () => {
    const date = new Date(2026, 5, 15);
    expect(getLiturgicalCycle(date)).toBe('A');
  });

  it('advances cycle after Advent starts', () => {
    // Advent 2025 starts Nov 30, 2025, which begins liturgical year 2026 (Cycle A)
    const afterAdvent = new Date(2025, 11, 1);
    expect(getLiturgicalCycle(afterAdvent)).toBe('A');
  });
});

describe('getLiturgicalSeason', () => {
  it('returns advent for dates in Advent', () => {
    const date = new Date(2025, 11, 14);
    expect(getLiturgicalSeason(date)).toBe('advent');
  });

  it('returns christmas for December 25', () => {
    const date = new Date(2025, 11, 25);
    expect(getLiturgicalSeason(date)).toBe('christmas');
  });

  it('returns christmas for Jan 1-5', () => {
    const date = new Date(2026, 0, 1);
    expect(getLiturgicalSeason(date)).toBe('christmas');
  });

  it('returns epiphany for Jan 6 until Ash Wednesday', () => {
    const date = new Date(2026, 0, 15);
    expect(getLiturgicalSeason(date)).toBe('epiphany');
  });

  it('returns lent for Ash Wednesday', () => {
    const easter = calculateEaster(2026);
    const ashWednesday = new Date(easter);
    ashWednesday.setDate(ashWednesday.getDate() - 46);
    expect(getLiturgicalSeason(ashWednesday)).toBe('lent');
  });

  it('returns easter for Easter Sunday', () => {
    const date = calculateEaster(2026);
    expect(getLiturgicalSeason(date)).toBe('easter');
  });

  it('returns easter for dates after Easter', () => {
    const date = new Date(2026, 3, 15);
    expect(getLiturgicalSeason(date)).toBe('easter');
  });

  it('returns ordinary for after Pentecost', () => {
    const date = new Date(2026, 6, 15);
    expect(getLiturgicalSeason(date)).toBe('ordinary');
  });
});

describe('getLiturgicalColor', () => {
  it('returns purple for advent', () => {
    expect(getLiturgicalColor('advent')).toBe('purple');
  });

  it('returns rose for third Sunday of Advent', () => {
    const adventStart = calculateAdventStart(2026);
    const thirdSunday = new Date(adventStart);
    thirdSunday.setDate(thirdSunday.getDate() + 14);
    expect(getLiturgicalColor('advent', thirdSunday)).toBe('rose');
  });

  it('returns white for christmas', () => {
    expect(getLiturgicalColor('christmas')).toBe('white');
  });

  it('returns white for easter', () => {
    expect(getLiturgicalColor('easter')).toBe('white');
  });

  it('returns purple for lent', () => {
    expect(getLiturgicalColor('lent')).toBe('purple');
  });

  it('returns rose for fourth Sunday of Lent (Laetare)', () => {
    const easter = calculateEaster(2026);
    const fourthSunday = new Date(easter);
    fourthSunday.setDate(fourthSunday.getDate() - 21);
    expect(getLiturgicalColor('lent', fourthSunday)).toBe('rose');
  });

  it('returns red for Pentecost', () => {
    const easter = calculateEaster(2026);
    const pentecost = new Date(easter);
    pentecost.setDate(pentecost.getDate() + 49);
    expect(getLiturgicalColor('pentecost', pentecost)).toBe('red');
  });

  it('returns green for ordinary time', () => {
    expect(getLiturgicalColor('ordinary')).toBe('green');
  });
});

describe('getLiturgicalDayName', () => {
  it('returns Natal do Senhor for Dec 25', () => {
    const date = new Date(2025, 11, 25);
    expect(getLiturgicalDayName(date, 'christmas')).toBe('Natal do Senhor');
  });

  it('returns Domingo da Ressurreição for Easter', () => {
    const date = calculateEaster(2026);
    expect(getLiturgicalDayName(date, 'easter')).toBe('Domingo da Ressurreição');
  });

  it('returns Pentecostes for Pentecost', () => {
    const easter = calculateEaster(2026);
    const pentecost = new Date(easter);
    pentecost.setDate(pentecost.getDate() + 49);
    expect(getLiturgicalDayName(pentecost, 'easter')).toBe('Pentecostes');
  });

  it('returns Quarta-feira de Cinzas for Ash Wednesday', () => {
    const easter = calculateEaster(2026);
    const ashWednesday = new Date(easter);
    ashWednesday.setDate(ashWednesday.getDate() - 46);
    expect(getLiturgicalDayName(ashWednesday, 'lent')).toBe('Quarta-feira de Cinzas');
  });

  it('returns Domingo de Ramos for Palm Sunday', () => {
    const easter = calculateEaster(2026);
    const palmSunday = new Date(easter);
    palmSunday.setDate(palmSunday.getDate() - 7);
    expect(getLiturgicalDayName(palmSunday, 'lent')).toBe('Domingo de Ramos');
  });
});

describe('getLiturgicalDayInfo', () => {
  it('returns complete info for Easter Sunday 2026', () => {
    const date = calculateEaster(2026);
    const info = getLiturgicalDayInfo(date);

    expect(info.season).toBe('easter');
    expect(info.color).toBe('white');
    expect(info.dayName).toBe('Domingo da Ressurreição');
    expect(info.cycle).toBe('A');
    expect(info.date).toBe('2026-04-05');
  });

  it('returns complete info for Christmas 2025', () => {
    const date = new Date(2025, 11, 25);
    const info = getLiturgicalDayInfo(date);

    expect(info.season).toBe('christmas');
    expect(info.color).toBe('white');
    expect(info.dayName).toBe('Natal do Senhor');
    // Dec 25 2025 is in liturgical year 2026 (Cycle A)
    expect(info.cycle).toBe('A');
    expect(info.date).toBe('2025-12-25');
  });
});
