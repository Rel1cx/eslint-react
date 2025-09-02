# eslint-plugin-react-hooks-extra

Extra rules for React Hooks.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-hooks-extra
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooksExtra.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Put rules you want to override here
    },
  },
]);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules>
