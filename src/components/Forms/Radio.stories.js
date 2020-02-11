import React, { useState } from 'react'
import { Field } from './Field'
import { RadioGroup, RadioOption } from './Radio'
import { Button } from '../Button'

export default {
  title: 'Design System|Forms/Radio',
  parameters: {
    component: RadioGroup,
    subcomponents: { RadioOption },
  },
}

export const Basic = () => {
  return (
    <Field>
      <RadioGroup name="replicantBasic" value="">
        <RadioOption value="leon" label="Leon Kowalski" />
        <RadioOption value="pris" label="Pris Stratton" />
        <RadioOption value="roy" label="Roy Batty" />
        <RadioOption value="zhora" label="Zhora Salome" />
        <RadioOption value="deckard" label="Rick Deckard" />
      </RadioGroup>
    </Field>
  )
}

export const Horizontal = () => {
  return (
    <Field>
      <RadioGroup name="replicantBasic" value="" direction="horizontal">
        <RadioOption value="leon" label="Leon Kowalski" />
        <RadioOption value="pris" label="Pris Stratton" />
        <RadioOption value="roy" label="Roy Batty" />
        <RadioOption value="zhora" label="Zhora Salome" />
        <RadioOption value="deckard" label="Rick Deckard" />
      </RadioGroup>
    </Field>
  )
}

export const OptionsParam = () => {
  return (
    <Field>
      <RadioGroup
        name="replicantOptionsParam"
        value=""
        options={[
          { value: 'leon', label: 'Leon Kowalski' },
          { value: 'pris', label: 'Pris Stratton' },
          { value: 'roy', label: 'Roy Batty' },
          { value: 'zhora', label: 'Zhora Salome' },
          { value: 'deckard', label: 'Rick Deckard' },
        ]}
      />
    </Field>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState('roy')
  return (
    <React.Fragment>
      <Field>
        <RadioGroup
          name="replicantControlled"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
          <RadioOption value="leon" label="Leon Kowalski" />
          <RadioOption value="pris" label="Pris Stratton" />
          <RadioOption value="roy" label="Roy Batty" />
          <RadioOption value="zhora" label="Zhora Salome" />
          <RadioOption value="deckard" label="Rick Deckard" />
        </RadioGroup>
      </Field>
      <Field>
        <Button onClick={() => setValue('deckard')}>
          Set value to Rick Deckard
        </Button>
      </Field>
    </React.Fragment>
  )
}
