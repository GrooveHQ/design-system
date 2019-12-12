import React from 'react'
import { Paragraph } from './Paragraph'

export default {
  title: 'Design System|Paragraph',
  parameters: {
    component: Paragraph,
  },
}

export const Big = () => (
  <div>
    <Paragraph size="big">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
    <Paragraph size="big" bold>
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>

    <Paragraph size="big" align="center">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
    <Paragraph size="big" align="right">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
  </div>
)

export const Medium = () => (
  <div>
    <Paragraph size="medium">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
    <Paragraph size="medium" bold>
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
    <Paragraph size="medium" align="center">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
    <Paragraph size="medium" align="right">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
  </div>
)

export const Small = () => (
  <Paragraph size="small">
    We&apos;re here every step of the way making sure you and your team deliver
    standout customer experiences easily with Groove.
  </Paragraph>
)

export const Tiny = () => (
  <Paragraph size="tiny">
    We&apos;re here every step of the way making sure you and your team deliver
    standout customer experiences easily with Groove.
  </Paragraph>
)
