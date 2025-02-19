---
title: no-children-to-array
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-to-array
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-to-array
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `Children.toArray` from the `react` package.

Using `Children.toArray` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### Failing

```tsx
import React, { Children } from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  const result = Children.toArray(children);
  result.reverse();
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-to-array.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-to-array.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)

## See Also

- [`no-children-count`](./no-children-count)
  Prevents the use of `Children.count` from the `react` package.
- [`no-children-for-each`](./no-children-for-each)\
  Prevents the use of `Children.forEach` from the `react` package.
- [`no-children-map`](./no-children-map)\
  Prevents the use of `Children.map` from the `react` package.
- [`no-children-only`](./no-children-only)\
  Prevents the use of `Children.only` from the `react` package.
