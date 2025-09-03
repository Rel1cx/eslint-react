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

This rule enforces consistent file naming conventions for React components, hooks, and other project files.

By default, this rule enforces `PascalCase`, but it can be configured to support `camelCase`, `kebab-case`, or `snake_case` to match your project's standards.

## Examples

### Failing

If the rule is configured for `PascalCase`, the following filename will trigger a warning:

```js title="eslint.config.js"
export default [
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { rule: "PascalCase" }],
    },
  },
];
```

```bash title="src/components/component.tsx"
# File name "component.tsx" does not match PascalCase.
```

```text title="ESLint Output"
src/components/component.tsx
  1:1  error  File name `component.tsx` does not match `PascalCase`. Should rename to `Component.tsx`  @eslint-react/naming-convention/filename

✖ 1 problem (1 error, 0 warnings)
```

### Passing

With the same `PascalCase` configuration, this file name is valid:

```bash title="src/components/Component.tsx"
# Correctly named file.
```

This file will pass without any warnings.

## Rule Options

The rule accepts an object with the following properties:

- `rule`: The naming convention to enforce. Default: `"PascalCase"`.
  - `"PascalCase"`: `ExampleComponent.tsx`
  - `"camelCase"`: `exampleComponent.tsx`
  - `"kebab-case"`: `example-component.tsx`
  - `"snake_case"`: `example_component.tsx`
- `excepts`: An array of strings or regex patterns to exclude certain file names from this rule. The default exceptions are designed to accommodate common patterns in modern web frameworks:
  - `"index"`: Ignores `index` files (e.g., `index.ts`, `index.tsx`).
  - `"/^_/"`: Ignores files starting with an underscore (e.g., `_app.tsx`, `_layout.tsx`).
  - `"/^\\$/"`: Ignores files starting with a dollar sign (e.g., `$.tsx`).
  - `"/^[0-9]+$/"`: Ignores files that are purely numeric (e.g., `404.tsx`).
  - `"/^\[[^\]]+\]$/"`: Ignores files with dynamic route segments in brackets (e.g., `[slug].tsx`).

## Configuration Examples

### Enforcing `kebab-case`

```js title="eslint.config.js"
export default [
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { rule: "kebab-case" }],
    },
  },
];
```

### Different Rules for Different Files

You can apply different conventions to different parts of your project. For example, use `PascalCase` for components and `camelCase` for hooks.

```js title="eslint.config.js"
export default [
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { rule: "PascalCase" }],
    },
  },
  {
    files: ["src/hooks/**/use*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { rule: "camelCase" }],
    },
  },
];
```

### Disabling the Rule for Specific Directories

Framework-specific directories like Next.js's `app` router often have their own naming conventions. You can disable the rule for these directories.

```js title="eslint.config.js"
export default [
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", { rule: "kebab-case" }],
    },
  },
  {
    // Opt-out for files in the 'app' directory
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": "off",
    },
  },
];
```

## Implementation

- [Rule Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.ts)
- [Test Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.spec.ts)
