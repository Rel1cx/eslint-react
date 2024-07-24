## v1.6.0 (Draft)

### ✨ New

- Add `controlled` setting to `settings["react-x"].additionalComponents`' `attributes` object to set it is controlled or not.
- Add default settings for `react-x` settings to presets.
- Undeprecate rule `no-implicit-key` and improve its usefulness.
- Undeprecate rule `no-complicated-conditional-rendering` and rename it to `no-complex-conditional-rendering` (the previous rule will still be available until the next major update to avoid breaking changes).

## v1.5.30 (Mon 22 Jul 2024)

### 🐞 Fixes

- Revert ~~change `@typescript-eslint`'s packages in `dependencies` to `"^7.16.1 || ^rc-v8"`~~ as this format is not supported by all package managers.

## v1.5.29 (Mon 22 Jul 2024)

### ✨ New

- Add rule `no-prop-types`.
- Add rule `no-default-props`.
- Add experimental `settings["react-x"].additionalComponents` settings (currently only the `no-unsafe-target-blank` rule uses it, but more rules will use it in the future).

### 🪄 Improvements

- Add rule `no-prop-types` to recommended presets.
- Add rule `no-default-props` to recommended presets.
- Remove rule `no-useless-fragment` from recommended presets.
- Optimize performance of rule `no-create-ref`.
- Change `@typescript-eslint`' packages in `dependencies` to `"^7.16.1 || ^rc-v8"`.

## v1.5.28 (Sat 20 Jul 2024)

### 🐞 Fixes

- Fix false positives and negatives in rule `hooks-extra/no-direct-set-state-in-use-effect`.
- Fix false positives and negatives in rule `hooks-extra/no-direct-set-state-in-use-layout-effect`.
- Fix rule `prefer-read-only-props` reports only the first component in a file.

### 🪄 Improvements

- Improve website and documentation.

## v1.5.27 (Tue 16 Jul 2024)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` that was accidentally added to the recommended type-checked presets.
- Fix false negatives in rule `hooks-extra/no-direct-set-state-in-use-effect` when call `set` function inside a non-function scope.
- Fix false negatives in rule `hooks-extra/no-direct-set-state-in-use-layout-effect` when call `set` function inside a non-function scope.

### 🪄 Improvements

- Rule `no-leaked-conditional-rendering` now supports BigInt literals on the left side of the logical expression
- Rule `no-leaked-conditional-rendering` now allows a truthy number literal to be used on the left side of the logical expression.
- Optimize bundle size.

## v1.5.26 (Mon 15 Jul 2024)

### ✨ New

- Add rule `hooks-extra/no-direct-set-state-in-use-effect`.
- Add rule `hooks-extra/no-direct-set-state-in-use-layout-effect`.

### 🐞 Fixes

- Fix false positives in rule `hooks-extra/ensure-use-memo-has-non-empty-deps` when referencing component block scope.
- Fix false positives in rule `hooks-extra/ensure-use-callback-has-non-empty-deps` when referencing component block scope.

### 🪄 Improvements

- Add rule `hooks-extra/no-direct-set-state-in-use-effect` to recommended presets.
- Add rule `hooks-extra/no-direct-set-state-in-use-layout-effect` to recommended presets.
- Add rule `hooks-extra/prefer-use-state-lazy-initialization` to recommended presets.

## v1.5.25 (Sat 13 Jul 2024)

### 🪄 Improvements

- Optimize bundle size.

## v1.5.24 (Thu 11 Jul 2024)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` false positive when using `ObjectPattern` in function arguments.

### 🪄 Improvements

- Change `typescript` version in `peerDependencies` to `"^4.9.5 || ^5.3.3"`

## v1.5.23 (Sun 7 Jul 2024)

### 🐞 Fixes

- Fix rule `prefer-read-only-props` false negative when using `ObjectPattern` in function arguments.

### 🪄 Improvements

- Improve website and documentation.

## v1.5.22 (Fri 5 Jul 2024)

### ✨ New

- Add rule `prefer-read-only-props`.

### 🪄 Improvements

- Downgrade `@typescript-eslint`'s packages to v7, due to stability issues with v8.

## v1.5.21 (Wed 3 Jul 2024)

### 🐞 Fixes

- Add missing dependencies to `@eslint-react/eslint-plugin`.
- Fix rule `no-nested-components` false negative when placing components inside JSX props.

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to v8.
- Improve rule `no-leaked-conditional-rendering` compatibility with different versions of `typescript-eslint`.

## v1.5.20 (Tue 02 Jul 2024)

### 🐞 Fixes

- Fix rule `prefer-destructuring-assignment` false positive when the function looks like a component.

### 🪄 Improvements

- Improve `utilities/jsx/is-jsx-value` to better distinguish between normal values and JSX values.
- Improve `core/component-collector` to better distinguish between normal functions and components.
- Prevent potential function component detection related false positives.
- Switch to a more appropriate value for `DEFAULT_COMPONENT_HINT`.

## v1.5.19 (30 Sun Jun 2024)

### 🪄 Improvements

- Reduce the number of dependencies by inlining tree-shaking optimized code while bundling.
- Deprecate `reactOptions` in favor of `react-x` in [ESLint Shared Settings](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-shared-settings).

## v1.5.18 (28 Fri Jun 2024)

### 🐞 Fixes

- Fix rule `no-useless-fragment` not respecting `jsxPragma` settings.

### 🪄 Improvements

- Update documentation for rule `no-useless-fragment` to reflect the actual behavior of the rule.

## v1.5.17 (Wed 26 Jun 2024)

### 🪄 Improvements

- Remove rule `no-children-prop` from recommended presets.
- Improve documentation for rule `no-useless-fragment`.

## v1.5.16 (Mon 17 Jun 2024)

### 🐞 Fixes

- Fix debug rules not exporting correctly in `@eslint-react/eslint-plugin`.

### 🪄 Improvements

- Remove rule `prefer-shorthand-boolean` from recommended presets.
- Remove rule `prefer-shorthand-fragment` from recommended presets.
- Remove rule `prefer-destructuring-assignment` from recommended presets.

## v1.5.15 (Sat 08 Jun 2024)

### 🐞 Fixes

- Remove `languageOptions.parser` from presets.
- Remove `@typescript-eslint/parser` from peer dependencies.
- Rule `no-leaked-conditional-rendering`: object should be considered as valid left-hand type.

## v1.5.14 (Thu 30 May 2024)

### ✨ New

- Add rule `avoid-shorthand-boolean`.
- Add rule `avoid-shorthand-fragment`.

### 🐞 Fixes

- Fix rule `dom/no-missing-button-type` false positive when using `type` attribute in a JSX expression.

## v1.5.13 (Tue 28 May 2024)

### 🐞 Fixes

- Fix components that use `getDerivedStateFromError` should not be warned by rule `no-class-component`.

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.11.0`.

## v1.5.12 (Fri 17 May 2024)

### 🐞 Fixes

- Fix ESLint peer dependency range in `package.json`.

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.9.0`.
- Minor improvements.

## v1.5.11 (Wed 08 May 2024)

### ✨ New

- Rule `no-class-component` rule now allows class components with a `componentDidCatch` method.
- Settings `reactOptions` now supports `importSource` to specify the import source for React.

### 🗑️ Deprecations

- Deprecate rule `no-implicit-key` because it is stylistic and opinionated.
- Deprecate rule `no-complicated-conditional-rendering` because it is stylistic and opinionated.

### 🪄 Improvements

- Refactor React pragma and import name retrieval utils to support custom import source.
- Update `@typescript-eslint`'s packages to `7.8.0`.

## v1.5.10 (Sun 28 Apr 2024)

### 🪄 Improvements

- Update `react` to `18.3.1`.
- Update `@typescript-eslint`'s packages to `7.7.1`.
- Use a wider range of peerDependencies.

## v1.5.9 (Fri 19 Apr 2024)

### 🪄 Improvements

- Optimize error messages of rules.
- Update `@typescript-eslint`'s packages to `7.7.0`.

## v1.5.8 (Thu 11 Apr 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.6.0`.

## v1.5.7 (Thu 28 Mar 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.4.0`.

## v1.5.6 (Tue 12 Mar 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `7.2.0`.

## v1.5.5 (Sun Feb 18 2024)

### 🐞 Fixes

- Fix rule `no-component-will-receive-props` not working as expected.

### 🪄 Improvements

- Improve error messages and code samples in rule docs.

## v1.5.4 (Fri Feb 16 2024)

### 🐞 Fixes

- Fix rule `dom/no-render-return-value` not renamed in v1.0.0.

### 🪄 Improvements

- Improve code samples in rule docs.
- Update `effect` to `2.3.5`.
- Update `@typescript-eslint`'s packages to `7.0.1`.

## v1.5.3 (Sat Feb 10 2024)

### 🪄 Improvements

- Improve diagnostic messages.
- Remove needless deps from `peerDependencies`.
- Update `@typescript-eslint`'s packages to `6.21.0`.

## v1.5.2 (Wed Jan 31 2024)

### 🪄 Improvements

- Remove needless deps from `peerDependencies`.
- Update `@typescript-eslint`'s packages to `6.20.0`.
- Update `effect` to `2.2.3`.

## v1.5.2-beta.2 (Wed Jan 31 2024)

### 🪄 Improvements

- Update `effect` to `2.2.3`.
- Remove needless deps from `peerDependencies`.

## v1.5.2-beta.0 (Thu Jan 30 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.20.0`.

## v1.5.1 (Mon Jan 29 2024)

### ✨ New

- Add `off-dom` and `off-dom-legacy` presets to disable all DOM related rules.

### 🪄 Improvements

- Reduce dependencies size.

## v1.5.0 (Mon Jan 29 2024)

### 💥 Breaking Changes

- Remove rule `max-depth`.
- Rename rule `no-spreading-key` to `no-implicit-key`.
- Rename rule `no-constructed-context-value` to `no-unstable-context-value`.
- Rename rule `no-unstable-nested-components` to `no-nested-components`.
- Switch to new name prefix of rules in `@eslint-react/eslint-plugin`.
  - Replace `jsx/` with `` in rule names.
  - Replace `react/` with `` in rule names.
  - Replace `react-dom/` with `dom/` in rule names.
  - Replace `react-hooks/` with `hooks-extra/` in rule names.
- Switch to new settings schema.
  - Put settings under `reactOptions` instead of `eslintReact`.
  - Replace `jsx.pragma` with `jsxPragma`.
  - Replace `jsx.fragment` with `jsxPragmaFrag`.
  - Replace `react.version` with `version`.
  - Remove `jsx.extensions`.

## v1.0.2 (Sat Jan 27 2024)

### 🐞 Fixes

- Fix rule `react-dom/no-namespace` not renamed in v1.0.0.
- Fix rule `react-dom/no-children-in-void-dom-elements` not renamed in v1.0.0.

### 🪄 Improvements

- Improve rules overview page on website.
- Remove `jsx` and `hooks` presets from documentation.

## v1.0.1 (Sat Jan 27 2024)

### 🪄 Improvements

- Improve `jsx` and `jsx-legacy` presets.
- Improve `core` and `core-legacy` presets.
- Improve `recommended` and `recommended-legacy` presets.
- Improve `recommended-type-checked` and `recommended-type-checked-legacy` presets.

## v1.0.0 (Sat Jan 27 2024)

### 💥 Breaking Changes

#### All DOM related rules are moved to `react-dom` namespace

- Rename rule `react/no-children-in-void-dom-elements` to `react-dom/no-children-in-void-dom-elements`.
- Rename rule `react/no-dangerously-set-innerhtml-with-children` to `react-dom/no-dangerously-set-innerhtml-with-children`.
- Rename rule `react/no-dangerously-set-innerhtml` to `react-dom/no-dangerously-set-innerhtml`.
- Rename rule `react/no-find-dom-node` to `react-dom/no-find-dom-node`.
- Rename rule `react/no-missing-button-type` to `react-dom/no-missing-button-type`.
- Rename rule `react/no-missing-iframe-sandbox` to `react-dom/no-missing-iframe-sandbox`.
- Rename rule `react/no-namespace` to `react-dom/no-namespace`.
- Rename rule `react/no-render-return-value` to `react-dom/no-render-return-value`.
- Rename rule `react/no-script-url` to `react-dom/no-script-url`.
- Rename rule `react/no-unsafe-iframe-sandbox` to `react-dom/no-unsafe-iframe-sandbox`.
- Rename rule `react/no-unsafe-target-blank` to `react-dom/no-unsafe-target-blank`.

### ✨ New

- Make `dom` an alias of `react-dom` preset.
- Make `hooks` an alias of `react-hooks` preset.
- Add preset `jsx` and `jsx-legacy`.
- Add preset `react-dom` and `dom-legacy`.
- Add preset `core` and `core-legacy`.
- Add preset `react-hooks` and `hooks-legacy`.

### 🐞 Fixes

- Fix the lint message for rule `react-dom/no-dangerously-set-innerhtml`.

## v1.0.0-beta.3 (Fri Jan 26 2024)

### 🐞 Fixes

- Fix the name prefix for react-dom rules.

## v1.0.0-beta.2 (Fri Jan 26 2024)

### ✨ New

- Make `dom` an alias of `react-dom` preset.
- Make `hooks` an alias of `react-hooks` preset.

## v1.0.0-beta.1 (Fri Jan 26 2024)

### ✨ New

- Add preset `jsx` and `jsx-legacy`.
- Add preset `dom` and `dom-legacy`.
- Add preset `core` and `core-legacy`.
- Add preset `hooks` and `hooks-legacy`.

## v1.0.0-beta.0 (Fri Jan 26 2024)

### 💥 Breaking Changes

#### All DOM related rules are moved to `react-dom` namespace

- Rename rule `react/no-dangerously-set-innerhtml` to `react-dom/no-dangerously-set-innerhtml`.
- Rename rule `react/no-dangerously-set-innerhtml-with-children` to `react-dom/no-dangerously-set-innerhtml-with-children`.
- Rename rule `react/no-find-dom-node` to `react-dom/no-find-dom-node`.
- Rename rule `react/no-missing-button-type` to `react-dom/no-missing-button-type`.
- Rename rule `react/no-missing-iframe-sandbox` to `react-dom/no-missing-iframe-sandbox`.
- Rename rule `react/no-script-url` to `react-dom/no-script-url`.
- Rename rule `react/no-unsafe-iframe-sandbox` to `react-dom/no-unsafe-iframe-sandbox`.
- Rename rule `react/no-unsafe-target-blank` to `react-dom/no-unsafe-target-blank`.

## v0.10.12 (Sun Jan 21 2024)

### 🪄 Improvements

- Remove unnecessary `parserOptions` fields from presets.

## v0.10.12-beta.0 (Sun Jan 21 2024)

### 🪄 Improvements

- Remove unnecessary `parserOptions` fields from presets.

## v0.10.11 (Sat Jan 20 2024)

### ✨ New

- Add rule `react/no-access-state-in-setstate`.

### 🪄 Improvements

- Improve rule `react/no-unused-state` to respect the usage of `getDerivedStateFromProps`.
- Update `@typescript-eslint`'s packages to `6.19.0`.

## v0.10.11-beta.2 (Fri Jan 19 2024)

### ✨ New

- Add rule `react/no-access-state-in-setstate`.

## v0.10.11-beta.1 (Tue Jan 16 2024)

### 🪄 Improvements

- Update `@typescript-eslint`'s packages to `6.19.0`.

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
