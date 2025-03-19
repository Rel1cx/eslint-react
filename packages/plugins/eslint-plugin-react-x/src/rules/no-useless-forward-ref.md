---
title: no-useless-forward-ref
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-useless-forward-ref
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-useless-forward-ref
```

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Enforces that `forwardRef` is only used when a `ref` parameter is declared.

This rule enforces that:

1. Components using `forwardRef` must declare a `ref` parameter
2. Components not using `ref` should not be wrapped with `forwardRef`

## Examples

### Failing

```tsx
import React from "react";

const MyComponent = React.forwardRef((props) => {
  //                                  ^^^^^
  //                                   - 'forwardRef' wrapper is useless without 'ref' parameter.
  return <button />;
});
```

### Passing

```tsx
import React from "react";

const MyComponent = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return <button ref={ref} />;
});
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-useless-forward-ref.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-useless-forward-ref.spec.ts)

## Further Reading

- [React: forwardRef](https://react.dev/reference/react/forwardRef)

---

## See Also

- [`no-forward-ref`](./no-forward-ref)\
  Replaces usages of `forwardRef` with passing `ref` as a prop.
