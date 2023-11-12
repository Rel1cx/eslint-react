# naming-convention/component-name

<!-- end auto-generated rule header -->

## Rule category

Style.

## What it does

Enforces naming conventions for components.

## Why is this good?

Following naming conventions can make codebase more consistent and easier to understand, navigate and work with.

## Examples

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
