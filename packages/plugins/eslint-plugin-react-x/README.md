# eslint-plugin-react-x

A set of composable ESLint rules for libraries and frameworks that use React as a UI runtime.

> [!NOTE]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-x
```

## Setup

```js
// @ts-check

import js from "@eslint/js";
import reactx from "eslint-plugin-react-x";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-x": reactx,
    },
    rules: {
      // react-x recommended rules
      "react-x/ensure-forward-ref-using-ref": "warn",
      "react-x/no-access-state-in-setstate": "error",
      "react-x/no-array-index-key": "warn",
      "react-x/no-children-count": "warn",
      "react-x/no-children-for-each": "warn",
      "react-x/no-children-map": "warn",
      "react-x/no-children-only": "warn",
      "react-x/no-children-to-array": "warn",
      "react-x/no-clone-element": "warn",
      "react-x/no-comment-textnodes": "warn",
      "react-x/no-component-will-mount": "error",
      "react-x/no-component-will-receive-props": "error",
      "react-x/no-component-will-update": "error",
      "react-x/no-context-provider": "warn",
      "react-x/no-create-ref": "error",
      "react-x/no-default-props": "error",
      "react-x/no-direct-mutation-state": "error",
      "react-x/no-duplicate-jsx-props": "warn",
      "react-x/no-duplicate-key": "error",
      "react-x/no-forward-ref": "warn",
      "react-x/no-implicit-key": "warn",
      "react-x/no-missing-key": "error",
      "react-x/no-nested-components": "error",
      "react-x/no-prop-types": "error",
      "react-x/no-redundant-should-component-update": "error",
      "react-x/no-set-state-in-component-did-mount": "warn",
      "react-x/no-set-state-in-component-did-update": "warn",
      "react-x/no-set-state-in-component-will-update": "warn",
      "react-x/no-string-refs": "error",
      "react-x/no-unsafe-component-will-mount": "warn",
      "react-x/no-unsafe-component-will-receive-props": "warn",
      "react-x/no-unsafe-component-will-update": "warn",
      "react-x/no-unstable-context-value": "warn",
      "react-x/no-unstable-default-props": "warn",
      "react-x/no-unused-class-component-members": "warn",
      "react-x/no-unused-state": "warn",
      "react-x/no-use-context": "warn",
      "react-x/use-jsx-vars": "warn",
    },
  },
];
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#core-rules>
