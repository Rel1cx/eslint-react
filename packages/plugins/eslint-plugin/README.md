<p align="center"><img src="https://eslint-react.xyz/logo.svg" alt="logo" width="150" /></p>

<h1 align="center" alt="title">ESLint React</h1>

[![Version](https://img.shields.io/npm/v/@eslint-react/eslint-plugin?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)
[![Size](https://img.shields.io/bundlephobia/minzip/@eslint-react/eslint-plugin?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@eslint-react/eslint-plugin)
[![Downloads](https://img.shields.io/npm/dt/@eslint-react/eslint-plugin.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@eslint-react/eslint-plugin)

A series of composable ESLint plugins for libraries and frameworks that use React as a UI runtime.

> [!IMPORTANT]\
> `eslint-react` is not a fork of `eslint-plugin-react` and meanwhile `eslint-plugin-react` is not upstream of `eslint-react`.

## Features

- **Universal** rules for libraries and frameworks that use React as a UI runtime.
- **Well designed** rule behaviors and sensible defaults.
- **Maximum flexibility** through minimum rule options.

## Public packages

### All-in-one plugins

- [`@eslint-react/eslint-plugin`](https://www.npmjs.com/package/@eslint-react/eslint-plugin) - The main ESLint plugin package including all rules and config presets in this repository.

### Mono plugins (will be available in 2.0)

- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) - Core rules (renderer-agnostic, compatible with x-platform).
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) - DOM specific rules for React DOM.
- [`eslint-plugin-react-web-api`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api) - Rules for interacting with Web APIs.
- [`eslint-plugin-react-hooks-extra`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra) - Extra React Hooks rules.
- [`eslint-plugin-react-naming-convention`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention) - Naming convention rules.

## Who is using?

- [`AndreaPontrandolfo/sheriff`](https://github.com/AndreaPontrandolfo/sheriff) - A comprehensive and opinionated Typescript-first ESLint configuration.
- [`antfu/​eslint-config`](https://github.com/antfu/eslint-config) - Anthony's ESLint config preset.
- [`christopher-buss/roblox-ts-eslint-config`](https://github.com/christopher-buss/roblox-ts-eslint-config) - iSentinel's ESLint config preset for Roblox-TS.
- [`DimensionDev/Maskbook`](https://github.com/DimensionDev/Maskbook) - The portal to the new, open Internet. ([I:b]).
- [`dream-num/univer`](https://github.com/dream-num/univer) - Univer is an open-source alternative to Google Sheets, Slides, and Docs.
- [`electric-sql/pglite`](https://github.com/electric-sql/pglite) - Lightweight Postgres packaged as WASM into a TypeScript library for the browser, Node.js, Bun and Deno.
- [`ensdomains/ensdomains-landing`](https://github.com/ensdomains/ensdomains-landing) - ENS Homepage V2, the main homepage of the ENS protocol.
- [`hairyf/overlastic`](https://github.com/hairyf/overlastic) - A universal overlays utils, support react, vue, vanilla, svelte.
- [`hipstersmoothie/react-window-splitter`](https://github.com/hipstersmoothie/react-window-splitter) - A full featured window splitter for React.
- [`johannschopplich/unlazy`](https://github.com/johannschopplich/unlazy) - Universal lazy loading library for placeholder images leveraging native browser APIs.
- [`npmgraph/npmgraph`](https://github.com/npmgraph/npmgraph) - A tool for exploring NPM modules and dependencies.
- [`react-navigation/​react-navigation`](https://github.com/react-navigation/react-navigation) - Routing and navigation for your React Native apps.
- [`RebeccaStevens/eslint-config-rebeccastevens`](https://github.com/RebeccaStevens/eslint-config-rebeccastevens) - RebeccaStevens' ESLint config preset.
- [`RSSNext/​follow`](https://github.com/RSSNext/follow) - 🧡 Next generation information browser.
- [`satya164/PocketGear`](https://github.com/satya164/PocketGear) - A clean and simple Pokédex app for Pokémon GO.
- [`SukkaW/eslint-config-sukka`](https://github.com/SukkaW/eslint-config-sukka) - ESLint configuration of Sukka.
- [`SukkaW/foxact`](https://github.com/SukkaW/foxact) - React Hooks/Utils done right. For Browser, SSR, and React Server Components.
- [`TanStack/​form`](https://github.com/TanStack/form) - 🤖 Powerful and type-safe form state management for the web. TS/JS, React Form, Solid Form, Lit Form and Vue Form.
- [`TanStack/​query`](https://github.com/TanStack/query) - 🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.
- [`TanStack/​router`](https://github.com/TanStack/router) - 🤖 Fully typesafe Router for React (and friends) w/ built-in caching, 1st class search-param APIs, client-side cache integration and isomorphic rendering.
- [`TanStack/​store`](https://github.com/TanStack/store) - 🤖 Framework agnostic, type-safe store w/ reactive framework adapters.

_Data collected from GitHub dependents network, if there are any mismatch or outdated information, feel free to [open issue](https://github.com/Rel1cx/eslint-react/issues/new?assignees=&labels=type%3A+documentation&projects=&template=docs_report.md&title=%5Bdocs%5D+) or pull request._

Find more on [GitHub Dependents](https://github.com/Rel1cx/eslint-react/network/dependents).

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

Add the plugin to your `eslint.config.js`:

```js
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

### Legacy Config

Add the plugin to your `.eslintrc.json`:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@eslint-react/eslint-plugin"],
  "extends": ["eslint:recommended"],
  "overrides": [
    {
      "files": ["**/*.{ts,tsx}"],
      "extends": [
        "plugin:@eslint-react/recommended-legacy"
      ]
    }
  ]
}
```

[Full Installation Guide ↗](https://eslint-react.xyz/docs/installation)

## Presets

### Flat Config

- **core**\
  Enable rules that are renderer-agnostic.
- **dom**\
  Enable rules that are specific to React DOM.
- **web-api**\
  Enable rules for interacting with Web APIs.
- **recommended**\
  Enable rules that are recommended by ESLint React.\
  _This preset includes the `core`, `dom`, and `web-api` presets._
- **recommended-type-checked**\
  Enable rules that are recommended by ESLint React with additional rules that require type information.\
  _This preset includes the `recommended` preset._

### Legacy Config

<details>
<summary>Click to toggle contents</summary>

- **core-legacy**\
  Enable rules that are renderer-agnostic.
- **dom-legacy**\
  Enable rules that are specific to React DOM.
- **web-api-legacy**\
  Enable rules for interacting with Web APIs.
- **recommended-legacy**\
  Enable rules that are recommended by ESLint React.\
  _This preset includes the `core-legacy`, `dom-legacy`, and `web-api-legacy` presets._
- **recommended-type-checked-legacy**\
  Enable rules that are recommended by ESLint React with additional rules that require type information.\
  _This preset includes the `recommended-legacy` preset._

</details>

[Full Presets List↗](https://eslint-react.xyz/docs/presets)

## Rules

[Rules Overview ↗](https://eslint-react.xyz/docs/rules/overview)

## FAQ

[Frequently Asked Questions ↗](https://eslint-react.xyz/docs/faq)

## Roadmap

- [Milestone 2.0 ↗](https://eslint-react.xyz/roadmap#milestone-20)
- [Milestone 3.0 ↗](https://eslint-react.xyz/roadmap#milestone-30-draft)

## Contributing

Before you start working on something, it's best to check if there is an existing issue first. It's also a good idea to reach the maintainer and confirm if it makes sense or if someone else is already working on it.

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Thank you to everyone contributing to ESLint React!

### Contribution Stats

<!-- Copy-paste in your Readme.md file -->

<a href="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats?repo_id=680315614" target="_blank" style="display: block" align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=680315614&image_size=auto&color_scheme=dark" width="655" height="auto">
    <img alt="Performance Stats of Rel1cx/eslint-react - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=680315614&image_size=auto&color_scheme=light" width="655" height="auto">
  </picture>
</a>

<!-- Made with [OSS Insight](https://ossinsight.io/) -->

### Active Contributors

<!-- Copy-paste in your Readme.md file -->

<a href="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors?limit=30&repo_id=680315614" target="_blank" style="display: block" align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors/thumbnail.png?limit=30&repo_id=680315614&image_size=auto&color_scheme=dark" width="655" height="auto">
    <img alt="Active Contributors of Rel1cx/eslint-react - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors/thumbnail.png?limit=30&repo_id=680315614&image_size=auto&color_scheme=light" width="655" height="auto">
  </picture>
</a>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Inspiration

- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid)
- [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist)
- [eslint-plugin-filenames-simple](https://github.com/epaew/eslint-plugin-filenames-simple)
- [rome/tools](https://github.com/rome/tools)
- [rust-clippy](https://github.com/rust-lang/rust-clippy)
