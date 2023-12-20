# naming-convention/filename

## Rule category

Style.

## What it does

Enforces naming convention for JSX files. By default, it enforces `PascalCase` for file names.

## Examples

This rule can be configured to enforce one of the following naming conventions:

- PascalCase
- camelCase
- kebab-case
- snake_case

### Failing

```bash
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "PascalCase" }]' .

src/components/Component.tsx
    1:1  error  "File name `Component.tsx` does not match `PascalCase`. Should rename to `Component.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (0 errors, 1 warnings)
```

```bash
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "kebab-case" }]' .

src/components/example_component.tsx
    1:1  error  "File name `example_component.tsx` does not match `kebab-case`. Should rename to `example-component.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (0 errors, 1 warnings)
```

### Passing

```bash
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "PascalCase" }]' .

src/components/Component.tsx

✨  Done in 0.61s.
```

```bash
npx eslint --rule '@eslint-react/naming-convention/filename: ["warn", { "rule": "kebab-case" }]' .

src/components/example-component.tsx

✨  Done in 0.61s.
```

## Rule Options

- `rule`: The rule to apply to the file name. Can be one of the following:
  - `PascalCase`: PascalCase
  - `camelCase`: camelCase
  - `kebab-case`: kebab-case
  - `snake_case`: snake_case
- `excepts`: List of file names that should be ignored by this rule.
- `extensions`: List of file extensions that should be checked by this rule. By default, it checks `.jsx`, `.tsx` files.

```json
{
  "@eslint-react/naming-convention/filename": ["warn", "kebab-case"]
}
```

```json
{
  "@eslint-react/naming-convention/filename": [
    "warn",
    {
      "rule": "PascalCase",
      "excepts": ["index"],
      "extensions": [".jsx", ".tsx"]
    }
  ]
}
```
