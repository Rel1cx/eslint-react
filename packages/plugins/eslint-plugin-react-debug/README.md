# eslint-plugin-react-debug

Debugging rules.

These rules are useful for static analysis, code transformation, or when building custom tooling that needs to identify specific patterns.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-debug
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import reactDebug from "eslint-plugin-react-debug";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactDebug.configs.all,
    ],
    rules: {
      // Put rules you want to override here
      "react-debug/function-component": "warn",
    },
  },
);
```

> [!WARNING]
> Debug rules report `React` patterns for code metrics, transformations, or custom tooling. These are not included in the unified plugin by default.

- [`class-component`](./debug-class-component) - Reports all class components
- [`function-component`](./debug-function-component) - Reports all function components
- [`hook`](./debug-hook) - Reports all `React` hooks
- [`is-from-react`](./debug-is-from-react) - Reports identifiers initialized from `React`
- [`jsx`](./debug-jsx) - Reports all `JSX` elements and fragments

## Rules

<https://eslint-react.xyz/docs/rules/overview#debug-rules>
