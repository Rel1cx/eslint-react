---
title: filename
---

**Full Name in `eslint-plugin-react-naming-convention`**

```sh copy
react-naming-convention/filename
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/naming-convention/filename
```

**Features**

`⚙️`

## Description

Enforces consistent file naming conventions.

## Examples

### Failing

```bash title="Terminal" {3}
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "PascalCase" }]' .

src/components/component.tsx
    1:1  error  "File name `component.tsx` does not match `PascalCase`. Should rename to `Component.tsx`  @eslint-react/naming-convention/filename

✖ 1 problems (0 errors, 1 warnings)
```

```bash {3}
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "kebab-case" }]' .

src/components/example_component.tsx
    1:1  error  "File name `example_component.tsx` does not match `kebab-case`. Should rename to `example-component.tsx`  @eslint-react/naming-convention/filename

✖ 1 problems (0 errors, 1 warnings)
```

### Passing

```bash title="Terminal"
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "PascalCase" }]' .

src/components/Component.tsx

✨  Done in 0.61s.
```

```bash title="Terminal"
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "kebab-case" }]' .

src/components/example-component.tsx

✨  Done in 0.61s.
```

## Rule Options

- `rule`: The rule to apply to the file name. Default is `"PascalCase"`. Possible values:
  1. `PascalCase`: PascalCase
  2. `camelCase`: camelCase
  3. `kebab-case`: kebab-case
  4. `snake_case`: snake_case
- `excepts`: An array of regular expressions to ignore specific file names. Default is:
  - `"$"`: Ignore `$` files (e.g., `$.tsx`).
  - `"index"`: Ignore `index` files (e.g., `index.tsx`).
  - `"/^_/"`: Ignore files starting with an underscore (e.g., `_app.tsx`, `_layout.tsx`).
  - `"/^[0-9]+$/"`: Ignore files with only numbers (e.g., `404.tsx`).
  - `"/^\[[^\]]+\]$/"`: Ignore files with square brackets (e.g., `[slug].tsx`).

## Rule Options Examples

```js title="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "PascalCase"]
  }
];
```

```js title="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { "rule": "kebab-case" }]
  }
];
```

### Applying different rules to different files

```js title="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "PascalCase"],
    },
  },
  {
    files: ["src/hooks/**/use*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "camelCase"],
    },
  },
];
```

### Opting out of the rule for framework-specific files

```js title="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "kebab-case"],
    },
  },
  {
    files: ["app/**/*.{ts,tsx}"], // Opting out of the rule for framework-specific files
    rules: {
      "@eslint-react/naming-convention/filename": "off",
    },
  },
];
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.spec.ts)

---

## See Also

- [`filename-extension`](./filename-extension):
  Enforces consistent use of the JSX file extension.
