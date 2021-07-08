import { useContext, useEffect, useCallback } from 'react'
import { ShortkitContext } from './shortkit-context'

export default function useShortcut (combo, callback, options) {
  const { registerShortcut, unregisterShortcut, amWrapped } = useContext(ShortkitContext)

  const priority = options?.priority ?? 0
  const triggerInInputs = options?.triggerInInputs ?? true

  useEffect(() => {
    const id = registerShortcut(
      combo,
      callback,
      priority,
      triggerInInputs
    )

    return () => unregisterShortcut(combo, priority, id)
  }, [combo, callback, options])

  if (!amWrapped) {
    throw new Error(`useShortcut called without a provider!
Did you forget to wrap your app in a ShortkitProvider?`)
  }
}
