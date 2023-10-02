# react-ts/naming-convention/filename

## Rule Details

### ✅ Correct

```bash
npx eslint --rule 'react-ts/naming-convention/filename: ["error", { "rule": "PascalCase" }]' .

src/components/Component.tsx

✨  Done in 0.61s.
```

```bash
npx eslint --rule 'react-ts/naming-convention/filename: ["error", { "rule": "kebab-case" }]' .

src/components/example-component.tsx

✨  Done in 0.61s.
```

### ❌ Incorrect

```bash
npx eslint --rule 'react-ts/naming-convention/filename: ["error", { "rule": "PascalCase" }]' .

src/components/Component.tsx
    1:1  error  "File name `Component.tsx` does not match `PascalCase`. Should rename to `Component.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (1 errors, 0 warnings)
```

```bash
npx eslint --rule 'react-ts/naming-convention/filename: ["error", { "rule": "kebab-case" }]' .

src/components/example_component.tsx
    1:1  error  "File name `example_component.tsx` does not match `kebab-case`. Should rename to `example-component.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (1 errors, 0 warnings)
```

## Options

- `rule`: `string` - The rule to apply to the file name. Can be one of the following:
  - `PascalCase` - PascalCase
  - `camelCase` - camelCase
  - `kebab-case` - kebab-case
  - `snake_case` - snake_case
- `excepts`: `string[]` - List of file names that should be ignored by this rule.
