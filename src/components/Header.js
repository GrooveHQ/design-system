import React from 'react'
import styled from '@emotion/styled'
import { color, spacing } from './shared/styles'

const StyledHeader = styled.div`
  background-color: ${color.primary};
  border-top-left-radius: ${spacing.borderRadius.default}px;
  border-top-right-radius: ${spacing.borderRadius.default}px;
  overflow: hidden;
  position: relative;
  /* HACK (jscheel): This clips the bottom in a way that clips the inner height
     instead of the outer height. */
  &:after {
    content: ' ';
    display: block;
    height: 16px;
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

// HACK (jscheel): We use margins here to make margins collapse with the content.
const InnerHeader = styled.div`
  margin: ${spacing.padding.small}px;
  min-height: ${64 - spacing.padding.small * 2}px;
  max-height: ${224 - spacing.padding.small * 2}px;
`

export const Header = props => {
  const { children } = props
  return (
    <StyledHeader {...props}>
      <InnerHeader>{children}</InnerHeader>
    </StyledHeader>
  )
}
