/** @jsx jsx */

import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { FieldContext } from './Field'
import { Label } from './Label'
import { color, spacing, forms } from '../shared/styles'
import {
  baseStyle,
  singleLineStyle,
  getValidationStateStyle,
} from '../shared/forms'
import { Icon, ICON_SIZES } from '../Icon'

const wrapper = css`
  position: relative;
  display: inline-flex;
`

const stretch = css`
  width: 100%;
`

const selectBox = css`
  padding-right: ${spacing.padding.big}px;
`

const placeholder = css`
  color: ${color.gunGreyDisabled};
`

const arrow = css`
  position: absolute;
  top: ${(forms.input.height.regular - ICON_SIZES.small) / 2}px;
  right: ${spacing.padding.small}px;
  user-select: none;
  pointer-events: none;
`

// TODO (jscheel): Decide if we want to handle null and undefined the same as an
// empty string for the purposes of setting values and determining if the
// label is still selected.

export const Select = ({
  value: controlledValue = '',
  stretched,
  label: labelText,
  onChange,
  options,
  children,
  ...rest
}) => {
  const fieldCtx = useContext(FieldContext)
  const classes = [
    baseStyle,
    singleLineStyle,
    selectBox,
    getValidationStateStyle(fieldCtx.validationState),
  ]
  const [selectedValue, setSelectedValue] = useState(controlledValue)
  useEffect(() => {
    setSelectedValue(controlledValue || '')
  }, [controlledValue, options, children])

  const handleSelection = e => {
    if (onChange) onChange(e)
    setSelectedValue(e.target.value)
  }

  if (!selectedValue) classes.push(placeholder)

  // TODO (jscheel): Currently, SSR does not like when we add an option for some
  // reason. On first render, it doesn't render the label option that is added
  // below. We need to figure _why_ SSR is ignoring this on first render.
  return (
    <Label stretched={stretched} text={labelText}>
      <div css={[wrapper, stretched && stretch]}>
        <select
          {...rest}
          css={classes}
          value={selectedValue}
          onChange={handleSelection}
        >
          <React.Fragment>
            <option key="__placeholder__" value="" disabled>
              {labelText}
            </option>
            {children ||
              options.map(
                ({
                  key: optionKey,
                  value: optionValue,
                  label: optionLabel,
                }) => (
                  <option key={optionKey || optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                )
              )}
          </React.Fragment>
        </select>
        <Icon icon="arrowDown" size="small" color="stoneGrey" css={[arrow]} />
      </div>
    </Label>
  )
}

Select.propTypes = {
  /**
   * Label text (wraps Select in Label component and adds disabled option at beginning of children)
   */
  label: PropTypes.string.isRequired,
  /**
   * Stretch width to fill container
   */
  stretched: PropTypes.bool,
  /**
   * Array of options matching the shape {key: 'string', value: 'string', label: 'string'}. You can either pass this array as a prop, or simply render option elements as children of this component. Children take precendence over this prop.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
}

Select.defaultProps = {
  stretched: true,
  options: null,
}
