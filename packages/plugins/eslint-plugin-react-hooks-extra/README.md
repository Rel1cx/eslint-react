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
import tseslint from "typescript-eslint";

export default tseslint.config({
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
    "react-hooks-extra/no-unnecessary-use-prefix": "warn",
    "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules>
