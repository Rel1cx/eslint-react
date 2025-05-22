---
title: no-nested-lazy-component-declarations
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-nested-lazy-component-declarations
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-nested-lazy-component-declarations
```

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow nesting lazy component declarations inside other components.

When a lazy component is declared inside another component, it will be re-created on every render of the parent component. This can lead to unexpected behavior, such as resetting the state of the lazy component.

## Examples

### Failing

```tsx
import { lazy } from "react";

function Editor() {
  // 🔴 Bad: This will cause all state to be reset on re-renders
  const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
  //    ^^^^^^^^^^^^^^^
  //    - Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.
  // ...
}
```

### Passing

```tsx
import { lazy } from "react";

// ✅ Good: Declare lazy components outside of your components
const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

function Editor() {
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-lazy-component-declarations.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-nested-lazy-component-declarations.spec.ts)

## Further Reading

- [React `Lazy`](https://react.dev/reference/react/lazy)
  - [My lazy component’s state gets reset unexpectedly](https://react.dev/reference/react/lazy#my-lazy-components-state-gets-reset-unexpectedly)
- [React Docs: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)

---

## See Also

- [`no-nested-component-definitions`](./no-nested-component-definitions)\
  Disallow nesting component definitions inside other components.
