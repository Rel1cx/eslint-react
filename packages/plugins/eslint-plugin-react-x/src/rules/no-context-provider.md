---
title: no-context-provider
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-context-provider
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-context-provider
```

**Features**

`🔄`

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `<Context.Provider>` with `<Context>`.

In React 19, you can render `<Context>` as a provider instead of `<Context.Provider>`.

In addition, it is recommended to enable the [`naming-convention/context-name`](./naming-convention-context-name) rule to enforce consistent naming conventions for contexts.

## Examples

### Before

```tsx
import React from "react";
import ThemeContext from "./ThemeContext";

function App({ children }) {
  return (
    <ThemeContext.Provider value="light">
      {children}
    </ThemeContext.Provider>
  );
}
```

### After

```tsx
import React from "react";
import ThemeContext from "./ThemeContext";

function App({ children }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-context-provider.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-context-provider.spec.ts)

## Further Reading

- [React Blog: `<Context>` as a provider](https://react.dev/blog/2024/12/05/react-19#context-as-a-provider)

---

## See Also

- [`no-forward-ref`](./no-forward-ref)\
  Replaces usages of `forwardRef` with passing `ref` as a prop.
- [`no-use-context`](./no-use-context)\
  Replaces usages of `useContext` with `use`.
