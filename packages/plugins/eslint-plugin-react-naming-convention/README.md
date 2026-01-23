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
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      "react-naming-convention": reactNamingConvention,
    },
    rules: {
      // Put rules you want to use here
      "react-naming-convention/component-name": "warn",
    },
  },
);
```

> [!NOTE]
> Naming convention rules enforce consistent naming patterns for `React` entities.

- [`component-name`](./naming-convention-component-name) - Enforces naming conventions for components (⚙️ Configurable)
- [`context-name`](./naming-convention-context-name) - Enforces context names ending with `Context` suffix
- [`filename`](./naming-convention-filename) - Enforces consistent file naming (⚙️ Configurable)
- [`filename-extension`](./naming-convention-filename-extension) - Enforces `JSX` file extensions (⚙️ Configurable)
- [`use-state`](./naming-convention-use-state) - Enforces symmetric naming of `useState` pairs (e.g., `[value, setValue]`)

## Rules

<https://eslint-react.xyz/docs/rules/overview#naming-convention-rules>
