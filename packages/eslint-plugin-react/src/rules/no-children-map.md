# react/no-children-map

<!-- end auto-generated rule header -->

## Rule category

Suspicious.

## What it does

Prevents usage of `Children.map`.

## Why is this bad?

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### ❌ Incorrect

```tsx
import { Children } from "react";

function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child => (
        <div className="Row">
          {child}
        </div>
      ))}
    </div>
  );
}
```

## Further reading

- [react.dev: Legacy React APIs Children](https://react.dev/reference/react/Children)
