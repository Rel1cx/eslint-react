# eslint-plugin-react-naming-convention

Naming convention rules.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-naming-convention
```

## Setup

```ts
import js from "@eslint/js";
import namingConvention from "eslint-plugin-react-naming-convention";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Add configs from eslint-plugin-react-naming-convention
      namingConvention.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-naming-convention/context-name": "warn",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#naming-convention-rules>
