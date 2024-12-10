# eslint-plugin-react-dom

DOM specific rules for React DOM.

> [!NOTE]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

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
      "react-dom/no-children-in-void-dom-elements": "warn",
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
    },
  },
];
```

## Rules

| Rule                                         | Description                                                                             | 💭  |     |
| :------------------------------------------- | :-------------------------------------------------------------------------------------- | :-: | :-: |
| `no-children-in-void-dom-elements`           | Prevents usage of `children` in void `DOM elements`.                                    |     |     |
| `no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |     |     |
| `no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 |     |     |
| `no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                        |     |     |
| `no-missing-button-type`                     | Enforces explicit `type` attribute for `<button>` elements.                             |     |     |
| `no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                            |     |     |
| `no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                |     |     |
| `no-render-return-value`                     | Prevents usage of the return value of `ReactDOM.render`.                                |     |     |
| `no-script-url`                              | Prevents usage of `javascript:` URLs as the value of certain attributes.                |     |     |
| `no-unknown-property`                        | Prevents usage of unknown DOM property.                                                 |     | 🔧  |
| `no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   |     |     |
| `no-unsafe-target-blank`                     | Prevents usage of `target="_blank"` without `rel="noreferrer noopener"`.                |     |     |
