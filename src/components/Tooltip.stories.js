/** @jsx jsx */

import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Input } from './Forms/Input'
import { Field } from './Forms/Field'
import { FlexContainer } from './FlexContainer'
import { FlexItem } from './FlexItem'
import { Tooltip } from './Tooltip'
import { Button } from './Button'

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
  <Tooltip label="Please enter the replicant's full name (e.g. Roy Batty)">
    <Field>
      <Input label="Name (hover to see tooltip)" type="text" name="name" />
    </Field>
  </Tooltip>
)

export const Controlled = () => {
  const [visible, setVisible] = useState(true)

  return (
    <FlexContainer direction="horizontal" inline>
      <FlexItem>
        <Tooltip
          label="Please enter the replicant's full name (e.g. Roy Batty)"
          visible={visible}
        >
          <Button
            variant={visible ? 'primary' : 'secondary'}
            onClick={() => setVisible(!visible)}
          >
            {visible ? 'hide' : 'show'}
          </Button>
        </Tooltip>
      </FlexItem>
      <FlexItem gapHorizontal="small" />
    </FlexContainer>
  )
}
Controlled.story = {
  decorators: [storyFn => <div css={centered}>{storyFn()}</div>],
}

export const Position = () => (
  <FlexContainer direction="horizontal">
    <FlexItem>
      <Tooltip
        label="Please enter the replicant's full name (e.g. Roy Batty)"
        visible
        position="top"
      >
        <Field>
          <Input label="Replicant's Name" type="text" name="name" size="30" />
        </Field>
      </Tooltip>
    </FlexItem>
    <FlexItem gapHorizontal="large">
      <Tooltip
        label="Please enter the replicant's full name (e.g. Roy Batty)"
        visible
        position="bottom"
      >
        <Field>
          <Input label="Replicant's Name" type="text" name="name" size="30" />
        </Field>
      </Tooltip>
    </FlexItem>
  </FlexContainer>
)
