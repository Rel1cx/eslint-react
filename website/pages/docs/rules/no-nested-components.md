# no-nested-components

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-nested-components
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-nested-components
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents nesting component definitions inside other components.

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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-components.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-components.spec.ts)

## Further Reading

- [React: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)
