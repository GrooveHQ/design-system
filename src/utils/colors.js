import { color as sharedColors } from '../components/shared/styles'

export function stringToColour(str) {
  if (!str) str = '' // eslint-disable-line no-param-reassign
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff
    colour += `00${value.toString(16)}`.substr(-2)
  }
  return colour
}

export function convertRGBToHex(col) {
  const re = new RegExp(
    'rgb\\s*\\(\\s*([0-9]+).*,\\s*([0-9]+).*,\\s*([0-9]+).*\\)',
    'gi'
  )

  const rgb = col.replace(re, '$1,$2,$3').split(',')
  if (rgb.length === 3) {
    let r = parseInt(rgb[0], 10).toString(16)
    let g = parseInt(rgb[1], 10).toString(16)
    let b = parseInt(rgb[2], 10).toString(16)

    r = r.length === 1 ? `0${r}` : r
    g = g.length === 1 ? `0${g}` : g
    b = b.length === 1 ? `0${b}` : b

    return `#${r}${g}${b}`
  }

  return col
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export function convertHslToHex(hsl) {
  const sep = hsl.indexOf(',') > -1 ? ',' : ' '
  const hslArray = hsl
    .substr(4)
    .split(')')[0]
    .split(sep)

  let h = hslArray[0]
  const s = hslArray[1].substr(0, hslArray[1].length - 1) / 100
  const l = hslArray[2].substr(0, hslArray[2].length - 1) / 100

  // Strip label and convert to degrees (if necessary)
  if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3)
  else if (h.indexOf('rad') > -1)
    h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI))
  else if (h.indexOf('turn') > -1)
    h = Math.round(h.substr(0, h.length - 4) * 360)
  if (h >= 360) h %= 360

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16)
  g = Math.round((g + m) * 255).toString(16)
  b = Math.round((b + m) * 255).toString(16)

  // Prepend 0s, if necessary
  if (r.length === 1) r = `0${r}`
  if (g.length === 1) g = `0${g}`
  if (b.length === 1) b = `0${b}`

  return `#${r}${g}${b}`
}

// https://www.w3.org/TR/AERT/#color-contrast
const HEX_REGEX = /^#?([0-9A-F]{6})$/i
export function brightness(color) {
  let red
  let green
  let blue
  if (color.startsWith('hsl')) {
    // eslint-disable-next-line no-param-reassign
    color = convertHslToHex(color)
  }
  const [, hexCode] = color.toUpperCase().match(HEX_REGEX) || []
  if (hexCode) {
    red = parseInt(hexCode.substring(0, 2), 16)
    green = parseInt(hexCode.substring(2, 4), 16)
    blue = parseInt(hexCode.substring(4, 6), 16)
  } else if (color.startsWith('rgba')) {
    ;[red, green, blue] = color.substring(5, color.length - 1).split(', ')
  } else if (color.startsWith('rgb')) {
    ;[red, green, blue] = color.substring(4, color.length - 1).split(', ')
  }
  if ((red || red === 0) && (green || green === 0) && (blue || blue === 0))
    return (
      (parseInt(red, 10) * 299 +
        parseInt(green, 10) * 587 +
        parseInt(blue, 10) * 114) /
      1000
    )
  return null
}

export function contrast(
  color,
  light = sharedColors.moonGrey,
  dark = sharedColors.gunGrey,
  threshold = 175
) {
  if (brightness(color) < threshold) return light
  return dark
}
