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

<Callout type="info">
  RSC rules target [React Server Components](https://react.dev/reference/rsc/server-components), [React Server Functions](https://react.dev/reference/rsc/server-functions) and RSC [Directives](https://react.dev/reference/rsc/directives).
</Callout>

- [`function-definition`](https://eslint-react.xyz/docs/rules/rsc-function-definition) - Validate and transform React Client/Server Function definitions. (🔧 Fixable, 🧪 Experimental)

<https://eslint-react.xyz/docs/rules/overview#rsc-rules>
