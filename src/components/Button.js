/** @jsx jsx */

import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { color, infoColor, spacing, forms } from './shared/styles'
import { icons } from './shared/icons'
import { Icon, ICON_SIZES } from './Icon'

const base = css`
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
  border-color: ${color.candyRed};
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

const VARIANTS = { primary, secondary, warning, primaryInverted }
const SIZES = { regular, small }
const SIZE_ICON_SIZE_MAP = { regular: regularIcon, small: smallIcon }

export const Button = ({
  variant,
  size,
  stretched,
  icon: iconName,
  children,
  ...rest
}) => {
  const classes = [
    base,
    VARIANTS[variant],
    SIZES[size],
    children && withChildren,
  ]
  if (stretched) classes.push(stretch)
  let icon = null
  if (iconName) {
    let iconColor = variant === 'secondary' ? 'primary' : 'paperWhite'
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
    <button css={classes} type="button" {...rest}>
      {icon}
      {children}
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
}

Button.defaultProps = {
  variant: 'primary',
  size: 'regular',
  icon: undefined,
  stretched: false,
}
