import { css } from '@emotion/core'

// Colors
export const color = {
  groovy: '#0BA0BE',
  primary: '#6187E0',
  mintGreen: '#1BB99D',
  sunYellow: '#D4A929',
  lightYellow: '#FAEEC7',
  candyRed: '#CC2B3E',

  jetBlack: '#1B1B1B',
  gunGrey: '#4F5D6A',
  stoneGrey: '#7E8F9F',
  metalGrey: '#E4E8ED',
  ashGrey: '#EEF1F5',
  moonGrey: '#F7F9FA',
  paperWhite: '#FFFFFF',

  // FIXME: Color HSL variations @tair
  // primaryDark: '#3D61BA',
  // primaryDoused: '#224094',
  // candyDark: '##A61221',
}

// Info Colors
export const infoColor = {
  success: color.mintGreen,
  warning: color.sunYellow,
  error: color.candyRed,
  info: color.lightYellow,
}

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
export const shadows = {
  default: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
}

// Spacing
export const spacing = {
  padding: {
    mini: 4,
    tiny: 8,
    small: 16,
    medium: 24,
    large: 32,
    big: 48,
    huge: 64,
    massive: 80,
  },
  borderRadius: {
    small: 2,
    medium: 4,
    large: 10,
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
      weight: '700',
    },
    h2: {
      size: '20',
      height: '26',
      weight: '700',
    },
    p1: {
      size: '16',
      height: '24',
      weight: '400',
    },
    p2: {
      size: '14',
      height: '21',
      weight: '400',
    },
    p3: {
      size: '13',
      height: '19',
      weight: '400',
    },
    p4: {
      size: '12',
      height: '18',
      weight: '400',
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
