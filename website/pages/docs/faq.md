# Frequently Asked Questions

## Why create `eslint-react`?

The existing `eslint-plugin-react` is a plugin for `react-dom` but named `react` [[1]], it only supports React DOM [[2]] and does not being expected to be used with x-platform.\
Unfortunately, the maintainers of `eslint-plugin-react` refuse to change that [[3]].

This is the initial motivation for creating `eslint-react`.

## What is the purpose of `eslint-react`?

The purpose of `eslint-react` is to provide ESLint plugins for not just for React DOM but also other libraries and frameworks that use React as a UI runtime. Currently, it provides:

- `@eslint-react/eslint-plugin` - The main ESLint plugin package including all rules and config presets in this repository.
- `eslint-plugin-react-x` - Core rules (DOM Irrelevant, Render Target Agnostic, Formatting Independent, Compatible with x-platform).
- `eslint-plugin-react-dom` - DOM specific rules for React DOM.
- `eslint-plugin-react-debug` - Debugging rules.
- `eslint-plugin-react-hooks-extra` - Extra React Hooks rules.
- `eslint-plugin-react-naming-convention` - Naming convention rules.

## Is there anything to note about migrating from `eslint-plugin-react` to `eslint-plugin-react-x`?

Please be aware that some rules may behave differently when transitioning to `eslint-plugin-react-x`. The rules in `eslint-plugin-react-x` are more closely aligned with the guidelines provided by [react.dev](https://react.dev). This alignment is due to `eslint-plugin-react-x` adopting [react.dev](https://react.dev) as its primary reference, rather than `eslint-plugin-react`.

To smoothly transition, we suggest reviewing the rules in `eslint-plugin-react-x` and running a comprehensive linting check on your codebase to identify and address any discrepancies introduced by the migration.

[1]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1930936266
[2]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1314565853
[3]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1314644323

<!-- [4]: https://github.com/pmndrs/react-three-fiber/discussions/2487 -->
<!-- [5]: https://github.com/pmndrs/gltf-react-three/issues/38#issuecomment-2057794974 -->
