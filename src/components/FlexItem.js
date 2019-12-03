import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ALIGNMENT = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
}

// FIXME: `spacing.padding` is not evaluated correctly in the Prop docs,
//        so bummer redefine them here - @tair
const GAP = {
  auto: 'auto',
  mini: '4px',
  tiny: '8px',
  small: '16px',
  medium: '24px',
  large: '32px',
  big: '48px',
  huge: '64px',
  massive: '80px',
}

const StyledFlexItem = styled.div`
  align-self: ${props => ALIGNMENT[props.align]};
  flex-grow: ${props => props.grow};
  flex-shrink: ${props => props.shrink};

  margin-left: ${props => (props.gapHorizontal ? GAP[props.gapHorizontal] : 0)};
  margin-top: ${props => (props.gapVertical ? GAP[props.gapVertical] : 0)};
`

const FlexItem = props => {
  const { children } = props

  return <StyledFlexItem {...props}>{children}</StyledFlexItem>
}

FlexItem.propTypes = {
  /**
   * Specify alignmnet
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Flex grow
   */
  grow: PropTypes.number,
  /**
   * Flex shrink
   */
  shrink: PropTypes.number,
  /**
   * Specify horizontal gap between items
   */
  gapHorizontal: PropTypes.oneOf(Object.keys(GAP)),
  /**
   * Specify vertical gap between items
   */
  gapVertical: PropTypes.oneOf(Object.keys(GAP)),
}

FlexItem.defaultProps = {
  align: 'center',
  grow: 0,
  shrink: 1,
  gapHorizontal: undefined,
  gapVertical: undefined,
}

export default FlexItem
