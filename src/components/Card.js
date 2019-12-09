import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from './shared/styles'

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
  box-shadow: ${props =>
    props.plain ? 'none' : '0 2px 6px 0 rgba(0, 0, 0, 0.15)'};
  padding: ${spacing.padding.tiny}px ${spacing.padding.small}px;
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