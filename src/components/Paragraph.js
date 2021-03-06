import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { baseColorName } from '../utils/colors'
import { typography, spacing } from './shared/styles'

export const PARAGRAPH_SIZES = {
  big: 'p1',
  medium: 'p2',
  small: 'p3',
  tiny: 'p4',
  mini: 'p5',
}

const ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
}

const StyledParagraph = styled.span`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  padding-bottom: ${props => (props.padded ? spacing.padding.tiny : 0)}px;
  letter-spacing: normal;
  font-weight: ${props =>
    props.bold ? typography.weight.medium : typography.weight.normal};
  font-size: ${props => typography.sizes[PARAGRAPH_SIZES[props.size]].size}px;
  font-style: ${props => (props.italic ? 'italic' : 'normal')};
  line-height: ${props =>
    typography.sizes[PARAGRAPH_SIZES[props.size]].height}px;
  color: ${props => `var(--color-${props.color})`};
  text-align: ${props => ALIGNMENT[props.align]};

  a:hover &,
  a:focus &,
  & a:hover,
  & a:focus {
    color: ${props => `var(--color-${baseColorName(props.color)}Hover)`};
  }

  a:active &,
  & a:active {
    color: ${props => `var(--color-${baseColorName(props.color)}Active)`};
  }

  a:disabled &,
  & a:disabled {
    color: ${props => `var(--color-${baseColorName(props.color)}Disabled)`};
  }
`

export const Paragraph = React.forwardRef(({ as, ...props }, forwardedRef) => {
  return <StyledParagraph {...props} as={as} ref={forwardedRef} />
})

Paragraph.propTypes = {
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(PARAGRAPH_SIZES)),
  /**
   * Specify whether its bold
   */
  bold: PropTypes.bool,
  /**
   * Specify whether its italic
   */
  italic: PropTypes.bool,
  /**
   * Specify color
   */
  color: PropTypes.string,
  /**
   * Specify alignmnet
   */
  align: PropTypes.oneOf(Object.keys(ALIGNMENT)),
  /**
   * Whether it is inline
   */
  inline: PropTypes.bool,
  /**
   * Whether it is padded
   */
  padded: PropTypes.bool,
  /**
   * Component to render as defaults span
   */
  as: PropTypes.elementType,
}

Paragraph.defaultProps = {
  size: 'medium',
  bold: false,
  italic: false,
  color: 'jetBlack',
  align: ALIGNMENT.left,
  inline: false,
  padded: true,
  as: 'span',
}
