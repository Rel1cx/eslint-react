## v0.9.0 (Thu Nov 30 2023) (Draft)

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
  - Add README.md to internal packages.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

## v0.8.12 (Tue Nov 28 2023) (Latest)

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

## v0.8.11 (Sun Nov 26 2023)

### Release Notes

#### Add rule `react/no-find-dom-node` ([#179](https://github.com/Rel1cx/eslint-react/pull/179))

---

#### 🏠 Internal

- `@eslint-react/ast`
  - Optimize API return value.

- `@eslint-react/types`
  - Add `ExRSettings` type.

- `@eslint-react/eslint-plugin-react`
  - Add rule `react/no-find-dom-node`.

- `@eslint-react/monorepo`
  - Update `@typescript-eslint`'s packages to `6.12.0`.

#### 📝 Documentation

- `@eslint-react/eslint-plugin`
  - Update README.md
- `@eslint-react/website`
  - Update website url
- `@eslint-react/ast`
  - Setup typedoc
- `@eslint-react/shared`
  - Setup typedoc

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.8.10 (Sun Nov 26 2023)

### Release Notes

#### Fix an issue with component-collector. ([#178](https://github.com/Rel1cx/eslint-react/pull/178))

#### Update website url

---

#### 🐛 Bug Fix

- `@eslint-react/core`
  - Fix an issue with component-collector collect components multiple times when it has not only one return statement. ([#177](https://github.com/Rel1cx/eslint-react/pull/177))

- `@eslint-react/eslint-plugin-react`
  - Fix an issue with `no-missing-component-display-name` false positive when the component has not only one return statement. ([#177](https://github.com/Rel1cx/eslint-react/pull/177))

#### Authors: 2

- Stephen Zhou ([@hyoban](https://github.com/hyoban))
- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---

## v0.8.9 (Fri Nov 24 2023)

### Release Notes

#### Optimize packages structure

---

#### 🚀 Enhancement

- `@eslint-react/types`
  - Optimize package structure.

- `@eslint-react/shared`
  - Optimize package structure.

#### Authors: 1

- Eva1ent ([@Rel1cx](https://github.com/Rel1cx))

---
