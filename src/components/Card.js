import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, shadows, spacing } from './shared/styles'

const BORDER_SIZES = {
  big: 'big',
  medium: 'medium',
  small: 'small',
}

const StyledCard = styled.div`
  background-color: ${props => color[props.color]};
  border-radius: ${props => spacing.borderRadius[props.radius]}px;
  margin-bottom: ${spacing.padding.tiny}px;
  text-align: left;
  box-shadow: ${props => (props.plain ? 'none' : shadows.low)};
  padding: ${spacing.padding.tiny}px ${spacing.padding.small}px;

  a:hover & {
    cursor: pointer;
    box-shadow: ${props => (props.plain ? 'none' : shadows.high)};
  }
`

export const Card = ({ children, ...props }) => (
  <StyledCard {...props}>{children}</StyledCard>
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
}

Card.defaultProps = {
  radius: 'medium',
  color: 'paperWhite',
  plain: false,
}
