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
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactDom.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-dom/no-dangerously-set-innerhtml": "warn",
    },
  },
);
```

> [!NOTE]
> DOM rules target `React DOM`-specific concerns including security vulnerabilities, deprecated APIs, and DOM property usage.

**Security Rules:**

- [`no-dangerously-set-innerhtml`](./dom-no-dangerously-set-innerhtml) - Disallows `dangerouslySetInnerHTML`
- [`no-dangerously-set-innerhtml-with-children`](./dom-no-dangerously-set-innerhtml-with-children) - Prevents using `dangerouslySetInnerHTML` with `children`
- [`no-script-url`](./dom-no-script-url) - Disallows `javascript:` URLs
- [`no-unsafe-target-blank`](./dom-no-unsafe-target-blank) - Requires `rel="noreferrer noopener"` with `target="_blank"` (🔧 Fixable)
- [`no-missing-iframe-sandbox`](./dom-no-missing-iframe-sandbox) - Enforces `sandbox` attribute on `iframes` (🔧 Fixable)
- [`no-unsafe-iframe-sandbox`](./dom-no-unsafe-iframe-sandbox) - Prevents unsafe `sandbox` combinations

**Deprecated API Migrations:**

- [`no-find-dom-node`](./dom-no-find-dom-node) - Disallows `findDOMNode`
- [`no-flush-sync`](./dom-no-flush-sync) - Disallows `flushSync`
- [`no-hydrate`](./dom-no-hydrate) - Replaces `ReactDOM.hydrate()` with `hydrateRoot()` (🔄 Codemod, `React DOM` >=18.0.0)
- [`no-render`](./dom-no-render) - Replaces `ReactDOM.render()` with `createRoot().render()` (🔄 Codemod, `React DOM` >=18.0.0)
- [`no-render-return-value`](./dom-no-render-return-value) - Disallows return value from `ReactDOM.render`
- [`no-use-form-state`](./dom-no-use-form-state) - Replaces `useFormState` with `useActionState` (🔄 Codemod, `React DOM` >=19.0.0)

**DOM Properties:**

- [`no-missing-button-type`](./dom-no-missing-button-type) - Enforces explicit `type` on `buttons` (🔧 Fixable)
- [`no-namespace`](./dom-no-namespace) - Prevents namespace usage in `React` elements
- [`no-string-style-prop`](./dom-no-string-style-prop) - Disallows string values for `style` prop
- [`no-unknown-property`](./dom-no-unknown-property) - Disallows unknown `DOM` properties (🔧 Fixable, ⚙️ Configurable)
- [`no-void-elements-with-children`](./dom-no-void-elements-with-children) - Prevents `children` in void elements

## Rules

<https://eslint-react.xyz/docs/rules/overview#dom-rules>
