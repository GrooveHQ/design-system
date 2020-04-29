import React from 'react'

const ContainerContext = React.createContext({
  overlap: false,
  scrollPositionMotionValue: null,
  headerStubHeight: null,
  scrollRange: [0, 100],
  setScrollTop: () => {},
})

export default ContainerContext
