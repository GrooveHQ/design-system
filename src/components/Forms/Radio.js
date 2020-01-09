import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from '../shared/styles'

const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const HiddenRadio = styled.input`
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

const Icon = styled.svg`
  fill: ${color.primary};
  width: 6px;
  user-select: none;
`

const StyledRadio = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid ${color.metalGrey};
  background: ${color.paperWhite};
  cursor: pointer;
  ${HiddenRadio}:focus + &,
  &:hover {
    border: 1px solid ${color.primary};
  }
  ${Icon} {
    visibility: hidden;
  }
  ${HiddenRadio}:checked + & {
    border: 1px solid ${color.primary};
  }
  ${HiddenRadio}:checked + & ${Icon} {
    visibility: visible;
  }
`

const RadioContainer = styled.div`
  display: block;
  margin-right: ${spacing.padding.tiny}px;
  font-size: 0;
  line-height: 0;
`

const RadioGroupContainer = styled.div`
  ${StyledLabel} {
    margin-bottom: ${spacing.padding.mini}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const GroupContext = React.createContext({
  name: undefined,
  value: undefined,
  onChange: undefined,
  // HACK (jscheel): Shibboleth to know that an actual context was really
  // provided by the group, and not by the context defaults.
  contextProvided: false,
})

export const RadioGroup = ({
  name,
  value: controlledValue,
  onChange,
  options,
  children,
}) => {
  const [selectedValue, setSelectedValue] = useState(controlledValue)

  useEffect(() => {
    setSelectedValue(controlledValue || '')
  }, [controlledValue, options, children])

  const handleSelection = e => {
    if (onChange) onChange(e, { groupName: name, value: e.target.value })
    setSelectedValue(e.target.value)
  }

  return (
    <GroupContext.Provider
      value={{
        name,
        value: selectedValue,
        onChange: handleSelection,
        contextProvided: true,
      }}
    >
      <RadioGroupContainer>
        {children ||
          options.map(
            ({ key: optionKey, value: optionValue, label: optionLabel }) => (
              <RadioOption
                key={optionKey || optionValue}
                value={optionValue}
                label={optionLabel}
              />
            )
          )}
      </RadioGroupContainer>
    </GroupContext.Provider>
  )
}

RadioGroup.propTypes = {
  /**
   * Radio group name, returned in RadioOption onChange
   */
  name: PropTypes.string,
  /**
   * Array of options matching the shape {key: 'string', value: 'string', label: 'string'}. You can either pass this array as a prop, or simply render option elements as children of this component. Children take precendence over this prop.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * Current value of radio group
   */
  value: PropTypes.string,
  /**
   * Handler function with signature (event, { groupName: string, value: string }) => {}
   */
  onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
  name: undefined,
  options: undefined,
  value: undefined,
  onChange: undefined,
}

export const RadioOption = ({
  className,
  checked,
  label,
  value,
  onChange,
  ...rest
}) => {
  const {
    name: groupName,
    value: selectedValue,
    onChange: groupOnChange,
    contextProvided,
  } = useContext(GroupContext)
  let finalChecked = checked
  if (contextProvided) {
    finalChecked = selectedValue === value
  }
  return (
    <StyledLabel>
      <RadioContainer className={className}>
        <HiddenRadio
          type="radio"
          checked={finalChecked}
          name={groupName}
          value={value}
          onChange={e => {
            if (contextProvided && groupOnChange) groupOnChange(e)
            if (onChange) onChange(e, { groupName, value: e.target.value })
          }}
          {...rest}
        />
        <StyledRadio>
          <Icon viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" />
          </Icon>
        </StyledRadio>
      </RadioContainer>
      {label}
    </StyledLabel>
  )
}

RadioOption.propTypes = {
  /**
   * Radio button name
   */
  name: PropTypes.string,
  /**
   * Label text next to radio button
   */
  label: PropTypes.string,
  /**
   * Value of radio button
   */
  value: PropTypes.string,
  /**
   * Handler function for change, has signature (event, { groupName: string, value: string) => {}
   */
  onChange: PropTypes.func,
}

RadioOption.defaultProps = {
  name: undefined,
  label: '',
  value: undefined,
  onChange: undefined,
}
