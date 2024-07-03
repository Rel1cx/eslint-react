# eslint-plugin-react-dom

DOM specific rules for React DOM.

> [!TIP]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-dom
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactDOM from "eslint-plugin-react-dom";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-dom": reactDOM,
      rules: {
        // react-dom recommended rules
        "react-dom/no-children-in-void-dom-elements": "warn",
        "react-dom/no-dangerously-set-innerhtml": "warn",
        "react-dom/no-dangerously-set-innerhtml-with-children": "error",
        "react-dom/no-find-dom-node": "error",
        "react-dom/no-missing-button-type": "warn",
        "react-dom/no-missing-iframe-sandbox": "warn",
        "react-dom/no-namespace": "error",
        "react-dom/no-render-return-value": "error",
        "react-dom/no-script-url": "warn",
        "react-dom/no-unsafe-iframe-sandbox": "warn",
        "react-dom/no-unsafe-target-blank": "warn",
      }
    ],
  },
];
```

## Rules

| Rule                                                                                               | Description                                                                             | 💼  | 💭  | ❌  |
| :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :-: | :-: | :-: |
| [`dom/no-children-in-void-dom-elements`](dom-no-children-in-void-dom-elements)                     | Prevents the use of `children` in void `DOM elements`.                                  |  ✔️  |     |     |
| [`dom/no-dangerously-set-innerhtml`](dom-no-dangerously-set-innerhtml)                             | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 | 🔒  |     |     |
| [`dom/no-dangerously-set-innerhtml-with-children`](dom-no-dangerously-set-innerhtml-with-children) | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |  ✔️  |     |     |
| [`dom/no-find-dom-node`](dom-no-find-dom-node)                                                     | Prevents usage of `findDOMNode`.                                                        | ⛔  |     |     |
| [`dom/no-missing-button-type`](dom-no-missing-button-type)                                         | Enforces explicit `button` type `attribute` for `<button>` elements.                    |  ✔️  |     |     |
| [`dom/no-missing-iframe-sandbox`](dom-no-missing-iframe-sandbox)                                   | Enforces explicit `sandbox` attribute for `iframe` elements.                            | 🔒  |     |     |
| [`dom/no-namespace`](dom-no-namespace)                                                             | Enforces the absence of a `namespace` in React elements.                                |  ✔️  |     |     |
| [`dom/no-render-return-value`](no-render-return-value)                                             | Prevents usage of the return value of `ReactDOM.render`.                                | ⛔  |     |     |
| [`dom/no-script-url`](dom-no-script-url)                                                           | Prevents usage of `javascript:` URLs as the value of certain attributes.                | 🔒  |     |     |
| [`dom/no-unsafe-iframe-sandbox`](dom-no-unsafe-iframe-sandbox)                                     | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   | 🔒  |     |     |
| [`dom/no-unsafe-target-blank`](dom-no-unsafe-target-blank)                                         | Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.              | 🔒  |     |     |
