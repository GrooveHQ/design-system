import React from 'react'
import { Badge } from './Badge'

export default {
  title: 'Design System|Badge',
  parameters: {
    component: Badge,
  },
}

export const Big = () => <Badge icon="chat" />
export const Medium = () => <Badge size="medium" icon="chat" />
export const WithText = () => <Badge text="Need help?" icon="chat" />
export const TextOnly = () => <Badge text="Need help?" />
export const WithOnClick = () => (
  <Badge text="Need help?" icon="chat" onClick={() => alert('Clicked')} />
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

export const WithCountsMedium = () => (
  <div>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="bot" size="medium" text="Need help?" count={4242} />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="chat" size="medium" count={42} />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <Badge icon="chat" size="medium" count={1} />
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
