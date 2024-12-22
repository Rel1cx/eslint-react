# filename

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/filename
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/filename
```

**Features**

`🔍` `⚙️`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/naming-convention-filename.md)

## What it does

Enforces naming convention for JSX files. Can be used to enforce PascalCase, camelCase, kebab-case, snake_case. By default, it enforces PascalCase.

## Examples

### Failing

```bash filename="Terminal" {3}
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

```bash filename="Terminal"
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "PascalCase" }]' .

src/components/Component.tsx

✨  Done in 0.61s.
```

```bash filename="Terminal"
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

## Rule Options Examples

```js filename="eslint.config.js"
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

```js filename="eslint.config.js"
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

```js filename="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["src/**/*.{ts,tsx}"],
    ignore: ["**/index.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "PascalCase"],
    },
  },
  {
    files: ["src/pages/**/*.{ts,tsx}"],
    ignore: ["**/index.{ts,tsx}"],
    rules: {
      "@eslint-react/naming-convention/filename": ["warn", "kebab-case"],
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
