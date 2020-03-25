// Handy CSS animations for micro-interactions

export const transition = {
  duration: {
    slow: {
      ms: { dimension: '450ms', number: 450 },
      s: { dimension: '0.45s', number: 0.45 },
    },
    default: {
      ms: { dimension: '225ms', number: 225 },
      s: { dimension: '0.225s', number: 0.225 },
    },
    fast: {
      ms: { dimension: '150ms', number: 150 },
      s: { dimension: '0.15s', number: 0.15 },
    },
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
  duration = transition.duration.default.ms.dimension,
  easing = transition.easing.default
) => {
  if (!Array.isArray(attributes)) {
    // eslint-disable-next-line no-param-reassign
    attributes = [attributes]
  }
  return attributes.map(attr => `${attr} ${duration} ${easing}`).join(', ')
}
