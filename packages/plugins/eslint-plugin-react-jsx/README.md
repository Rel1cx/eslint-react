# eslint-plugin-react-jsx

React Flavored JSX rules for React.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-jsx
```

## Setup

```ts
import js from "@eslint/js";
import reactJsx from "eslint-plugin-react-jsx";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Add configs from eslint-plugin-react-jsx
      reactJsx.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#jsx-rules>
