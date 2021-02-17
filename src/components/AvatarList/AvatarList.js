import React from 'react'
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
              const additionalProps = {}
              if (compact && compactHover) {
                additionalProps.whileHover = { zIndex: 10 }
              }
              return (
                <AvatarItem
                  compact={compact}
                  spacing={spacingName}
                  variants={itemVariants}
                  key={child.key || child.props.src}
                  custom={idx}
                  {...additionalProps}
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
