# eslint-plugin-react-hooks-extra

Extra rules for React Hooks.

> [!NOTE]
> This plugin is already included in `@eslint-react/eslint-plugin`. You don't need to install it separately if you are using `@eslint-react/eslint-plugin`.

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
      "react-hooks-extra/no-redundant-custom-hook": "warn",
      "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
      "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
    },
  },
];
```

## Rules

| Rule                                   | Description                                                               | 💼  | 💭  |     |
| :------------------------------------- | :------------------------------------------------------------------------ | :-: | :-: | :-: |
| `no-direct-set-state-in-use-effect`    | Disallow direct calls to the `set` function of `useState` in `useEffect`. |  ✔️  |     | 📐  |
| `no-redundant-custom-hook`             | Warns when custom Hooks that don't use other Hooks.                       |  ✔️  |     |     |
| `no-unnecessary-use-callback`          | Disallow unnecessary usage of `useCallback`.                              |  ✔️  |     | 📐  |
| `no-unnecessary-use-memo`              | Disallow unnecessary usage of `useMemo`.                                  |  ✔️  |     | 📐  |
| `prefer-use-state-lazy-initialization` | Warns function calls made inside `useState` calls.                        | 🚀  |     |     |
