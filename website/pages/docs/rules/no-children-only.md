# no-children-only

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

interface ExampleProps {
  children: React.ReactNode;
}

function Example({ children }: ExampleProps) {
  const element = Children.only(children);
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-only.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-only.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)
