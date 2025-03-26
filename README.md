<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/eslint-plugin-react-x?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/eslint-plugin-react-x)
[![Downloads](https://img.shields.io/npm/dt/eslint-plugin-react-x.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/eslint-plugin-react-x)

More than 80 high-quality linting rules to identify possible problems in your React 19 code.

## Features

- **Modern**: First-class support for TypeScript, React 19, and more.
- **Flexible**: Increased flexibility with more granular severity control.
- **Performant**: Built with performance in mind, optimized for large codebases.
- **Comprehensive**: Handles complex scenarios and identifies problems that other tools might miss.

## Public Packages

### Modular

- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - Core rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

### All-In-One

- [`@eslint-react/eslint-plugin`](https://www.npmjs.com/package/@eslint-react/eslint-plugin) - Main plugin combining all rules and presets from the above packages.

## Installation

> [!NOTE]\
> ESLint React requires the following minimum versions:
>
> - `node@18.18.0`
> - `eslint@8.57.0`
> - `typescript@4.9.5`

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
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs["recommended-typescript"],
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Put rules you want to override here
    "@eslint-react/prefer-shorthand-boolean": "warn",
  },
});
```

[Full Installation Guide ↗](https://eslint-react.xyz/docs/getting-started/typescript)

</details>

## Presets

### Bare Bones

- **Core** (`core`)\
  Enable rules for `"react"`.
- **DOM** (`dom`)\
  Enable rules for `"react-dom"`.
- **Web API** (`web-api`)\
  Enable rules for interacting with Web APIs.

### General Purpose

- **Recommended** (`recommended`)\
  Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects.\
  _This preset includes the `core`, `dom`, and `web-api` presets._

### TypeScript Specialized

- **Recommended TypeScript** (`recommended-typescript`)\
  Same as the `recommended` preset but disables rules that can be enforced by TypeScript.

- **Recommended Type-Checked** (`recommended-type-checked`)\
  Same as the `recommended-typescript` preset but enables additional rules that require type information.

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
