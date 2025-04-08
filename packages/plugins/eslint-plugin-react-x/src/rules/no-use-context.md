---
title: no-use-context
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-use-context
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-use-context
```

**Features**

`🔄`

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `useContext` with `use`.

In React 19, `use` is preferred over `useContext` because it is more flexible.

In addition, it is recommended to enable the [`naming-convention/context-name`](./naming-convention-context-name) rule to enforce consistent naming conventions for contexts.

## Examples

### Before

```tsx
import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  // ...
}
```

### After

```tsx
import { use } from "react";

function Button() {
  const theme = use(ThemeContext);
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-use-context.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-use-context.spec.ts)

## Further Reading

- [React Blog: New feature use](https://react.dev/blog/2024/12/05/react-19#new-feature-use)
- [React: Reading context with use](https://react.dev/reference/react/use#reading-context-with-use)

---

## See Also

- [`no-context-provider`](./no-context-provider)\
  Replaces usages of `<Context.Provider>` with `<Context>`.
- [`no-forward-ref`](./no-forward-ref)\
  Replace usages of `forwardRef` with passing `ref` as a prop.
