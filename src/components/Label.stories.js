import React from 'react'
import styled from '@emotion/styled'
import { Label } from './Label'

import { spacing } from './shared/styles'

export default {
  title: 'Design System/Label',
  component: Label,
}

const Span = styled.span`
  display: inline-block;
  margin-right: ${spacing.padding.tiny}px;
`

export const all = () => (
  <div>
    <Span>
      <Label>Primary</Label>
    </Span>
    <Span>
      <Label color="groovy">Groovy</Label>
    </Span>
    <Span>
      <Label color="mintGreen">Mint Green</Label>
    </Span>
    <Span>
      <Label color="sunYellow">Sun Yellow</Label>
    </Span>
    <Span>
      <Label color="candyRed">Candy Red</Label>
    </Span>
    <Span>
      <Label color="jetBlack">Jet Black</Label>
    </Span>
    <Span>
      <Label color="gunGrey">Gun Grey</Label>
    </Span>
  </div>
)

export const InvertTextColor = () => (
  <div>
    <Span>
      <Label color="moonGrey" invertText>
        Moon Grey (text inverted)
      </Label>
    </Span>
  </div>
)
