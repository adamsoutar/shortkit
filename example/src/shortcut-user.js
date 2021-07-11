import React, { useState } from 'react'
import { useShortcut } from 'shortkit'

const ShortcutUser = ({ combo, priority, triggerInInputs, propagate }) => {
  const [n, setN] = useState(0)

  useShortcut(
    combo,
    () => setN(prev => prev + 1),
    {
      priority,
      triggerInInputs,
      propagate
    }
  )

  return (
    <div>
      I'm waiting for you to press {combo}...
      (priority {priority ?? 'not specified'})
      - I{propagate ? '' : " don't"} propagate
      {Array(n).fill(0).map(_ => '✅')}
    </div>
  )
}

export default ShortcutUser
