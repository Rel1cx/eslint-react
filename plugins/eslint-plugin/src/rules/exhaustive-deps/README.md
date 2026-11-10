# `exhaustive-deps`

Verifies the list of dependencies for Hooks like `useEffect` and similar, with support for custom Hooks and stable Hook results.

## Forked from `exhaustive-deps`

**THIS RULE IS A FORK OF** [`exhaustive-deps`](../../../eslint-plugin-react-x/src/rules/exhaustive-deps/exhaustive-deps.ts) in `eslint-plugin-react-x`, which is ported from [`eslint-plugin-react-hooks`](https://github.com/react/react/blob/main/packages/eslint-plugin-react-hooks/src/rules/ExhaustiveDeps.ts).

Unlike the base rule, this rule is maintained locally as an experimental fork. The `hooks` option and related behavior live here. Keep the shared rule logic in sync with `exhaustive-deps`; changes that belong to the original implementation should be made upstream in the React repository and re-ported.

See [`exhaustive-deps.mdx`](./exhaustive-deps.mdx) for usage and options.

### Source

- **Forked From**: [`../../../eslint-plugin-react-x/src/rules/exhaustive-deps/exhaustive-deps.ts`](../../../eslint-plugin-react-x/src/rules/exhaustive-deps/exhaustive-deps.ts) (see its [README](../../../eslint-plugin-react-x/src/rules/exhaustive-deps/README.md))
- **Original Source**: [https://github.com/react/react/blob/main/packages/eslint-plugin-react-hooks/src/rules/ExhaustiveDeps.ts](https://github.com/react/react/blob/main/packages/eslint-plugin-react-hooks/src/rules/ExhaustiveDeps.ts)
- **License**: MIT License (Copyright (c) Meta Platforms, Inc. and affiliates.)

### Local Adaptations

The following local adaptations have been made to this fork:

- `getAdditionalEffectHooksFromSettings` has been replaced by `getSettingsFromContext` from `@eslint-react/shared`, reading `additionalEffectHooks` from the `react-x` settings namespace.
- Added the `hooks` option, based on the `hooks` option of Biome's `useExhaustiveDependencies` rule:
  - `closureIndex` and `dependenciesIndex` check custom Hooks with the callback and the dependencies array at any position. Both must be set, and they must differ.
  - `stableResult` marks the result of a Hook (`true`), or some positions of its returned array (an index or an array of indices), as stable. Only `boolean | number | number[]` are supported; Biome's `string[]` form for object properties is not supported yet.
- The fork also carries local fixes to dependency analysis and autofix behavior; see [`CHANGELOG.md`](./CHANGELOG.md).
