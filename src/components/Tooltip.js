/** @jsx jsx */

import { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { color, spacing, typography } from './shared/styles'

const wrapper = css`
  position: relative;
  display: inline-block;
`

const tooltipContent = css`
  background: ${color.jetBlack};
  border-radius: ${spacing.borderRadius.default}px;
  color: ${color.paperWhite};
  font-size: ${typography.sizes.p3.size}px;
  left: 50%;
  line-height: ${typography.sizes.p3.height}px;
  padding: ${spacing.padding.tiny}px;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  width: 211px;
  &:after {
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-width: 6px;
    margin-left: -6px;
  }
`

const top = css`
  bottom: 100%;
  margin-bottom: ${spacing.padding.tiny}px;
  &:after {
    top: 100%;
    border-top-color: ${color.jetBlack};
  }
`

const bottom = css`
  top: 100%;
  margin-top: ${spacing.padding.tiny}px;
  &:after {
    bottom: 100%;
    border-bottom-color: ${color.jetBlack};
  }
`

const POSITIONS = { top, bottom }

// TODO (jscheel): We need to decide what to do about passing props down through
// these wrappers. One one hand, I would expect any additional props to propagate
// to the tooltip's actual div, but at the same time, we have a wrapper div that
// should be used for event props.
export const Tooltip = ({
  label,
  position,
  visible,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const [show, setShow] = useState(visible)
  const controlled = visible !== null && visible !== undefined
  const createEvent = (val, propFn) => {
    if (controlled && !propFn) return undefined
    return e => {
      if (!controlled) setShow(val)
      if (propFn) propFn(e)
    }
  }
  useEffect(() => {
    setShow(visible)
  }, [visible])

  return (
    <div
      css={[wrapper]}
      onMouseEnter={createEvent(true, onMouseEnter)}
      onMouseLeave={createEvent(false, onMouseLeave)}
    >
      {children}
      {show && <div css={[tooltipContent, POSITIONS[position]]}>{label}</div>}
    </div>
  )
}

Tooltip.propTypes = {
  /**
   * Text of tooltip
   */
  label: PropTypes.string.isRequired,
  /**
   * State of field, inherited by child form components
   */
  position: PropTypes.oneOf(['top', 'bottom']),
  /**
   * Prop to control visibility manually, this disables the component's core hover state
   */
  visible: PropTypes.bool,
  /**
   * This prop is not passed to actual tooltip, but is instead passed to the wrapper element
   */
  onMouseEnter: PropTypes.func,
  /**
   * This prop is not passed to actual tooltip, but is instead passed to the wrapper element
   */
  onMouseLeave: PropTypes.func,
}

Tooltip.defaultProps = {
  position: 'top',
  visible: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
}
