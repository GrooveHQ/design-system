import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { Paragraph, PARAGRAPH_SIZES as TEXT_SIZES } from './Paragraph'
import { color as stylesColor } from './shared/styles'

export const LOADER_SIZES = {
  small: 16,
  medium: 24,
  big: 32,
  huge: 64,
  massive: 112, // 80 + 16 svg view box padding
}

const Container = styled(motion.div)`
  align-items: center;
  background: ${({ background }) => background};
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: ${({ zIndex }) => zIndex};

  > div {
    margin-top: -${({ loaderSize }) => LOADER_SIZES[loaderSize]}px;
    align-self: center;
    flex-grow: 1;
    text-align: center;
  }
`

export const Loader = React.forwardRef(
  (
    {
      text,
      color,
      loaderColor,
      loaderSize,
      textSize,
      zIndex,
      background,
      delay,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Container
        background={background}
        zIndex={zIndex}
        loaderSize={loaderSize}
        {...props}
        ref={forwardedRef}
        initial={delay && { opacity: 0 }}
        animate={
          delay && {
            opacity: 1,
            transition: {
              delay: delay / 1000,
              duration: 0.225,
            },
          }
        }
      >
        <div>
          <svg
            width={LOADER_SIZES[loaderSize]}
            height={LOADER_SIZES[loaderSize]}
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke={stylesColor[loaderColor]}
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
            <Paragraph color={color} align="center" size={textSize}>
              {text}
            </Paragraph>
          )}
        </div>
      </Container>
    )
  }
)

Loader.propTypes = {
  /**
   * Specify loader text value
   */
  text: PropTypes.string,
  /**
   * Specify name of text color
   */
  color: PropTypes.string,
  /**
   * Specify name of icon color
   */
  loaderColor: PropTypes.string,
  /**
   * Specify loader container's background
   */
  background: PropTypes.string,
  /**
   * Specify size
   */
  loaderSize: PropTypes.oneOf(Object.keys(LOADER_SIZES)),
  /**
   * Text size
   */
  textSize: PropTypes.oneOf(Object.keys(TEXT_SIZES)),
  /**
   * Specify the loader container's z-index
   */
  zIndex: PropTypes.number,
  /**
   * Delay (in milliseconds) showing loader, 0 to disable delay
   */
  delay: PropTypes.number,
}

Loader.defaultProps = {
  loaderColor: 'primary',
  color: 'stoneGrey',
  loaderSize: 'big',
  textSize: 'small',
  text: '',
  zIndex: 5000,
  background: stylesColor.moonGrey,
  delay: 750,
}
