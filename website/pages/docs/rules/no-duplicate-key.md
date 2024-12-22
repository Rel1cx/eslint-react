# no-duplicate-key

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-duplicate-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-duplicate-key
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents duplicate `key` on elements in the same array or a list of `children`.

React uses keys to identify elements in an array. If two elements have the same key, React will not be able to distinguish them. This can lead to issues with state and rendering.

## Examples

### Failing

```tsx
import React from 'react';

function Example () {
  return [
    <li key="1">Item 1</li>
    <li key="1">Item 2</li>
    //  ^^^^^^^
    //  - A key must be unique. '1' is duplicated.
  ]
};
```

### Passing

```tsx
import React from 'react';

function Example () {
  return [
    <li key="1">Item 1</li>
    <li key="2">Item 2</li>
  ]
};
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-key.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-key.spec.ts)

## Further Reading

- [React: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
