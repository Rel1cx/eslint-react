# ensure-forward-ref-using-ref

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/ensure-forward-ref-using-ref
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/ensure-forward-ref-using-ref
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Requires that components wrapped with `forwardRef` must have a `ref` parameter.

This rule checks all React components using `forwardRef` and verifies that there is a second parameter.

Omitting the `ref` argument is usually a bug, and components not using `ref` don't need to be wrapped by `forwardRef`.

## Examples

### Failing

```tsx
import React from "react";

const Example = React.forwardRef((props) => {
  //                             ^^^^^^^
  //                             - 'forwardRef' is used with this component but no 'ref' parameter is set.
  return <button />;
});
```

### Passing

```tsx
import React from "react";

const Example = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return <button ref={ref} />;
});
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/ensure-forward-ref-using-ref.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/ensure-forward-ref-using-ref.spec.ts)

## Further Reading

- [React: forwardRef](https://react.dev/reference/react/forwardRef)
