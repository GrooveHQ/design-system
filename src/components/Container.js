import React, { useRef, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import Color from 'color'
import { color as colors, spacing, shadows, forms } from './shared/styles'
import useScrollbarWidth from '../utils/useScrollbarWidth'
import { transition } from './shared/animation'

import { Paragraph } from './Paragraph'
import { HeaderAnimatedHeightWrapper } from './Header'
import ContainerContext from './ContainerContext'

const StyleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 608px;
  width: 352px;
  border-radius: ${spacing.borderRadius.default}px;
  background-color: ${props => `var(--color-${props.backgroundColor})`};
  box-shadow: ${shadows.high};
  overflow: hidden;
`

const StyledContent = styled(motion.div)`
  flex: 1 1 auto;
  ${props => props.padded && `padding: ${spacing.padding.small}px`};
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  position: relative;
`

const StyledMedian = styled(motion.div)`
  ${props => props.padded && `padding: 0 ${spacing.padding.small}px`};
  margin-top: -${forms.input.height.regular / 2}px;
  position: relative;
  &:after {
    content: '';
    display: ${props => (props.gradient ? 'block' : 'none')};
    position: absolute;
    bottom: -13px;
    left: 0;
    right: ${props => props.scrollbarWidth}px;
    height: 10px;
    border-top: 3px solid ${props => colors[props.gradientColor]};
    background: linear-gradient(
      ${props => colors[props.gradientColor]},
      ${props =>
        Color(colors[props.gradientColor])
          .fade(1)
          .rgb()
          .string()}
    );
    z-index: 9999999;
  }
`

const StyledParagraph = styled(Paragraph)`
  display: block;
  flex: 0 0 auto;
  margin-top: auto;
`

const contentAnimationVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      type: 'tween',
      duration: transition.duration.fast.s.number,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      type: 'tween',
      duration: transition.duration.fast.s.number,
    },
  },
}

const medianAnimationVariants = {
  initial: {
    opacity: 0,
    y: -3,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: transition.duration.default.s.number,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: transition.duration.default.s.number,
    },
  },
}

export const Container = ({
  branded,
  appName,
  children,
  header,
  median,
  padded,
  headerKey,
  bodyKey,
  medianKey,
  overlap,
  ...rest
}) => {
  const scrollRange = [0, 100] // TODO (jscheel): Figure out way to make dynamic base on header content

  const scrollPositionMotionValue = useMotionValue(0)

  const contentRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return
    const { scrollTop } = contentRef.current
    scrollPositionMotionValue.set(scrollTop)
  }, [scrollPositionMotionValue])

  const bodyMarginTop = useTransform(scrollPositionMotionValue, scrollRange, [
    padded
      ? -(spacing.padding.large + spacing.padding.small)
      : -spacing.padding.large,
    0,
  ])

  const scrollFixerHeight = useTransform(
    scrollPositionMotionValue,
    scrollRange,
    [
      padded ? spacing.padding.small : 0,
      scrollRange[1] + (padded ? spacing.padding.small : 0),
    ]
  )

  const headerStubHeight = useTransform(
    scrollPositionMotionValue,
    scrollRange,
    [padded ? spacing.padding.large : spacing.padding.small, 0]
  )

  useLayoutEffect(() => {
    handleScroll()
  }, [bodyKey, handleScroll])

  const contentPaddingBottom = useMotionValue(
    padded ? spacing.padding.small : 0
  )
  useLayoutEffect(() => {
    const scrollableDistance =
      contentRef.current.scrollHeight - contentRef.current.offsetHeight
    if (scrollableDistance && scrollableDistance < scrollRange[1]) {
      const newBottom = scrollRange[1] - scrollableDistance
      contentPaddingBottom.set(newBottom)
    }
  }, [contentRef, contentPaddingBottom, scrollRange, padded])

  const scrollbarWidth = useScrollbarWidth()

  return (
    <ContainerContext.Provider
      value={{
        overlap,
        scrollPositionMotionValue,
        headerStubHeight,
        scrollRange,
      }}
    >
      <StyleContainer {...rest}>
        {header && (
          <div>
            <HeaderAnimatedHeightWrapper headerKey={headerKey}>
              {header}
            </HeaderAnimatedHeightWrapper>
          </div>
        )}
        <div>
          <AnimatePresence exitBeforeEnter initial={false}>
            <StyledMedian
              padded={padded}
              variants={medianAnimationVariants}
              initial="initial"
              animate="visible"
              exit="exit"
              key={medianKey}
              gradientColor={rest.backgroundColor}
              gradient={!!median}
              scrollbarWidth={scrollbarWidth}
            >
              {median}
            </StyledMedian>
          </AnimatePresence>
        </div>
        <AnimatePresence exitBeforeEnter initial={false}>
          <StyledContent
            padded={padded}
            variants={contentAnimationVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            key={bodyKey}
            ref={contentRef}
            onScroll={handleScroll}
            style={{
              ...(overlap && {
                marginTop: bodyMarginTop,
                paddingTop: scrollFixerHeight,
                paddingBottom: contentPaddingBottom,
              }),
            }}
          >
            {children}
            <AnimatePresence exitBeforeEnter initial={false}>
              {branded && (
                <motion.div
                  variants={contentAnimationVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  <StyledParagraph
                    size="small"
                    align="center"
                    color="stoneGrey"
                  >
                    {appName ? `${appName} ` : ''} ⚡️by Groove
                  </StyledParagraph>
                </motion.div>
              )}
            </AnimatePresence>
          </StyledContent>
        </AnimatePresence>
      </StyleContainer>
    </ContainerContext.Provider>
  )
}

Container.propTypes = {
  /**
   * Specify whether branded
   */
  branded: PropTypes.bool,
  /**
   * Specify branding app name
   */
  appName: PropTypes.string,
  /**
   * Specify background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Specify if adding is added to this container. Setting this causes gap to be ignored
   */
  padded: PropTypes.bool,
  /**
   * Overlap content and header, be sure to set withOverlap on header component
   */
  overlap: PropTypes.bool,
  /**
   * Header component,
   */
  header: PropTypes.node,
  /**
   * Median component (sits between header and main content)
   */
  median: PropTypes.node,
}

Container.defaultProps = {
  branded: false,
  appName: null,
  backgroundColor: 'moonGrey',
  padded: true,
  overlap: false,
  header: undefined,
  median: undefined,
}
