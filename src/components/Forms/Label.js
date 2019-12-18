/** @jsx jsx */

import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { stretchedStyle } from '../shared/forms'

const base = css`
  display: inline-flex;
`

export const Label = ({ stretched, children, text, ...rest }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label css={[base, stretched && stretchedStyle]} {...rest}>
      <span css={{ display: 'none' }}>{text}</span>
      {children}
    </label>
  )
}

Label.propTypes = {
  /**
   * Text of label (invisible for now, as all components use placeholder labels)
   */
  text: PropTypes.string.isRequired,
  /**
   * Stretch width to fill container
   */
  stretched: PropTypes.bool,
}

Label.defaultProps = {
  stretched: false,
}
