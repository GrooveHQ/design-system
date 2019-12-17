import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { spacing, avatars } from './shared/styles'

const ALIGNMENT = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

const AvatarListContainer = styled(
  ({ inline, align, spacing: spacingName, ...rest }) => <div {...rest} />
)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: row;
  justify-content: ${({ align }) => ALIGNMENT[align]};
  vertical-align: middle;
`

// NOTE (jscheel): We use `first` to avoid issues with emotion and SSR breaking
// the first-child selector https://emotion.sh/docs/ssr#on-client
const AvatarItem = styled(
  ({ compact, first, spacing: spacingName, ...rest }) => <div {...rest} />
)`
  margin-left: ${({ compact, first, spacing: spacingName }) => {
    if (first) return 0
    return spacing.padding[spacingName] * (compact ? -1 : 1)
  }}px;
`

export const AvatarListContext = React.createContext({
  size: undefined,
})

export const AvatarList = ({
  compact,
  size,
  spacing: spacingName,
  max,
  children,
  ...rest
}) => {
  return (
    <AvatarListContainer {...rest}>
      <AvatarListContext.Provider value={{ size }}>
        {React.Children.map(children, (child, idx) => {
          if (idx >= max) return null
          return (
            <AvatarItem
              compact={compact}
              spacing={spacingName}
              first={idx === 0}
            >
              {child}
            </AvatarItem>
          )
        })}
      </AvatarListContext.Provider>
    </AvatarListContainer>
  )
}

AvatarList.propTypes = {
  /**
   * Specify default size of child avatars, this overrides any child avatar sizes to ensure consistency
   */
  size: PropTypes.oneOf(Object.keys(avatars.sizes)),
  /**
   * Gap (if regular) or overlap (if compact) size between avatars
   */
  spacing: PropTypes.oneOf(Object.keys(spacing.padding)),
  inline: PropTypes.bool,
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  max: PropTypes.number,
}

AvatarList.defaultProps = {
  size: undefined,
  spacing: `mini`,
  inline: false,
  align: 'center',
  max: 8,
}
