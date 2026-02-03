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
      // Add this plugin's config below js/tseslint configs
      namingConvention.configs.recommended,
    ],
    rules: {
      // Put rules you want to use here
      "react-naming-convention/component-name": "warn",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#naming-convention-rules>
