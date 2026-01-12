# eslint-plugin-react-dom

DOM specific rules for React DOM.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-dom
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import reactDom from "eslint-plugin-react-dom";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactDom.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-dom/no-dangerously-set-innerhtml": "warn",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#dom-rules>
