# no-children-map

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-map
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-map
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `Children.map` from the `react` package.

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
    <div className="RowList">
      {Children.map(children, (child) => <div className="Row">{child}</div>)}
    </div>
  );
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-map.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-map.spec.ts)

## Further Reading

- [React: Legacy React APIs Children](https://react.dev/reference/react/Children)
