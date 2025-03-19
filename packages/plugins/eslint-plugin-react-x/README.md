# eslint-plugin-react-x

A set of composable linting rules for libraries and frameworks that use React as a UI runtime.

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
import reactx from "eslint-plugin-react-x";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactx.configs.recommended,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Put rules you want to override here
    "react-x/prefer-shorthand-boolean": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#core-rules>
