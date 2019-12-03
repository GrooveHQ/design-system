import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color } from './shared/styles'

const SIZES = {
  big: 60,
  medium: 40,
  small: 24,
}

const StyledAvatar = styled.div`
  background: ${props =>
    !props.src || props.isLoading ? color.metalGrey : 'transparent'};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  height: ${props => SIZES[props.size]}px;
  width: ${props => SIZES[props.size]}px;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

export const Avatar = ({ src, name, ...props }) => {
  return (
    <StyledAvatar {...props}>
      <img src={src} alt={name} />
    </StyledAvatar>
  )
}

Avatar.propTypes = {
  isLoading: PropTypes.bool,
  /**
   * The name of the user
   */
  name: PropTypes.string,
  src: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
}

Avatar.defaultProps = {
  isLoading: false,
  name: '',
  src: null,
  size: 'medium',
}
