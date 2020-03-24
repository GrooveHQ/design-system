// Handy CSS animations for micro-interactions

export const transition = {
  duration: {
    slow: '750ms',
    default: '300ms',
    fast: '150ms',
  },
  easing: {
    default: 'ease-in-out',
  },
  attributes: {
    default: ['background', 'border', 'color', 'opacity'],
  },
}

export const generateTransition = (
  attributes = transition.attributes.default,
  duration = transition.duration.default,
  easing = transition.easing.default
) => {
  if (!Array.isArray(attributes)) {
    // eslint-disable-next-line no-param-reassign
    attributes = [attributes]
  }
  return attributes.map(attr => `${attr} ${duration} ${easing}`).join(', ')
}
