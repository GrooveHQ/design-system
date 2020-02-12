/** @jsx jsx */

import PropTypes from 'prop-types'
import { css, jsx, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { color, infoColor, spacing, forms, typography } from './shared/styles'
import { icons } from './shared/icons'
import { Icon, ICON_SIZES } from './Icon'

const base = css`
  align-self: flex-start;
  background-color: ${color.paperWhite};
  border-radius: ${spacing.borderRadius.default}px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  /* NOTE (jscheel): Normally, this padding will be larger because children will exist. */
  padding: 0 ${spacing.padding.tiny}px;
  min-width: ${spacing.padding.tiny * 2 + 24}px;
  vertical-align: middle;
  /* HACK (jscheel): Hack for https://github.com/facebook/react/issues/4251 */
  &[disabled] {
    pointer-events: none;
  }
  /* END HACK */
`

const primary = css`
  background-color: ${color.primary};
  border-color: ${color.primary};
  color: ${color.paperWhite};
  &:hover {
    background-color: ${color.primaryHover};
    border-color: ${color.primaryHover};
  }
  &:active {
    background-color: ${color.primaryActive};
    border-color: ${color.primaryHover};
  }
  &:disabled {
    background-color: ${color.primaryDisabled};
    border-color: ${color.primaryDisabled};
  }
`

const primarySimple = css`
  color: ${color.primary};
  background-color: transparent;
  border: none;
  font-weight: ${typography.weight.medium};
  &:hover {
    color: ${color.primaryHover};
  }
  &:active {
    color: ${color.primaryActive};
  }
  &:disabled {
    color: ${color.primaryDisabled};
  }
`

const secondary = css`
  background-color: ${color.paperWhite};
  border-color: ${color.primary};
  color: ${color.primary};
  &:hover {
    border-color: ${color.primaryHover};
  }
  &:active {
    border-color: ${color.primaryActive};
  }
  &:disabled {
    border-color: ${color.primaryDisabled};
    color: ${color.primaryDisabled};
  }
`

const warning = css`
  background-color: ${infoColor.error};
  border-color: ${infoColor.error};
  color: ${color.paperWhite};
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
  border-color: ${color.paperWhite};
  color: ${color.paperWhite};
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &:active {
    background-color: ${color.paperWhite};
    opacity: 1;
    ${iconClassHoverTarget} path {
      fill: ${color.primary};
    }
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
}

const ICON_COLOR_MAP = {
  primary: 'paperWhite',
  secondary: 'primary',
  warning: 'paperWhite',
  primarySimple: 'primary',
  warningSimple: 'candyRed',
  primaryInverted: 'paperWhite',
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

export const Button = ({
  variant,
  size,
  stretched,
  icon: iconName,
  loading,
  children,
  ...rest
}) => {
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
    <button css={classes} type="button" {...rest} aria-busy={loading}>
      {!loading && iconName && icon}
      {children}
      {loading && <LoadingDots verticalAlign={!children} />}
    </button>
  )
}

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
