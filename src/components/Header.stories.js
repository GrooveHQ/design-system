import React from 'react'
import { Container } from './Container'
import { Header } from './Header'
import { Heading } from './Heading'

export default {
  title: 'Design System|Header',
  parameters: {
    component: Header,
  },
}

export const HeaderSmall = () => (
  <Container
    header={
      <Header>
        <Heading size="medium" color="paperWhite">
          Container header small
        </Heading>
      </Header>
    }
  />
)

export const HeaderMedium = () => (
  <Container
    header={
      <Header size="medium">
        <Heading size="medium" color="paperWhite">
          Container header medium
        </Heading>
      </Header>
    }
  />
)

export const HeaderBig = () => (
  <Container
    header={
      <Header size="big">
        <Heading size="medium" color="paperWhite">
          Container header big
        </Heading>
      </Header>
    }
  />
)
