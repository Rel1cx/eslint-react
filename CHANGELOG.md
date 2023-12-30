## v0.10.2-beta.0 (Sat Dec 30 2023)

### ✨ New

- Add [`reactHooks.alias`](https://eslint-react.rel1cx.io/docs/configuration#reacthooksalias) setting support.

## v0.10.1 (Wed Dec 27 2023)

### 🪄 Improvements

- Add `react/no-clone-element` to `recommended` and `recommended-legacy` presets.
- Improve rule `react/no-unstable-nested-components`, make its behavior closer to [react-hooks/no-nested-components](https://github.com/facebook/react/pull/25360).
- Update `@typescript-eslint`'s packages to `6.16.0`.

## v0.10.1-beta.1 (Tue Dec 26 2023)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.16.0`.

## v0.10.1-beta.0 (Mon Dec 25 2023)

### 🪄 Improvements

- Add `react/no-clone-element` to `recommended` and `recommended-legacy` presets.
- Improve rule `react/no-unstable-nested-components`, make its behavior closer to [react-hooks/no-nested-components](https://github.com/facebook/react/pull/25360).

## v0.10.0 (Thu Dec 21 2023)

### ✨ New

- Add rule `jsx/max-depth`.

### 🪄 Improvements

- Improve `recommended` and `recommended-legacy` presets.

## v0.10.0-beta.0 (Thu Dec 21 2023)

### ✨ New

- Add rule `jsx/max-depth`.

### 🪄 Improvements

- Improve `recommended` and `recommended-legacy` presets.

## v0.9.8 (Tue Dec 19 2023)

### ✨ New

- Add rule `react/ensure-forward-ref-using-ref`.

### 🪄 Improvements

- Reduce false positives in rule `react/no-unstable-nested-components`.
- Reduce false positives in rule `debug/function-component`
- Optimize `recommended` and `recommended-legacy` presets.
- Update `@typescript-eslint`'s packages to `6.15.0`.

## v0.9.8-beta.2 (Tue Dec 19 2023)

### 🪄 Improvements

- Optimize `recommended` and `recommended-legacy` presets.

## v0.9.8-beta.1 (Tue Dec 19 2023)

### 🪄 Improvements

- Minor improvements.

## v0.9.8-beta.0 (Sun Dec 17 2023)

### ✨ New

- Add rule `react/ensure-forward-ref-using-ref`.

### 🪄 Improvements

- Reduce false positives in rule `react/no-unstable-nested-components`.

- Reduce false positives in rule `debug/function-component`.

## v0.9.7 (Sun Dec 17 2023)

### 💥 Breaking Changes

- Rule `named-convention/filename-extension` rename `rule` option to `allow`.

### 🐞 Fixes

- Fix where functions in `<Component footer={() => <div />} />` or `<Component Footer={() => <div />} />` are treated as components.
- Fix false positive in rule `react/no-unstable-nested-components`.
- Fix false positive in rule `debug/function-component`.

### 🪄 Improvements

- Rules now support reading JSX extensions from `settings.eslintReact.jsx.extensions`.

- Replace ❌ Incorrect and ✅ Correct with Failing and Passing in rule docs.

## v0.9.7-beta.2 (Sat Dec 16 2023)

### 🐞 Fixes

- Update default rule option in `named-convention/filename` to `PascalCase`.

## v0.9.7-beta.1 (Thu Dec 14 2023)

### 🪄 Improvements

- Minor improvements.

## v0.9.7-beta.0 (Thu Dec 14 2023)

### 💥 Breaking Changes

- Rule `named-convention/filename-extension` rename `rule` option to `allow`.

✨ New

- Rule `named-convention/filename` add `extensions` option.
- Rule `named-convention/filename-extension` add `extensions` option.

## v0.9.6 (Tue Dec 12 2023)

### ✨ New

- Add rule `react-hooks/prefer-use-state-lazy-initialization`.

### 🪄 Improvements

- Rule `named-convention/component-name` add both `string` and `object` options support.
- Rule `named-convention/filename` add both `string` and `object` options support.
- Rule `named-convention/filename-extension` add both `string` and `object` options support.
- Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`.
- Update `@typescript-eslint`'s packages to `6.14.0`.

## v0.9.6-beta.5 (Tue Dec 12 2023)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.14.0`.

## v0.9.6-beta.4 (Mon Dec 11 2023)

### 🪄 Improvements

- Rule `named-convention/component-name` add both `string` and `object` options support.
- Rule `named-convention/filename` add both `string` and `object` options support.
- Rule `named-convention/filename-extension` add both `string` and `object` options support.

## v0.9.6-beta.3 (Mon Dec 11 2023)

### 🪄 Improvements

- Remove rule `react-hooks/prefer-use-state-lazy-initialization` from `recommended` and `recommended-legacy` presets.

## v0.9.6-beta.2 (Mon Dec 11 2023)

### ✨ New

- Add rule `react-hooks/prefer-use-state-lazy-initialization`.

### 🪄 Improvements

- Rule `named-convention/filename-extension` switch options format from object to string.

## v0.9.6-beta.1 (Mon Dec 11 2023)

### 🪄 Improvements

- Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`.

## v0.9.5 (Mon Dec 11 2023)

### 🪄 Improvements

- Improve rule `jsx/no-leaked-conditional-rendering` error marker position and range.
- Improve rule `react/no-missing-button-type` error marker position and range.
- Improve rule `react/no-missing-iframe-sandbox` error marker position and range.
- Improve rule `react/no-unsafe-iframe-sandbox` error marker position and range.

## v0.9.4 (Fri Dec 8 2023)

### 🪄 Improvements

- Improve rule docs.

## v0.9.3 (Fri Dec 8 2023)

### ✨ New

- Add rule `react/no-direct-mutation-state`.
- Add rule `naming-convention/use-state`.

### 🪄 Improvements

- Update `recommended` and `recommended-legacy` presets.
- Improve rules overview page.

## v0.9.2 (Wed Dec 6 2023)

### ✨ New

- Add rule `react/no-component-will-update`.
- Add rule `react/no-unsafe-component-will-update`.
- Add rule `react/no-component-will-receive-props`.
- Add rule `react/no-unsafe-component-will-receive-props`.
- Add rule `react/no-set-state-in-component-did-mount`.
- Add rule `react/no-set-state-in-component-did-update`.
- Add rule `react/no-set-state-in-component-will-update`.

## v0.9.1 (Tue Dec 5 2023)

### ✨ New

- Add rule `react/no-component-will-mount`.
- Add rule `react/no-unsafe-component-will-mount`.

## v0.9.0 (Fri Dec 1 2023)

### 💥 Breaking Changes

- `@eslint-react/eslint-plugin-jsx`
  - Remove `allowExpressions` option from rule `jsx/no-useless-fragment`.
- `@eslint-react/jsx`
  - Remove `isFragmentWithOnlyTextAndIsNotChild`, `isFragmentHasLessThanTwoChildren`, `isFragmentWithSingleExpression` from `@eslint-react/jsx`'s API.

### ✨ New

- Add rule `react/no-redundant-should-component-update`.

### 🪄 Improvements

- Update Options of rule `jsx/no-useless-fragment`.
- Optimize bundle size.
