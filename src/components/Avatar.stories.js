import React from 'react'
import styled from '@emotion/styled'
import { Avatar } from './Avatar'
import { AvatarList } from './AvatarList'
import { color, spacing } from './shared/styles'

export default {
  title: 'Design System|Avatar',
  parameters: {
    component: Avatar,
    subcomponents: { AvatarList },
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
      name="Kevin Rademan"
      src="https://avatars2.githubusercontent.com/u/6704740"
    />
    <Avatar isLoading size="medium" />
  </Background>
)

export const small = () => (
  <Background>
    <Avatar
      size="small"
      name="Jared Scheel"
      src="https://avatars0.githubusercontent.com/u/211478"
    />
    <Avatar isLoading size="small" />
  </Background>
)

export const BasicList = () => (
  <Background>
    <AvatarList>
      <Avatar
        name="Tair Assimov"
        src="https://avatars2.githubusercontent.com/u/5113"
      />
      <Avatar
        name="Kevin Rademan"
        src="https://avatars2.githubusercontent.com/u/6704740"
      />
      <Avatar
        name="Jared Scheel"
        src="https://avatars0.githubusercontent.com/u/211478"
      />
    </AvatarList>
  </Background>
)

export const SizedList = () => (
  <React.Fragment>
    <Background>
      <AvatarList size="small">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList size="medium">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList size="big">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
  </React.Fragment>
)

export const CompactList = () => (
  <Background>
    <AvatarList compact>
      <Avatar
        name="Tair Assimov"
        src="https://avatars2.githubusercontent.com/u/5113"
      />
      <Avatar
        name="Kevin Rademan"
        src="https://avatars2.githubusercontent.com/u/6704740"
      />
      <Avatar
        name="Jared Scheel"
        src="https://avatars0.githubusercontent.com/u/211478"
      />
    </AvatarList>
  </Background>
)

export const ListAlignment = () => (
  <React.Fragment>
    <Background>
      <AvatarList align="start">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList align="center">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList align="end">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
  </React.Fragment>
)

export const ListSpacing = () => (
  <React.Fragment>
    <Background>
      <AvatarList spacing="big">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList spacing="huge">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
    <Background>
      <AvatarList compact spacing="medium">
        <Avatar
          name="Tair Assimov"
          src="https://avatars2.githubusercontent.com/u/5113"
        />
        <Avatar
          name="Kevin Rademan"
          src="https://avatars2.githubusercontent.com/u/6704740"
        />
        <Avatar
          name="Jared Scheel"
          src="https://avatars0.githubusercontent.com/u/211478"
        />
      </AvatarList>
    </Background>
  </React.Fragment>
)

export const InlineList = () => (
  <Background>
    <AvatarList inline>
      <Avatar
        name="Tair Assimov"
        src="https://avatars2.githubusercontent.com/u/5113"
      />
      <Avatar
        name="Kevin Rademan"
        src="https://avatars2.githubusercontent.com/u/6704740"
      />
      <Avatar
        name="Jared Scheel"
        src="https://avatars0.githubusercontent.com/u/211478"
      />
    </AvatarList>
    <span> &mdash; </span>
    <AvatarList inline>
      <Avatar
        name="Jared Scheel"
        src="https://avatars0.githubusercontent.com/u/211478"
      />
      <Avatar
        name="Kevin Rademan"
        src="https://avatars2.githubusercontent.com/u/6704740"
      />
      <Avatar
        name="Tair Assimov"
        src="https://avatars2.githubusercontent.com/u/5113"
      />
    </AvatarList>
  </Background>
)

export const MaxItems = () => (
  <Background>
    <AvatarList compact max={2}>
      <Avatar
        name="Tair Assimov"
        src="https://avatars2.githubusercontent.com/u/5113"
      />
      <Avatar
        name="Kevin Rademan"
        src="https://avatars2.githubusercontent.com/u/6704740"
      />
      <Avatar
        name="Jared Scheel"
        src="https://avatars0.githubusercontent.com/u/211478"
      />
    </AvatarList>
  </Background>
)
