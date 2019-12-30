/** @jsx jsx */
import { useContext, useCallback } from 'react'
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
  right: ${props => (props.position === 'right' ? '12px' : 'auto')};
  left: ${props => (props.position === 'left' ? '12px' : 'auto')};
  top: ${spacing.padding.tiny}px;
  cursor: ${props => (props.onClick ? 'pointer' : 'auto')};
`

export const Input = ({
  stretched,
  label: labelText,
  icon,
  iconPosition,
  onIconClick,
  ...rest
}) => {
  const fieldCtx = useContext(FieldContext)

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
      ${iconPosition === 'right'
        ? spacing.padding.big
        : spacing.padding.small}px
      0
      ${iconPosition === 'left' ? spacing.padding.big : spacing.padding.small}px;
  `

  if (icon) {
    classes.push(iconInputStyle)
  }

  const handleIconClick = useCallback(() => {
    if (onIconClick) {
      onIconClick()
    }
  }, [onIconClick])

  return (
    <Label stretched={stretched} text={labelText}>
      <input
        size={labelText.length}
        placeholder={labelText}
        css={[classes]}
        {...rest}
      />
      {icon && (
        <StyledIcon
          onClick={onIconClick ? handleIconClick : undefined}
          icon={icon}
          position={iconPosition}
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
   * Specify icon position
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onIconClick: PropTypes.func,
}

Input.defaultProps = {
  stretched: true,
  icon: null,
  iconPosition: 'right',
  onIconClick: null,
}
