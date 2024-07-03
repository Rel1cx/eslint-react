# eslint-plugin-react-hooks-extra

Extra rules for React Hooks.

> [!TIP]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-hooks-extra
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-hooks-extra": reactHooksExtra,
      rules: {
        // react-hooks-extra recommended rules
        "react-hooks-extra/ensure-custom-hooks-using-other-hooks": "warn",
        "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
      }
    ],
  },
];
```

## Rules

| Rule                                                                                                       | Description                                                       | 💼  | 💭  | ❌  |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | :-: | :-: | :-: |
| [`hooks-extra/ensure-custom-hooks-using-other-hooks`](hooks-extra-ensure-custom-hooks-using-other-hooks)   | Warns when custom Hooks that don't use other Hooks.               |  ✔️  |     |     |
| [`hooks-extra/ensure-use-callback-has-non-empty-deps`](hooks-extra-ensure-use-callback-has-non-empty-deps) | Warns when `useCallback` is called with empty dependencies array. | 🧐  |     |     |
| [`hooks-extra/ensure-use-memo-has-non-empty-deps`](hooks-extra-ensure-use-memo-has-non-empty-deps)         | Warns when `useMemo` is called with empty dependencies array.     | 🧐  |     |     |
| [`hooks-extra/prefer-use-state-lazy-initialization`](hooks-extra-prefer-use-state-lazy-initialization)     | Warns function calls made inside `useState` calls.                | 🚀  |     |     |
