import React from 'react'

import { ShortkitProvider } from 'shortkit'
import UnmountableShortcutUser from './unmountable-shortcut-user'

const App = () => {
  return (
    <ShortkitProvider>
      <UnmountableShortcutUser combo='mod+s' unmountCombo='t' />
      <UnmountableShortcutUser combo='c' unmountCombo='y' priority={1} />
      <UnmountableShortcutUser combo='c' unmountCombo='u' priority={2} triggerInInputs={false} />
      <UnmountableShortcutUser combo='c' unmountCombo='i' />

      <input placeholder='Test global shortcuts in here...' />
    </ShortkitProvider>
  )
}

export default App
