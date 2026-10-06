export const EASE_OUT = [0.33, 1, 0.68, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  enter: 1,
  item: 0.7,
  header: 1.1,
  tab: 0.8,
  layout: 0.7,
  exit: 0.5,
  count: 1.6,
  shake: 0.6,
};

export const STAGGER = {
  card: 0.12,
  cards: 6,
};

export const WORDMARK = {
  letter: 0.09,
  start: 0.2,
  ping: 2.4,
  rest: 2.2,
  wave: 0.5,
};

export const INTRO = {
  pace: 1.3,
  hold: 2,
  fly: 1.1,
  fade: 0.6,
};

export const OFFSET = {
  rise: 20,
  item: 8,
  tab: 36,
  header: 16,
  shake: [0, -8, 8, -6, 6, -3, 3, 0],
};

export const REVEAL = {
  window: 150,
  max: 5,
  card: 0.1,
  inner: 0.15,
  item: 0.08,
};

export const cardDelay = (index: number) =>
  index < STAGGER.cards ? index * STAGGER.card : 0;
