# eslint-plugin-react-rsc

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-rsc
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import react from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-rsc/function-definition": "error",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#rsc-rules>
