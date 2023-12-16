# react/no-children-only

## Rule category

Restriction.

## What it does

Prevents usage of `Children.only`.

## Why is this bad?

Using `Children` is uncommon and can lead to fragile code. [See common alternatives](https://react.dev/reference/react/Children#alternatives).

## Examples

### Fail

```tsx
function Box({ children }) {
  const element = Children.only(children);
  // ...
}
```

## Further reading

- [react.dev: Legacy React APIs Children](https://react.dev/reference/react/Children)
