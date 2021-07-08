<p align="center">
  <img src="assets/logo.svg" />
</p>

---

[![NPM](https://img.shields.io/npm/v/shortkit.svg)](https://www.npmjs.com/package/shortkit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i shortkit
```

## Usage

```js
import React from 'react'
import { useShortcut, ShortkitProvider } from 'shortkit'

const MyComponent = () => {
  useShortcut('mod+s', () => {
    // Save the document
  })

  useShortcut('c', () => {
    // Create a new document
  }, { fireInInputs: false })

  return someGubbins
}

const App = () => {
  return (
    <ShortkitProvider>
      <MyComponent />
    </ShortkitProvider>
  )
}
```

For more advanced usage, and to learn why Shortkit offers so much more
awesomeness than similar libraries, view the [documentation](./assets/api-reference) 😃
