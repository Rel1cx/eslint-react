# eslint-plugin-react-x

A series of composable ESLint rules for React and friends.

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
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    react.configs.recommended,
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
    "react-x/no-class-component": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#x-rules>
