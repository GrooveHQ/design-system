import React from 'react'
import { Container } from './Container'
import { Header } from './Header'
import { Heading } from './Heading'
import { Paragraph } from './Paragraph'

export default {
  title: 'Design System|Header',
  parameters: {
    component: Header,
  },
}

export const Basic = () => (
  <Container
    header={
      <Header>
        <Heading size="medium" color="paperWhite">
          Container header
        </Heading>
      </Header>
    }
  />
)

export const BasicWithSpacing = () => (
  <Container
    header={
      <Header spacing="small">
        <Heading size="medium" color="paperWhite">
          Container header
        </Heading>
      </Header>
    }
  />
)

export const MaxHeight = () => (
  <Container
    header={
      <Header>
        <Heading size="medium" color="paperWhite">
          Container header
        </Heading>
        <Paragraph color="paperWhite">
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Integer posuere erat a ante venenatis dapibus posuere
          velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet. Donec sed
          odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
          venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu
          leo. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem
          lacinia quam venenatis vestibulum.
        </Paragraph>
      </Header>
    }
  />
)
