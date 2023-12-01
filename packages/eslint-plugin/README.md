<p align="center"><img src="https://eslint-react.rel1cx.io/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint x React</h1>

A set of ESLint rules to catch common mistakes and improve your React code.

## Public packages

- [`@eslint-react/eslint-plugin`](./packages/eslint-plugin) - The main ESLint plugin package including all rules and configs in this repository.
- [`@eslint-react/jsx`](./packages/jsx) - TSESTree AST utility module for static analysis of JSX.

## Supported engines

### Node.js

- 18.x LTS Hydrogen
- 20.x Current

### Bun

- 1.0.11 or later

## Installation

This plugin requires `typescript` and `@typescript-eslint/parser` as peer dependencies. Install them if you haven't already.

```bash
# npm
npm install --save-dev typescript @typescript-eslint/parser

# pnpm
pnpm add --save-dev typescript @typescript-eslint/parser

# yarn
yarn add --dev typescript @typescript-eslint/parser

# bun
bun add --dev typescript @typescript-eslint/parser
```

Then install this plugin.

```bash
# npm
npm install --save-dev @eslint-react/eslint-plugin

# pnpm
pnpm add --save-dev @eslint-react/eslint-plugin

# yarn
yarn add --dev @eslint-react/eslint-plugin

# bun
bun add --dev @eslint-react/eslint-plugin
```

## Usage

### LegacyConfig ([`.eslintrc.js`](https://eslint.org/docs/latest/use/configure/configuration-files))

```js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@eslint-react/recommended-legacy",
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  ignorePatterns: ["dist", ".eslintrc.js"],
};
```

### FlatConfig ([`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new))

```js
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // TypeScript rules
  {
    files: ["**/*.ts"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
    },
  },
  // React hooks rules
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  // React rules
  {
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs.recommended,
  },
];
```

## Presets

> **Note:**
>
> **Presets with `-legacy` suffix are only available for ESLint LegacyConfig ([`.eslintrc.js`](https://eslint.org/docs/latest/use/configure/configuration-files))**.\
> **Presets without `-legacy` suffix are only available for ESLint FlatConfig ([`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new))**.
>
> Choose the appropriate preset based on your ESLint config format.

> **Note:**
>
> **Presets with `-type-checked` or `type-checked-legacy` suffix require type information**.
>
> Make sure the `parserOptions.project` option is set correctly in your ESLint config when using them.

The following presets are available in this plugin:

- **recommended**\
  Enforce recommended rules designed to catch common mistakes and prevent potential bugs.
- **recommended-legacy** (`plugin:@eslint-react/recommended-legacy`)\
  Same as `recommended` but for ESLint LegacyConfig.
- **recommended-type-checked**\
  Same as `recommended` but with additional rules that require type information.
- **recommended-type-checked-legacy** (`plugin:@eslint-react/recommended-type-checked-legacy`)\
  Same as `recommended-type-checked` but for ESLint LegacyConfig.

### Other presets

- **all**\
  Enable all rules in this plugin except for debug rules.\
  (Not recommended unless you know what you are doing)

- **all-legacy** (`plugin:@eslint-react/all-legacy`)\
  Same as `all` but for ESLint LegacyConfig.

- **off**\
  Disable all rules in this plugin except for debug rules.

- **off-legacy** (`plugin:@eslint-react/off-legacy`)\
  Same as `off` but for ESLint LegacyConfig.

- **debug**\
  Enable a series of rules that are useful for debugging purposes only.\
  (Not recommended unless you know what you are doing)

- **debug-legacy** (`plugin:@eslint-react/debug-legacy`)\
  Same as `debug` but for ESLint LegacyConfig.

[Rule List ↗](https://eslint-react.rel1cx.io/rules/overview)

## Philosophy

- **Focus on code rather than style**.
- **Linting errors are better than runtime crashes**.
- **Types are the fundamental unit of correctness**.

## Rule introduction or modification principles

1. **TypeScript first**. If a behavior can already be enforced by TypeScript built-in checker, don't reimplement it.
2. **Formatting independent**. Rules should check for correctness, not style. We recommend using style focused tools for formatting (e.g. [dprint](https://dprint.dev/) or [eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)).
3. **No Auto-fix**. Auto-fix is a great feature, but it's not always safe and reliable. We prefer to not to do auto-fix at all than to implement it in a way that can cause more problems than it solves.
4. **Sensible defaults**. Rules should be easy to setup and use with minimal configuration and sensible defaults.
5. **Rules over Options [[1]](https://eslint-react.rel1cx.io/docs/rules-over-options)**. Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding options to a single rule.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)

## Prior art

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
