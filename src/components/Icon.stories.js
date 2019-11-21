import React from 'react'
import styled, { css } from 'styled-components'

import { color, borderColor, spacing } from './shared/styles'
import { Icon } from './Icon'
import { icons } from './shared/icons'

const Meta = styled.div`
  color: ${color.jetBlack};
  font-size: 12px;
`

const Item = styled.li`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 20%;
  min-width: 120px;

  padding: 0px ${spacing.padding.tiny}px ${spacing.padding.medium}px;

  svg {
    margin-right: ${spacing.padding.small}px;
  }

  ${props =>
    props.minimal &&
    css`
      flex: none;
      min-width: auto;
      padding: 0;
      background: ${color.paperWhite};
      border: 1px solid ${borderColor.default};

      svg {
        display: block;
        margin-right: 0;
        width: ${spacing.padding.large}px;
        height: ${spacing.padding.large}px;
      }
    `};
`

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
`

export default {
  title: 'Design System|Icon',
  component: Icon,
}

export const labels = () => (
  <>
    There are {Object.keys(icons).length} icons
    <List>
      {Object.keys(icons).map(key => (
        <Item key={key}>
          <Icon icon={key} color={color.jetBlack} aria-hidden />
          <Meta>{key}</Meta>
        </Item>
      ))}
    </List>
  </>
)

export const noLabels = () => (
  <List>
    {Object.keys(icons).map(key => (
      <Item minimal key={key}>
        <Icon icon={key} size="large" aria-label={key} />
      </Item>
    ))}
  </List>
)

export const inline = () => (
  <>
    this is an inline <Icon icon="bot" size="medium" aria-label="User" /> icon
    (default)
  </>
)

export const block = () => (
  <>
    this is a block{' '}
    <Icon icon="bubbles" size="medium" aria-label="User" block /> icon
  </>
)
