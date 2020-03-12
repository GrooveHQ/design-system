import React, { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { StaggeredList } from './StaggeredList'
import { Card } from './Card'
import { Paragraph } from './Paragraph'
import { Button } from './Button'

export default {
  title: 'Design System|StaggeredList',
  parameters: {
    component: StaggeredList,
  },
}

export const Default = () => {
  const replicants = [
    {
      key: 'roy',
      name: 'Roy Batty',
      description:
        'A self-sufficient combat model for the colonization defence program.',
    },
    {
      key: 'pris',
      name: 'Pris Stratton',
      description: 'A "basic model" for military personnel.',
    },
    {
      key: 'zhora',
      name: 'Zhora Salome',
      description: 'Trained for an off-world kick murder squad.',
    },
    {
      key: 'leon',
      name: 'Leon Kowalski',
      description: 'A combat model or loader of nuclear fission materials.',
    },
    {
      key: 'rachael',
      name: 'Rachael Tyrell',
      description:
        "A prototype replicant, with implanted memories from Eldon Tyrell's niece",
    },
  ]

  const [visible, setVisible] = useState(true)
  const forceUpdate = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setVisible(true)
    }, 1000)
  }, [])

  return (
    <React.Fragment>
      <Button onClick={forceUpdate} style={{ marginBottom: 20 }}>
        replay
      </Button>
      <AnimatePresence>
        {visible && (
          <StaggeredList>
            {replicants.map(({ key, name, description }) => {
              return (
                <Card interactive key={key}>
                  <Paragraph size="medium" padded={false}>
                    {name}
                  </Paragraph>
                  <Paragraph size="small" padded={false}>
                    {description}
                  </Paragraph>
                </Card>
              )
            })}
          </StaggeredList>
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
