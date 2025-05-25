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

Disallows defining React components inside other components.

Component definitions inside other components cause them to be recreated on every render, which can lead to performance issues and unexpected behavior.

When a component is defined inside another component:

- It gets recreated on every render of the parent component
- It loses its internal state when the parent rerenders
- It defeats props memoization and optimization techniques
- It creates new function references on every render

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

- [React Docs: `Lazy`](https://react.dev/reference/react/lazy)
  - [My lazy component’s state gets reset unexpectedly](https://react.dev/reference/react/lazy#my-lazy-components-state-gets-reset-unexpectedly)
- [React Docs: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)

---

## See Also

- [`no-nested-component-definitions`](./no-nested-component-definitions)\
  Disallow nesting component definitions inside other components.
