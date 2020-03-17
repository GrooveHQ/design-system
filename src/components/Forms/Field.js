/** @jsx jsx */

import React from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../Icon'
import { color, spacing, forms } from '../shared/styles'

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${forms.typography.small.size}px;
  margin-bottom: ${spacing.padding.tiny}px;
`

const ChildrenContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const ValidationIcon = styled(Icon)`
  margin-right: ${spacing.padding.mini}px;
  width: 18px;
  height: 18px;
`

const ValidationAnimationVariants = {
  initial: { opacity: 0, y: -3 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.225 } },
  exit: { opacity: 0, y: -3, transition: { duration: 0.225 } },
}

const StateMessage = ({ icon: iconName, color: colorName, children }) => {
  return (
    <motion.div
      css={{
        color: color[colorName],
        display: 'flex',
        alignItems: 'center',
        paddingTop: spacing.padding.tiny,
        overflow: 'hidden',
      }}
      variants={ValidationAnimationVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      layoutTransition
    >
      <ValidationIcon icon={iconName} color={colorName} />
      {children}
    </motion.div>
  )
}

export const FieldContext = React.createContext({
  validationState: null,
})

export const Field = ({
  label,
  validationState,
  successMessage,
  errorMessage,
  children,
  ...rest
}) => {
  return (
    <FieldContext.Provider value={{ validationState }}>
      <FieldContainer {...rest}>
        <ChildrenContainer>{children}</ChildrenContainer>
        <AnimatePresence>
          {validationState === 'success' && successMessage && (
            <StateMessage icon="checkCircle" color="mintGreen" key="success">
              {successMessage}
            </StateMessage>
          )}
          {validationState === 'error' && errorMessage && (
            <StateMessage icon="closeCircle" color="candyRed" key="error">
              {errorMessage}
            </StateMessage>
          )}
        </AnimatePresence>
      </FieldContainer>
    </FieldContext.Provider>
  )
}

Field.propTypes = {
  /**
   * Rendered as invisible label for accessibility and as placeholder in child form component
   */
  label: PropTypes.string,
  /**
   * State of field, inherited by child form components
   */
  validationState: PropTypes.oneOf([null, 'success', 'error']),
  /**
   * Message to appear if state is success
   */
  successMessage: PropTypes.string,
  /**
   * Message to appear if state is error
   */
  errorMessage: PropTypes.string,
}

Field.defaultProps = {
  label: null,
  validationState: null,
  successMessage: null,
  errorMessage: null,
}
