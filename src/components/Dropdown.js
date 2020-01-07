import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from './shared/styles'
import { Card } from './Card'
import { Paragraph } from './Paragraph'

const ALIGNMENT = {
  left: 'left',
  right: 'right',
}

const Wrapper = styled.div`
  position: relative;
  text-align: ${props => props.align};
`

const StyledCard = styled(Card)`
  position: absolute;
  z-index: 1;
  overflow-y: auto;
  max-height: 124px;
  transition: visibility 0s ease-in-out 120ms, opacity 120ms;
  left: ${props => (props.stretched || props.align === 'left' ? '0' : 'auto')};
  right: ${props =>
    props.stretched || props.align === 'right' ? '0' : 'auto'};
  top: ${spacing.padding.big + spacing.padding.tiny}px;
  padding: 12px ${spacing.padding.small}px;
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  opacity: ${props => (props.open ? 1 : 0)};
  max-width: ${props => (props.stretched ? 'auto' : '172px')};
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    white-space: nowrap;
    overflow-x: hidden;
  }

  li a {
    color: ${color.primary};
    display: block;
  }

  li a:hover {
    text-decoration: underline;
  }

  li:last-child > span {
    padding-bottom: 0;
  }
`

export const Dropdown = ({ trigger, items, align, open, stretched, label }) => {
  return (
    <Wrapper align={align}>
      {trigger}
      <StyledCard align={align} stretched={stretched} open={open}>
        <StyledList>
          <React.Fragment>
            {label && (
              <Paragraph size="small" color="stoneGrey">
                {label}
              </Paragraph>
            )}
            {items.map(
              (
                { key: itemKey, text: itemText, component: itemComponent },
                index
              ) => (
                <li key={itemKey || itemText || index}>
                  <Paragraph size="small" color="primary">
                    {itemComponent || itemText}
                  </Paragraph>
                </li>
              )
            )}
          </React.Fragment>
        </StyledList>
      </StyledCard>
    </Wrapper>
  )
}

Dropdown.propTypes = {
  /**
   * Dropdown trigger component, such as Button or Input.
   */
  trigger: PropTypes.node,
  /**
   * Array of menu items.
   * You can either pass `text` or `component` for the menu item.
   * If `key` is not provided, it will default to `text` or `index`.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      component: PropTypes.node,
    })
  ),
  /**
   * Alignmnet of the dropdown
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Whether menu is open
   */
  open: PropTypes.bool,
  /**
   * Stretch width to fill container
   */
  stretched: PropTypes.bool,
  /**
   * Label describing items
   */
  label: PropTypes.string,
}

Dropdown.defaultProps = {
  trigger: null,
  items: null,
  stretched: true,
  label: null,
  open: true,
  align: ALIGNMENT.left,
}
