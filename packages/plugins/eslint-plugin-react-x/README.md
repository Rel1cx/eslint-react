# eslint-plugin-react-x

4-7x faster composable ESLint rules for for libraries and frameworks that use React as a UI runtime.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-x
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import react from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

## Rules

<https://eslint-react.xyz/docs/rules/overview#x-rules>
