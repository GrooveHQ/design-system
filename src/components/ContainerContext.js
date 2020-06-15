import React from 'react'

const ContainerContext = React.createContext({
  overlap: false,
  scrollPositionMotionValue: null,
  scrollRange: [0, 100],
  setScrollTop: () => {},
  hasMedian: false,
  padded: true,
})

export default ContainerContext
