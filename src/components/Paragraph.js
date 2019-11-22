import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, typography, spacing } from './shared/styles'

const SIZES = {
  big: 'p1',
  medium: 'p2',
  small: 'p3',
  tiny: 'p4',
}

const ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
}

const StyledParagraph = styled.span`
  display: ${props => (props.isInline ? 'inline' : 'inline-block')};
  padding-bottom: ${spacing.padding.tiny}px;
  letter-spacing: normal;
  font-weight: ${props => typography.sizes[SIZES[props.size]].weight};
  font-size: ${props => typography.sizes[SIZES[props.size]].size}px;
  line-height: ${props => typography.sizes[SIZES[props.size]].height}px;
  color: ${color.jetBlack};
  text-align: ${props => ALIGNMENT[props.align]};
`

export const Paragraph = props => <StyledParagraph {...props} />

Paragraph.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
  /**
   * Specify alignmnet
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Whether it is inline
   */
  isInline: PropTypes.bool,
}

Paragraph.defaultProps = {
  size: 'medium',
  align: ALIGNMENT.left,
  isInline: false,
}
