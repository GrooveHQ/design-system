import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing, typography } from './shared/styles'

const StyledLabel = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: ${typography.sizes.p4.size}px;
  line-height: ${typography.sizes.p4.size}px;
  padding: ${spacing.padding.mini}px;
  border-radius: ${spacing.borderRadius.small}px;
  color: ${color.paperWhite};
  background: ${props => color[props.color]};

  a:hover &,
  a:focus & {
    background: ${props => color[`${props.color}Hover`]} !important;
  }

  a:visited &,
  a:active & {
    background: ${props => color[`${props.color}Active`]};
  }

  a:disabled & {
    background: ${props => color[`${props.color}Disabled`]};
  }
`

export const Label = React.forwardRef(({ ...props }, forwardedRef) => {
  return <StyledLabel {...props} ref={forwardedRef} />
})

Label.propTypes = {
  /**
   * Specify color
   */
  color: PropTypes.string,
}

Label.defaultProps = {
  color: 'primary',
}
