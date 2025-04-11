<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/@eslint-react/eslint-plugin?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)
[![Downloads](https://img.shields.io/npm/dt/@eslint-react/eslint-plugin.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)

A series of composable ESLint rules for React and friends.

## Features

- **Performant**: Built with performance in mind, optimized for large codebases.
- **Future-proof**: Forward-looking architecture that anticipates future changes in React and TypeScript.
- **Precision Control**: Fully customizable rule severity levels, allowing you to enforce or relax rules as needed.
- **Context-aware Linting**: Rules dynamically adapt to code structure and project settings, minimizing noise while maximizing relevance.

## Public Packages

### Modular

- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - X Rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

### All-In-One

- [`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin) - Main plugin combining all rules and presets from the above packages.

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
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    // Put rules you want to override here
    "@eslint-react/no-class-component": "error",
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
