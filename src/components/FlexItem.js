import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import isPropValid from '@emotion/is-prop-valid'
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

// https://emotion.sh/docs/styled#customizing-prop-forwarding
const StyledFlexItem = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'direction',
})(props => {
  const hName = props.reverse ? 'margin-right' : 'margin-left'
  const vName = props.reverse ? 'margin-bottom' : 'margin-top'
  const hValue = props.gapHorizontal ? GAP[props.gapHorizontal] : 0
  const vValue = props.gapVertical ? GAP[props.gapVertical] : 0
  const css = {
    alignSelf: ALIGNMENT[props.align],
    flexGrow: props.grow,
    flexShrink: props.shrink,
    [hName]: hValue,
    [vName]: vValue,
  }
  if (props.stretched) {
    if (props.direction === 'horizontal') css.height = '100%'
    if (props.direction === 'vertical') css.width = '100%'
  }
  if (props.minWidth !== null) css.minWidth = props.minWidth
  return css
})

export const FlexItem = React.forwardRef(
  (
    {
      children,
      gapHorizontal,
      gapVertical,
      stretched,
      direction,
      minWidth,
      ...props
    },
    ref
  ) => {
    const containerContext = useContext(FlexContainerContext)
    return (
      <StyledFlexItem
        ref={ref}
        gapHorizontal={gapHorizontal || containerContext.gapHorizontal}
        gapVertical={gapVertical || containerContext.gapVertical}
        reverse={containerContext.reverse}
        stretched={stretched || containerContext.stretched}
        direction={containerContext.direction}
        minWidth={minWidth}
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
  /**
   * Specify if height or width 100% should be applied to the div
   */
  stretched: PropTypes.bool,
  /**
   * Specify the min width for this flex item
   */
  minWidth: PropTypes.number,
}

FlexItem.defaultProps = {
  align: 'center',
  grow: 0,
  shrink: 1,
  gapHorizontal: undefined,
  gapVertical: undefined,
  stretched: false,
  minWidth: null,
}
