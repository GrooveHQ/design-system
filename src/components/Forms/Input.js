/** @jsx jsx */

import { useContext } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { FieldContext } from './Field'
import { Label } from './Label'
import {
  baseStyle,
  singleLineStyle,
  getValidationStateStyle,
} from '../shared/forms'

export const Input = ({ stretched, label: labelText, ...rest }) => {
  const fieldCtx = useContext(FieldContext)
  const classes = [
    baseStyle,
    singleLineStyle,
    getValidationStateStyle(fieldCtx.validationState),
  ]

  return (
    <Label stretched={stretched} text={labelText}>
      <input
        size={labelText.length}
        placeholder={labelText}
        {...rest}
        css={[classes]}
      />
    </Label>
  )
}

Input.propTypes = {
  /**
   * Label text (also wraps Input in Label component)
   */
  label: PropTypes.string.isRequired,
  /**
   * Stretch width to fill container
   */
  stretched: PropTypes.bool,
}

Input.defaultProps = {
  stretched: true,
}
