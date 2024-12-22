# no-missing-key

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-missing-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-missing-key
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents missing `key` on items in list rendering.

React needs keys to identify items in the list. If you don’t specify a key, React will use the array index as a key, which often leads to subtle and confusing bugs.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: number; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map((todo) => (
        <Todo {...todo} />
      {/* ^^^^^^^^^^^^^^^ */}
      {/* - Missing 'key' for element when rendering list. */}
      ))}
    </ul>
  );
}

declare const Todo: React.ComponentType<{ id: number; name: string }>;
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: number; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map((todo) => <Todo key={todo.id} {...todo} />)}
    </ul>
  );
}

declare const Todo: React.ComponentType<{ id: number; name: string }>;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-missing-key.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-missing-key.spec.ts)

## Further Reading

- [React: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
