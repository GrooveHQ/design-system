import React, { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import {
  CheckRadioBase,
  CheckRadioGroup,
  GroupContext,
  HiddenElement,
} from './CheckRadioBase'
import { color } from '../shared/styles'
import { generateTransition, transition } from '../shared/animation'

const Icon = styled(motion.svg)`
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
  transition: ${generateTransition()};
  ${HiddenElement}:focus + &,
  &:hover {
    border: 1px solid ${color.primary};
  }
  ${HiddenElement}:checked + & {
    border: 1px solid ${color.primary};
  }
`

const renderOptions = options => {
  return options.map(
    ({ key: optionKey, value: optionValue, label: optionLabel }) => (
      <RadioOption
        key={optionKey || optionValue}
        value={optionValue}
        label={optionLabel}
      />
    )
  )
}

export const RadioGroup = ({
  name,
  value: controlledValue,
  onChange,
  options,
  direction,
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
    <CheckRadioGroup
      contextValue={{
        name,
        value: selectedValue,
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
  /**
   * Direction of radio options in group
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
}

RadioGroup.defaultProps = {
  name: undefined,
  options: undefined,
  value: undefined,
  onChange: undefined,
  direction: 'vertical',
}

const circleVariants = {
  checked: {
    r: 3,
    transition: {
      delay:
        (parseFloat(transition.duration.default) * 0.15) /
        (transition.duration.default.indexOf('ms') > -1 ? 1000 : 1),
    },
  },
  unchecked: {
    r: 0,
  },
}

export const RadioOption = ({
  className,
  checked,
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

  const handleChange = useCallback(
    e => {
      if (contextProvided && groupOnChange) groupOnChange(e)
      if (onChange) onChange(e, { groupName, value: e.target.value })
    },
    [contextProvided, groupName, groupOnChange, onChange]
  )

  return (
    <CheckRadioBase
      type="radio"
      name={groupName}
      checked={finalChecked}
      value={value}
      onChange={handleChange}
      StyledComponent={StyledRadio}
      {...rest}
    >
      <Icon viewBox="0 0 6 6" whileHover="hover">
        <motion.circle
          variants={circleVariants}
          initial="unchecked"
          animate={finalChecked ? 'checked' : 'unchecked'}
          custom={checked}
          cx="3"
          cy="3"
          r="3"
        />
      </Icon>
    </CheckRadioBase>
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
