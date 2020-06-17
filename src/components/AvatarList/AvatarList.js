import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { spacing, avatars } from '../shared/styles'
import AvatarListContext from './AvatarListContext'

const ALIGNMENT = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

const listVariants = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.065,
    },
  },
}

const itemVariants = {
  initial: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  shifted: {
    x: -2,
  },
}

const AvatarListContainer = styled(motion.div)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: row-reverse;
  justify-content: ${({ align }) => ALIGNMENT[align]};
  vertical-align: middle;
`

const AvatarItem = styled(motion.div)`
  z-index: 1;
  &:not(:first-of-type) {
    margin-right: ${({ compact, spacing: spacingName }) =>
      spacing.padding[spacingName] * (compact ? -1 : 1)}px;
  }
`

const AvatarList = React.forwardRef(
  (
    {
      compact,
      compactHover,
      size,
      spacing: spacingName,
      max,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    // NOTE (jscheel): We set the initial value to `false` because we need to
    // check for false in the animate prop. By checking for false, we prevent the
    // prop from being set on the initial render (before a hover has happened).
    // This allows the parent variant to propagate the staggering entrance
    // animation. If we don't do this, the individual avatar's animate prop will
    // override the staggering, cause all of the avatars to animate in together.
    const [hoverOffsetCount, setHoverOffsetCount] = useState(false)
    // NOTE (jscheel): Because we reverse the children, we have to calculate
    // everything backwards to know which avatars to shift on hover.
    const count = React.Children.count(children)
    return (
      <AvatarListContainer
        variants={listVariants}
        initial="initial"
        animate="visible"
        {...rest}
        ref={forwardedRef}
      >
        <AvatarListContext.Provider value={{ size }}>
          {React.Children.toArray(children)
            .reverse()
            .map((child, idx) => {
              if (idx >= max) return null
              return (
                <AvatarItem
                  compact={compact}
                  spacing={spacingName}
                  variants={itemVariants}
                  animate={
                    hoverOffsetCount !== false &&
                    compact &&
                    compactHover &&
                    (idx > hoverOffsetCount ? 'shifted' : 'visible')
                  }
                  onHoverStart={() => {
                    setHoverOffsetCount(idx)
                  }}
                  onHoverEnd={() => {
                    setHoverOffsetCount(count)
                  }}
                  key={child.key || child.props.src}
                  custom={idx}
                >
                  {child}
                </AvatarItem>
              )
            })}
        </AvatarListContext.Provider>
      </AvatarListContainer>
    )
  }
)

AvatarList.propTypes = {
  /**
   * Specify default size of child avatars, this overrides any child avatar sizes to ensure consistency
   */
  size: PropTypes.oneOf(Object.keys(avatars.sizes)),
  /**
   * Gap (if regular) or overlap (if compact) size between avatars
   */
  spacing: PropTypes.oneOf(Object.keys(spacing.padding)),
  inline: PropTypes.bool,
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  max: PropTypes.number,
  // HACK (jscheel): Commenting out this prop-type because it causes a hook error for some reason
  // children: PropTypes.arrayOf(Avatar).isRequired,
  // END HACK
  /**
   * Overlap avatars
   */
  compact: PropTypes.bool,
  /**
   * Hovering over compact avatar list avatar will offset other avatars
   */
  compactHover: PropTypes.bool,
}

AvatarList.defaultProps = {
  size: undefined,
  spacing: `mini`,
  inline: false,
  align: 'center',
  max: 8,
  compact: false,
  compactHover: true,
}

export default AvatarList
