import React, { useState } from 'react'
import { Field } from './Field'
import { CheckboxGroup, CheckboxOption } from './Checkbox'
import { Button } from '../Button'

export default {
  title: 'Design System|Forms/Checkbox',
  parameters: {
    component: CheckboxGroup,
    subcomponents: { CheckboxOption },
  },
}

export const Basic = () => {
  return (
    <Field>
      <CheckboxOption
        name="replicantConfirmed"
        label="Rick Deckard is definitely a replicant"
        defaultChecked
      />
    </Field>
  )
}

export const Group = () => {
  return (
    <Field>
      <CheckboxGroup>
        <CheckboxOption name="leon" label="Leon Kowalski" />
        <CheckboxOption name="pris" label="Pris Stratton" />
        <CheckboxOption name="roy" label="Roy Batty" />
        <CheckboxOption name="zhora" label="Zhora Salome" />
        <CheckboxOption name="deckard" label="Rick Deckard" />
      </CheckboxGroup>
    </Field>
  )
}

export const OptionsParam = () => {
  return (
    <Field>
      <CheckboxGroup
        name="replicantOptionsParam"
        options={[
          { name: 'leon', label: 'Leon Kowalski' },
          { name: 'pris', label: 'Pris Stratton' },
          { name: 'roy', label: 'Roy Batty' },
          { name: 'zhora', label: 'Zhora Salome' },
          { name: 'deckard', label: 'Rick Deckard' },
        ]}
        value={{ roy: true, pris: true }}
      />
    </Field>
  )
}

export const Controlled = () => {
  const [values, setValues] = useState({ roy: true, pris: true })
  return (
    <React.Fragment>
      <Field>
        <CheckboxGroup
          name="replicantControlled"
          value={values}
          onChange={(e, { groupValues }) => {
            setValues(groupValues)
          }}
        >
          <CheckboxOption name="leon" label="Leon Kowalski" />
          <CheckboxOption name="pris" label="Pris Stratton" />
          <CheckboxOption name="roy" label="Roy Batty" />
          <CheckboxOption name="zhora" label="Zhora Salome" />
          <CheckboxOption name="deckard" label="Rick Deckard" />
        </CheckboxGroup>
      </Field>
      <Field>
        <Button onClick={() => setValues({})}>Clear All</Button>
      </Field>
    </React.Fragment>
  )
}
