---
title: no-duplicate-key
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-duplicate-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-duplicate-key
```

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow duplicate `key` on elements in the same array or a list of `children`.

React uses keys to identify elements in an array. If two elements have the same key, React will not be able to distinguish them. This can lead to issues with state and rendering.

## Examples

### Failing

```tsx
import React from 'react';

function MyComponent () {
  return [
    <li key="1">Item 1</li>
    <li key="1">Item 2</li>
    //  ^^^^^^^
    //  - A key must be unique. 'key="1"' is duplicated.
  ]
};
```

```tsx
import React from "react";

function MyComponent() {
  return (
    <ul>
      <li key="1">Item 1</li>
      <li key="1">Item 2</li>
      {/* ^^^^^^^ */}
      {/* - A key must be unique. 'key="1"' is duplicated. */}
    </ul>
  );
}
```

```tsx
import React from "react";

function MyComponent() {
  return <ul>{["a", "b"].map((id) => <li key="1">{id}</li>)}</ul>;
  //                                     ^^^^^^^
  //                                     - A key must be unique. 'key="1"' is duplicated.
}
```

### Passing

```tsx
import React from 'react';

function MyComponent () {
  return [
    <li key="1">Item 1</li>
    <li key="2">Item 2</li>
  ]
};
```

```tsx
import React from "react";

function MyComponent() {
  return (
    <ul>
      <li key="1">Item 1</li>
      <li key="2">Item 2</li>
    </ul>
  );
}
```

```tsx
import React from "react";

function MyComponent() {
  return <ul>{["a", "b"].map((id) => <li key={id}>{id}</li>)}</ul>;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-key.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-key.spec.ts)

## Further Reading

- [React: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)

---

## See Also

- [`no-missing-key`](./no-missing-key)\
  Prevents missing `key` on items in list rendering.
- [`no-implicit-key`](./no-implicit-key)\
  Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).
- [`no-array-index-key`](./no-array-index-key)\
  Warns when an array `index` is used as a `key` prop.
