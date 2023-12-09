# jsx/no-spreading-key

## Rule category

Suspicious.

## What it does

Disallows spreading `key` prop from objects.

## Why is this bad?

This makes it hard to see if the key was passed correctly to the element or where it came from.

And it's also be proposed to be deprecated is this RFC: [Deprecate spreading key from objects](https://github.com/reactjs/rfcs/pull/107#issue-413235149)

## Examples

This rule aims to prevent spreading key from objects.

### ❌ Incorrect

```tsx
function List({ items }) {
  return (
    <ul>
      {items.map((item) => <li {...{ key: item.id }}>{item.name}</li>)}
    </ul>
  );
}
```

### ✅ Correct

```tsx
function List({ items }) {
  return (
    <ul>
      {items.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```
