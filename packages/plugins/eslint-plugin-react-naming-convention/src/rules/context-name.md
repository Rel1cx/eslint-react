---
title: context-name
---

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/context-name
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/context-name
```

**Features**

`🔍`

## What it does

Enforces naming conventions for context providers.

## Examples

### Failing

```tsx
const Theme = createContext({});
```

### Passing

```tsx
const ThemeContext = createContext({});
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/context-name.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/context-name.spec.ts)
