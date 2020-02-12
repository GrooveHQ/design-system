/** @jsx jsx */

import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

const base = css`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
`

export const Label = ({ children, text, inline, ...rest }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label css={base} {...rest}>
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
}
