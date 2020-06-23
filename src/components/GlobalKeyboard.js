import { useCallback, useEffect, useRef } from 'react'

const useKeyboardTabbing = () => {
  const keyboardFlag = useRef(false)

  const mouseInteraction = useCallback(() => {
    if (keyboardFlag.current) {
      document.body.classList.remove('gds-user-keyboard-nav')
      keyboardFlag.current = false
    }
  }, [keyboardFlag])

  const keyboardInteraction = useCallback(
    e => {
      if (!keyboardFlag.current && (e.code === 'Tab' || e.keyCode === 9)) {
        document.body.classList.add('gds-user-keyboard-nav')
        keyboardFlag.current = true
      }
    },
    [keyboardFlag]
  )

  useEffect(() => {
    document.addEventListener('mousedown', mouseInteraction, true)
    document.addEventListener('touchstart', mouseInteraction, true)
    document.addEventListener('keyup', keyboardInteraction, true)
    return () => {
      document.removeEventListener('mousedown', mouseInteraction, true)
      document.removeEventListener('touchstart', mouseInteraction, true)
      document.removeEventListener('keyup', keyboardInteraction, true)
    }
  }, [mouseInteraction, keyboardInteraction])
}

export const GlobalKeyboard = () => {
  useKeyboardTabbing()
  return null
}
