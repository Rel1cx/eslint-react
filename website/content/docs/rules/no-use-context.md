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

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Disallows using `React.useContext`.

In React 19, `use` is preferred over `useContext` because it is more flexible.

An **unsafe** codemod is available for this rule.

## Examples

### Failing

```tsx
import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  // ...
}
```

### Passing

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

- [React: Reading context with use](https://react.dev/reference/react/use#reading-context-with-use)
