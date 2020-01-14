import React from 'react'
import styled from '@emotion/styled'
import { Button } from './Button'
import { FlexContainer } from './FlexContainer'
import { FlexItem } from './FlexItem'
import { color, spacing } from './shared/styles'

export default {
  title: 'Design System|Button',
  parameters: {
    component: Button,
  },
}

const PrimaryBackground = styled.div`
  background: ${color.primary};
  padding: ${spacing.padding.medium}px;
`

export const Variants = () => (
  <FlexContainer gapHorizontal="small">
    <FlexItem>
      <Button variant="primary">primary</Button>
    </FlexItem>
    <FlexItem>
      <Button variant="secondary">secondary</Button>
    </FlexItem>
    <FlexItem>
      <Button variant="warning">warning</Button>
    </FlexItem>
    <FlexItem>
      <Button variant="primarySimple">primary simple</Button>
    </FlexItem>
    <FlexItem>
      <Button variant="warningSimple">warning simple</Button>
    </FlexItem>
  </FlexContainer>
)

export const Transparent = () => (
  <PrimaryBackground>
    <Button icon="arrowLeft" variant="primaryInverted" />
  </PrimaryBackground>
)

export const Sizes = () => (
  <FlexContainer gapHorizontal="small">
    <FlexItem>
      <Button size="regular">regular</Button>
    </FlexItem>
    <FlexItem>
      <Button size="small">small</Button>
    </FlexItem>
  </FlexContainer>
)

export const Disabled = () => <Button disabled>Submit</Button>

export const Stretched = () => <Button stretched>Submit</Button>

export const WithIcon = () => (
  <FlexContainer gapHorizontal="small">
    <FlexItem>
      <Button icon="paperPlane">Send</Button>
    </FlexItem>
    <FlexItem>
      <Button icon="paperPlane" size="small">
        Send
      </Button>
    </FlexItem>
  </FlexContainer>
)

export const IconOnly = () => (
  <FlexContainer gapHorizontal="small">
    <FlexItem>
      <Button icon="arrowLeft" variant="secondary" />
    </FlexItem>
    <FlexItem>
      <Button icon="arrowLeft" variant="secondary" size="small" />
    </FlexItem>
  </FlexContainer>
)

export const Loading = () => (
  <FlexContainer gapHorizontal="small">
    <FlexItem>
      <Button loading>Loading</Button>
    </FlexItem>
    <FlexItem>
      <Button icon="arrowLeft" loading />
    </FlexItem>
  </FlexContainer>
)
