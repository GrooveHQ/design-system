/** @jsx jsx */
import { useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { color, spacing } from '../shared/styles'
import { FieldContext } from './Field'
import { Label } from './Label'
import { Icon } from '../Icon'
import {
  baseStyle,
  singleLineStyle,
  getValidationStateStyle,
} from '../shared/forms'

const StyledIcon = styled(Icon)`
  position: absolute;
  right: ${props => (props.align === 'right' ? '12px' : 'auto')};
  left: ${props => (props.align === 'left' ? '12px' : 'auto')};
  top: ${spacing.padding.tiny}px;
  cursor: ${props => (props.onClick ? 'pointer' : 'auto')};
`

export const Input = ({
  stretched,
  label: labelText,
  icon,
  iconAlign,
  onReset,
  ...rest
}) => {
  const fieldCtx = useContext(FieldContext)
  const inputRef = useRef(null)

  const classes = [
    baseStyle,
    singleLineStyle,
    getValidationStateStyle(fieldCtx.validationState),
  ]

  const iconInputStyle = css`
    &:focus ~ svg > path {
      fill: ${color.primary};
    }
    padding: 0
      ${iconAlign === 'right' ? spacing.padding.big : spacing.padding.small}px 0
      ${iconAlign === 'left' ? spacing.padding.big : spacing.padding.small}px;
  `

  if (icon) {
    classes.push(iconInputStyle)
  }

  const handleReset = useCallback(() => {
    if (onReset) {
      inputRef.current.value = ''
      onReset()
    }
  }, [onReset])

  return (
    <Label stretched={stretched} text={labelText}>
      <input
        size={labelText.length}
        placeholder={labelText}
        css={[classes]}
        ref={inputRef}
        {...rest}
      />
      {icon && (
        <StyledIcon
          onClick={onReset ? handleReset : undefined}
          icon={icon}
          align={iconAlign}
          color="metalGrey"
        />
      )}
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
  /**
   * Specify icon name
   */
  icon: PropTypes.string,
  /**
   * Specify icon alignmnet
   */
  iconAlign: PropTypes.oneOf(['left', 'right']),
  /**
   * If reset handler provided, will empty the input. If icon provided,
   * clicking on the icon will also trigger reset.
   */
  onReset: PropTypes.func,
}

Input.defaultProps = {
  stretched: true,
  icon: null,
  iconAlign: 'right',
  onReset: null,
}
