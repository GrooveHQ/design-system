import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Icon } from './Icon'
import { contrast, stringToColor } from '../utils/colors'
import { avatars, typography } from './shared/styles'
import AvatarListContext from './AvatarList/AvatarListContext'

const presenceConfig = {
  colors: {
    online: 'mintGreen',
    offline: 'candyRed',
    away: 'sunYellow',
  },
  sizes: {
    none: {
      length: 0,
      positionOffset: 0,
    },
    tiny: {
      length: 5,
      positionOffset: 0,
    },
    small: {
      length: 5,
      positionOffset: 0,
    },
    medium: {
      length: 10,
      positionOffset: 1,
    },
    big: {
      length: 12,
      positionOffset: 2,
    },
  },
}

const StyledAvatarContainer = styled.div`
  display: inline-block;
  height: ${props => avatars.sizes[props.size]}px;
  width: ${props => avatars.sizes[props.size]}px;
  position: relative;

  &:after {
    display: ${props => (props.presence !== 'none' ? 'block' : 'none')};
    content: ' ';
    width: ${props => presenceConfig.sizes[props.size].length}px;
    height: ${props => presenceConfig.sizes[props.size].length}px;
    background-color: ${props =>
      `var(--color-${presenceConfig.colors[props.presence]})`};
    position: absolute;
    bottom: 0;
    right: ${props => presenceConfig.sizes[props.size].positionOffset}px;
    border-radius: 50%;
    border: solid 1px var(--color-paperWhite);
  }
`

const StyledAvatar = styled.div`
  background: ${props =>
    !props.src || props.isLoading ? 'var(--color-metalGrey)' : 'transparent'};
  border: ${({ border }) =>
    border ? `2px solid var(--color-paperWhite)` : 'none'};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  height: 100%;
  width: 100%;
  line-height: ${props => avatars.sizes[props.size] - 6}px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

// NOTE (jscheel): This caches the avatar urls so that we don't regenerate them
// every single time an image is requested. We may need to consider some limits
// and cache expiry in the future, but it's not necessary right now.
const generatedAvatarCache = {}

// NOTE (jscheel): Adapted from https://ppolyzos.com/2015/09/27/generate-avatar-image-from-user-initials-through-canvas/
function generateAvatarUrl(config) {
  const configWithDefaults = {
    ...config,
    background: config.background || stringToColor(config.name),
    color: config.color || contrast(stringToColor(config.name)),
    size: avatars.sizes[config.size],
  }
  const { background, color, name, size } = configWithDefaults

  const cacheKey = JSON.stringify(configWithDefaults)
    .split('')
    .reduce(
      (prevHash, currVal) =>
        // eslint-disable-next-line no-bitwise
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    )
    .toString()

  let dataURI = generatedAvatarCache[cacheKey]
  if (dataURI) return dataURI

  const letters = name.split(' ').reduce((memo, part) => {
    return memo + (part[0] || '')
  }, '')

  let canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = size
  canvas.height = size
  context.font = `${Math.round(size * 0.5)}px ${typography.type.primary}`
  context.textAlign = 'center'
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = color
  context.fillText(letters, size / 2, size / 1.5)
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  dataURI = canvas.toDataURL()
  generatedAvatarCache[cacheKey] = dataURI

  // NOTE (jscheel): Dispose of canvas to make sure we don't have memory issues
  canvas = null

  return dataURI
}

export const Avatar = ({
  src,
  size,
  name,
  isLoading,
  background,
  color,
  presence,
  border,
  ...props
}) => {
  let avatarFigure = <Icon size={size} icon="user" />
  const a11yProps = {}
  const listContext = useContext(AvatarListContext)
  let decodedName = decodeURIComponent(name)
  if (presence !== 'none') {
    decodedName += ` (${presence})`
  }

  if (isLoading) {
    a11yProps['aria-busy'] = true
    a11yProps['aria-label'] = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={name} />
  } else {
    avatarFigure = (
      <img
        src={generateAvatarUrl({ background, color, name, size })}
        alt={decodedName}
      />
    )
  }

  return (
    <StyledAvatarContainer
      size={listContext.size || size}
      title={decodedName}
      presence={presence}
    >
      <StyledAvatar
        size={listContext.size || size}
        border={border}
        {...a11yProps}
        {...props}
      >
        {avatarFigure}
      </StyledAvatar>
    </StyledAvatarContainer>
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
   * Background color as hex for generated avatar. Leave empty to auto generate color using name
   */
  background: PropTypes.string,
  /**
   * Text color as hex for generated avatar. Leave empty to automatically use contrasting color from background
   */
  color: PropTypes.string,

  /**
   * Should the avatar have a border
   */
  border: PropTypes.bool,

  /**
   * Specify if initial text for generated avatar should be bold
   */
  presence: PropTypes.oneOf(['none', 'online', 'offline', 'away']),
}

Avatar.defaultProps = {
  isLoading: false,
  name: '',
  src: null,
  size: 'medium',
  background: null,
  color: null,
  border: true,
  presence: 'none',
}
