/** @jsx jsx */

import { useContext } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { FieldContext } from './Field'
import { Label } from './Label'
import { spacing, forms } from '../shared/styles'
import { baseStyle, getValidationStateStyle } from '../shared/forms'

const multiLineStyle = css`
  font-size: ${forms.typography.small.size}px;
  line-height: ${forms.typography.small.height}px;
  padding: 13px ${spacing.padding.small}px;
`

export const TextArea = ({ label: labelText, ...rest }) => {
  const fieldCtx = useContext(FieldContext)
  const classes = [
    baseStyle,
    multiLineStyle,
    getValidationStateStyle(fieldCtx.validationState),
  ]
  return (
    <Label text={labelText}>
      <textarea {...rest} css={[classes]} placeholder={labelText} />
    </Label>
  )
}

TextArea.propTypes = {
  /**
   * Label text (also wraps Input in Label component)
   */
  label: PropTypes.string.isRequired,
}
