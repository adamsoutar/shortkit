// -= INTERNAL HOOK =-
// Used to keep a colleciton of key combos and resolve which one we should call
import { useRef } from 'react'

function eventIsFromAnInput (e) {
  return (
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName) ||
    e.target.isContentEditable
  )
}

// This is done awkwardly to avoid a miscompilation bug in babel
function itertorValues (iterator) {
  const out = []
  for (const val of iterator) out.push(val)
  return out
}

export default function useCombos () {
  const cuts = useRef({})
  const nextID = useRef(0)

  function addShortcut (combo, callback, priority, triggerInInputs, propagate) {
    const id = nextID.current++

    if (!cuts.current[combo]) {
      cuts.current[combo] = {}
    }
    if (!cuts.current[combo][priority]) {
      cuts.current[combo][priority] = new Map()
    }

    cuts.current[combo][priority].set(id, { callback, triggerInInputs, propagate })

    return id
  }

  function removeShortcut (combo, priority, id) {
    cuts.current[combo][priority].delete(id)

    if (cuts.current[combo][priority].size === 0) {
      // This priority group has disappeared
      delete cuts.current[combo][priority]
    }
  }

  function resolveAndFireCallback (combo, e) {
    if (!cuts.current[combo]) return

    const keys = Object
      .keys(cuts.current[combo])
      .map(k => parseFloat(k))
    if (keys.length === 0) return

    // Sort in descending order of priority, so [0] is the one that wins
    keys.sort((a, b) => b - a)

    const prior = cuts.current[combo][keys[0]]
    // "shortcut" is the { callback, triggerInInputs, propagate } object
    const shortcut = itertorValues(prior)[prior.size - 1][1]

    if (!shortcut.triggerInInputs && eventIsFromAnInput(e)) return

    shortcut.callback()

    return shortcut.propagate
  }

  return { addShortcut, removeShortcut, resolveAndFireCallback }
}
