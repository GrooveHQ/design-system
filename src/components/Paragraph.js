import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, typography, spacing } from './shared/styles'

const SIZES = {
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
  display: ${props => (props.inline ? 'inline' : 'block')};
  padding-bottom: ${props => (props.padded ? spacing.padding.tiny : 0)}px;
  letter-spacing: normal;
  font-weight: ${props => typography.sizes[SIZES[props.size]].weight};
  font-size: ${props => typography.sizes[SIZES[props.size]].size}px;
  line-height: ${props => typography.sizes[SIZES[props.size]].height}px;
  color: ${props => color[props.color]};
  text-align: ${props => ALIGNMENT[props.align]};
`

export const Paragraph = props => <StyledParagraph {...props} />

Paragraph.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
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
  color: 'jetBlack',
  align: ALIGNMENT.left,
  inline: false,
  padded: true,
}
