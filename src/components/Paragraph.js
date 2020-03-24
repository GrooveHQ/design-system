import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, typography, spacing } from './shared/styles'

export const PARAGRAPH_SIZES = {
  big: 'p1',
  medium: 'p2',
  small: 'p3',
  tiny: 'p4',
  mini: 'p5',
}

const ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
}

const StyledParagraph = styled.span`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  padding-bottom: ${props => (props.padded ? spacing.padding.tiny : 0)}px;
  letter-spacing: normal;
  font-weight: ${props =>
    props.bold ? typography.weight.medium : typography.weight.normal};
  font-size: ${props => typography.sizes[PARAGRAPH_SIZES[props.size]].size}px;
  line-height: ${props =>
    typography.sizes[PARAGRAPH_SIZES[props.size]].height}px;
  color: ${props => color[props.color]};
  text-align: ${props => ALIGNMENT[props.align]};

  a:hover &,
  a:focus &,
  & a:hover,
  & a:focus {
    color: ${props => color[`${props.color}Hover`]};
  }

  a:visited &,
  a:active &,
  & a:visited,
  & a:active {
    color: ${props => color[`${props.color}Active`]};
  }

  a:disabled &,
  & a:disabled {
    color: ${props => color[`${props.color}Disabled`]};
  }
`

export const Paragraph = React.forwardRef((props, forwardedRef) => (
  <StyledParagraph {...props} ref={forwardedRef} />
))

Paragraph.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(PARAGRAPH_SIZES)),
  /**
   * Specify whether its bold
   */
  bold: PropTypes.bool,
  /**
   * Specify color
   */
  color: PropTypes.string,
  /**
   * Specify alignmnet
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Whether it is inline
   */
  inline: PropTypes.bool,
  /**
   * Whether it is padded
   */
  padded: PropTypes.bool,
}

Paragraph.defaultProps = {
  size: 'medium',
  bold: false,
  color: 'jetBlack',
  align: ALIGNMENT.left,
  inline: false,
  padded: true,
}
