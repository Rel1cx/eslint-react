# eslint-plugin-react-debug

Debugging rules.

> [!TIP]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-dom
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
    plugins: [
      "react-debug": reactDebug,
      rules: {
        "react-debug/class-component": "warn",
        "react-debug/function-component": "warn",
        "react-debug/react-hooks": "warn",
      }
    ],
  },
];
```

## Rules

| Rule                 | Description                    | 💼  | 💭  | ❌  |
| :------------------- | :----------------------------- | :-: | :-: | :-: |
| `class-component`    | Print all class components.    | 🐞  |     |     |
| `function-component` | Print all function components. | 🐞  |     |     |
| `react-hooks`        | Print all react hooks.         | 🐞  |     |     |
