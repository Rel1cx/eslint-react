# no-array-index-key

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-array-index-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-array-index-key
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Warns when an array `index` is used as a `key` prop.

The order of items in a list rendering can change over time if an item is inserted, deleted, or the array is reordered. Indexes as keys often lead to subtle and confusing errors.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: string; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map((item, index) => (
        //              ^^^^^
        //              - Do not use Array index as 'key'.
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: string; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-array-index-key.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-array-index-key.spec.ts)

## Further Reading

- [React: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
