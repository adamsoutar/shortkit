import { useContext, useEffect, useCallback } from 'react'
import { ShortkitContext } from './shortkit-context'

export default function useShortcut (combo, callback, options) {
  const { registerShortcut, unregisterShortcut } = useContext(ShortkitContext)

  const priority = options?.priority ?? 0
  const triggerInInputs = options?.triggerInInputs ?? true

  const cB = useCallback(callback, [combo])

  useEffect(() => {
    const id = registerShortcut(
      combo,
      cB,
      priority,
      triggerInInputs
    )

    return () => unregisterShortcut(combo, priority, id)
  }, [combo, cB, options])
}
