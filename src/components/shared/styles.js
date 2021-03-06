import { css } from '@emotion/core'

const Color = require('color')

const disabledMixColor = '#F7F9FA' // moonGrey

// Color Active, Hover, and disable states by this formula:
// Hover: H - Up 1˚, S - Up 10%, B - Down 10%
// Active: H - Up 2˚, S - Up 20%, B - Down 20%
// Disabled: 50% mix with moonGrey
function generateStateColors(colors = {}) {
  return Object.keys(colors).reduce(
    (acc, colorName) => {
      const curColor = Color(colors[colorName])
      return {
        ...acc,
        [`${colorName}Hover`]: curColor
          .rotate(1)
          .saturate(0.1)
          .darken(0.1)
          .hex(),
        [`${colorName}Active`]: curColor
          .rotate(2)
          .saturate(0.2)
          .darken(0.2)
          .hex(),
        [`${colorName}Disabled`]: curColor
          .mix(Color(disabledMixColor), 0.5)
          .hex(),
      }
    },
    { ...colors }
  )
}

export const generateColorVariables = (colors = {}) => {
  const supportedBaseColors = Object.keys(baseColors)
  const parsedBaseColors = Object.keys(colors).reduce((result, c) => {
    if (supportedBaseColors.includes(c)) {
      // eslint-disable-next-line no-param-reassign
      result[c] = colors[c]
    }
    return result
  }, {})

  const allColors = {
    ...color,
    ...generateStateColors(parsedBaseColors),
  }

  return Object.keys(allColors)
    .map(c => {
      return `--color-${c}: ${allColors[c]};`
    })
    .join('\n')
}

// Base Colors
const baseColors = {
  primary: '#6187E0',
  groovy: '#0BA0BE',
  mintGreen: '#1BB99D',
  sunYellow: '#D4A929',
  lightYellow: '#FAEEC7',
  candyRed: '#CC2B3E',
}

// Monochrome Colors
const monochromeColors = {
  jetBlack: '#1B1B1B',
  gunGrey: '#4F5D6A',
  stoneGrey: '#7E8F9F',
  metalGrey: '#E4E8ED',
  ashGrey: '#EEF1F5',
  moonGrey: '#F7F9FA',
}

const whiteColors = {
  // keep the similar color states for consistency
  paperWhite: '#FFFFFF',
  paperWhiteActive: '#FFFFFF',
  paperWhiteHover: '#FFFFFF',
  paperWhiteDisabled: '#FFFFFF',
}

export const color = {
  ...generateStateColors(baseColors),
  ...generateStateColors(monochromeColors),
  ...whiteColors,
}

// Info Colors
export const infoColor = generateStateColors({
  success: color.mintGreen,
  warning: color.sunYellow,
  error: color.candyRed,
  info: color.lightYellow,
})

// Background Colors
export const backgroundColor = {
  info: color.lightYellow,
  medium: color.ashGrey,
  light: color.moonGrey,
  white: color.paperWhite,
}

// Border Colors
export const borderColor = {
  default: color.ashGrey,
}

// Shadows
const shadowBlurRadiusNumber = 6
const shadowXOffsetNumber = 0
const shadowYOffsetNumber = 2
export const shadows = {
  xOffsetNumber: shadowXOffsetNumber,
  yOffsetNumber: shadowYOffsetNumber,
  blurRadiusNumber: shadowBlurRadiusNumber,
  low: `${shadowXOffsetNumber}px ${shadowYOffsetNumber}px ${shadowBlurRadiusNumber}px 0 rgba(0, 0, 0, 0.1)`,
  high: `${shadowXOffsetNumber}px ${shadowYOffsetNumber}px ${shadowBlurRadiusNumber}px 0 rgba(0, 0, 0, 0.15)`,
}

// Spacing
export const spacing = {
  padding: {
    mini: 4,
    tiny: 8,
    small: 16,
    medium: 24,
    large: 32,
    big: 40,
    huge: 64,
    massive: 80,
  },
  borderRadius: {
    small: 2,
    medium: 4,
    big: 10,
    default: 4,
  },
}

// Typography
export const typography = {
  type: {
    primary: '"IBM Plex Sans", sans-serif',
    code: '"IBM Plex Mono", monospace',
  },
  weight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  sizes: {
    h1: {
      size: '25',
      height: '32',
    },
    h2: {
      size: '20',
      height: '26',
    },
    p1: {
      size: '16',
      height: '24',
    },
    p2: {
      size: '14',
      height: '21',
    },
    p3: {
      size: '13',
      height: '19',
    },
    p4: {
      size: '12',
      height: '18',
    },
    p5: {
      size: '10',
      height: '13',
    },
  },
}

// FIXME: Media margins - @tair
export const breakpoint = 600
export const pageMargin = '5.55555'

export const pageMargins = css`
  padding: 0 ${spacing.padding.medium}px;
  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 1}%;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 2}%;
  }
  @media (min-width: ${breakpoint * 3}px) {
    margin: 0 ${pageMargin * 3}%;
  }
  @media (min-width: ${breakpoint * 4}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`

// Forms
export const forms = {
  input: {
    width: 280,
    height: {
      regular: 40,
      small: 32,
    },
  },
  typography: {
    regular: { ...typography.sizes.p1 },
    small: { ...typography.sizes.p3 },
  },
  padding: {
    horizontal: 12,
  },
}

// Avatars
export const avatars = {
  sizes: {
    tiny: 24,
    small: 32,
    medium: 40,
    big: 60,
  },
}
