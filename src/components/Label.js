import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing, typography } from './shared/styles'

const StyledLabel = styled.div`
  display: inline-block;
  vertical-align: top;
  font-size: ${typography.sizes.p4.size}px;
  line-height: ${typography.sizes.p4.size}px;
  padding: ${spacing.padding.mini}px;
  border-radius: ${spacing.borderRadius.small}px;
  color: ${color.paperWhite};
  background: ${props => color[props.color]};
`

export const Label = ({ ...props }) => {
  return <StyledLabel {...props} />
}

Label.propTypes = {
  /**
   * Specify color
   */
  color: PropTypes.string,
}

Label.defaultProps = {
  color: 'primary',
}
