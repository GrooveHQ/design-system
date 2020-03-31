import { css } from '@emotion/core'
import {
  backgroundColor,
  generateColorVariables,
  borderColor,
  typography,
} from './styles'

export const variables = generateColorVariables()

export const bodyStyles = css`
  font-family: ${typography.type.primary};
  font-size: ${typography.sizes.p1.size}px;
  color: var(--color-jetBlack);

  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.weight.regular};
    margin: 0;
    padding: 0;
  }

  button,
  input,
  textarea,
  select {
    outline: none;
    font-family: ${typography.type.primary};
  }

  sub,
  sup {
    font-size: 0.8em;
  }

  sub {
    bottom: -0.2em;
  }

  sup {
    top: -0.2em;
  }

  b,
  em {
    font-weight: ${typography.weight.bold};
  }

  hr {
    border: none;
    border-top: 1px solid ${borderColor.default};
    clear: both;
    margin-bottom: 1.25rem;
  }

  code,
  pre {
    font-family: ${typography.type.code};
    font-size: ${typography.sizes.p1.size - 1}px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    display: inline-block;
    padding-left: 2px;
    padding-right: 2px;
    vertical-align: baseline;

    color: var(--color-gunGrey);
  }

  pre {
    line-height: 18px;
    padding: 11px 1rem;
    white-space: pre-wrap;

    background: ${backgroundColor.medium};
    color: var(--color-jetBlack);
    border-radius: 3px;
    margin: 1rem 0;
  }

  a,
  a:visited,
  a:active,
  a:focus {
    text-decoration: none;
  }
`

// Allow design system consumers to access font settings but control how and
// where they load the font.
export const fontUrl =
  'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,500,700&display=swap&subset=cyrillic,greek,vietnamese'
