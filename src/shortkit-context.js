import React, { useRef } from 'react'
import mousetrap from './mousetrap'
import useCombos from './use-combos'

const ShortkitContext = React.createContext({
  registerShortcut: (combo, callback, options) => {},
  unregisterShortcut: (id) => {}
})

const ShortkitProvider = ({ children }) => {
  const combos = useCombos()
  const handlers = useRef({})

  const registerShortcut = (combo, callback, priority, triggerInInputs) => {
    const id = combos.addShortcut(combo, callback, priority, triggerInInputs)

    if (!handlers[combo]) {
      mousetrap.bindGlobal(combo, e => {
        // e is used to figure out if it came from an input
        combos.resolveAndFireCallback(combo, e)
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
        registerShortcut, unregisterShortcut
      }}
    >
      {children}
    </ShortkitContext.Provider>
  )
}

export { ShortkitContext, ShortkitProvider }
