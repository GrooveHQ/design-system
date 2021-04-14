import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import Color from 'color'
import mitt from 'mitt'
import { color as colors, spacing, shadows, forms } from './shared/styles'
import useScrollbarWidth from '../utils/useScrollbarWidth'
import { transition } from './shared/animation'

import { HeaderAnimatedHeightWrapper } from './Header'
import ContainerContext from './ContainerContext'

const StyleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 352px;
  border-radius: ${spacing.borderRadius.default}px;
  background-color: ${props => `var(--color-${props.backgroundColor})`};
  box-shadow: ${shadows.high};
  overflow: hidden;
  ${({ fluid }) =>
    fluid &&
    `width: 100%;
    min-width: 100%;
    box-shadow: none;
    border-radius: 0;`}
`

const StyledContent = styled(motion.div)`
  flex: 1 1 auto;
  ${props => {
    if (props.padded) {
      if (props.hasMedian) {
        return `padding: ${spacing.padding.small +
          forms.input.height.regular / 2}px ${spacing.padding.small}px ${
          spacing.padding.small
        }px ${spacing.padding.small}px;`
      }
      return `padding: ${spacing.padding.small}px;`
    }
    return null
  }}
  overflow-y: ${props => props.overflowY};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  position: relative;
`

const StyledBranding = styled(motion.div)`
  z-index: 9999999;
`

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  ${props =>
    props.padded ? `padding-bottom: ${spacing.padding.small}px;` : ''}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
`

const StyledMedian = styled(motion.div)`
  ${props => props.padded && `padding: 0 ${spacing.padding.small}px`};
  margin-top: -${forms.input.height.regular}px;
  top: ${forms.input.height.regular / 2}px;
  position: relative;
  z-index: 9999999;
  &:empty {
    display: none;
  }
  &:after {
    content: '';
    display: ${props => (props.gradient ? 'block' : 'none')};
    position: absolute;
    bottom: -${forms.input.height.regular / 4 + 3}px;
    left: 0;
    right: ${props => props.scrollbarWidth}px;
    height: ${forms.input.height.regular / 4}px;
    border-top: ${forms.input.height.regular / 2 + 3}px solid
      ${props => colors[props.gradientColor]};
    background: linear-gradient(
      ${props => colors[props.gradientColor]},
      ${props =>
        Color(colors[props.gradientColor])
          .fade(1)
          .rgb()
          .string()}
    );
    z-index: -1;
  }
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
    y: forms.input.height.regular / 2,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: transition.duration.default.s.number,
      opacity: { duration: transition.duration.fast.s.number },
    },
  },
  exit: {
    opacity: 0,
    y: forms.input.height.regular / 2,
    transition: {
      delay: 0.15,
      duration: transition.duration.default.s.number,
      opacity: { duration: transition.duration.fast.s.number },
    },
  },
}

const brandingAnimationVariants = {
  initial: { opacity: 0, y: spacing.padding.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'afterChildren',
      type: 'tween',
      duration: transition.duration.fast.s.number,
      delay: transition.duration.default.s.number + 0.1, // HACK (jscheel): Prevent it from animating in before sizing
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'beforeChildren',
      type: 'tween',
      duration: transition.duration.fast.s.number,
    },
  },
}

const scrollRange = [0, 100] // TODO (jscheel): Figure out way to make dynamic base on header content

const contentSizeEmitter = mitt()

export const Container = ({
  branding,
  children,
  prefix,
  header,
  median,
  padded,
  headerKey,
  bodyKey,
  medianKey,
  overlap,
  maxHeight,
  overflowY,
  fluid,
  ...rest
}) => {
  const scrollPositionMotionValue = useMotionValue(0)

  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const takeInnerContentRef = useCallback(node => {
    // NOTE (jscheel): Ideally, we would not have the ResizeObserver here, but
    // because of problems with passing a callbackRef via the context provider,
    // we instead have to do the work here. Also, we have to emit the size changes
    // via an emitter, instead of setting state that gets passed into the context
    // because we a) don't want to update the state that often, and b) updating
    // the state in the middle of the page transitions will break framer-motion.
    if (resizeObserverRef.current) {
      // NOTE (jscheel): The ref has changed for some reason, so we disconnect
      // the observer entirely to make sure we aren't listening to disconnected
      // nodes that are being removed from the dom.
      resizeObserverRef.current.disconnect()
    } else if (typeof window !== 'undefined' && !!window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const el = entry.target
          // NOTE (jscheel): Skip disconnected nodes (such as nodes animating out).
          if (!el?.isConnected) return
          contentSizeEmitter.emit('resize', el)
        })
      })
    }

    if (node && resizeObserverRef.current) {
      resizeObserverRef.current.observe(node)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [resizeObserverRef])

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return
    const scrollableDistance =
      contentRef.current.scrollHeight - contentRef.current.offsetHeight
    if (scrollableDistance < scrollRange[1]) {
      return
    }
    const { scrollTop } = contentRef.current
    scrollPositionMotionValue.set(scrollTop)
  }, [scrollPositionMotionValue])

  const setScrollTop = useCallback(
    y => {
      if (!contentRef.current) return
      contentRef.current.scrollTop = y
    },
    [contentRef]
  )

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

  useLayoutEffect(() => {
    handleScroll()
  }, [bodyKey, handleScroll])

  const contentPaddingBottom = useMotionValue(
    padded ? spacing.padding.small : 0
  )

  useEffect(() => {
    const scrollableDistance =
      contentRef.current.scrollHeight - contentRef.current.offsetHeight
    // HACK (jscheel): Don't calculate the new padding bottom when the container
    // hasn't actually rendered properly yet. This is a hacky solution that will
    // need to be replaced once we fix the sizing a bit better later.
    const containerHeight = containerRef.current.offsetHeight
    if (
      containerHeight > 0 &&
      scrollableDistance &&
      scrollableDistance < scrollRange[1]
    ) {
      const newBottom = scrollRange[1] - scrollableDistance
      contentPaddingBottom.set(newBottom)
    }
  }, [containerRef, contentRef, contentPaddingBottom, padded])

  const scrollbarWidth = useScrollbarWidth()

  const contextValue = useMemo(() => {
    return {
      overlap,
      scrollPositionMotionValue,
      scrollRange,
      setScrollTop,
      padded,
      fluid,
      hasMedian: !!median,
      contentSizeEmitter,
    }
  }, [overlap, scrollPositionMotionValue, setScrollTop, padded, fluid, median])

  return (
    <ContainerContext.Provider value={contextValue}>
      <StyleContainer {...rest} ref={containerRef} fluid={fluid}>
        {prefix}
        {header && (
          <div>
            <HeaderAnimatedHeightWrapper headerKey={headerKey}>
              {header}
            </HeaderAnimatedHeightWrapper>
          </div>
        )}
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

        <AnimatePresence exitBeforeEnter>
          <StyledContent
            padded={padded}
            variants={contentAnimationVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            key={bodyKey}
            ref={contentRef}
            onScroll={handleScroll}
            hasMedian={!!median}
            overflowY={overflowY}
            style={{
              ...(!median &&
                overlap && {
                  marginTop: bodyMarginTop,
                  paddingTop: scrollFixerHeight,
                  paddingBottom: contentPaddingBottom,
                }),
            }}
          >
            <InnerContent
              padded={padded}
              maxHeight={maxHeight}
              ref={takeInnerContentRef}
            >
              {children}
            </InnerContent>
          </StyledContent>
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          <StyledBranding
            variants={brandingAnimationVariants}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            {branding}
          </StyledBranding>
        </AnimatePresence>
      </StyleContainer>
    </ContainerContext.Provider>
  )
}

Container.propTypes = {
  /**
   * Specify branding
   */
  branding: PropTypes.node,
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
   * Collapse overlap on scroll
   */
  collapseOverlapOnScroll: PropTypes.bool,
  /**
   * Any content to show before the header, such as close button in mobile, notice bars, etc.
   */
  prefix: PropTypes.node,
  /**
   * Header component,
   */
  header: PropTypes.node,
  /**
   * Median component (sits between header and main content)
   */
  median: PropTypes.node,
  /**
   * Specify the overflow mode for the Y axes (auto (default), hidden, initial)
   */
  overflowY: PropTypes.string,
  /**
   * Specify the max height of the container content area (Default is unset)
   */
  maxHeight: PropTypes.string,
  /**
   * Full width container, bounded by parent
   */
  fluid: PropTypes.bool,
}

Container.defaultProps = {
  branding: null,
  backgroundColor: 'moonGrey',
  padded: true,
  overlap: false,
  collapseOverlapOnScroll: true,
  prefix: undefined,
  header: undefined,
  median: undefined,
  overflowY: 'auto',
  maxHeight: null,
  fluid: false,
}
