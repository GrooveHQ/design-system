/** @jsx jsx */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { FieldContext } from './Field'
import { Label } from './Label'
import { spacing, forms } from '../shared/styles'
import { baseStyle, getValidationStateStyle } from '../shared/forms'

const multiLineStyle = css`
  font-size: ${forms.typography.small.size}px;
  line-height: ${forms.typography.small.height}px;
  padding: ${spacing.padding.tiny}px ${forms.padding.horizontal}px;
`

export const TextArea = React.forwardRef(
  ({ label: labelText, ...rest }, ref) => {
    const fieldCtx = useContext(FieldContext)
    const classes = [
      baseStyle,
      multiLineStyle,
      getValidationStateStyle(fieldCtx.validationState),
    ]
    return (
      <Label text={labelText}>
        <textarea {...rest} css={[classes]} placeholder={labelText} ref={ref} />
      </Label>
    )
  }
)

TextArea.propTypes = {
  /**
   * Label text (also wraps Input in Label component)
   */
  label: PropTypes.string.isRequired,
}
