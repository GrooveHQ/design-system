import React from 'react'
import { Heading } from './Heading'

export default {
  title: 'Design System|Heading',
  parameters: {
    component: Heading,
  },
}

export const Heading1 = () => (
  <div>
    <Heading size="big">Heading 1 / Left </Heading>
    <Heading size="big" align="center">
      Heading 1 / Center
    </Heading>
    <Heading size="big" align="right">
      Heading 1 / Right
    </Heading>
  </div>
)

export const Heading2 = () => (
  <div>
    <Heading size="medium">Heading 2 / Left</Heading>
    <Heading size="medium" align="center">
      Heading 2 / Center
    </Heading>
    <Heading size="medium" align="right">
      Heading 2 / Right
    </Heading>
  </div>
)
