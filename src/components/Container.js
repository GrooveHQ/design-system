import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing, shadows } from './shared/styles'
import { Paragraph } from './Paragraph'

const StyleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 608px;
  width: 352px;
  border-radius: ${spacing.borderRadius.default}px;
  background-color: ${props => color[props.backgroundColor]};
  box-shadow: ${shadows.high};
`

const StyledContent = styled.div`
  flex: 1 1 auto;
  ${props => props.padded && `padding: ${spacing.padding.small}px`};
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

const StyledParagraph = styled(Paragraph)`
  line-height: 0;
  margin-bottom: ${spacing.padding.small}px;
  display: block;
  flex: 0 0 auto;
`

const StyledHeader = styled.div`
  flex: 0 0 auto;
`

export const Container = props => {
  const { branded, appName, children, header } = props

  return (
    <StyleContainer {...props}>
      {header && <StyledHeader>{header}</StyledHeader>}

      <StyledContent {...props}>{children}</StyledContent>

      {branded && (
        <StyledParagraph size="small" align="center" color="stoneGrey">
          {appName ? `${appName} ` : ''} ⚡️by Groove
        </StyledParagraph>
      )}
    </StyleContainer>
  )
}

Container.propTypes = {
  /**
   * Specify whether branded
   */
  branded: PropTypes.bool,
  /**
   * Specify branding app name
   */
  appName: PropTypes.string,
  /**
   * Specify background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Specify if adding is added to this container. Setting this causes gap to be ignored
   */
  padded: PropTypes.bool,
}

Container.defaultProps = {
  branded: false,
  appName: null,
  backgroundColor: 'moonGrey',
  padded: true,
}
