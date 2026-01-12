# eslint-plugin-react-debug

Debugging rules.

These rules are useful for static analysis, code transformation, or when building custom tooling that needs to identify specific React patterns.

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
    files: ["**/*.ts", "**/*.tsx"],
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

## Rules

<https://eslint-react.xyz/docs/rules/overview#debug-rules>
