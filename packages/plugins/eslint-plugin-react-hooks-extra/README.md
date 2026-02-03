# eslint-plugin-react-hooks-extra

Extra rules for React Hooks.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-hooks-extra
```

## Setup

```ts
import js from "@eslint/js";
import hooksExtra from "eslint-plugin-react-hooks-extra";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Add the react-hooks-extra plugin recommended config below js/tseslint configs
      hooksExtra.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules>
