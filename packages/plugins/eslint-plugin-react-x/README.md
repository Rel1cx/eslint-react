# eslint-plugin-react-x

4-7x faster, composable ESLint rules for libraries and frameworks that use React as a UI runtime.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-x
```

## Setup

```ts
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
      // Add this plugin's config below js/tseslint configs
      react.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-x/no-class-component": "warn",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#x-rules>
