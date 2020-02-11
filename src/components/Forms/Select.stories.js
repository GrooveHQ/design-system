import React, { useState } from 'react'
import { Select } from './Select'
import { Field } from './Field'
import { Button } from '../Button'
import { FlexContainer } from '../FlexContainer'
import { FlexItem } from '../FlexItem'

export default {
  title: 'Design System|Forms/Select',
  parameters: {
    component: Select,
  },
}

export const Basic = () => (
  <Field>
    <Select label="Select Replicant…" name="replicant" value="">
      <option value="leon">Leon Kowalski</option>
      <option value="pris">Pris Stratton</option>
      <option value="roy">Roy Batty</option>
      <option value="zhora">Zhora Salome</option>
      <option value="deckard">Rick Deckard</option>
    </Select>
  </Field>
)

export const OptionsParam = () => (
  <Field>
    <Select
      label="Select Replicant…"
      name="replicant"
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

export const Validated = () => {
  const [selectedReplicant, setSelectedReplicant] = useState()
  let fieldState = null
  if (selectedReplicant) {
    fieldState = selectedReplicant !== 'deckard' ? 'error' : 'success'
  }
  return (
    <Field
      validationState={fieldState}
      successMessage="This replicant (?!) is alive"
      errorMessage="This replicant has been retired"
    >
      <Select
        label="Select Replicant…"
        name="replicant"
        value=""
        onChange={e => {
          setSelectedReplicant(e.target.value)
        }}
      >
        <option value="leon">Leon Kowalski</option>
        <option value="pris">Pris Stratton</option>
        <option value="roy">Roy Batty</option>
        <option value="zhora">Zhora Salome</option>
        <option value="deckard">Rick Deckard</option>
      </Select>
    </Field>
  )
}

export const Controlled = () => {
  const [replicant, selectReplicant] = useState('')
  return (
    <React.Fragment>
      <Field>
        <Select label="Select Replicant…" name="replicant" value={replicant}>
          <option value="leon">Leon Kowalski</option>
          <option value="pris">Pris Stratton</option>
          <option value="roy">Roy Batty</option>
          <option value="zhora">Zhora Salome</option>
          <option value="deckard">Rick Deckard</option>
        </Select>
      </Field>
      <Field>
        <FlexContainer direction="horizontal">
          <FlexItem gapHorizontal="mini">
            <Button onClick={() => selectReplicant('deckard')}>
              Rick Deckard
            </Button>
          </FlexItem>
          <FlexItem gapHorizontal="mini">
            <Button onClick={() => selectReplicant('pris')}>
              Pris Stratton
            </Button>
          </FlexItem>
          <FlexItem gapHorizontal="mini">
            <Button onClick={() => selectReplicant('roy')}>Roy Batty</Button>
          </FlexItem>
          <FlexItem gapHorizontal="mini">
            <Button onClick={() => selectReplicant('')}>Reset</Button>
          </FlexItem>
        </FlexContainer>
      </Field>
    </React.Fragment>
  )
}
