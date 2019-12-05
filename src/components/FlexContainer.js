import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ALIGNMENT = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
}

// FIXME: `spacing.padding` is not evaluated correctly in the Prop docs,
//        so bummer redefine them here - @tair
const GAP = {
  mini: 4,
  tiny: 8,
  small: 16,
  medium: 24,
  large: 32,
  big: 48,
  huge: 64,
  massive: 80,
}

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.direction === 'vertical' ? 'column' : 'row'};
  justify-content: ${props => ALIGNMENT[props.alignHorizontal]};
  align-items: ${props => ALIGNMENT[props.alignVertical]};

  margin-left: ${props =>
    props.gapHorizontal ? GAP[props.gapHorizontal] : 0}px;
  margin-top: ${props => (props.gapVertical ? GAP[props.gapVertical] : 0)}px;

  div:first-child {
    margin-left: 0;
    margin-top: 0;
  }
`

export const FlexContainer = ({ children, ...props }) => {
  return <StyledFlexContainer {...props}>{children}</StyledFlexContainer>
}

FlexContainer.propTypes = {
  /**
   * Specify direction
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Specify horizontal alignmnet
   */
  alignHorizontal: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Specify vertical alignmnet
   */
  alignVertical: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Specify horizontal gap between items
   */
  gapHorizontal: PropTypes.oneOf(Object.keys(GAP)),
  /**
   * Specify vertical gap between items
   */
  gapVertical: PropTypes.oneOf(Object.keys(GAP)),
}

FlexContainer.defaultProps = {
  direction: 'horizontal',
  alignHorizontal: 'start',
  alignVertical: 'start',
  gapHorizontal: undefined,
  gapVertical: undefined,
}
