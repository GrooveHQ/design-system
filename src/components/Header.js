import React, { useRef, useContext, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import ContainerContext from './ContainerContext'
import { spacing, forms } from './shared/styles'
import { transition } from './shared/animation'

const containerSpacing = {
  small: {
    horizontal: spacing.padding.small,
    vertical: spacing.padding.tiny,
  },
  medium: {
    horizontal: spacing.padding.small,
    vertical: spacing.padding.small,
  },
}

const StyledHeader = styled(motion.div)`
  background-color: var(--color-primary);
  border-top-left-radius: ${spacing.borderRadius.default}px;
  border-top-right-radius: ${spacing.borderRadius.default}px;
  position: relative;
  flex-shrink: 0;

  /* Links within Header */
  a,
  a:active,
  a:focus {
    opacity: 0.8;
    text-decoration: none;
  }

  a:hover {
    opacity: 1;
  }

  /* Heading/Paragraph hover */
  a:hover span,
  a:hover div {
    text-decoration: underline;
  }
`

const InnerHeader = styled(motion.div)`
  padding: ${props => containerSpacing[props.spacing].vertical}px
    ${props => containerSpacing[props.spacing].horizontal}px;
  min-height: ${props => 64 - containerSpacing[props.spacing].vertical * 2}px;
`

const heightVariants = {
  initial: ({ prevHeight, withMedian }) => {
    return {
      height: prevHeight,
      paddingBottom: withMedian ? spacing.padding.small : 0,
      transition: {
        type: 'tween',
        duration: transition.duration.default.s.number,
        ease: 'easeInOut',
      },
    }
  },
  visible: ({ withMedian }) => {
    return {
      height: 'auto',
      paddingBottom: withMedian ? spacing.padding.small : 0,
      transition: {
        type: 'tween',
        duration: transition.duration.default.s.number,
        ease: 'easeInOut',
      },
    }
  },
  exit: ({ withMedian }) => {
    return {
      height: 'auto',
      paddingBottom: withMedian ? spacing.padding.small : 0,
      transition: {
        type: 'tween',
        duration: transition.duration.default.s.number,
        ease: 'easeInOut',
      },
    }
  },
}

const headerVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      duration: transition.duration.default.s.number,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      type: 'tween',
      duration: transition.duration.default.s.number,
      ease: 'easeInOut',
    },
  },
}

const HeaderContext = React.createContext({
  previousHeight: 0,
  setPreviousHeight: () => {},
})

export const HeaderAnimatedHeightWrapper = ({ headerKey, children }) => {
  const [previousHeight, setPreviousHeight] = useState(0)
  return (
    <HeaderContext.Provider value={{ previousHeight, setPreviousHeight }}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <React.Fragment key={headerKey}>{children}</React.Fragment>
      </AnimatePresence>
    </HeaderContext.Provider>
  )
}

export const Header = React.forwardRef(
  (
    {
      spacing: spacingProp,
      withMedian,
      withOverlap,
      collapseOverlapOnScroll,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const headerRef = useRef(null)
    // NOTE (jscheel): We use the entire context for the useLayoutEffect dependency
    // so that it doesn't re-run each time a prop updates on the container.
    const animatedHeaderCtx = useContext(HeaderContext)
    const {
      hasMedian,
      padded,
      scrollPositionMotionValue,
      scrollRange,
    } = useContext(ContainerContext)

    let startingStubHeight = padded
      ? spacing.padding.large
      : spacing.padding.small
    if (hasMedian) {
      startingStubHeight = forms.input.height.regular / 2
    }

    const headerStubHeight = useTransform(
      scrollPositionMotionValue,
      scrollRange,
      [startingStubHeight, collapseOverlapOnScroll ? 0 : startingStubHeight]
    )

    useLayoutEffect(() => {
      const headerRefCurrent = headerRef.current
      return () => {
        if (!headerRefCurrent) return
        let prevHeaderHeight = headerRefCurrent.offsetHeight
        if (withMedian) {
          prevHeaderHeight += spacing.padding.small
        }
        animatedHeaderCtx.setPreviousHeight(prevHeaderHeight)
      }
    }, [animatedHeaderCtx, headerRef, withMedian])

    if (!React.Children.count(children)) return null

    return (
      <StyledHeader
        spacing={spacingProp}
        {...rest}
        ref={forwardedRef}
        variants={heightVariants}
        initial="initial"
        animate="visible"
        exit="exit"
        custom={{
          prevHeight: animatedHeaderCtx.previousHeight,
          withMedian,
        }}
      >
        <InnerHeader
          spacing={spacingProp}
          ref={headerRef}
          variants={headerVariants}
        >
          {children}
          <motion.div style={{ height: withOverlap ? headerStubHeight : 0 }} />
        </InnerHeader>
      </StyledHeader>
    )
  }
)

Header.propTypes = {
  /**
   * Specify the padding sizes
   */
  spacing: PropTypes.oneOf(Object.keys(containerSpacing)),
  /**
   * Add space to bottom to account for median
   */
  withMedian: PropTypes.bool,
  /**
   * Header is used in overlap-enabled container
   */
  withOverlap: PropTypes.bool,
}

Header.defaultProps = {
  spacing: 'medium',
  withMedian: false,
  withOverlap: false,
}
