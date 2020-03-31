/** @jsx jsx */

import { useState, useCallback, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { spacing, typography } from './shared/styles'

const wrapper = css`
  position: relative;
`

const widthHackOffset = '100vw'
const widthHackTransform = `translateX(${widthHackOffset}) translateX(-50%)`

const tooltipContent = css`
  background: var(--color-jetBlack);
  border-radius: ${spacing.borderRadius.default}px;
  color: var(--color-paperWhite);
  font-size: ${typography.sizes.p3.size}px;
  left: 50%;
  line-height: ${typography.sizes.p3.height}px;
  padding: ${spacing.padding.tiny}px;
  position: absolute;
  text-align: center;
  max-width: 216px;
  /* HACK (jscheel): Makes tooltip width fit content and max width even in limited width containers */
  margin-left: -${widthHackOffset};
  transform: ${widthHackTransform};
  /* END HACK */
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
    border-top-color: var(--color-jetBlack);
  }
`

const bottom = css`
  top: 100%;
  margin-top: ${spacing.padding.tiny}px;
  &:after {
    bottom: 100%;
    border-bottom-color: var(--color-jetBlack);
  }
`

const POSITIONS = { top, bottom }

// TODO (jscheel): We need to decide what to do about passing props down through
// these wrappers. One one hand, I would expect any additional props to propagate
// to the tooltip's actual div, but at the same time, we have a wrapper div that
// should be used for event props.
export const Tooltip = ({
  text,
  position,
  visible,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const [show, setShow] = useState(visible)
  const controlled = visible !== null && visible !== undefined

  const handleMouseEnter = useCallback(
    e => {
      if (!controlled) setShow(true)
      if (onMouseEnter) onMouseEnter(e)
    },
    [controlled, onMouseEnter]
  )

  const handleMouseLeave = useCallback(
    e => {
      if (!controlled) setShow(false)
      if (onMouseLeave) onMouseLeave(e)
    },
    [controlled, onMouseLeave]
  )

  useEffect(() => {
    setShow(visible)
  }, [visible])

  return (
    <div
      css={[wrapper]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            css={[tooltipContent, POSITIONS[position]]}
            initial={{
              opacity: 0,
              translateY: 8 * (position === 'top' ? 1 : -1),
            }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 0 }}
            transformTemplate={(_, generated) =>
              `${widthHackTransform} ${generated}`
            }
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Tooltip.propTypes = {
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
