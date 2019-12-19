import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Icon } from './Icon'
import { color, avatars } from './shared/styles'
import { AvatarListContext } from './AvatarList'

const StyledAvatar = styled.div`
  background: ${props =>
    !props.src || props.isLoading ? color.metalGrey : 'transparent'};
  border: 2px solid ${color.paperWhite};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  height: ${props => avatars.sizes[props.size]}px;
  width: ${props => avatars.sizes[props.size]}px;
  line-height: ${props => avatars.sizes[props.size] - 6}px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

export const Avatar = ({ src, size, name, isLoading, ...props }) => {
  let avatarFigure = <Icon size={size} icon="user" />
  const a11yProps = {}
  const listContext = useContext(AvatarListContext)

  if (isLoading) {
    a11yProps['aria-busy'] = true
    a11yProps['aria-label'] = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={name} />
  }

  return (
    <StyledAvatar size={listContext.size || size} {...a11yProps} {...props}>
      {avatarFigure}
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
  size: PropTypes.oneOf(Object.keys(avatars.sizes)),
}

Avatar.defaultProps = {
  isLoading: false,
  name: '',
  src: null,
  size: 'medium',
}
