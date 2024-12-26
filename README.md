<!-- eslint-disable markdown/no-html -->

<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

A set of composable ESLint rules for libraries and frameworks that use React as a UI runtime.

## Features

- **Flexible**: Increased flexibility with fewer rule options.
- **Comprehensive**: First-class support for TypeScript, React UI libraries, polymorphic components.
- **Advanced Analysis**: Handles complex scenarios and identifies problems that other tools might miss.

## Public packages

### All-in-one plugins

- [`@eslint-react/eslint-plugin`](https://www.npmjs.com/package/@eslint-react/eslint-plugin) - The main ESLint plugin package including all rules and config presets in this repository.

### Mono plugins

- [`eslint-plugin-react-x`](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - Core rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

## Installation

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
    eslintReact.configs.recommended,
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

[Full Installation Guide ↗](https://eslint-react.xyz/docs/getting-started)

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
  Enforce rules that are recommended by ESLint React for general purpose React + React DOM applications.
  _This preset includes the `core`, `dom`, and `web-api` presets._

### TypeScript Specialized

- **Recommended TypeScript** (`recommended-typescript`)\
  Same as the `recommended` preset but disables rules that can be enforced by TypeScript.

- **Recommended Type-Checked** (`recommended-type-checked`)\
  Same as the `recommended-typescript` preset but enables additional rules that require type information.

[Full Presets List↗](https://eslint-react.xyz/docs/presets)

## Rules

[Rules Overview ↗](https://eslint-react.xyz/docs/rules/overview)

## FAQ

[Frequently Asked Questions ↗](https://eslint-react.xyz/docs/faq)

## Roadmap

- [Milestone 2.0 ↗](https://eslint-react.xyz/roadmap#milestone-20)
- [Milestone 3.0 ↗](https://eslint-react.xyz/roadmap#milestone-30-draft)

## Used by

![used-by](https://eslint-react.xyz/used_by.png)

### Also available in

- [`antfu/eslint-config`](https://github.com/antfu/eslint-config) - Anthony's ESLint config preset.
- [`eslint-config-sheriff`](https://github.com/AndreaPontrandolfo/sheriff) - A comprehensive and opinionated Typescript-first ESLint configuration.
- [`eslint-config-sukka`](https://github.com/SukkaW/eslint-config-sukka) - Sukka's ESLint config preset.

_Data collected from GitHub dependents network, if there are any mismatch or outdated information, feel free to [open issue](https://github.com/rEl1cx/eslint-react/issues/new?assignees=&labels=type%3A+documentation&projects=&template=docs_report.md&title=%5Bdocs%5D+) or pull request._

Find more on [GitHub Dependents](https://github.com/rEl1cx/eslint-react/network/dependents).

## Contributing

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [biomejs.dev/linter/rules-sources/#eslint-plugin-react](https://biomejs.dev/linter/rules-sources/#eslint-plugin-react)
