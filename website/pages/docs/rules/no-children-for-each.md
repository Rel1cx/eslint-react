# no-children-for-each

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-for-each
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-for-each
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `Children.forEach` from the `react` package.

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### Failing

```tsx
import React, { Children } from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  const result = [];
  Children.forEach(children, (child, index) => {
    result.push(child);
    result.push(<hr key={index} />);
  });
  // ...
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-for-each.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-for-each.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)
