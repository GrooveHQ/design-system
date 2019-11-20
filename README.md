# Groove Storybook Design System

[Groove Storybook Design System (SDS)](https://http://groove-sds.s3-website-us-east-1.amazonaws.com) is a reusable component library that helps developers build Groove branded, consistent UIs faster. It's an SSOT (single source of truth) for all UI components used across various Groove applications.

## Running and developing SDS locally

Clone the [Groove SDS project](https://github.com/groovehq/design-system), then start storybook to preview available components and develop locally:

    yarn
    yarn run start

The storybook will be running at: http://localhost:9009

## Building and deploying

To build and preview static version of the storybook, run:

    yarn build

To deploy storybook:

    bundle install
    yarn deploy

### **Resources**

- [Intro to Storybook](https://www.learnstorybook.com/intro-to-storybook)
- [Design System for Developers](https://www.learnstorybook.com/design-systems-for-developers)
- [Component Story Format](https://medium.com/storybookjs/component-story-format-66f4c32366df)
- [Storybook Docs](https://storybook.js.org/docs)
- [Original Storybook Design System](https://github.com/storybookjs/design-system)
