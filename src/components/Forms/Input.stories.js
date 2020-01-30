import React from 'react'
import { Input } from './Input'
import { Field } from './Field'
import { Button } from '../Button'

export default {
  title: 'Design System|Forms/Input',
  parameters: {
    component: Input,
  },
}

export const Basic = () => (
  <React.Fragment>
    <Field>
      <Input label="Replicant's Name" type="text" name="name" />
    </Field>
    <br />
    <br />
    <Field>
      <Input label="Enter password" type="password" name="password" />
    </Field>
    <br />
    <br />
    <Field>
      <Input label="Replicant's Age" type="number" name="age" min="1" max="4" />
    </Field>
  </React.Fragment>
)

export const Unstretched = () => (
  <Field>
    <Input label="Replicant's Name" type="text" name="name" stretched={false} />
  </Field>
)

export const WithIcon = () => (
  <Field>
    <Input
      label="Enter your email"
      type="text"
      name="email"
      stretched={false}
      icon="envelope"
      iconPosition="left"
    />
  </Field>
)

export const WithIconRightClick = () => (
  <Field>
    <Input
      label="Search for articles"
      type="text"
      name="search"
      stretched={false}
      icon="search"
      onIconClick={() => {
        // eslint-disable-next-line no-alert
        alert('Icon click handler')
      }}
    />
  </Field>
)

export const WithButton = () => (
  <Field>
    <Input
      label="Enter your email"
      type="text"
      name="email"
      stretched={false}
      button={<Button icon="arrowRight" />}
    />
  </Field>
)

export const SuccessState = () => (
  <Field validationState="success" successMessage="Username is available">
    <Input
      label="Username"
      type="text"
      name="username"
      defaultValue="eldontyrell"
      stretched={false}
    />
  </Field>
)

export const ErrorState = () => (
  <Field validationState="error" errorMessage="Username is not available">
    <Input
      label="Username"
      type="text"
      name="username"
      defaultValue="nianderwallace"
      stretched={false}
    />
  </Field>
)
