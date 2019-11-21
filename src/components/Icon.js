import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { icons } from './shared/icons'
import { color } from './shared/styles'

const SIZES = {
  small: 16,
  medium: 24,
  large: 32,
}

const Svg = styled.svg`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);

  width: ${props => SIZES[props.size]}px;
  height: ${props => SIZES[props.size]}px;
`

const Path = styled.path`
  fill: currentColor;
`

/**
 * An Icon is a piece of visual element, but we must ensure its accessibility while using it.
 * It can have 2 purposes:
 *
 * - *decorative only*: for example, it illustrates a label next to it. We must ensure that it is ignored by screen readers, by setting `aria-hidden` attribute (ex: `<Icon icon="check" aria-hidden />`)
 * - *non-decorative*: it means that it delivers information. For example, an icon as only child in a button. The meaning can be obvious visually, but it must have a proper text alternative via `aria-label` for screen readers. (ex: `<Icon icon="print" aria-label="Print this document" />`)
 */
export function Icon({ icon, block, ...props }) {
  return (
    <Svg viewBox="0 0 24 24" block={block} {...props}>
      <Path d={icons[icon]} />
    </Svg>
  )
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  /**
   * Specify color
   */
  color: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
  block: PropTypes.bool,
}

Icon.defaultProps = {
  block: false,
  color: color.stoneGrey,
  size: 'medium',
}
