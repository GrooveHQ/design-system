import React from 'react'
import styled from '@emotion/styled'
import { spacing, typography } from './shared/styles'
import { FlexContainer as UnstyledFlexContainer } from './FlexContainer'
import { FlexItem as UnstyledFlexItem } from './FlexItem'

const FlexContainer = styled(UnstyledFlexContainer)`
  width: 100%;
  background: var(--color-gunGrey);
  text-align: center;
  padding: ${spacing.padding.tiny}px;
`

const FlexItem = styled(UnstyledFlexItem)`
  flex-basis: ${spacing.padding.massive}px;
  height: ${spacing.padding.massive}px;
  width: ${spacing.padding.massive}px;
  background: var(--color-sunYellow);
  border: 1px solid var(--color-paperWhite);
  color: var(--color-paperWhite);
  font-size: ${typography.sizes.h1.size}px;
  padding-top: 20px;
`

export default {
  title: 'Design System|Flex Items',
  parameters: {
    component: UnstyledFlexContainer,
    subcomponents: { UnstyledFlexItem },
  },
}

export const Horizontal = () => (
  <FlexContainer direction="horizontal">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem>3</FlexItem>
  </FlexContainer>
)

export const Vertical = () => (
  <FlexContainer direction="vertical">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem>3</FlexItem>
  </FlexContainer>
)

export const HorizontalAlignEnd = () => (
  <FlexContainer direction="horizontal" alignHorizontal="end">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem>3</FlexItem>
  </FlexContainer>
)

export const HorizontalAlignBetweenVerticalCenter = () => (
  <FlexContainer
    direction="horizontal"
    alignHorizontal="between"
    alignVertical="center"
    style={{ height: '120px' }}
  >
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem>3</FlexItem>
  </FlexContainer>
)

export const HorizontalGap = () => (
  <FlexContainer direction="horizontal" gapHorizontal="mini">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem gapHorizontal="large">3</FlexItem>
  </FlexContainer>
)

export const VerticalGap = () => (
  <FlexContainer direction="vertical" gapVertical="medium">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem>3</FlexItem>
  </FlexContainer>
)

export const AutoGap = () => (
  <FlexContainer direction="horizontal">
    <FlexItem>1</FlexItem>
    <FlexItem>2</FlexItem>
    <FlexItem gapHorizontal="auto">3</FlexItem>
  </FlexContainer>
)

export const VariousGaps = () => (
  <FlexContainer direction="horizontal" gapHorizontal="large" gapVertical="big">
    <FlexItem gapHorizontal="small" gapVertical="medium">
      1
    </FlexItem>
    <FlexItem gapHorizontal="medium" gapVertical="large">
      2
    </FlexItem>
    <FlexItem gapHorizontal="large" gapVertical="big">
      3
    </FlexItem>
  </FlexContainer>
)
