// NOTE: This is an internal implementation for Checkbox and Radio and should
// not be exposed to any user of this library. Consider this private API.

import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../shared/styles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledLabel = styled.label`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: flex-start;
`

export const HiddenElement = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const Icon = styled.svg`
  fill: var(--color-paperWhite);
  width: 8px;
  user-select: none;
`

export const ElementContainer = styled.div`
  display: block;
  margin-right: ${spacing.padding.tiny}px;
  font-size: 0;
  line-height: 0;
`

const StyledGroupContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'horizontal' ? 'row' : 'column'};
  ${Container} {
    margin: ${({ direction }) =>
      direction === 'horizontal'
        ? `0 ${spacing.padding.medium}px 0 0`
        : `0 0 ${spacing.padding.mini}px 0`};
    &:last-child {
      margin: 0;
    }
  }
`

export const GroupContext = React.createContext({
  name: undefined,
  value: undefined,
  onChange: undefined,
  // HACK (jscheel): Shibboleth to know that an actual context was really
  // provided by the group, and not by the context defaults.
  contextProvided: false,
})

export const CheckRadioGroup = ({
  contextValue,
  options,
  optionsMapFn,
  direction,
  children,
}) => {
  return (
    <GroupContext.Provider value={contextValue}>
      <StyledGroupContainer direction={direction}>
        {children || optionsMapFn(options)}
      </StyledGroupContainer>
    </GroupContext.Provider>
  )
}

export const CheckRadioBase = ({
  className,
  name,
  checked,
  label,
  onChange,
  children,
  StyledComponent,
  ...rest
}) => {
  return (
    <Container>
      <StyledLabel className={className}>
        <ElementContainer>
          <HiddenElement
            type="checkbox"
            checked={checked}
            name={name}
            onChange={onChange}
            {...rest}
          />
          <StyledComponent>{children}</StyledComponent>
        </ElementContainer>
        {label}
      </StyledLabel>
    </Container>
  )
}
