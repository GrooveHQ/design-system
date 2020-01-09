import React, { useState } from 'react'
import { Dropdown } from './Dropdown'
import { Button } from './Button'
import { Field } from './Forms/Field'
import { Input } from './Forms/Input'

export default {
  title: 'Design System|Dropdown',
  parameters: {
    component: Dropdown,
  },
}

const menuItems = [
  { key: 'leon', component: <a href="/leon">Leon Kowalski</a> },
  { key: 'pris', component: <a href="/pris">Pris Stratton</a> },
  { key: 'roy', component: <a href="/roy">Roy Batty</a> },
  { key: 'zhora', component: <a href="/zhora">Zhora Salome</a> },
  { key: 'deckard', component: <a href="/deckard">Rick Deckard</a> },
]

export const Basic = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: '200px' }}>
      <Dropdown
        items={menuItems}
        open={open}
        trigger={
          <Field>
            <Input
              label="Search replicant"
              type="text"
              name="replicant"
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
            />
          </Field>
        }
      />
    </div>
  )
}

export const WithLabel = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: '200px' }}>
      <Dropdown
        items={menuItems}
        open={open}
        label="Found replicants"
        trigger={
          <Field>
            <Input
              label="Search replicant"
              type="text"
              name="replicant"
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
            />
          </Field>
        }
      />
    </div>
  )
}

export const Unstretched = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: '200px' }}>
      <Dropdown
        items={menuItems}
        open={open}
        stretched={false}
        trigger={<Button onClick={() => setOpen(!open)}>Toggle</Button>}
      />
    </div>
  )
}

export const RightAligned = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: '200px' }}>
      <Dropdown
        items={menuItems}
        align="right"
        open={open}
        stretched={false}
        trigger={<Button onClick={() => setOpen(!open)}>Toggle</Button>}
      />
    </div>
  )
}
