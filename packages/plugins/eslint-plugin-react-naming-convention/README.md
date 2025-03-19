# eslint-plugin-react-naming-convention

Naming convention rules.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-naming-convention
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
  ],
  plugins: {
    "react-naming-convention": reactNamingConvention,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Put rules you want to use here
    "react-naming-convention/component-name": "warn",
  },
});
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#naming-convention-rules>
