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
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex-direction: ${props => {
    let dir = props.direction === 'vertical' ? 'column' : 'row'
    if (props.reverse) {
      dir = `${dir}-reverse`
    }
    return dir
  }};
  justify-content: ${props => ALIGNMENT[props.alignHorizontal]};
  align-items: ${props => ALIGNMENT[props.alignVertical]};

  margin-left: ${props =>
    props.gapHorizontal ? GAP[props.gapHorizontal] : 0}px;
  margin-top: ${props => (props.gapVertical ? GAP[props.gapVertical] : 0)}px;

  div:first-of-type {
    margin-left: 0;
    margin-top: 0;
  }
`

export const FlexContainerContext = React.createContext({
  gapHorizontal: undefined,
  gapVertical: undefined,
  reverse: false,
})

export const FlexContainer = ({ children, ...rest }) => {
  return (
    <StyledFlexContainer {...rest}>
      <FlexContainerContext.Provider
        value={{
          gapHorizontal: rest.gapHorizontal,
          gapVertical: rest.gapVertical,
          reverse: rest.reverse,
        }}
      >
        {children}
      </FlexContainerContext.Provider>
    </StyledFlexContainer>
  )
}

FlexContainer.propTypes = {
  /**
   * Specify direction
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Use reverse direction
   */
  reverse: PropTypes.bool,
  /**
   * Use inline-flex
   */
  inline: PropTypes.bool,
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
  reverse: false,
  inline: false,
  alignHorizontal: 'start',
  alignVertical: 'start',
  gapHorizontal: undefined,
  gapVertical: undefined,
}
