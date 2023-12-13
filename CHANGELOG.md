## v0.9.7-beta.0 (Thu Dec 14 2023)

### Release Notes

#### Rule `named-convention/filename` add `extensions` option

#### Rule `named-convention/filename-extension` add `extensions` option

#### Rule `named-convention/filename-extension` rename `rule` option to `allow`

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-naming-convention`
  - Rule `named-convention/filename` add `extensions` option.
  - Rule `named-convention/filename-extension` rename `rule` option to `allow`.
  - Rule `named-convention/filename-extension` add `extensions` option.

- `@eslint-react/shared`
  - Remove `JSX_EXTENSIONS` from `@eslint-react/shared`.

- `@eslint-react/monorepo`
  - Update `bun` to `1.0.17`.
  - Update `vitest` to `1.0.4`.
  - Update `eslint-config-with-tsconfig` to `2.9.160`.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6 (Tue Dec 12 2023)

### Release Notes

#### Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`

#### Add rule `react-hooks/prefer-use-state-lazy-initialization`

#### Rule `named-convention/component-name` add both `string` and `object` options support

#### Rule `named-convention/filename` add both `string` and `object` options support

#### Rule `named-convention/filename-extension` add both `string` and `object` options support

#### Update `@typescript-eslint`'s packages to `6.14.0`

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-naming-convention`
  - Rule `named-convention/component-name` add both `string` and `object` options support.
  - Rule `named-convention/filename` add both `string` and `object` options support.
  - Rule `named-convention/filename-extension` add both `string` and `object` options support.

- `@eslint-react/eslint-plugin-react-hooks`
  - Add rule `react-hooks/prefer-use-state-lazy-initialization`.

- `@eslint-react/eslint-plugin-debug`
  - Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`.

- `@eslint-react/core`
  - Replace `cost` field in `ERHook` with `hookCalls` field.
  - `hookCollector` add `hookCalls` collect.

- `@eslint-react/monorepo`
  - Update `@typescript-eslint`'s packages to `6.14.0`.
  - Add `update:version` script.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6-beta.5 (Tue Dec 12 2023)

### Release Notes

#### Update `@typescript-eslint`'s packages to `6.14.0`

---

#### 🏠 Internal

- `@eslint-react/monorepo`
  - Update `@typescript-eslint`'s packages to `6.14.0`.
  - Add `update:version` script.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6-beta.4 (Mon Dec 11 2023)

### Release Notes

#### Rule `named-convention/component-name` add both `string` and `object` options support

#### Rule `named-convention/filename` add both `string` and `object` options support

#### Rule `named-convention/filename-extension` add both `string` and `object` options support

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-naming-convention`
  - Rule `named-convention/component-name` add both `string` and `object` options support.
  - Rule `named-convention/filename` add both `string` and `object` options support.
  - Rule `named-convention/filename-extension` add both `string` and `object` options support.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6-beta.3 (Mon Dec 11 2023)

### Release Notes

#### Remove rule `react-hooks/prefer-use-state-lazy-initialization` from `recommended` and `recommended-legacy` presets

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin`
  - Remove rule `react-hooks/prefer-use-state-lazy-initialization` from `recommended` and `recommended-legacy` presets.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6-beta.2 (Mon Dec 11 2023)

### Release Notes

#### Add rule `react-hooks/prefer-use-state-lazy-initialization`

#### Rule `named-convention/filename-extension` switch options format from object to tuple

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-naming-convention`
  - Rule `named-convention/filename-extension` switch options from object to tuple.

- `@eslint-react/eslint-plugin-react-hooks`
  - Add rule `react-hooks/prefer-use-state-lazy-initialization`.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.6-beta.1 (Mon Dec 11 2023)

### Release Notes

#### Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-debug`
  - Rule `debug/react-hooks` reports `hookCalls.length` instead of `cost`.

- `@eslint-react/core`
  - Replace `cost` field in `ERHook` with `hookCalls` field.
  - `hookCollector` add `hookCalls` collect.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.5 (Mon Dec 11 2023)

### Release Notes

#### Improve rule `jsx/no-leaked-conditional-rendering` error marker position and range

#### Improve rule `react/no-missing-button-type` error marker position and range

#### Improve rule `react/no-missing-iframe-sandbox` error marker position and range

#### Improve rule `react/no-unsafe-iframe-sandbox` error marker position and range

---

#### 📝 Documentation

- `@eslint-react/website`
  - Rename "ExR" to "ER".

#### 🏠 Internal

- `@eslint-react/eslint-plugin-jsx`
  - Improve rule `jsx/no-leaked-conditional-rendering` error marker position and range.
  - Improve rule `react/no-missing-button-type` error marker position and range.
  - Improve rule `react/no-missing-iframe-sandbox` error marker position and range.
  - Improve rule `react/no-unsafe-iframe-sandbox` error marker position and range.

- `@eslint-react/eslint-plugin-react`
  - Rename "ExR" to "ER".

- `@eslint-react/eslint-plugin-debug`
  - Rename "ExR" to "ER".

- `@eslint-react/core`
  - Rename "ExR" to "ER".

- `@eslint-react/types`
  - Rename "ExR" to "ER".

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.4 (Fri Dec 8 2023)

### Release Notes

---

#### 📝 Documentation

- `@eslint-react/website`
  - Improve rule docs.
  - Rename "ESLint x React" to "ESLint React".

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.3 (Fri Dec 8 2023)

### Release Notes

#### Add rule `react/no-direct-mutation-state`

#### Add rule `naming-convention/use-state`

#### Update `recommended` and `recommended-legacy` presets

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-direct-mutation-state`.
  - Add rule `naming-convention/use-state`.

#### 📝 Documentation

- `@eslint-react/website`
  - Improve rules overview page.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.3 (Draft)

### Release Notes

#### Add rule `react/no-direct-mutation-state`

#### Add rule `naming-convention/use-state`

#### Update `recommended` and `recommended-legacy` presets

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-direct-mutation-state`.
  - Add rule `naming-convention/use-state`.

#### 📝 Documentation

- `@eslint-react/website`
  - Improve rules overview page.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.2 (Wed Dec 6 2023)

### Release Notes

#### Add rule `react/no-component-will-update`

#### Add rule `react/no-unsafe-component-will-update`

#### Add rule `react/no-component-will-receive-props`

#### Add rule `react/no-unsafe-component-will-receive-props`

#### Add rule `react/no-set-state-in-component-did-mount`

#### Add rule `react/no-set-state-in-component-did-update`

#### Add rule `react/no-set-state-in-component-will-update`

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-component-will-update`.
  - Add rule `react/no-unsafe-component-will-update`.
  - Add rule `react/no-component-will-receive-props`.
  - Add rule `react/no-unsafe-component-will-receive-props`.
  - Add rule `react/no-set-state-in-component-did-mount`.
  - Add rule `react/no-set-state-in-component-did-update`.
  - Add rule `react/no-set-state-in-component-will-update`.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.1 (Tue Dec 5 2023)

### Release Notes

#### Add rule `react/no-component-will-mount`

#### Add rule `react/no-unsafe-component-will-mount`

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-component-will-mount`.
  - Add rule `react/no-unsafe-component-will-mount`.
  - Simplify class component related rules implementation.

- `@eslint-react/tools`
  - Add `ts-pattern` as `M`.

- `@eslint-react/core`
  - Improve module structure.

- `@eslint-react/monorepo`
  - Update `eslint-config-with-tsconfig` to `2.9.120`.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.9.0 (Fri Dec 1 2023)

### Release Notes

#### Add rule `react/no-redundant-should-component-update`

#### Update Options of rule `jsx/no-useless-fragment`

#### Refactor Fragment related APIs of `@eslint-react/jsx`

#### Publish internal packages to NPM as well

#### Add guard and predicate utils to `@eslint-react/tools`

#### Optimize bundle size

---

#### 💥 Breaking Change

- `@eslint-react/eslint-plugin-jsx`
  - Remove `allowExpressions` option from rule `jsx/no-useless-fragment`.
- `@eslint-react/jsx`
  - Remove `isFragmentWithOnlyTextAndIsNotChild`, `isFragmentHasLessThanTwoChildren`, `isFragmentWithSingleExpression` from `@eslint-react/jsx`'s API.

#### 🏠 Internal

- `@eslint-react/eslint-plugin`
  - Add rule `react/no-redundant-should-component-update`.
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-redundant-should-component-update`.
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-react-hooks`
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-jsx`
  - Update Options of rule `jsx/no-useless-fragment`.
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-naming-convention`
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-debug`
  - Optimize bundle size.

- `@eslint-react/core`
  - Fix `getComponentNameFromIdentifier` add additional `.` at the beginning of the name.
  - Optimize bundle size.

- `@eslint-react/jsx`
  - Refactor Fragment related APIs.
  - Optimize module structure.
  - Optimize bundle size.

- `@eslint-react/ast`
  - Fix `getClassIdentifier` may ignore `node.id`.
  - Optimize bundle size.

- `@eslint-react/shared`
  - Optimize bundle size.

- `@eslint-react/types`
  - Optimize bundle size.

- `@eslint-react/tools`
  - Add guard and predicate utils.

- `@eslint-react/monorepo`
  - Publish internal packages to NPM as well.
  - Update `@typescript-eslint`'s packages to `6.13.1`.
  - Update `eslint-config-with-tsconfig` to `2.9.82`.

#### 📝 Documentation

- `@eslint-react/monorepo`
  - Add website urls to README.md
  - Add README.md to internal packages.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.8.12 (Tue Nov 28 2023)

### Release Notes

#### Add rule `react/no-render-return-value`

#### Optimize bundle size

---

#### 🏠 Internal

- `@eslint-react/eslint-plugin`
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-react`
  - Optimize bundle size.
  - Add rule `react/no-render-return-value`.

- `@eslint-react/eslint-plugin-react-hooks`
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-jsx`
  - Optimize bundle size.

- `@eslint-react/eslint-plugin-naming-convention`
  - Optimize bundle size.

- `@eslint-react/monorepo`
  - Update `@typescript-eslint`'s packages to `6.13.0`.
  - Update `eslint-config-with-tsconfig` to `2.9.71`.

#### 📝 Documentation

- `@eslint-react/monorepo`
  - Add presets documentation to README.md
- `@eslint-react/eslint-plugin-react`
  - Update README.md
- `@eslint-react/website`
  - Add presets documentation to website

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---
