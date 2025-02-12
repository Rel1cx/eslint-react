# eslint-plugin-react-dom

DOM specific rules for React DOM.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-dom
```

## Setup

```js
// @ts-check

import js from "@eslint/js";
import reactDOM from "eslint-plugin-react-dom";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-dom": reactDOM,
    },
    rules: {
      // react-dom recommended rules
      "react-dom/no-dangerously-set-innerhtml-with-children": "error",
      "react-dom/no-dangerously-set-innerhtml": "warn",
      "react-dom/no-find-dom-node": "error",
      "react-dom/no-missing-button-type": "warn",
      "react-dom/no-missing-iframe-sandbox": "warn",
      "react-dom/no-namespace": "error",
      "react-dom/no-render-return-value": "error",
      "react-dom/no-script-url": "warn",
      "react-dom/no-unknown-property": "warn",
      "react-dom/no-unsafe-iframe-sandbox": "warn",
      "react-dom/no-unsafe-target-blank": "warn",
      "react-dom/no-void-elements-with-children": "warn",
    },
  },
];
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#dom-rules>
