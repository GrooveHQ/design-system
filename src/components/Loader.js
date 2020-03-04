import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color as stylesColor } from './shared/styles'

export const LOADER_SIZES = {
  small: 16,
  medium: 24,
  big: 32,
  huge: 64,
  massive: 112, // 80 + 16 svg view box padding
}

const Container = styled.div`
  align-items: center;
  background: ${({ background }) => background};
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  z-index: ${({ zIndex }) => zIndex};

  > div {
    align-self: center;
    color: ${({ color }) => color};
    flex-grow: 1;
  }
`

export const Loader = ({ text, loaderColor, size, ...props }) => {
  return (
    <Container className="groove-loader" {...props}>
      <div className="groove-loader-body">
        <svg
          width={LOADER_SIZES[size]}
          height={LOADER_SIZES[size]}
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke={loaderColor}
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        {text && (
          <Fragment>
            <br />
            {text}
          </Fragment>
        )}
      </div>
    </Container>
  )
}

Loader.propTypes = {
  /**
   * Specify loader text value
   */
  text: PropTypes.string,
  /**
   * Specify text color
   */
  color: PropTypes.string,
  /**
   * Specify icon color
   */
  loaderColor: PropTypes.string,
  /**
   * Specify container background
   */
  background: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(LOADER_SIZES)),
  zIndex: PropTypes.number,
}

Loader.defaultProps = {
  loaderColor: stylesColor.primary,
  color: stylesColor.jetBlack,
  size: 'big',
  text: 'One moment...',
  zIndex: 5000,
  background: stylesColor.moonGrey,
}
