
import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import grooveTheme from './grooveTheme'
import { loadFontsForStorybook } from '../src/utils/index'

import { GlobalStyle } from '../src/components/shared/global'

addParameters({
  options: {
    theme: grooveTheme,
  },
})

addDecorator(story => (
  <>
    <GlobalStyle />
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
