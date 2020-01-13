import React, { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  CheckRadioBase,
  CheckRadioGroup,
  GroupContext,
  HiddenElement,
} from './CheckRadioBase'
import { color } from '../shared/styles'

const Icon = styled.svg`
  fill: ${color.paperWhite};
  width: 8px;
  user-select: none;
`

export const StyledCheckbox = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid ${color.metalGrey};
  background: ${color.paperWhite};
  cursor: pointer;
  ${HiddenElement}:focus + &,
  &:hover {
    border: 1px solid ${color.primary};
  }
  ${HiddenElement}:checked + & {
    background: ${color.primary};
    border: 1px solid ${color.primary};
  }
`

const renderOptions = options => {
  return options.map(
    ({ key: optionKey, name: optionName, label: optionLabel }) => (
      <CheckboxOption
        key={optionKey || optionName}
        name={optionName}
        label={optionLabel}
      />
    )
  )
}

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

  const handleSelection = useCallback(
    e => {
      e.persist()
      setSelectedValues(state => {
        const newState = { ...state, [e.target.name]: e.target.checked }
        if (onChange) onChange(e, { groupName: name, groupValues: newState })
        return newState
      })
    },
    [name, onChange]
  )

  return (
    <CheckRadioGroup
      contextValue={{
        name,
        value: selectedValues,
        onChange: handleSelection,
        contextProvided: true,
      }}
      options={options}
      optionsMapFn={renderOptions}
    >
      {children}
    </CheckRadioGroup>
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
  name,
  onChange,
  ...rest
}) => {
  const {
    name: groupName,
    value: selectedValues,
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

  const handleChange = useCallback(
    e => {
      const newChecked = !checked
      setChecked(newChecked)
      if (contextProvided && groupOnChange) groupOnChange(e)
      if (onChange)
        onChange(e, {
          groupName,
          name: e.target.name,
          value: newChecked,
        })
    },
    [checked, contextProvided, groupName, groupOnChange, onChange]
  )

  return (
    <CheckRadioBase
      type="checkbox"
      checked={checked}
      name={name}
      onChange={handleChange}
      StyledComponent={StyledCheckbox}
      {...rest}
    >
      <Icon viewBox="0 0 38 32">
        <path d="M17.7625631,27.2374369 L37.9497475,7.05025253 L31.8994949,1 L13.9748737,18.9246212 L6.05025253,11 L0,17.0502525 L13.9748737,31.0251263 L17.7625631,27.2374369 Z" />
      </Icon>
    </CheckRadioBase>
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
