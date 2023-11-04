# naming-convention/component-name

<!-- end auto-generated rule header -->

Enforce naming conventions for components.

## Rule Details

This rule enforces naming conventions for components. default to `PascalCase`.

### ❌ Incorrect

```tsx
// filename: my-component.tsx

export const My_Component = () => {
  return <div />;
};
```

### ✅ Correct

```tsx
// filename: my-component.tsx

export const MyComponent = () => {
  return <div />;
};
```

## Rule Options

- `rule`: The rule to apply to the file name. Can be one of the following:
  - `PascalCase`: PascalCase
  - `CONSTANT_CASE`: CONSTANT_CASE
- `excepts`: List of component names that should be ignored by this rule.
