import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
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

const StyledCard = styled(motion.custom(Card))`
  position: absolute;
  z-index: ${props => props.zIndex};
  overflow-y: auto;
  max-height: 124px;
  left: ${props =>
    props.stretched || props.align === 'left'
      ? `${0 + props.offsetSide}px`
      : 'auto'};
  right: ${props =>
    props.stretched || props.align === 'right'
      ? `${0 + props.offsetSide}px`
      : 'auto'};
  top: ${props =>
    `${spacing.padding.big + spacing.padding.tiny + props.offsetTop}px`};
  padding: 12px ${spacing.padding.small}px;
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

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.225,
    },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: {
      type: 'tween',
      duration: 0.225,
    },
  },
  exited: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.225,
    },
  },
}

export const Dropdown = ({
  trigger,
  items,
  align,
  open,
  stretched,
  label,
  offsetTop,
  offsetSide,
  zIndex,
}) => {
  return (
    <Wrapper align={align}>
      {trigger}
      <AnimatePresence>
        {open && (
          <StyledCard
            offsetTop={offsetTop}
            offsetSide={offsetSide}
            zIndex={zIndex}
            align={align}
            stretched={stretched}
            variants={variants}
            initial="closed"
            animate="open"
            exit="exited"
          >
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
        )}
      </AnimatePresence>
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
  /**
   * Offset object.
   * Allows specifying an offset top for the dropdown
   */
  offsetTop: PropTypes.number,
  /**
   * Offset object.
   * Allows specifying for left or right based on your alignment
   */
  offsetSide: PropTypes.number,
  /**
   * zIndex
   * Specify the zindex value for the dropdown
   */
  zIndex: PropTypes.number,
}

Dropdown.defaultProps = {
  trigger: null,
  items: null,
  stretched: true,
  label: null,
  open: true,
  align: ALIGNMENT.left,
  offsetTop: 0,
  offsetSide: 0,
  zIndex: 1,
}
