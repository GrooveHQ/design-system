import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Icon } from './Icon'
import { contrast, stringToColor } from '../utils/colors'
import { color as sharedColors, avatars } from './shared/styles'
import { AvatarListContext } from './AvatarList'

const StyledAvatar = styled.div`
  background: ${props =>
    !props.src || props.isLoading ? sharedColors.metalGrey : 'transparent'};
  border: 2px solid ${sharedColors.paperWhite};
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

function generateAvatarUrl(config) {
  const uiAvatarsUrl = `https://ui-avatars.com/api/?`
  const parameters = []

  const configWithDefaults = {
    ...config,
    background: (config.background || stringToColor(config.name)).replace(
      '#',
      ''
    ),
    color: (config.color || contrast(stringToColor(config.name))).replace(
      '#',
      ''
    ),
    size: avatars.sizes[config.size],
  }

  ;['background', 'color', 'name', 'size', 'length', 'bold'].forEach(option => {
    parameters.push(`${option}=${configWithDefaults[option]}`)
  })

  return `${uiAvatarsUrl}${parameters.join('&')}`
}

export const Avatar = ({
  src,
  size,
  name,
  isLoading,
  background,
  color,
  length,
  bold,
  ...props
}) => {
  let avatarFigure = <Icon size={size} icon="user" />
  const a11yProps = {}
  const listContext = useContext(AvatarListContext)

  if (isLoading) {
    a11yProps['aria-busy'] = true
    a11yProps['aria-label'] = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={name} />
  } else {
    avatarFigure = (
      <img
        src={generateAvatarUrl({ background, color, name, size, length, bold })}
        alt={name}
      />
    )
  }

  return (
    <StyledAvatar size={listContext.size || size} {...a11yProps} {...props}>
      {avatarFigure}
    </StyledAvatar>
  )
}

Avatar.propTypes = {
  /**
   * Display avatar loading state
   */
  isLoading: PropTypes.bool,
  /**
   * The name of the user
   */
  name: PropTypes.string,
  /**
   * The avatar image source url (dont specify for auto generation)
   */
  src: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(avatars.sizes)),
  /**
   * Length of initials in generated avatar
   */
  length: PropTypes.number,
  /**
   * Background color as hex for generated avatar. Leave empty to auto generate color using name
   */
  background: PropTypes.string,
  /**
   * Text color as hex for generated avatar. Leave empty to automatically use contrasting color from background
   */
  color: PropTypes.string,
  /**
   * Specify if initial text for generated avatar should be bold
   */
  bold: PropTypes.bool,
}

Avatar.defaultProps = {
  isLoading: false,
  name: '',
  src: null,
  size: 'medium',
  length: 2,
  background: null,
  color: null,
  bold: true,
}
