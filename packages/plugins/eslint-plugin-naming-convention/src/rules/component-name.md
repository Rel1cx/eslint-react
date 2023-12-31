# naming-convention/component-name

## Rule category

Style.

## What it does

Enforces naming conventions for components.

## Examples

This rule enforces naming conventions for components. Can be used to enforce PascalCase and CONSTANT_CASE. By default, it enforces PascalCase.

### Failing

```tsx
// filename: my-component.tsx

export const My_Component = () => {
  return <div />;
};
```

### Passing

```tsx
// filename: my-component.tsx

export const MyComponent = () => {
  return <div />;
};
```

## Rule Options

- `rule`: The rule to apply to the file name. Can be one of the following:
  1. `PascalCase`: PascalCase
  2. `CONSTANT_CASE`: CONSTANT_CASE
- `excepts`: List of component names that should be ignored by this rule.

```json
{
  "@eslint-react/naming-convention/component-name": ["warn", "PascalCase"]
}
```

```json
{
  "@eslint-react/naming-convention/component-name": ["warn", { "rule": "PascalCase", "excepts": ["MyComponent"] }]
}
```
