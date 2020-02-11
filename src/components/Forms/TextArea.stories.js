import React, { useState } from 'react'
import { TextArea } from './TextArea'
import { Field } from './Field'

export default {
  title: 'Design System|Forms/TextArea',
  parameters: {
    component: TextArea,
  },
}

export const Basic = () => (
  <Field>
    <TextArea label="Replicant's Biography" name="bio" rows={10} />
  </Field>
)

export const Validation = () => {
  const [validationState, setValidationState] = useState('error')
  const handleChange = e => {
    const value = e.target.value || ''
    if (value.length >= 10) {
      setValidationState(null)
    } else {
      setValidationState('error')
    }
  }
  return (
    <Field
      validationState={validationState}
      errorMessage="Biography must be at least 10 characters."
    >
      <TextArea
        label="Replicant's Name"
        name="bio"
        onChange={handleChange}
        defaultValue="Roy..."
        rows={10}
        stretched
      />
    </Field>
  )
}
