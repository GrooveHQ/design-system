import React from 'react'
import styled from '@emotion/styled'
import { Avatar } from './Avatar'
import { color, spacing } from './shared/styles'

export default {
  title: 'Design System|Avatar',
  parameters: {
    component: Avatar,
  },
}

const Background = styled.div`
  background: ${color.moonGrey};
  padding: ${spacing.padding.medium}px;
`

export const big = () => (
  <Background>
    <Avatar
      size="big"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/5113"
    />
    <Avatar isLoading size="big" />
  </Background>
)

export const medium = () => (
  <Background>
    <Avatar
      size="medium"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/6704740"
    />
    <Avatar isLoading size="medium" />
  </Background>
)

export const small = () => (
  <Background>
    <Avatar
      size="small"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/211478"
    />
    <Avatar isLoading size="small" />
  </Background>
)
