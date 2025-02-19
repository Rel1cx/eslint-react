---
title: no-children-only
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-only
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-only
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `Children.only` from the `react` package.

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### Failing

```tsx
import React, { Children } from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  const element = Children.only(children);
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-only.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-only.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)

## See Also

- [`no-children-count`](./no-children-count)\
  Prevents the use of `Children.count` from the `react` package.
- [`no-children-for-each`](./no-children-for-each)\
  Prevents the use of `Children.forEach` from the `react` package.
- [`no-children-map`](./no-children-map)\
  Prevents the use of `Children.map` from the `react` package.
- [`no-children-to-array`](./no-children-to-array)\
  Prevents the use of `Children.toArray` from the `react` package.
