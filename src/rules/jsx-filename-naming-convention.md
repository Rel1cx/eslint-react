# jsx-filename-naming-convention

## Rule Details

Examples of **correct** case for this rule:

```bash
npx eslint --rule 'react/jsx-filename-naming-convention: ["error", { "rule": "PascalCase" }]' .

src/components/ExampleComponent.tsx

✨  Done in 0.61s.
```

```bash
npx eslint --rule 'react/jsx-filename-naming-convention: ["error", { "rule": "kebab-case" }]' .

src/components/example-component.tsx

✨  Done in 0.61s.
```

Examples of **incorrect** case for this rule:

```bash
npx eslint --rule 'react/jsx-filename-naming-convention: ["error", { "rule": "PascalCase" }]' .

src/components/exampleComponent.tsx
    1:1  error  "File name `exampleComponent.tsx` does not match `PascalCase`. Should rename to `ExampleComponent.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (1 errors, 0 warnings)
```

```bash
npx eslint --rule 'react/jsx-filename-naming-convention: ["error", { "rule": "kebab-case" }]' .

src/components/example_component.tsx
    1:1  error  "File name `example_component.tsx` does not match `kebab-case`. Should rename to `example-component.tsx`  react/jsx-filename-naming-convention

✖ 1 problems (1 errors, 0 warnings)
```

## Rule Options

- `rule`: The naming convention to enforce. Defaults to `PascalCase`
- `excepts`: An array of regexp that should be ignored by the rule. Defaults to `[]`

### Type Signature

```ts
type Options = {
  rule: "PascalCase" | "kebab-case" | "camelCase" | "snake_case";
};
```

### Default Option

```json
"react/jsx-filename-naming-convention": ["error", {
  "rule": "PascalCase"
}]
```

## When Not To Use It

If you are not using JSX, or if you don't want to enforce specific naming conventions for filenames.
