---
title: no-children-count
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-count
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-count
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `Children.count` from the `react` package.

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### Failing

```tsx
import React, { Children } from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  return (
    <>
      <h1>Total rows: {Children.count(children)}</h1>
      ...
    </>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-count.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-count.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)
