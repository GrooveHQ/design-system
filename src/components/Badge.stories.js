import React, { useState } from 'react'
import { Badge } from './Badge'

export default {
  title: 'Design System|Badge',
  parameters: {
    component: Badge,
  },
}

export const Variants = () => (
  <React.Fragment>
    <Badge icon="chat" />
    <Badge icon="chat" variant="secondary" />
  </React.Fragment>
)

export const Big = () => <Badge icon="chat" />
export const Medium = () => <Badge size="medium" icon="chat" />
export const WithText = () => (
  <React.Fragment>
    <Badge text="Need help?" icon="chat" size="medium" />
    <Badge text="Need help?" icon="chat" />
    <Badge
      text="This text is too long and will be cut off by an ellipsis"
      icon="chat"
    />
    <Badge text="Need help?" icon="chat" variant="secondary" />
  </React.Fragment>
)
export const TextOnly = () => <Badge text="Need help?" />
export const Controlled = () => {
  const [open, setOpen] = useState(true)
  return (
    <Badge
      text="Need help?"
      icon="chat"
      open={open}
      onClick={() => setOpen(v => !v)}
    />
  )
}
export const WithOnClick = () => (
  <Badge
    text="Need help?"
    icon="chat"
    // eslint-disable-next-line no-alert
    onClick={() => alert('Clicked')}
  />
)
export const WithCounts = () => (
  <div>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="bot" text="Need help?" count={4242} />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="chat" count={42} />
    </div>
    <div>
      <Badge icon="chat" count={1} />
    </div>
  </div>
)

export const Reverse = () => (
  <div style={{ textAlign: 'right' }}>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="chat" size="medium" count={42} reverse />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <Badge text="Need help?" icon="chat" count={4242} reverse />
    </div>
  </div>
)
