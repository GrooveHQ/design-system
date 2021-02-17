import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { icons } from './shared/icons'
import { generateTransition } from './shared/animation'

export const ICON_SIZES = {
  small: 16,
  medium: 24,
  big: 32,
  huge: 64,
  massive: 112, // 80 + 16 svg view box padding
}

const Svg = styled.svg`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);

  width: ${props => ICON_SIZES[props.size]}px;
  height: ${props => ICON_SIZES[props.size]}px;
`

const Path = styled.path`
  fill: ${props => `var(--color-${props.color})`};
  transition: ${generateTransition('fill')};
  ${Svg}:hover & {
    fill: ${props => `var(--color-${props.hoverColor || props.color})`};
  }
`

/**
 * An Icon is a piece of visual element, but we must ensure its accessibility while using it.
 * It can have 2 purposes:
 *
 * - *decorative only*: for example, it illustrates a label next to it. We must ensure that it is ignored by screen readers, by setting `aria-hidden` attribute (ex: `<Icon icon="check" aria-hidden />`)
 * - *non-decorative*: it means that it delivers information. For example, an icon as only child in a button. The meaning can be obvious visually, but it must have a proper text alternative via `aria-label` for screen readers. (ex: `<Icon icon="print" aria-label="Print this document" />`)
 */
export const Icon = React.forwardRef(
  ({ icon, block, color, hoverColor, hover, ...props }, forwardedRef) => {
    return (
      <Svg
        viewBox="0 0 24 24"
        block={block}
        hover={hover}
        {...props}
        ref={forwardedRef}
      >
        <Path d={icons[icon]} color={color} hoverColor={hoverColor} />
      </Svg>
    )
  }
)

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  /**
   * Specify color
   */
  color: PropTypes.string,
  /**
   * Specify hover color
   */
  hoverColor: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(ICON_SIZES)),
  block: PropTypes.bool,
  hover: PropTypes.bool,
}

Icon.defaultProps = {
  block: false,
  color: 'stoneGrey',
  hoverColor: undefined,
  size: 'medium',
  hover: false,
}
