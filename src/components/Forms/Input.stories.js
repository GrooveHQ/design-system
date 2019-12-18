import React from 'react'
import { Input } from './Input'
import { Field } from './Field'

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
