# eslint-plugin-react-debug

Debugging rules.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-dom
```

## Setup

```js
// @ts-check

import js from "@eslint/js";
import reactDebug from "eslint-plugin-react-debug";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-debug": reactDebug,
    },
    rules: {
      "react-debug/class-component": "warn",
      "react-debug/function-component": "warn",
      "react-debug/hook": "warn",
      "react-debug/is-from-react": "off",
    },
  },
];
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#debug-rules>
