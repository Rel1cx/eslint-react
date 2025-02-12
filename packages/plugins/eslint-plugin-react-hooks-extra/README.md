# eslint-plugin-react-hooks-extra

Extra rules for React Hooks.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-hooks-extra
```

## Setup

```js
// @ts-check

import js from "@eslint/js";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks-extra": reactHooksExtra,
    },
    rules: {
      // react-hooks-extra recommended rules
      "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
      "react-hooks-extra/no-useless-custom-hooks": "warn",
      "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
    },
  },
];
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules>
