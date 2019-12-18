import React, { useState } from 'react'
import { Field } from './Field'
import { Button } from '../Button'
import { FlexContainer } from '../FlexContainer'
import { FlexItem } from '../FlexItem'
import { Heading } from '../Heading'

export default {
  title: 'Design System|Forms/Field',
  parameters: {
    component: Field,
  },
}

export const ValidationState = () => {
  const [selectedReplicant, selectReplicant] = useState('')
  let fieldState = null
  if (selectedReplicant) {
    fieldState = selectedReplicant !== 'deckard' ? 'error' : 'success'
  }
  return (
    <React.Fragment>
      <Field
        validationState={fieldState}
        successMessage="This replicant is alive (if they even are a replicant)"
        errorMessage="This replicant has been retired"
      >
        <Heading size="medium">Select Replicant</Heading>
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
            <Button onClick={() => selectReplicant('')}>Reset</Button>
          </FlexItem>
        </FlexContainer>
      </Field>
    </React.Fragment>
  )
}
