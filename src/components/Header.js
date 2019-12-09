import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from './shared/styles'

const SIZES = {
  big: 176,
  medium: 128,
  small: 64,
}

const StyledHeader = styled.div`
  background-color: ${color.primary};
  padding: ${spacing.padding.small}px;
  height: ${props => SIZES[props.size]}px;
  border-top-left-radius: ${spacing.borderRadius.default}px;
  border-top-right-radius: ${spacing.borderRadius.default}px;

  // Links within Header
  a {
    opacity: 0.8;
  }

  a:hover {
    opacity: 1;
  }

  // Heading/Paragraph hover
  a:hover span,
  a:hover div {
    text-decoration: underline;
  }
`

export const Header = props => {
  const { children } = props
  return <StyledHeader {...props}>{children}</StyledHeader>
}

Header.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
}

Header.defaultProps = {
  size: 'small',
}
