/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import { css, jsx, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { infoColor, spacing, forms, typography } from './shared/styles'
import { generateTransition } from './shared/animation'
import { icons } from './shared/icons'
import { Icon, ICON_SIZES } from './Icon'

const base = css`
  align-self: flex-start;
  background-color: var(--color-paperWhite);
  border-radius: ${spacing.borderRadius.default}px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  /* NOTE (jscheel): Normally, this padding will be larger because children will exist. */
  padding: 0 ${spacing.padding.tiny}px;
  min-width: ${spacing.padding.tiny * 2 + 24}px;
  transition: ${generateTransition()};
  /* HACK (jscheel): Prevent webkit bug that causes cursor to flicker because of opacity change on hover. */
  transform: rotate(0);
  /* END HACK */
  vertical-align: middle;
  /* HACK (jscheel): Hack for https://github.com/facebook/react/issues/4251 */
  &[disabled] {
    pointer-events: none;
  }
  /* END HACK */
`

const primary = css`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-paperWhite);
  &:hover {
    background-color: var(--color-primaryHover);
    border-color: var(--color-primaryHover);
  }
  &:active {
    background-color: var(--color-primaryActive);
    border-color: var(--color-primaryHover);
  }
  &:disabled {
    background-color: var(--color-primaryDisabled);
    border-color: var(--color-primaryDisabled);
  }
`

const primarySimple = css`
  color: var(--color-primary);
  background-color: transparent;
  border: none;
  font-weight: ${typography.weight.medium};
  &:hover {
    color: var(--color-primaryHover);
  }
  &:active {
    color: var(--color-primaryActive);
  }
  &:disabled {
    color: var(--color-primaryDisabled);
  }
`

const secondary = css`
  background-color: var(--color-paperWhite);
  border-color: var(--color-primary);
  color: var(--color-primary);
  &:hover {
    border-color: var(--color-primaryHover);
  }
  &:active {
    border-color: var(--color-primaryActive);
  }
  &:disabled {
    border-color: var(--color-primaryDisabled);
    color: var(--color-primaryDisabled);
  }
`

const warning = css`
  background-color: ${infoColor.error};
  border-color: ${infoColor.error};
  color: var(--color-paperWhite);
  &:hover {
    background-color: ${infoColor.errorHover};
    border-color: ${infoColor.errorHover};
  }
  &:active {
    background-color: ${infoColor.errorActive};
    border-color: ${infoColor.errorActive};
  }
  &:disabled {
    background-color: ${infoColor.errorDisabled};
    border-color: ${infoColor.errorDisabled};
  }
`

const warningSimple = css`
  color: ${infoColor.error};
  background-color: transparent;
  border: none;
  font-weight: ${typography.weight.medium};
  &:hover {
    color: ${infoColor.errorHover};
  }
  &:active {
    color: ${infoColor.errorActive};
  }
  &:disabled {
    color: ${infoColor.errorDisabled};
  }
`

// HACK (jscheel): This generates a class name we can use when nesting on hover
// in primaryInverted. It's super ghetto, but it works, and it is much better
// than managing hover states in js just for simple css nesting.
const iconClassHoverTarget = css``

const primaryInverted = css`
  background-color: transparent;
  border-color: var(--color-paperWhite);
  color: var(--color-paperWhite);
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &:active {
    background-color: var(--color-paperWhite);
    opacity: 1;
    ${iconClassHoverTarget} path {
      fill: var(--color-primary);
    }
  }
`

const primaryInvertedSimple = css`
  background-color: transparent;
  border: none;
  color: var(--color-paperWhite);
  opacity: 0.8;
  padding: 0;
  min-width: 0;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 1;
  }
`

const regular = css`
  font-size: ${forms.typography.regular.size}px;
  line-height: ${forms.input.height.regular - 2}px; /* subtract border width */
`

const small = css`
  font-size: ${forms.typography.small.size}px;
  line-height: ${forms.input.height.small - 2}px; /* subtract border width */
  padding: 0 ${spacing.padding.mini}px;
  min-width: ${spacing.padding.tiny * 2 + 16}px;
`

const withChildren = css`
  padding: 0 ${spacing.padding.small}px;
  min-width: ${spacing.padding.small * 2 + 24}px;
`

const stretch = css`
  width: 100%;
`

const iconWithChildren = css`
  margin-right: ${spacing.padding.mini}px;
`

const regularIcon = css`
  margin-top: -${Math.abs((ICON_SIZES.medium - forms.typography.regular.size) / 2)}px;
`

const smallIcon = css`
  margin-top: -${Math.abs((ICON_SIZES.small - forms.typography.small.size) / 2)}px;
`

const simpleSpacing = css`
  line-height: initial;
  padding: 0;
  min-width: initial;
  vertical-align: initial;
`

const VARIANTS = {
  primary,
  secondary,
  warning,
  primarySimple,
  warningSimple,
  primaryInverted,
  primaryInvertedSimple,
}

const ICON_COLOR_MAP = {
  primary: 'paperWhite',
  secondary: 'primary',
  warning: 'paperWhite',
  primarySimple: 'primary',
  warningSimple: 'candyRed',
  primaryInverted: 'paperWhite',
  primaryInvertedSimple: 'paperWhite',
}

const SIZES = { regular, small }

const SIZE_ICON_SIZE_MAP = { regular: regularIcon, small: smallIcon }

const blink = keyframes`
  0% {
    opacity: 0;
  }
  14% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`

const fade = keyframes`
  0% {
    opacity: 1;
  }

  65% {
    opacity: 1;
  }

  85% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const LoadingDots = styled(({ verticalAlign, ...rest }) => {
  return (
    <span aria-hidden="true" {...rest}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  )
})`
  animation-name: ${fade};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  display: inline-block;
  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      transform: translateY(-0.3em);
    `}

  & span {
    animation-name: ${blink};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-delay: -0.4s;
  }

  & span:nth-of-type(2n) {
    animation-delay: -0.2s;
  }

  & span:nth-of-type(3n) {
    animation-delay: 0s;
  }
`

export const Button = React.forwardRef(
  (
    { variant, size, stretched, icon: iconName, loading, children, ...rest },
    ref
  ) => {
    const classes = [
      base,
      VARIANTS[variant],
      SIZES[size],
      children && withChildren,
      (variant === 'primarySimple' || variant === 'warningSimple') &&
        simpleSpacing,
    ]
    if (stretched) classes.push(stretch)
    let icon = null
    if (iconName) {
      let iconColor = ICON_COLOR_MAP[variant]
      if (variant === 'secondary' && rest.disabled) {
        iconColor = 'primaryDisabled'
      }
      icon = (
        <Icon
          icon={iconName}
          color={iconColor}
          // TODO (jscheel): Using `small` even though it is 16px, as 12px (as
          // is defined in the sketch files), is too small here.
          size={size === 'small' ? 'small' : 'medium'}
          css={[
            SIZE_ICON_SIZE_MAP[size],
            children && iconWithChildren,
            iconClassHoverTarget,
          ]}
        />
      )
    }
    return (
      <motion.button
        css={classes}
        type="button"
        {...rest}
        aria-busy={loading}
        ref={ref}
      >
        {!loading && iconName && icon}
        {children}
        {loading && <LoadingDots verticalAlign={!children} />}
      </motion.button>
    )
  }
)

Button.propTypes = {
  /**
   * Specify variant
   */
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
  /**
   * Stretch button width to fill container
   */
  stretched: PropTypes.bool,
  /**
   * Icon
   */
  icon: PropTypes.oneOf(Object.keys(icons)),
  /**
   * Show loading indicator
   */
  loading: PropTypes.bool,
}

Button.defaultProps = {
  variant: 'primary',
  size: 'regular',
  icon: undefined,
  stretched: false,
  loading: false,
}
