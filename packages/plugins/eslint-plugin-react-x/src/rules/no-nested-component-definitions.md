---
title: no-nested-component-definitions
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-nested-component-definitions
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-nested-component-definitions
```

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow nesting component definitions inside other components.

Nesting component definitions inside other components is a common mistake that can be extremely slow and cause issues and bugs, and the state of components defined during rendering will not be preserved by React. Instead, define every component at the top level.

## Examples

### Failing

```tsx
import React from "react";

function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    /* ... */
  }
  // ...
}
```

### Passing

```tsx
// ✅ Declare components at the top level
function Gallery() {
  // ...
}
function Profile() {
  /* ... */
}
```

When a child component needs some data from a parent, [pass it by props](https://react.dev/learn/passing-props-to-a-component) instead of nesting definitions.

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-component-definitions.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-component-definitions.spec.ts)

## Further Reading

- [React Docs: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)

---

## See Also

- [`no-nested-lazy-component-declarations`](./no-nested-lazy-component-declarations.md)\
  Disallow nesting lazy component declarations inside other components.
