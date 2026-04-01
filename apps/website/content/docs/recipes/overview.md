---
title: Overview
---

Recipes are ready-to-use custom ESLint rule definitions built with [`@eslint-react/kit`](/docs/packages/kit). They are **not** part of the core plugin — instead, they are designed to be **copied and pasted** directly into your project. Each recipe contains one or more custom rules.

## Why Recipes?

Some lint rules are inherently **opinionated** — they enforce a specific code style or convention that not every team agrees on. Rather than shipping these as built-in rules with fixed behavior, we provide them as recipes so you can:

- **Copy** the rule definition into your project.
- **Customize** the implementation to match your team's conventions.
- **Own** the code — no dependency on upstream changes you didn't ask for.

## Prerequisites

Recipes require the `@eslint-react/kit` package:

```package-install copy
npm install --save-dev @eslint-react/kit
```

## Usage

Each recipe page provides:

1. **Rule Factory** — A self-contained function you copy into your project (e.g. into an `eslint.config.rules.ts` file).
2. **Usage** — How to wire it up in your `eslint.config.ts` using `eslintReactKit().use(...)`.

Here's the general pattern:

```ts title="eslint.config.rules.ts"
import type { RuleFunction } from "@eslint-react/kit";

function noForwardRef(): RuleFunction {
  return (context, { is }) => ({
    CallExpression(node) {
      if (is.forwardRefCall(node)) {
        context.report({ node, message: "The 'forwardRef' is deprecated in React 19. Pass 'ref' as a prop instead." });
      }
    },
  });
}
```

```ts title="eslint.config.ts"
import eslintReact from "@eslint-react/eslint-plugin";
import eslintReactKit from "@eslint-react/kit";
import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { noForwardRef } from "./eslint.config.rules";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintReactKit()
        .use(noForwardRef)
        .getConfig(),
    ],
    rules: {
      "@eslint-react/kit/no-forward-ref": "error",
    },
  },
);
```

## Available Recipes

| Recipe                                                           | Rules | Description                                                                                                                                 |
| :--------------------------------------------------------------- | :---: | :------------------------------------------------------------------------------------------------------------------------------------------ |
| [component-hook-factories](./component-hook-factories)           |   1   | Disallows components or hooks defined inside other functions (factory pattern).                                                             |
| [custom-rules-of-props](./custom-rules-of-props)                 |   3   | Validates JSX props. Includes checks for duplicate props, mixing controlled and uncontrolled props, and explicit spread props.              |
| [custom-rules-of-state](./custom-rules-of-state)                 |   1   | Validates state usage. Prefer the updater function form in useState setters.                                                                |
| [function-component-definition](./function-component-definition) |   1   | Enforces arrow function style for function component definitions.                                                                           |
| [no-circular-effect](./no-circular-effect)                       |   1   | Detects circular dependencies between useEffect hooks. Prevents infinite update loops caused by effects that set state they also depend on. |
