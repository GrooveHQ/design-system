import React from 'react'

const ContainerContext = React.createContext({
  scrollPositionMotionValue: null,
  headerStubHeightMotionValue: null,
  setBodyOffsetRatio: () => {},
})

export default ContainerContext
