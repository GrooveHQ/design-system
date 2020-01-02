import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { spacing, avatars } from '../shared/styles'
import { Avatar } from '../Avatar'
import AvatarListContext from './AvatarListContext'

const ALIGNMENT = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

const AvatarListContainer = styled(
  ({ inline, align, spacing: spacingName, ...rest }) => <div {...rest} />
)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: row-reverse;
  justify-content: ${({ align }) => ALIGNMENT[align]};
  vertical-align: middle;
`

const AvatarItem = styled.div`
  transition: 0.2s;
  z-index: 1;
  &:not(:first-of-type) {
    margin-right: ${({ compact, spacing: spacingName }) =>
      spacing.padding[spacingName] * (compact ? -1 : 1)}px;
  }

  ${({ compact, spacing: spacingName }) => {
    if (!compact) return ''
    return `
    &:hover,
    &:focus-within {
      z-index: 2;
    }

    &:hover ~ &,
    &:focus-within ~ & {
      transform: translateX(-${spacing.padding[spacingName] / 2}px);
    }
  `
  }}
`

const AvatarList = ({
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
            <AvatarItem compact={compact} spacing={spacingName}>
              {child}
            </AvatarItem>
          )
        }).reverse()}
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
  children: PropTypes.arrayOf(PropTypes.instanceOf(Avatar)).isRequired,
}

AvatarList.defaultProps = {
  size: undefined,
  spacing: `mini`,
  inline: false,
  align: 'center',
  max: 8,
}

export default AvatarList
