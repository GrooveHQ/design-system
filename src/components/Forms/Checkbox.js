import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, spacing } from '../shared/styles'

const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const HiddenCheckbox = styled.input`
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
  fill: ${color.paperWhite};
  width: 8px;
  user-select: none;
`

const StyledCheckbox = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid ${color.metalGrey};
  background: ${color.paperWhite};
  cursor: pointer;
  ${HiddenCheckbox}:focus + &,
  &:hover {
    border: 1px solid ${color.primary};
  }
  ${Icon} {
    visibility: hidden;
  }
  ${HiddenCheckbox}:checked + & {
    background: ${color.primary};
    border: 1px solid ${color.primary};
  }
  ${HiddenCheckbox}:checked + & ${Icon} {
    visibility: visible;
  }
`

const CheckboxContainer = styled.div`
  display: block;
  margin-right: ${spacing.padding.tiny}px;
  font-size: 0;
  line-height: 0;
`

const CheckboxGroupContainer = styled.div`
  ${StyledLabel} {
    margin-bottom: ${spacing.padding.mini}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const GroupContext = React.createContext({
  name: undefined,
  selectedValues: {},
  onChange: undefined,
  // HACK (jscheel): Shibboleth to know that an actual context was really
  // provided by the group, and not by the context defaults.
  contextProvided: false,
})

export const CheckboxGroup = ({
  name,
  value: controlledValues,
  onChange,
  options,
  children,
}) => {
  const [selectedValues, setSelectedValues] = useState(controlledValues || {})

  useEffect(() => {
    setSelectedValues(controlledValues || {})
  }, [controlledValues, options, children])

  const handleSelection = e => {
    e.persist()
    setSelectedValues(state => {
      const newState = { ...state, [e.target.name]: e.target.checked }
      if (onChange) onChange(e, { groupName: name, groupValues: newState })
      return newState
    })
  }

  return (
    <GroupContext.Provider
      value={{
        name,
        selectedValues,
        onChange: handleSelection,
        contextProvided: true,
      }}
    >
      <CheckboxGroupContainer>
        {children ||
          options.map(
            ({ key: optionKey, name: optionName, label: optionLabel }) => (
              <CheckboxOption
                key={optionKey || optionName}
                name={optionName}
                label={optionLabel}
              />
            )
          )}
      </CheckboxGroupContainer>
    </GroupContext.Provider>
  )
}

CheckboxGroup.propTypes = {
  /**
   * Checkbox group name, returned in CheckboxOption onChange
   */
  name: PropTypes.string,
  /**
   * Array of options matching the shape {key: 'string', name: 'string', label: 'string'}. You can either pass this array as a prop, or simply render option elements as children of this component. Children take precendence over this prop.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * Hash of checked states for controlled component, keyed by CheckboxOption name
   */
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /**
   * Handler function for any checkbox in group, has signature (event, { groupName: string, groupValues: { name: bool }) => {}
   */
  onChange: PropTypes.func,
}

CheckboxGroup.defaultProps = {
  name: undefined,
  options: undefined,
  value: undefined,
  onChange: undefined,
}

export const CheckboxOption = ({
  className,
  checked: controlledChecked,
  defaultChecked,
  label,
  name,
  onChange,
  ...rest
}) => {
  const {
    name: groupName,
    selectedValues,
    onChange: groupOnChange,
    contextProvided,
  } = useContext(GroupContext)

  const controlled =
    contextProvided ||
    (controlledChecked !== null && controlledChecked !== undefined)

  let checkedHookStateDefault = defaultChecked
  if (controlled) {
    if (contextProvided) {
      checkedHookStateDefault = selectedValues[name] === true
    } else {
      checkedHookStateDefault = controlledChecked
    }
  }

  const [checked, setChecked] = useState(checkedHookStateDefault)

  useEffect(() => {
    if (controlled) {
      if (contextProvided) {
        setChecked(selectedValues[name] === true)
      } else {
        setChecked(controlledChecked)
      }
    }
  }, [contextProvided, controlled, controlledChecked, name, selectedValues])

  return (
    <StyledLabel>
      <CheckboxContainer className={className}>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          name={name}
          onChange={e => {
            const newChecked = !checked
            setChecked(newChecked)
            if (contextProvided && groupOnChange) groupOnChange(e)
            if (onChange)
              onChange(e, {
                groupName,
                name: e.target.name,
                value: newChecked,
              })
          }}
          {...rest}
        />
        <StyledCheckbox>
          <Icon viewBox="0 0 38 32">
            <path d="M17.7625631,27.2374369 L37.9497475,7.05025253 L31.8994949,1 L13.9748737,18.9246212 L6.05025253,11 L0,17.0502525 L13.9748737,31.0251263 L17.7625631,27.2374369 Z" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      {label}
    </StyledLabel>
  )
}

CheckboxOption.propTypes = {
  /**
   * Checkbox name
   */
  name: PropTypes.string,
  /**
   * Label text next to checkbox
   */
  label: PropTypes.string,
  /**
   * Handler function for change, has signature (event, { groupName: string, checked: bool) => {}
   */
  onChange: PropTypes.func,
}

CheckboxOption.defaultProps = {
  name: undefined,
  label: '',
  onChange: undefined,
}
