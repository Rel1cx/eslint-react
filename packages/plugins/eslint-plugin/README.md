<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/@eslint-react/eslint-plugin?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)
[![Downloads](https://img.shields.io/npm/dt/@eslint-react/eslint-plugin.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)

A series of composable ESLint plugins for libraries and frameworks that use React as a UI runtime.

## Features

- **Universal** rules for libraries and frameworks that use React as a UI runtime.
- **Well designed** rule behaviors and sensible defaults.
- **Maximum flexibility** through minimum rule options.

## Public packages

### All-in-one plugins

- [`@eslint-react/eslint-plugin`](https://www.npmjs.com/package/@eslint-react/eslint-plugin) - The main ESLint plugin package including all rules and config presets in this repository.

### Mono plugins

- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - Core rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

## Install

```sh
# npm
npm install --save-dev @eslint-react/eslint-plugin

# yarn
yarn add --dev @eslint-react/eslint-plugin

# pnpm
pnpm add --save-dev @eslint-react/eslint-plugin
```

## Setup

### Flat Config

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...react.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
  },
];
```

[Full Installation Guide ↗](https://eslint-react.xyz/docs/installation)

</details>

## Presets

### Flat Config

- **recommended**\
  Enable rules that are recommended by ESLint React.
- **recommended-typescript**\
  Enable rules that are recommended by ESLint React and disable rules that can be covered by TypeScript.\
  _This preset includes the `recommended` preset._
- **recommended-type-checked**\
  Enable rules that are recommended by ESLint React with additional rules that require type information.\
  _This preset includes the `recommended-typescript` preset._

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

_Data collected from GitHub dependents network, if there are any mismatch or outdated information, feel free to [open issue](https://github.com/Rel1cx/eslint-react/issues/new?assignees=&labels=type%3A+documentation&projects=&template=docs_report.md&title=%5Bdocs%5D+) or pull request._

Find more on [GitHub Dependents](https://github.com/Rel1cx/eslint-react/network/dependents).

## Contributing

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [rome/tools](https://github.com/rome/tools)
