import { pixelToRem as sizing } from '../utils/sizing';

interface Fonts {
  cursiveText: typeof cursiveText;
  regularText: typeof regularText;
  mediumText: typeof mediumText;
  boldText: typeof boldText;
}

const FONT_FAMILIES = {
  MULI: '"Muli", sans-serif',
  SACRAMENTO: '"Sacramento", cursive',
};

const regularText = {
  100: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(12),
    'font-weight': '400',
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(14),
    'font-weight': '400',
    'line-height': sizing(22),
  },
  300: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(16),
    'font-weight': '400',
    'line-height': sizing(26),
  },
  400: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(17),
    'font-weight': '400',
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(18),
    'font-weight': '400',
    'line-height': sizing(28),
  },
  600: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(22),
    'font-weight': '400',
    'line-height': sizing(34),
  },
};

const mediumText = {
  100: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(12),
    'font-weight': '500',
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(14),
    'font-weight': '500',
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(16),
    'font-weight': '500',
    'line-height': sizing(20),
  },
  400: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(17),
    'font-weight': '500',
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(18),
    'font-weight': '500',
    'line-height': sizing(23),
  },
};

const boldText = {
  100: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(12),
    'font-weight': '700',
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(14),
    'font-weight': '700',
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(16),
    'font-weight': '700',
    'line-height': sizing(20),
  },
  400: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(17),
    'font-weight': '700',
    'line-height': sizing(27),
  },
  500: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(18),
    'font-weight': '700',
    'line-height': sizing(23),
  },
  600: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(20),
    'font-weight': '700',
    'line-height': sizing(25),
  },
  700: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(24),
    'font-weight': '700',
    'line-height': sizing(29),
  },
  800: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(28),
    'font-weight': '700',
    'line-height': sizing(32),
  },
  900: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(30),
    'font-weight': '700',
    'line-height': sizing(34),
  },
  1000: {
    'font-family': FONT_FAMILIES.MULI,
    'font-size': sizing(36),
    'font-weight': '800',
    'line-height': sizing(46),
  },
};

const cursiveText = {
  100: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(13),
    'font-weight': '400',
    'line-height': sizing(15),
  },
  200: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(14),
    'font-weight': '400',
    'line-height': sizing(18),
  },
  300: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(16),
    'font-weight': '400',
    'line-height': sizing(20),
  },
  400: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(17),
    'font-weight': '400',
    'line-height': sizing(22),
  },
  500: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(24),
    'font-weight': '400',
    'line-height': sizing(23),
  },
  600: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(28),
    'font-weight': '400',
    'line-height': sizing(25),
  },
  700: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(32),
    'font-weight': '400',
    'line-height': sizing(29),
  },
  800: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(38),
    'font-weight': '400',
    'line-height': sizing(32),
  },
  900: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(42),
    'font-weight': '400',
    'line-height': sizing(34),
  },
  1000: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(48),
    'font-weight': '400',
    'line-height': sizing(46),
  },
  1200: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(56),
    'font-weight': '400',
    'line-height': sizing(46),
  },
  5000: {
    'font-family': FONT_FAMILIES.SACRAMENTO,
    'font-size': sizing(102),
    'font-weight': '400',
    'line-height': sizing(42),
  },
};

export const fonts: Fonts = {
  cursiveText,
  regularText,
  mediumText,
  boldText,
};
