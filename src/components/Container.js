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
  background-color: ${color.moonGrey};
  box-shadow: ${shadows.default};
`

const StyledContent = styled.div`
  flex: 1 1 auto;
  padding: ${spacing.padding.small}px ${spacing.padding.small}px 0
    ${spacing.padding.small}px;
  overflow-y: auto;
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

      <StyledContent>{children}</StyledContent>

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
}

Container.defaultProps = {
  branded: false,
  appName: null,
}
