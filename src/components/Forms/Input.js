/** @jsx jsx */
import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { spacing, forms } from '../shared/styles'
import { FieldContext } from './Field'
import { Label } from './Label'
import { Icon, ICON_SIZES } from '../Icon'
import {
  baseStyle,
  singleLineStyle,
  getValidationStateStyle,
} from '../shared/forms'

const StyledIcon = styled(motion.custom(Icon))`
  position: absolute;
  right: ${props => (props.position === 'right' ? '12px' : 'auto')};
  left: ${props => (props.position === 'left' ? '12px' : 'auto')};
  top: ${spacing.padding.tiny}px;
  cursor: ${props => (props.onClick ? 'pointer' : 'auto')};
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: ${props => (props.position === 'right' ? '0px' : 'auto')};
  bottom: 0;
  left: ${props => (props.position === 'left' ? '0px' : 'auto')};

  button {
    ${singleLineStyle};
    ${props =>
      props.position === 'right' &&
      `
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      margin-right: 0;
    `}

    ${props =>
      props.position === 'left' &&
      `
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      margin-left: 0;
    `}

    svg {
      /* Have to account for the top and bottom borders here */
      margin-top: -${Math.abs((ICON_SIZES.medium - forms.input.height.regular) / 2) - 2}px;
    }
  }
`

export const Input = React.forwardRef(
  (
    {
      label: labelText,
      icon,
      iconPosition,
      onIconClick,
      button,
      buttonPosition,
      ...rest
    },
    ref
  ) => {
    const fieldCtx = useContext(FieldContext)

    const classes = [
      baseStyle,
      singleLineStyle,
      getValidationStateStyle(fieldCtx.validationState),
    ]

    const iconInputStyle = css`
      &:focus ~ svg > path {
        fill: var(--color-primary);
      }
      padding: 0
        ${iconPosition === 'right'
          ? spacing.padding.big
          : spacing.padding.small}px
        0
        ${iconPosition === 'left'
          ? spacing.padding.big
          : spacing.padding.small}px;
    `

    const buttonInputStyle = css`
      padding: 0
        ${buttonPosition === 'right'
          ? spacing.padding.big + spacing.padding.small
          : spacing.padding.small}px
        0
        ${buttonPosition === 'left'
          ? spacing.padding.big + spacing.padding.small
          : spacing.padding.small}px;
    `

    if (icon) {
      classes.push(iconInputStyle)
    } else if (button) {
      classes.push(buttonInputStyle)
    }

    const handleIconClick = useCallback(() => {
      if (onIconClick) {
        onIconClick()
      }
    }, [onIconClick])

    return (
      <Label text={labelText}>
        <input
          size={labelText ? labelText.length : 0}
          placeholder={labelText}
          css={[classes]}
          {...rest}
          ref={ref}
        />
        <AnimatePresence initial={false} exitBeforeEnter>
          {icon && !button && (
            <StyledIcon
              onClick={onIconClick ? handleIconClick : undefined}
              icon={icon}
              position={iconPosition}
              color="metalGrey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={icon}
            />
          )}
        </AnimatePresence>
        {button && !icon && (
          <ButtonWrapper position={buttonPosition}>{button}</ButtonWrapper>
        )}
      </Label>
    )
  }
)

Input.propTypes = {
  /**
   * Label text (also wraps Input in Label component)
   */
  label: PropTypes.string.isRequired,
  /**
   * Specify icon name
   */
  icon: PropTypes.string,
  /**
   * Specify icon position
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onIconClick: PropTypes.func,
  /**
   * Specify button
   */
  button: PropTypes.node,
  /**
   * Specify button position
   */
  buttonPosition: PropTypes.oneOf(['left', 'right']),
}

Input.defaultProps = {
  icon: null,
  iconPosition: 'right',
  onIconClick: null,
  button: null,
  buttonPosition: 'right',
}
