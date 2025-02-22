# eslint-plugin-react-debug

Debugging rules.

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
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactDebug.configs.all,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Put rules you want to override here
    "react-debug/function-component": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#debug-rules>
