import { css } from '@emotion/core'
import { color, infoColor, spacing, forms } from './styles'

export const baseStyle = css`
  appearance: none;
  background-color: ${color.paperWhite};
  border: 1px solid ${color.metalGrey};
  border-radius: ${spacing.borderRadius.default}px;
  color: ${color.jetBlack};
  font-size: ${forms.typography.small.size}px;
  padding: 0 ${spacing.padding.small}px;
  width: 100%;
  ::placeholder {
    color: ${color.gunGreyDisabled};
    opacity: 1;
  }
  &:focus {
    border-color: ${color.primary};
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
