---
title: Removed
description: Reference for removed rules, presets, and settings
full: true
---

import { InlineTOC } from "fumadocs-ui/components/inline-toc";

<InlineTOC items={toc}>Table of Contents</InlineTOC>

## Rules

| Rule                                                         | Replaced by                                                                                           | Removed in | Reason       |
| :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------- | :----------- |
| `react-x/avoid-shorthand-boolean`                            |                                                                                                       | 2.0.0      | consolidated |
| `react-x/avoid-shorthand-fragment`                           |                                                                                                       | 2.0.0      | consolidated |
| `react-x/ensure-forward-ref-using-ref`                       | [`react-x/no-forward-ref`](/docs/rules/no-forward-ref)                                                | 2.0.0      | renamed      |
| `react-x/jsx-key-before-spread`                              | [`react-jsx/no-key-after-spread`](/docs/rules/jsx-no-key-after-spread)                                | 4.0.0      | consolidated |
| `react-x/jsx-no-duplicate-props`                             |                                                                                                       | 3.0.0      | deprecated   |
| `react-x/jsx-no-iife`                                        | [`react-x/unsupported-syntax`](/docs/rules/unsupported-syntax)                                        | 3.0.0      | consolidated |
| `react-x/jsx-no-undef`                                       | N/A (ESLint v10.0.0+ now tracks JSX references natively)                                              | 3.0.0      | deprecated   |
| `react-x/jsx-shorthand-boolean`                              | [`@eslint-react/kit`](https://github.com/Rel1cx/eslint-react/blob/main/packages/kit/README.md)         | 4.0.0      | discontinued |
| `react-x/jsx-shorthand-fragment`                             | [`@eslint-react/kit`](https://github.com/Rel1cx/eslint-react/blob/main/packages/kit/README.md)         | 4.0.0      | discontinued |
| `react-x/jsx-uses-react`                                     | N/A (ESLint v10.0.0+ now tracks JSX references natively)                                              | 3.0.0      | deprecated   |
| `react-x/jsx-uses-vars`                                      | N/A (ESLint v10.0.0+ now tracks JSX references natively)                                              | 3.0.0      | deprecated   |
| `react-x/no-comment-textnodes`                               | [`react-jsx/no-comment-textnodes`](/docs/rules/jsx-no-comment-textnodes)                              | 2.0.0      | renamed      |
| `react-x/no-complicated-conditional-rendering`               |                                                                                                       | 2.0.0      | discontinued |
| `react-x/no-default-props`                                   | [`@eslint-react/kit/no-default-props`](https://beta.eslint-react.xyz/docs/packages/kit)               | 2.9.3      | deprecated   |
| `react-x/no-forbidden-props`                                 | [`@eslint-react/kit/no-forbidden-props`](https://beta.eslint-react.xyz/docs/packages/kit)             | 2.3.2      | deprecated   |
| `react-x/no-nested-components`                               | [`react-x/no-nested-component-definitions`](/docs/rules/no-nested-component-definitions)              | 2.0.0      | renamed      |
| `react-x/no-prop-types`                                      | [`@eslint-react/kit/no-prop-types`](https://beta.eslint-react.xyz/docs/packages/kit)                  | 2.9.3      | deprecated   |
| `react-x/no-string-refs`                                     | [`@eslint-react/kit/no-string-refs`](https://beta.eslint-react.xyz/docs/packages/kit)                 | 2.9.3      | deprecated   |
| `react-x/no-unnecessary-key`                                 |                                                                                                       | 3.0.0      | discontinued |
| `react-x/no-unnecessary-use-ref`                             |                                                                                                       | 2.10.0     | discontinued |
| `react-x/no-useless-forward-ref`                             | [`react-x/no-forward-ref`](/docs/rules/no-forward-ref)                                                | 3.0.0      | consolidated |
| `react-x/prefer-react-namespace-import`                      | `react-x/prefer-namespace-import`                                                                     | 2.0.0      | renamed      |
| `react-x/prefer-read-only-props`                             | [`react-x/immutability`](/docs/rules/immutability)                                                    | 3.0.0      | consolidated |
| `react-x/prefer-shorthand-boolean`                           |                                                                                                       | 2.0.0      | consolidated |
| `react-x/prefer-shorthand-fragment`                          |                                                                                                       | 2.0.0      | consolidated |
| `react-x/prefer-use-state-lazy-initialization`               | [`react-x/use-state`](/docs/rules/use-state)                                                          | 3.0.0      | consolidated |
| `react-x/no-unnecessary-use-callback`                        | N/A (Rule deprecated due to being inherently incompatible with `React.StrictMode` and React Compiler) | 5.0.0      | deprecated   |
| `react-x/no-unnecessary-use-memo`                            | N/A (Rule deprecated due to being inherently incompatible with `React.StrictMode` and React Compiler) | 5.0.0      | deprecated   |
| `react-x/no-unused-state`                                    | N/A (Rule deprecated due to low usage and overlap with other rules)                                   | 5.0.0      | deprecated   |
| `react-x/prefer-destructuring-assignment`                    | N/A (Rule deprecated due to low usage, use `@eslint-react/kit` to implement as a custom rule instead) | 5.0.0      | deprecated   |
| `react-x/prefer-namespace-import`                            | N/A (Rule deprecated due to low usage, use `@eslint-react/kit` to implement as a custom rule instead) | 5.0.0      | deprecated   |
| `react-dom/prefer-namespace-import`                          | N/A (Rule deprecated due to low usage, use `@eslint-react/kit` to implement as a custom rule instead) | 5.0.0      | deprecated   |
| `react-x/use-jsx-vars`                                       | `react-x/jsx-uses-vars`                                                                               | 2.0.0      | renamed      |
| `react-x/unstable-rules-of-props`                            | [Recipes: custom-rules-of-props](/docs/recipes/custom-rules-of-props)                                 | 4.2.1      | discontinued |
| `react-x/unstable-rules-of-state`                            | [Recipes: custom-rules-of-state](/docs/recipes/custom-rules-of-state)                                 | 4.2.1      | discontinued |
| `react-dom/no-children-in-void-dom-elements`                 | [`react-dom/no-void-elements-with-children`](/docs/rules/dom-no-void-elements-with-children)          | 2.0.0      | renamed      |
| `react-dom/no-namespace`                                     | [`react-jsx/no-namespace`](/docs/rules/jsx-no-namespace)                                              | 4.0.0      | consolidated |
| `react-jsx/dollar`                                           |                                                                                                       | 4.0.0      | discontinued |
| `react-hooks-extra/exhaustive-deps`                          | [`react-x/exhaustive-deps`](/docs/rules/exhaustive-deps)                                              | 2.14.0     | relocated    |
| `react-hooks-extra/no-direct-set-state-in-use-effect`        | [`react-x/set-state-in-effect`](/docs/rules/set-state-in-effect)                                      | 2.14.0     | relocated    |
| `react-hooks-extra/no-direct-set-state-in-use-layout-effect` | [`react-x/set-state-in-effect`](/docs/rules/set-state-in-effect)                                      | 2.0.0      | consolidated |
| `react-hooks-extra/no-unnecessary-use-callback`              | N/A (Rule deprecated due to being inherently incompatible with `React.StrictMode` and React Compiler) | 2.0.0      | relocated    |
| `react-hooks-extra/no-unnecessary-use-memo`                  | N/A (Rule deprecated due to being inherently incompatible with `React.StrictMode` and React Compiler) | 2.0.0      | relocated    |
| `react-hooks-extra/no-unnecessary-use-prefix`                | [`react-x/no-unnecessary-use-prefix`](/docs/rules/no-unnecessary-use-prefix)                          | 2.0.0      | relocated    |
| `react-hooks-extra/prefer-use-state-lazy-initialization`     | `react-x/use-state`                                                                                   | 2.0.0      | relocated    |
| `react-hooks-extra/rules-of-hooks`                           | [`react-x/rules-of-hooks`](/docs/rules/rules-of-hooks)                                                | 2.14.0     | relocated    |
| `react-naming-convention/component-name`                     |                                                                                                       | 3.0.0      | deprecated   |
| `react-naming-convention/filename-extension`                 |                                                                                                       | 2.13.0     | deprecated   |
| `react-naming-convention/filename`                           |                                                                                                       | 2.13.0     | deprecated   |

## Presets

| Preset    | Replaced by   | Removed in | Reason  |
| :-------- | :------------ | :--------- | :------ |
| `core`    | `x`           | 2.0.0      | renamed |
| `off-dom` | `disable-dom` | 2.0.0      | renamed |

## Settings

| Setting                | Replaced by | Removed in | Reason       |
| :--------------------- | :---------- | :--------- | :----------- |
| `additionalComponents` |             | 2.0.0      | discontinued |
| `additionalHooks`      |             | 2.0.0      | discontinued |
| `skipImportCheck`      |             | 2.0.0      | discontinued |
