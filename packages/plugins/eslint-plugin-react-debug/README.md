# eslint-plugin-react-debug

Debugging rules.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-debug
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactDebug from "eslint-plugin-react-debug";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...reactDebug.configs.all,
  },
];
```

## Presets

- **all**\
  Enable all rules in this plugin.
- **off**\
  Disable all rules in this plugin.

## Rules

| Rule                                                   | Description                    | 💼  | 💭  | ❌  |
| :----------------------------------------------------- | :----------------------------- | :-: | :-: | :-: |
| [`debug/class-component`](debug-class-component)       | Print all class components.    | 🐞  |     |     |
| [`debug/function-component`](debug-function-component) | Print all function components. | 🐞  |     |     |
| [`debug/react-hooks`](debug-react-hooks)               | Print all react hooks.         | 🐞  |     |     |
