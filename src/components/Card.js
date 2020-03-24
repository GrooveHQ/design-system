import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { color, shadows, spacing } from './shared/styles'

const BORDER_SIZES = {
  big: 'big',
  medium: 'medium',
  small: 'small',
}

const BORDERS = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
}

const StyledCard = styled(motion.div)`
  background-color: ${props => color[props.color]};
  border-radius: ${props => spacing.borderRadius[props.radius]}px;
  margin-bottom: ${spacing.padding.tiny}px;
  text-align: left;
  box-shadow: ${props => (props.plain ? 'none' : shadows.low)};
  padding: ${spacing.padding.tiny}px ${spacing.padding.small}px;

  border-style: ${props =>
    props.border && props.borderColor ? 'solid' : 'none'};
  border-color: ${props =>
    props.border && props.borderColor ? color[props.borderColor] : 'none'};
  border-top-width: ${props =>
    props.border === 'top' ? spacing.borderRadius.medium : 0}px;
  border-right-width: ${props =>
    props.border === 'right' ? spacing.borderRadius.medium : 0}px;
  border-bottom-width: ${props =>
    props.border === 'bottom' ? spacing.borderRadius.medium : 0}px;
  border-left-width: ${props =>
    props.border === 'left' ? spacing.borderRadius.medium : 0}px;

  a:hover & {
    cursor: pointer;
    border-color: ${props =>
      props.border && props.borderColor
        ? color[`${props.borderColor}Hover`]
        : 'none'};
  }
`

export const Card = React.forwardRef(
  ({ children, interactive, ...props }, ref) => (
    <StyledCard
      {...props}
      ref={ref}
      whileHover={
        interactive && {
          boxShadow: props.plain ? 'none' : shadows.high,
          y: -2,
        }
      }
    >
      {children}
    </StyledCard>
  )
)

Card.propTypes = {
  /**
   * Specify border radius size
   */
  radius: PropTypes.oneOf(Object.keys(BORDER_SIZES)),
  /**
   * Specify background color
   */
  color: PropTypes.string,
  /**
   * Specify whether card is plain
   */
  plain: PropTypes.bool,
  /**
   * Specify border
   */
  border: PropTypes.oneOf(Object.keys(BORDERS)),
  /**
   * Specify border color, applied if `border` is provided
   */
  borderColor: PropTypes.string,
  /**
   * Should the card raise up when hovered?
   */
  interactive: PropTypes.bool,
}

Card.defaultProps = {
  radius: 'medium',
  color: 'paperWhite',
  plain: false,
  border: undefined,
  borderColor: undefined,
  interactive: false,
}
