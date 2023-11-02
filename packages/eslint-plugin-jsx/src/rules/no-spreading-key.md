# jsx/no-spreading-key

<!-- end auto-generated rule header -->

This rule disallows spreading key from objects.

## Rule Details

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
