import React from 'react'
import { Paragraph } from './Paragraph'

export default {
  title: 'Design System|Paragraph',
  parameters: {
    component: Paragraph,
  },
}

export const Paragraph1 = () => (
  <div>
    <div>
      <Paragraph size="big">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
    <div>
      <Paragraph size="big" align="center">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
    <div>
      <Paragraph size="big" align="right">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
  </div>
)

export const Paragraph2 = () => (
  <div>
    <div>
      <Paragraph size="medium">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
    <div>
      <Paragraph size="medium" align="center">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
    <div>
      <Paragraph size="medium" align="right">
        We&apos;re here every step of the way making sure you and your team
        deliver standout customer experiences easily with Groove.
      </Paragraph>
    </div>
  </div>
)

export const Paragraph3 = () => (
  <div>
    <Paragraph size="small">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
  </div>
)

export const Paragraph4 = () => (
  <div>
    <Paragraph size="tiny">
      We&apos;re here every step of the way making sure you and your team
      deliver standout customer experiences easily with Groove.
    </Paragraph>
  </div>
)
