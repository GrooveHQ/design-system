import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import RelativePortal from 'react-relative-portal'
import { spacing } from './shared/styles'
import { transition } from './shared/animation'
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
  padding: 12px ${spacing.padding.small}px;
  width: ${({ stretched }) => (stretched ? '100%' : 'auto')};
`

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    white-space: nowrap;
  }

  li a {
    color: var(--color-primary);
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
      duration: transition.duration.default.s.number,
    },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: {
      type: 'tween',
      duration: transition.duration.default.s.number,
    },
  },
  exited: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: transition.duration.default.s.number,
    },
  },
}

export const Dropdown = React.forwardRef(
  (
    {
      trigger,
      items,
      align,
      open,
      stretched,
      label,
      offsetTop,
      offsetSide,
      zIndex,
      onOutClick,
    },
    forwardedRef
  ) => {
    const handleOutClick = useCallback(
      e => {
        if (open) {
          onOutClick(e)
        }
      },
      [onOutClick, open]
    )

    const portalConfig = {
      top: offsetTop,
      fullWidth: stretched,
      left: align === 'left' ? offsetSide : 0,
      right: align === 'right' ? offsetSide : 0,
    }
    if (!stretched && align === 'left') {
      delete portalConfig.right
    }

    return (
      <Wrapper align={align}>
        {trigger}
        <RelativePortal
          component="div"
          onOutClick={handleOutClick}
          {...portalConfig}
        >
          <AnimatePresence>
            {open && (
              <StyledCard
                zIndex={zIndex}
                align={align}
                stretched={stretched}
                variants={variants}
                initial="closed"
                animate="open"
                exit="exited"
                ref={forwardedRef}
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
                        {
                          key: itemKey,
                          text: itemText,
                          component: itemComponent,
                        },
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
        </RelativePortal>
      </Wrapper>
    )
  }
)

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
  /**
   * onOutClick
   * Handler that fires when you click outside of the dropdown
   */
  onOutClick: PropTypes.func,
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
  onOutClick: () => {},
}
