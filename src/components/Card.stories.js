import React from 'react'
import { Card } from './Card'
import { Paragraph } from './Paragraph'

export default {
  title: 'Design System|Card',
  parameters: {
    component: Card,
  },
}

export const Default = () => (
  <Card>
    <Paragraph size="medium" padded={false}>
      Default card
    </Paragraph>
    <Paragraph size="small" padded={false}>
      White card with a bit of border radius and nice shadow.
    </Paragraph>
  </Card>
)

export const Rounded = () => (
  <Card radius="big">
    <Paragraph size="medium" padded={false}>
      Rounded card
    </Paragraph>
    <Paragraph size="small" padded={false}>
      Card with a bigger border radius.
    </Paragraph>
  </Card>
)

export const Colored = () => (
  <Card radius="big" color="primary">
    <Paragraph size="medium" padded={false} color="paperWhite">
      Colored card
    </Paragraph>
    <Paragraph size="small" padded={false} color="paperWhite">
      Card with primary background color and a bigger border radius.
    </Paragraph>
  </Card>
)

export const Plain = () => (
  <Card radius="big" color="ashGrey">
    <Paragraph size="medium" padded={false}>
      Plain card
    </Paragraph>
    <Paragraph size="small" padded={false}>
      Plain card (no shadow) with ashGrey background color and a bigger border
      radius.
    </Paragraph>
  </Card>
)
