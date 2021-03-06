import { css } from '@emotion/core'
import { generateTransition } from './animation'
import { infoColor, spacing, forms } from './styles'

export const baseStyle = css`
  appearance: none;
  background-color: var(--color-paperWhite);
  border: 1px solid var(--color-metalGrey);
  border-radius: ${spacing.borderRadius.default}px;
  color: var(--color-jetBlack);
  flex: 1 1 0%;
  font-size: ${forms.typography.small.size}px;
  min-width: 0;
  padding: 0 ${forms.padding.horizontal}px;
  transition: ${generateTransition()};
  width: 100%;
  ::placeholder {
    color: var(--color-gunGreyDisabled);
    opacity: 1;
  }
  &:focus {
    border-color: var(--color-primary);
  }
`

export const singleLineStyle = css`
  height: ${forms.input.height.regular}px;
  line-height: ${forms.input.height.regular}px;
`

const successStateStyle = css`
  border-color: ${infoColor.success};
  &:focus {
    border-color: ${infoColor.success};
  }
`

const errorStateStyle = css`
  border-color: ${infoColor.error};
  &:focus {
    border-color: ${infoColor.error};
  }
`

export const getValidationStateStyle = validationState => {
  switch (validationState) {
    case 'success':
      return successStateStyle
    case 'error':
      return errorStateStyle
    default:
      return undefined
  }
}

export const stretchedStyle = css`
  width: 100%;
`
