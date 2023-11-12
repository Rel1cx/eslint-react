# react/no-children-to-array

<!-- end auto-generated rule header -->

## Rule category

Suspicious.

## What it does

Checks usage of `React.Children.toArray()`.

## Why is this bad?

Using Children is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### ❌ Incorrect

```tsx
import { Children } from "react";

export default function ReversedList({ children }) {
  const result = Children.toArray(children);
  result.reverse();
  // ...
}
```

## Further reading

- [react.dev: Legacy React APIs Children](https://react.dev/reference/react/Children)
