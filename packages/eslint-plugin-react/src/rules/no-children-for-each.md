# react/no-children-for-each

<!-- end auto-generated rule header -->

## Rule category

Suspicious.

## What it does

Prevents usage of `Children.forEach`.

## Why is this bad?

Using Children is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### ❌ Incorrect

```tsx
import { Children } from "react";

function SeparatorList({ children }) {
  const result = [];
  Children.forEach(children, (child, index) => {
    result.push(child);
    result.push(<hr key={index} />);
  });
  // ...
}
```

## Further reading

- [react.dev: Legacy React APIs Children](https://react.dev/reference/react/Children)
