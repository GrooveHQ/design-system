import React from 'react'
import { Avatar } from './Avatar'

export default {
  title: 'Design System|Avatar',
  parameters: {
    component: Avatar,
  },
}

export const big = () => (
  <div>
    <Avatar
      size="big"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/5113"
    />
    <Avatar isLoading size="big" />
  </div>
)

export const medium = () => (
  <div>
    <Avatar
      size="medium"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/6704740"
    />
    <Avatar isLoading size="medium" />
  </div>
)

export const small = () => (
  <div>
    <Avatar
      size="small"
      name="Tair Assimov"
      src="https://avatars2.githubusercontent.com/u/211478"
    />
    <Avatar isLoading size="small" />
  </div>
)
