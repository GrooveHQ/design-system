import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { FlexContainerContext } from './FlexContainer'

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
  ${({ reverse, gapHorizontal, gapVertical }) => {
    const hName = reverse ? 'margin-right' : 'margin-left'
    const vName = reverse ? 'margin-bottom' : 'margin-top'
    const hValue = gapHorizontal ? GAP[gapHorizontal] : 0
    const vValue = gapVertical ? GAP[gapVertical] : 0
    return `
      ${hName}: ${hValue};
      ${vName}: ${vValue};
    `
  }}
`

export const FlexItem = React.forwardRef(
  ({ children, gapHorizontal, gapVertical, ...props }, ref) => {
    const containerContext = useContext(FlexContainerContext)
    return (
      <StyledFlexItem
        ref={ref}
        gapHorizontal={gapHorizontal || containerContext.gapHorizontal}
        gapVertical={gapVertical || containerContext.gapVertical}
        reverse={containerContext.reverse}
        {...props}
      >
        {children}
      </StyledFlexItem>
    )
  }
)

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
