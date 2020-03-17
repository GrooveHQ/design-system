import React from 'react'
import { motion } from 'framer-motion'

const listVariants = {
  initial: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      when: 'beforeChildren',
      duration: 0.225,
    },
  },
  exit: {
    transition: {
      duration: 0,
    },
  },
}

const itemVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'tween', duration: 0.225, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.225, ease: 'easeOut' },
  },
}

export const StaggeredList = React.forwardRef(({ children, ...rest }, ref) => {
  if (!children) return children
  return (
    <motion.div variants={listVariants} {...rest} ref={ref}>
      {React.Children.map(children, child => {
        if (!child) return child
        return (
          <motion.div key={child.key} variants={itemVariants} initial="initial">
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
})
