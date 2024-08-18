# Frequently Asked Questions

## Why create `eslint-react`?

The existing `eslint-plugin-react` is a plugin for `react-dom` but named react[¹], it only supports React DOM[²] and does not being expected to be used with x-platform.

Although you can use it with other renderers, it will always assume that you are using the React DOM, even if you are working with a codebase that uses a different renderer. This can sometimes cause confusion and problems[³].

Unfortunately, the maintainers of `eslint-plugin-react` refuse to change that[⁴].

Just as in [Beyond the DOM](https://legacy.reactjs.org/docs/design-principles.html#beyond-the-dom) we believe that the community will benefit from a renderer-agnostic and x-platform-supported plugin. This is also the initial motivation for creating `eslint-react`.

## What is included in `eslint-react`?

Currently, it includes the following plugins:

- `@eslint-react/eslint-plugin` - The main ESLint plugin package including all rules and config presets in this repository.
- `eslint-plugin-react-x` - Core rules (renderer-agnostic, compatible with x-platform).
- `eslint-plugin-react-dom` - DOM specific rules for React DOM.
- `eslint-plugin-react-web-api` - Rules for interacting with Web APIs in React.
- `eslint-plugin-react-debug` - Debugging rules.
- `eslint-plugin-react-hooks-extra` - Extra React Hooks rules.
- `eslint-plugin-react-naming-convention` - Naming convention rules.

You can view our long-term plans on the [roadmap](/roadmap#plugins-with-ecological-niche-explanation), which includes an explanation of niche explanation for each plugin.

## Is there anything to note about migrating from `eslint-plugin-react` to `eslint-plugin-react-x`?

Please be aware that some rules may behave differently when transitioning to `eslint-plugin-react-x`. The rules in `eslint-plugin-react-x` are more closely aligned with the guidelines provided by [react.dev](https://react.dev). This alignment is due to `eslint-plugin-react-x` adopting [react.dev](https://react.dev) as its primary reference, rather than `eslint-plugin-react`.

To smoothly transition, we suggest reviewing the rules in `eslint-plugin-react-x` and running a comprehensive linting check on your codebase to identify and address any discrepancies introduced by the migration.

[¹]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1930936266
[²]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1314565853
[³]: https://github.com/pmndrs/gltf-react-three/issues/38#issuecomment-2057794974
[⁴]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1314644323
