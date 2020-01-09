import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Icon } from './Icon'
import { Paragraph } from './Paragraph'
import { color, shadows, spacing } from './shared/styles'
import { transition } from './shared/animation'

const SIZES = {
  big: 56,
  medium: 48,
}

const StyledBadge = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  position: relative;
  outline: none;
  box-shadow: ${props => (props.opened ? shadows.high : shadows.low)};

  border-radius: ${props => SIZES[props.size]}px;
  background-color: ${color.primary};
  min-width: ${props => SIZES[props.size]}px;
  height: ${props => SIZES[props.size]}px;
  padding: 0 ${props => (props.text ? 12 : spacing.padding.tiny)}px;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};

  :hover {
    background-color: ${color.primaryHover};
  }

  :active {
    background-color: ${color.primaryActive};
  }
`

const StyledIcon = styled(Icon)`
  margin-right: ${props =>
    props.text && !props.reverse ? spacing.padding.mini : 0}px;
`

const StyledTextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  transition: width ${transition.duration.default} ${transition.effect.default}
    0ms;
  width: ${props => (props.opened ? 0 : props.width)}px;
`

const StyledCount = styled.div`
  opacity: ${props => (props.opened ? 0 : 1)};
  overflow: hidden;
  transition: ${props =>
    props.closing
      ? `opacity ${transition.duration.default} ${transition.effect.default} ${transition.duration.default}`
      : 'none'};
  border-radius: ${spacing.padding.tiny}px;
  border: 2px solid ${color.paperWhite};
  background-color: ${color.candyRed};
  position: absolute;
  left: ${props =>
    props.opened || props.closing
      ? 0
      : props.width + SIZES[props.size] / 2 + 14}px;
  top: 0;
  padding: 0 ${spacing.padding.mini}px;
  z-index: 1;
`

const useTransition = (open, text, onClick) => {
  const [opened, setOpen] = useState(open)
  const [width, setWidth] = useState(0)
  const [closing, setClosing] = useState(open)

  const textContentRef = useRef(null)

  const handleClick = useCallback(() => {
    setOpen(!opened)

    setTimeout(() => {
      setClosing(!closing)
    }, 120) // this delay must match width transition delay above

    if (onClick) {
      onClick()
    }
  }, [opened, onClick, closing])

  useEffect(() => {
    if (text) {
      const measure = document.createElement('span')
      measure.innerText = text
      textContentRef.current.appendChild(measure)
      const measuredWidth = measure.offsetWidth
      textContentRef.current.removeChild(measure)
      setWidth(measuredWidth > 0 ? measuredWidth + spacing.padding.tiny : 0) // including padding
    }
  }, [text])

  return {
    handleClick,
    opened,
    closing,
    width,
    textContentRef,
  }
}

export const Badge = ({ icon, text, count, onClick, open, ...props }) => {
  const { opened, closing, width, handleClick, textContentRef } = useTransition(
    open,
    text,
    onClick
  )

  return (
    <StyledBadge {...props} text={text} onClick={handleClick} opened={opened}>
      {closing && <Icon {...props} icon="close" color="paperWhite" />}

      {!closing && icon && (
        <StyledIcon {...props} icon={icon} text={text} color="paperWhite" />
      )}
      <StyledTextWrapper opened={opened} width={width}>
        <div ref={textContentRef}>
          <Paragraph {...props} padded={false} color="paperWhite" bold>
            {text}
          </Paragraph>
        </div>
      </StyledTextWrapper>

      {count > 0 && (
        <StyledCount {...props} width={width} opened={opened} closing={closing}>
          <Paragraph size="mini" color="paperWhite" bold padded={false}>
            {count}
          </Paragraph>
        </StyledCount>
      )}
    </StyledBadge>
  )
}

Badge.propTypes = {
  icon: PropTypes.string,
  /**
   * Specify size
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),
  /**
   * Specify text on the badge
   */
  text: PropTypes.string,
  /**
   * Specify the count of notification messages
   */
  count: PropTypes.number,
  /**
   * Specify whether badge is open
   */
  open: PropTypes.bool,
  /**
   * Specify whether icon & text are reversed (right-hand placement)
   */
  reverse: PropTypes.bool,
  /**
   * Specify the onClick handler
   */
  onClick: PropTypes.func,
}

Badge.defaultProps = {
  icon: null,
  size: 'big',
  text: null,
  count: 0,
  open: false,
  reverse: false,
  onClick: null,
}
