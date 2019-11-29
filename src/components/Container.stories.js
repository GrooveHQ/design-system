import React from 'react'
import { Container } from './Container'
import { Heading } from './Heading'

export default {
  title: 'Design System|Container',
  parameters: {
    component: Container,
  },
}

export const ContainerDefault = () => <Container />
export const ContainerBranded = () => <Container branded appName="Chat" />
export const ContainerWithChildren = () => (
  <Container branded appName="Chat">
    <Heading size="medium" align="center">
      Take care of your children
    </Heading>
  </Container>
)
