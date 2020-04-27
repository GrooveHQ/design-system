/** @jsx jsx */

import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import TextareaAutosize from 'react-autosize-textarea'
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
        <TextareaAutosize
          {...rest}
          css={classes}
          placeholder={labelText}
          ref={ref}
          async
        />
      </Label>
    )
  }
)

TextArea.propTypes = {
  /**
   * Label text (also wraps Input in Label component)
   */
  label: PropTypes.string.isRequired,

  /**
   * Minimum number of visible rows
   */
  rows: PropTypes.number,

  /**
   * Maximum number of visible rows
   */
  maxRows: PropTypes.number,

  /**
   * Called whenever the textarea resizes
   */
  onResize: PropTypes.func,
}

TextArea.defaultProps = {
  rows: undefined,
  maxRows: undefined,
  onResize: undefined,
}
