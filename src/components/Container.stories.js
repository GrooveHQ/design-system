import React from 'react'
import { Container } from './Container'
import { Heading } from './Heading'

export default {
  title: 'Design System|Container',
  parameters: {
    component: Container,
  },
}

export const Default = () => <Container />
export const Branded = () => <Container branded appName="Chat" />
export const WithChildren = () => (
  <Container branded appName="Chat">
    <Heading size="medium" align="center">
      Take care of your children
    </Heading>
  </Container>
)
