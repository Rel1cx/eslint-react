<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/@eslint-react/eslint-plugin?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)
[![Downloads](https://img.shields.io/npm/dt/@eslint-react/eslint-plugin.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)

A series of composable ESLint rules for React and friends.

## Table of Contents

- [Features](#features)
- [Public Packages](#public-packages)
  - [Modular](#modular)
  - [Unified](#unified)
- [Installation](#installation)
  - [Install](#install)
  - [Setup](#setup)
- [Presets](#presets)
  - [Bare Bones](#bare-bones)
  - [General Purpose](#general-purpose)
  - [TypeScript Specialized](#typescript-specialized)
  - [Other](#other)
- [Rules](#rules)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern**: First-class support for TypeScript, React 19, and more.
- **Flexible**: Fully customizable rule severity levels, allowing you to enforce or relax rules as needed.
- **Performant**: Built with performance in mind, optimized for large codebases.
- **Context-aware Linting**: Rules that understand the context of your code and project configuration to provide more accurate linting.

## Public Packages

### Modular

- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - X Rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

### Unified

- [`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin) - A unified plugin that combines all individual plugins into one.

## Installation

> [!NOTE]\
> ESLint React requires the following minimum versions:
>
> - Node.js: 18.18.0
> - ESLint: 8.57.0
> - TypeScript: 4.9.5

### Install

```sh
npm install --save-dev typescript-eslint @eslint-react/eslint-plugin
```

### Setup

```js
// eslint.config.js

// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],

  // Extend recommended rule sets from:
  // 1. ESLint JS's recommended rules
  // 2. TypeScript ESLint recommended rules
  // 3. ESLint React's recommended-typescript rules
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs["recommended-typescript"],
  ],

  // Configure language/parsing options
  languageOptions: {
    // Use TypeScript ESLint parser for TypeScript files
    parser: tseslint.parser,
    parserOptions: {
      // Enable project service for better TypeScript integration
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  // Custom rule overrides (modify rule levels or disable rules)
  rules: {
    "@eslint-react/no-missing-key": "warn",
  },
});
```

[Full Installation Guide ↗](https://eslint-react.xyz/docs/getting-started/typescript)

</details>

## Presets

### Bare Bones

- `x`\
  Enable rules for `"react"`.
- `dom`\
  Enable rules for `"react-dom"`.
- `web-api`\
  Enable rules for interacting with Web APIs.

### General Purpose

- `recommended`\
  Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects.\
  _This preset includes the `x`, `dom`, and `web-api` presets._

### TypeScript Specialized

- `recommended-typescript`\
  Same as the `recommended` preset but disables rules that can be enforced by TypeScript.

- `recommended-type-checked`\
  Same as the `recommended-typescript` preset but enables additional rules that require type information.

### Other

- `disable-dom`\
  Disable rules in the `dom` preset.
- `disable-web-api`\
  Disable rules in the `web-api` preset.
- `disable-type-checked`\
  Disable rules that require type information.
- `off`\
  Disable all rules in this plugin except for debug rules.

[Full Presets List ↗](https://eslint-react.xyz/docs/presets)

## Rules

[Rules Overview ↗](https://eslint-react.xyz/docs/rules/overview)

## FAQ

[Frequently Asked Questions ↗](https://eslint-react.xyz/docs/faq)

## Roadmap

- [Milestone 2.0 ↗](https://eslint-react.xyz/roadmap#milestone-20)

## Contributing

Contributions are welcome!

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
