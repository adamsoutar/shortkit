# Shortkit ⚡️ API Reference

## ShortkitProvider

Wrap your whole app (however high up you want to use shortcuts) with this
component you can get from here:

```js
import { ShortkitProvider } from 'shortkit'
```

## useShortcut

Registers a keyboard shortcut with a callback which will be fired on this
component.

```js
import { useShortcut } from 'shortkit'

useShortcut('shift+z', () => /* Do something */)
```

If **Component B** registers the same key combination _after_ **Component A**,
the events will go to **B**. Once **B** unmounts, **A** will resume receiving
callbacks.

**This behaviour is the key to Shortkit's magic.** It's really handy if, say, you have multiple modals and screens that open
on top of each other and you want them all to be dismissable with Escape.

#### Advanced Usage

You can pass an options object after the `combo` and `callback`.

```js
useShortcut(
  'a+b+c',
  () => alert('Come and sing along with me :)'),
  {
    priority: 2, // Defaults to 0
    triggerInInputs: false, // Defaults to true
    propagate: true // Defaults to false
  }
)
```

**priority** is useful for stepping over the callback behaviour mentioned above.

For example, If you've got a _reeeeeaaally_ important modal, you could capture
`esc` with `priority: 99` and it would win, even if other components mounted
after it also wanted `esc`.

**triggerInInputs** decides whether the callback is fired while the user is typing.

Some shortcuts, like `c` for create, shouldn't fire while the user is typing
"carrots" into your app's Favourite Vegetable field now, should they.

_Some_ shortcuts, like `mod+s` for save, should.

**propagate** controls whether to send the keyboard events on after dealing with
them.

For example if you capture `mod+s` for some action, should it _also_ trigger
higher up actions like the browser's default "Save Page" function?

## Key reference

See "Supported Keys" on [this page](https://craig.is/killing/mice)
