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

### Bare Bones

- **Core** (`core`)\
  Enable rules for `"react"`.
- **DOM** (`dom`)\
  Enable rules for `"react-dom"`.
- **Web API** (`web-api`)\
  Enable rules for interacting with Web APIs.

### General Purpose

- **Recommended** (`recommended`)\
  Enforce rules that are recommended by ESLint React.\
  _This preset includes the `core`, `dom`, and `web-api` presets._

### TypeScript Specialized

- **Recommended TypeScript** (`recommended-typescript`)\
  Same as the `recommended` preset but disables rules that can be covered by TypeScript.

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

<!-- AUTO-GENERATED-CONTENT:START (used-by) -->
<div style="display: flex; flex-flow: row wrap; gap: 1rem;">
<a href="https://github.com/DimensionDev/Maskbook" alt="DimensionDev/Maskbook"><img src="https://avatars.githubusercontent.com/u/39396545?v=4" alt="DimensionDev/Maskbook" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/dream-num/univer" alt="dream-num/univer"><img src="https://avatars.githubusercontent.com/u/61444807?v=4" alt="dream-num/univer" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/electric-sql/pglite" alt="electric-sql/pglite"><img src="https://avatars.githubusercontent.com/u/96433696?v=4" alt="electric-sql/pglite" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/ensdomains/ensdomains-landing" alt="ensdomains/ensdomains-landing"><img src="https://avatars.githubusercontent.com/u/34167658?v=4" alt="ensdomains/ensdomains-landing" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/flirtual/flirtual" alt="flirtual/flirtual"><img src="https://avatars.githubusercontent.com/u/80071112?v=4" alt="flirtual/flirtual" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/luxdotdev/parsertime" alt="luxdotdev/parsertime"><img src="https://avatars.githubusercontent.com/u/162656598?v=4" alt="luxdotdev/parsertime" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/ndom91/github-search-preview" alt="ndom91/github-search-preview"><img src="https://avatars.githubusercontent.com/u/7415984?v=4" alt="ndom91/github-search-preview" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/npmgraph/npmgraph" alt="npmgraph/npmgraph"><img src="https://avatars.githubusercontent.com/u/82167737?v=4" alt="npmgraph/npmgraph" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/react-navigation/react-navigation" alt="react-navigation/react-navigation"><img src="https://avatars.githubusercontent.com/u/29647600?v=4" alt="react-navigation/react-navigation" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/RebeccaStevens/eslint-config-rebeccastevens" alt="RebeccaStevens/eslint-config-rebeccastevens"><img src="https://avatars.githubusercontent.com/u/7224206?v=4" alt="RebeccaStevens/eslint-config-rebeccastevens" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/refined-github/refined-github" alt="refined-github/refined-github"><img src="https://avatars.githubusercontent.com/u/53074291?v=4" alt="refined-github/refined-github" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/Rel1cx/compose-components" alt="Rel1cx/compose-components"><img src="https://avatars.githubusercontent.com/u/24217275?v=4" alt="Rel1cx/compose-components" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/TanStack/query" alt="TanStack/query"><img src="https://avatars.githubusercontent.com/u/72518640?v=4" alt="TanStack/query" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/toss/suspensive" alt="toss/suspensive"><img src="https://avatars.githubusercontent.com/u/25682207?v=4" alt="toss/suspensive" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/upleveled/eslint-config-upleveled" alt="upleveled/eslint-config-upleveled"><img src="https://avatars.githubusercontent.com/u/43520685?v=4" alt="upleveled/eslint-config-upleveled" width="64" height="64" style="border-radius: 50%;" /></a>
<a href="https://github.com/zolplay-cn/config-monorepo" alt="zolplay-cn/config-monorepo"><img src="https://avatars.githubusercontent.com/u/80669433?v=4" alt="zolplay-cn/config-monorepo" width="64" height="64" style="border-radius: 50%;" /></a>
</div>
<!-- AUTO-GENERATED-CONTENT:END -->

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
