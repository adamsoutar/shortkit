import React, { useState } from 'react'
import { useShortcut } from 'shortkit'

const ShortcutUser = ({ combo, priority }) => {
  const [n, setN] = useState(0)

  useShortcut(
    combo,
    () => setN(prev => prev + 1),
    {
      priority
    }
  )

  return (
    <div>
      I'm waiting for you to press {combo}...
      (priority {priority ?? 'not specified'})
      {Array(n).fill(0).map(_ => '✅')}
    </div>
  )
}

export default ShortcutUser
