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
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactDom.configs.recommended,
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
    "react-dom/no-dangerously-set-innerhtml": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#dom-rules>
