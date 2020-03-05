import React from 'react'
import styled from '@emotion/styled'
import { Loader } from './Loader'
import { color as stylesColor } from './shared/styles'

export default {
  title: 'Design System|Loader',
  parameters: {
    component: Loader,
  },
}

const LoaderExample = styled.div`
  position: relative;
  height: 200px;
`

export const Normal = () => (
  <LoaderExample>
    <Loader />
  </LoaderExample>
)

export const Customized = () => (
  <LoaderExample>
    <Loader
      text="Hold tight, while content is loading..."
      color="paperWhite"
      loaderColor="candyRed"
      background={stylesColor.groovyHover}
    />
  </LoaderExample>
)
