import React, { useRef } from 'react'
import mousetrap from './mousetrap'
import useCombos from './use-combos'

const ShortkitContext = React.createContext({
  registerShortcut: (combo, callback, options) => {},
  unregisterShortcut: (id) => {},
  // We use this to detect if you've used <ShortkitProvider /> correctly
  amWrapped: false
})

const ShortkitProvider = ({ children }) => {
  const combos = useCombos()
  const handlers = useRef({})

  const registerShortcut = (combo, callback, priority, triggerInInputs, propagate) => {
    const id = combos.addShortcut(combo, callback, priority, triggerInInputs, propagate)

    if (!handlers[combo]) {
      mousetrap.bindGlobal(combo, e => {
        // e is used to figure out if it came from an input
        const shouldProp = combos.resolveAndFireCallback(combo, e)
        return shouldProp
      })
    }

    return id
  }
  const unregisterShortcut = (combo, priority, id) => {
    combos.removeShortcut(combo, priority, id)
  }

  return (
    <ShortkitContext.Provider
      value={{
        registerShortcut,
        unregisterShortcut,
        amWrapped: true
      }}
    >
      {children}
    </ShortkitContext.Provider>
  )
}

export { ShortkitContext, ShortkitProvider }
