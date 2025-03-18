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

## Description

Enforces consistent naming conventions for context providers.

In React 19, you can render `<Context>` as a provider instead of `<Context.Provider>`. This rule enforces that the context has a valid component name with the suffix `Context`.

## Examples

### Failing

```tsx
const theme = createContext("");
```

```tsx
const Theme = createContext("");
```

```tsx
const themecontext = createContext("");
```

```tsx
const themeContext = createContext("");
```

### Passing

```tsx
const ThemeContext = createContext("");
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/context-name.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/context-name.spec.ts)

---

## See Also

- [`component-name`](./naming-convention-component-name)\
  Enforces naming conventions for components.
