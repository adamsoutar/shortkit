import React, { useState } from 'react'
import { useShortcut } from 'shortkit'
import ShortcutUser from './shortcut-user'

const UnmountableShortcutUser = ({ unmountCombo, ...other }) => {
  const [show, setShow] = useState(true)

  useShortcut(unmountCombo, () => setShow(false))

  if (!show) return null

  return (
    <>
      <ShortcutUser {...other} />
      <div>({unmountCombo}) to unmount</div>
    </>
  )
}

export default UnmountableShortcutUser
