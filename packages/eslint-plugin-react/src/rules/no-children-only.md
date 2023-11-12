# react/no-children-only

<!-- end auto-generated rule header -->

## Rule category

Suspicious.

## What it does

Prevents usage of `Children.only`.

## Why is this bad?

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### ❌ Incorrect

```tsx
function Box({ children }) {
  const element = Children.only(children);
  // ...
}
```

## Further reading

- [react.dev: Legacy React APIs Children](https://react.dev/reference/react/Children)
