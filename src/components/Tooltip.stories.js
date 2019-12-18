/** @jsx jsx */

import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Input } from './Forms/Input'
import { Field } from './Forms/Field'
import { FlexContainer } from './FlexContainer'
import { FlexItem } from './FlexItem'
import { Tooltip } from './Tooltip'
import { Button } from './Button'
import { Paragraph } from './Paragraph'

const wrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`
const centered = css`
  text-align: center;
`

export default {
  title: 'Design System|Tooltip',
  parameters: {
    component: Tooltip,
  },
  decorators: [storyFn => <div css={wrapper}>{storyFn()}</div>],
}

export const Basic = () => (
  <Field>
    <Tooltip text="Please enter the replicant's full name (e.g. Roy Batty)">
      <Input
        label="Name (hover to see tooltip)"
        type="text"
        name="name"
        stretched={false}
      />
    </Tooltip>
  </Field>
)

export const Controlled = () => {
  const [visible, setVisible] = useState(true)

  return (
    <Tooltip
      text="Please enter the replicant's full name (e.g. Roy Batty)"
      visible={visible}
    >
      <Button
        variant={visible ? 'primary' : 'secondary'}
        onClick={() => setVisible(!visible)}
      >
        {visible ? 'hide' : 'show'}
      </Button>
    </Tooltip>
  )
}
Controlled.story = {
  decorators: [storyFn => <div css={centered}>{storyFn()}</div>],
}

export const Position = () => (
  <FlexContainer direction="horizontal">
    <FlexItem>
      <Field>
        <Tooltip
          text="Please enter the replicant's full name (e.g. Roy Batty)"
          visible
          position="top"
        >
          <Input label="Replicant's Name" type="text" name="name" size="30" />
        </Tooltip>
      </Field>
    </FlexItem>
    <FlexItem gapHorizontal="large">
      <Field>
        <Tooltip
          text="Please enter the replicant's full name (e.g. Roy Batty)"
          visible
          position="bottom"
        >
          <Input label="Replicant's Name" type="text" name="name" size="30" />
        </Tooltip>
      </Field>
    </FlexItem>
  </FlexContainer>
)

export const AnyComponent = () => (
  <Tooltip text="Roy Batty" visible>
    <Paragraph>
      I've seen things you people wouldn't believe. Attack ships on fire off the
      shoulder of Orion. I watched C-beams glitter in the dark near the
      Tannhäuser Gate. All those moments will be lost in time, like tears in
      rain. Time to die.
    </Paragraph>
  </Tooltip>
)
