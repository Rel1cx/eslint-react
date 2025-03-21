---
title: no-duplicate-jsx-props
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-duplicate-jsx-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-duplicate-jsx-props
```

**Presets**

- `core`
- `recommended`

## Description

Disallow duplicate props in JSX elements.

## Examples

### Failing

```tsx
<Hello name="John" name="Doe" />;
```

### Passing

```tsx
<Hello name="John" />;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-jsx-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-jsx-props.spec.ts)
