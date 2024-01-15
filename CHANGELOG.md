## v0.10.11-beta.0 (Mon Jan 15 2024)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to respect the usage of `getDerivedStateFromProps`.

## v0.10.10 (Sun Jan 14 2024)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to support checking for more cases.
- Improve rule `react/no-direct-mutation-state` to support checking for more cases.
- Improve rule `react/no-unused-class-component-members` to support checking for more cases.

## v0.10.10-beta.0 (Sun Jan 14 2024)

### 🪄 Improvements

- Improve rule `react/no-unused-state` to support checking for more cases.
- Improve rule `react/no-direct-mutation-state` to support checking for more cases.
- Improve rule `react/no-unused-class-component-members` to support checking for more cases.

## v0.10.9 (Fri Jan 12 2024)

### 🐞 Fixes

- Fix bundle size is larger than expected.

## v0.10.8 (Thu Jan 11 2024)

### 🐞 Fixes

- Fix version format in v0.10.7's package.json.

## v0.10.7 (Thu Jan 11 2024)

### ✨ New

- Add rule `react/no-unused-state`.

## v0.10.6 (Tue Jan 9 2024)

### 🐞 Fixes

- Fix an issue where `react/no-constructed-context-value` and `react/no-unstable-default-props` would report false negatives when using LogicalExpression and ConditionalExpression.

## v0.10.6-beta.0 (Mon Jan 8 2024)

### 🐞 Fixes

- Fix an issue where `react/no-constructed-context-value` and `react/no-unstable-default-props` would report false negatives when using LogicalExpression and ConditionalExpression.

## v0.10.5 (Mon Jan 8 2024)

### ✨ New

- Add rule `react/no-unused-class-component-members`.

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.18.0`.

## v0.10.5-beta.0 (Sun Jan 7 2024)

### ✨ New

- Add rule `react/no-unused-class-component-members`.

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.18.0`.

## v0.10.4 (Sat Jan 6 2024)

### 🪄 Improvements

- Improve rule `react/no-unstable-default-props` to support checking for ObjectPatterns within VariableDeclarators that occur on props.
- Improve function component detection in rule `react/no-unstable-nested-components` and `debug/function-component`.

### 🐞 Fixes

- Fix same kind of error inside a component should not only be reported once in rule `react/no-create-ref` and `react/no-constructed-context-value`.
- Fix an issue where render functions wrapped in `useCallback` were accidentally detected as function components in rules `react/no-unstable-nested-components` and `debug/function-component`.

## v0.10.4-beta.1 (Sat Jan 6 2024)

### 🪄 Improvements

- Improve function component detection in rule `react/no-unstable-nested-components` and `debug/function-component`.

### 🐞 Fixes

- Fix an issue where render functions wrapped in `useCallback` were accidentally detected as function components in rules `react/no-unstable-nested-components` and `debug/function-component`.

## v0.10.4-beta.0 (Sat Jan 6 2024)

### 🪄 Improvements

- Improve rule `react/no-unstable-default-props` to support checking for ObjectPatterns within VariableDeclarators that occur on props.

### 🐞 Fixes

- Fix same kind of error inside a component should not only be reported once in rule `react/no-create-ref` and `react/no-constructed-context-value`.

## v0.10.3 (Fri Jan 5 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.17.0`.

## v0.10.3-beta.0 (Tue Jan 2 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.17.0`.

## v0.10.2 (Sat Dec 30 2023)

### ✨ New

- Add [`reactHooks.alias`](https://eslint-react.xyz/docs/configuration#reacthooksalias) setting support.

## v0.10.2-beta.0 (Sat Dec 30 2023)

### ✨ New

- Add [`reactHooks.alias`](https://eslint-react.xyz/docs/configuration#reacthooksalias) setting support.

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
