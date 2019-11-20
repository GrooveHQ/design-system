import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { color, typography, spacing } from './shared/styles'

const SIZES = {
  big: 'h1',
  medium: 'h2',
}

const ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
}

const StyledHeading = styled.span`
  display: block;
  margin-bottom: ${spacing.padding.tiny}px;
  letter-spacing: normal;
  font-weight: ${props => typography.sizes[SIZES[props.size]].weight};
  font-size: ${props => typography.sizes[SIZES[props.size]].size}px;
  line-height: ${props => typography.sizes[SIZES[props.size]].height}px;
  color: ${color.jetBlack};
  text-align: ${props => ALIGNMENT[props.align]};
`

export const Heading = props => <StyledHeading {...props} />

Heading.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)).isRequired,
  /**
   * Specify alignmnet
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
}

Heading.defaultProps = {
  align: ALIGNMENT.left,
}
