import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icon'
import { Paragraph } from './Paragraph'
import { shadows, spacing } from './shared/styles'
import { transition } from './shared/animation'

const SIZES = {
  big: 56,
  medium: 48,
}

const StyledBadge = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  outline: none;
  box-shadow: ${props => (props.open ? shadows.high : shadows.low)};
  border-radius: ${props => SIZES[props.size]}px;
  background-color: var(--color-primary);
  min-width: ${props => SIZES[props.size]}px;
  max-width: 320px;
  height: ${props => SIZES[props.size]}px;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  position: relative;

  :hover {
    background-color: var(--color-primaryHover);
  }

  :active {
    background-color: var(--color-primaryActive);
  }
`

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => SIZES[props.size]}px;
  height: ${props => SIZES[props.size]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const TextContainer = styled(motion.div)`
  ${props =>
    props.icon
      ? `margin-left: ${SIZES[props.size]}px;`
      : `margin-left: ${spacing.padding.small}px;`}
  white-space: nowrap;
  overflow: hidden;
`

const Text = styled(Paragraph)`
  overflow: hidden;
  ${props => props.ellipsis && 'text-overflow: ellipsis;'}
  white-space: nowrap;
  margin: 0 ${spacing.padding.small}px 0 0;
`

const Count = styled(motion.custom(Paragraph))`
  border-radius: ${spacing.padding.tiny}px;
  border: 2px solid var(--color-paperWhite);
  background-color: var(--color-candyRed);
  padding: 0 ${spacing.padding.mini}px;
  position: absolute;
  top: 0;
  left: 100%;
  transform: translate3d(-${spacing.padding.small}px, 0, 0);
  z-index: 1;
`

const opacityVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: transition.duration.fast.s.number,
      easing: 'easeIn',
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: transition.duration.fast.s.number,
      easing: 'easeIn',
    },
  },
}

const widthVariants = {
  visible: {
    width: 'auto',
    transition: { stiffness: 500 },
  },
  hidden: {
    width: 0,
    transition: { stiffness: 500 },
  },
}

export const Badge = React.forwardRef(
  (
    {
      icon,
      text,
      open: controlledOpen,
      size,
      reverse,
      count,
      onClick,
      onAnimationComplete,
    },
    forwardedRef
  ) => {
    const controlled = controlledOpen !== undefined
    const [open, setOpen] = useState(controlled ? controlledOpen : false)
    const [textEllipsis, setTextEllipsis] = useState(false)

    useEffect(() => {
      if (controlled && open !== controlledOpen) {
        setOpen(o => !o)
      }
    }, [controlledOpen, controlled, open])

    const textRef = useCallback(node => {
      if (node !== null) {
        setTextEllipsis(node.clientWidth < node.scrollWidth)
      }
    }, [])

    const handleClick = useCallback(
      e => {
        if (!controlled) {
          setOpen(o => !o)
        }
        if (onClick) {
          onClick(e)
        }
      },
      [onClick, controlled]
    )

    return (
      <StyledBadge
        role="button"
        tabIndex={0}
        onClick={handleClick}
        ref={forwardedRef}
        size={size}
        reverse={reverse}
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          <IconContainer
            size={size}
            reverse={reverse}
            key={open ? 'open' : 'closed'}
          >
            <motion.div
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onAnimationComplete={!text && onAnimationComplete}
            >
              {open ? (
                <Icon icon="close" size={size} color="paperWhite" />
              ) : (
                icon && (
                  <Icon
                    icon={icon}
                    size={size}
                    text={text}
                    color="paperWhite"
                  />
                )
              )}
            </motion.div>
          </IconContainer>
        </AnimatePresence>

        {text && (
          <TextContainer
            size={size}
            reverse={reverse}
            icon={icon}
            variants={widthVariants}
            initial={open ? 'hidden' : 'visible'}
            animate={open ? 'hidden' : 'visible'}
            onAnimationComplete={text && onAnimationComplete}
          >
            <Text
              size={size}
              padded={false}
              color="paperWhite"
              bold
              ref={textRef}
              ellipsis={textEllipsis}
            >
              {text}
            </Text>
          </TextContainer>
        )}

        {count > 0 && (
          <Count
            variants={opacityVariants}
            animate={open ? 'hidden' : 'visible'}
            size="mini"
            color="paperWhite"
            bold
            padded={false}
          >
            {count > 99 ? '99+' : count}
          </Count>
        )}
      </StyledBadge>
    )
  }
)

Badge.propTypes = {
  icon: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
  /**
   * Specify text on the badge
   */
  text: PropTypes.string,
  /**
   * Specify the count of notification messages
   */
  count: PropTypes.number,
  /**
   * Specify whether badge is open, this will turn the component into a controlled component, and you will be responsible for controlling the open state through clicks, etc
   */
  open: PropTypes.bool,
  /**
   * Specify whether icon & text are reversed (right-hand placement)
   */
  reverse: PropTypes.bool,
  /**
   * Specify the onClick handler
   */
  onClick: PropTypes.func,
  /**
   * Specify the onAnimationComplete handler
   */
  onAnimationComplete: PropTypes.func,
}

Badge.defaultProps = {
  icon: null,
  size: 'big',
  text: null,
  count: 0,
  open: undefined,
  reverse: false,
  onClick: undefined,
  onAnimationComplete: undefined,
}
