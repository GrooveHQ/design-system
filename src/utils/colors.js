import Color from 'color'
import { color as sharedColors } from '../components/shared/styles'

export function stringToColor(str) {
  if (!str) str = '' // eslint-disable-line no-param-reassign
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  return color
}

export function contrast(
  color,
  light = sharedColors.moonGrey,
  dark = sharedColors.gunGrey,
  threshold = 0.5
) {
  if (Color(color).luminosity() < threshold) return light
  return dark
}
