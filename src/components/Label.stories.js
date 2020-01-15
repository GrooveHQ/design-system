import React from 'react'
import styled from '@emotion/styled'
import { Label } from './Label'

import { spacing } from './shared/styles'

export default {
  title: 'Design System/Label',
  component: Label,
}

const Span = styled.span`
  dispay: inline-block;
  margin-right: ${spacing.padding.tiny}px;
`

export const all = () => (
  <div>
    <Span>
      <a href="/">
        <Label>Primary</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="groovy">Groovy</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="mintGreen">Mint Green</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="sunYellow">Sun Yellow</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="candyRed">Candy Red</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="jetBlack">Jet Black</Label>
      </a>
    </Span>
    <Span>
      <a href="/">
        <Label color="gunGrey">Gun Grey</Label>
      </a>
    </Span>
  </div>
)
