---
title: jsx-no-duplicate-props
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/jsx-no-duplicate-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/jsx-no-duplicate-props
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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-duplicate-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-duplicate-props.spec.ts)
