import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from './shared/styles'

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

const StyledHeader = styled.div`
  background-color: ${color.primary};
  border-top-left-radius: ${spacing.borderRadius.default}px;
  border-top-right-radius: ${spacing.borderRadius.default}px;
  position: relative;
  /* HACK (jscheel): This clips the bottom in a way that clips the inner height
     instead of the outer height. */
  &:after {
    content: ' ';
    display: block;
    height: ${props => containerSpacing[props.spacing].vertical}px;
    background-color: ${color.primary};
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  /* Links within Header */
  a,
  a:visited,
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

const InnerHeader = styled.div`
  padding: ${props => containerSpacing[props.spacing].vertical}px
    ${props => containerSpacing[props.spacing].horizontal}px;
  min-height: ${props => 64 - containerSpacing[props.spacing].vertical * 2}px;
  max-height: ${props =>
    224 - containerSpacing[props.spacing].horizontal * 2}px;
`

export const Header = props => {
  const { children } = props
  return (
    <StyledHeader {...props}>
      <InnerHeader {...props}>{children}</InnerHeader>
    </StyledHeader>
  )
}

Header.propTypes = {
  /**
   * Specify the padding sizes
   */
  spacing: PropTypes.oneOf(Object.keys(containerSpacing)),
}

Header.defaultProps = {
  spacing: 'small',
}
