# eslint-plugin-react-rsc

RSC related rules.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-rsc
```

## Setup

```ts
import js from "@eslint/js";
import reactRsc from "eslint-plugin-react-rsc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Add configs from eslint-plugin-react-rsc
      reactRsc.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-rsc/function-definition": "error",
    },
  },
);
```

## Rules

<https://eslint-react.xyz/docs/rules#rsc-rules>
