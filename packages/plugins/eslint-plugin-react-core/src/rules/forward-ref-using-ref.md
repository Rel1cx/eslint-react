# forward-ref-using-ref

## Rule category

Correctness.

## What it does

Requires that components wrapped with `forwardRef` must have a `ref` parameter.

This rule checks all React components using `forwardRef` and verifies that there is a second parameter.

## Why is this bad?

Omitting the `ref` argument is usually a bug, and components not using `ref` don't need to be wrapped by `forwardRef`.

## Examples

### Failing

```tsx
const Component = React.forwardRef((props) => {
  return <div />;
});
```

```tsx
import { forwardRef } from "react";

const Component = forwardRef((props) => {
  return <div />;
});
```

### Passing

```tsx
const Component = React.forwardRef((props, ref) => {
  return <div ref={ref} />;
});
```

```tsx
import { forwardRef } from "react";

const Component = forwardRef((props, ref) => {
  return <div ref={ref} />;
});
```

## Further Reading

- [react.dev: forwardRef](https://react.dev/reference/react/forwardRef)
