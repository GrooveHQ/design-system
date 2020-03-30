
import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import grooveTheme from './grooveTheme'
import { loadFontsForStorybook } from '../src/utils/index'
import { Global, css } from '@emotion/core'

import { variables, bodyStyles } from '../src/components/shared/global'

const customGlobalStyle = css`
  :root {
    ${variables}
  }
  body {
    ${bodyStyles}
  }
`

addParameters({
  options: {
    theme: grooveTheme,
  },
})

addDecorator(story => (
  <>
    <Global styles={customGlobalStyle} />
    {story()}
  </>
));

// automatically import all files ending in *.stories.js
configure(
  [
    require.context('../src', true, /\.stories\.mdx$/),
    require.context('../src', true, /\.stories\.js$/),
  ],
  module
);

loadFontsForStorybook();
