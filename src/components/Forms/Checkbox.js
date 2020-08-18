import React, { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion, useMotionValue } from 'framer-motion'
import {
  CheckRadioBase,
  CheckRadioGroup,
  GroupContext,
  HiddenElement,
} from './CheckRadioBase'
import { generateTransition, transition } from '../shared/animation'

const Icon = styled(motion.svg)`
  stroke: var(--color-paperWhite);
  width: 8px;
  user-select: none;
`

export const StyledCheckbox = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid var(--color-metalGrey);
  background: var(--color-paperWhite);
  cursor: pointer;
  transition: ${generateTransition()};
  ${HiddenElement}:focus + &,
  &:hover {
    border: 1px solid var(--color-primary);
  }
  ${HiddenElement}:checked + & {
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
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
  direction,
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
      direction={direction}
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
  /**
   * Direction of checkboxes in group
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
}

CheckboxGroup.defaultProps = {
  name: undefined,
  options: undefined,
  value: undefined,
  onChange: undefined,
  direction: 'vertical',
}

const checkVariants = {
  checked: {
    pathLength: 1,
    transition: { delay: transition.duration.fast.s.number * 0.55 },
  },
  unchecked: { pathLength: 0 },
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

  const checkPathLength = useMotionValue(0)

  return (
    <CheckRadioBase
      type="checkbox"
      checked={checked}
      name={name}
      onChange={handleChange}
      StyledComponent={StyledCheckbox}
      {...rest}
    >
      <Icon
        viewBox="-3 -3 38 32"
        initial={false}
        animate={checked ? 'checked' : 'unchecked'}
        whileHover="hover"
      >
        <motion.path
          d="M0.620849609 10.503418 10.8676758 20.5925293 31.0175781 0.81640625"
          fill="transparent"
          strokeWidth="10"
          variants={checkVariants}
          style={{ pathLength: checkPathLength }}
          custom={checked}
        />
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
  label: PropTypes.node,
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
