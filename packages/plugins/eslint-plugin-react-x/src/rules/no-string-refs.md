---
title: no-string-refs
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-string-refs
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-string-refs
```

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallows using deprecated `string refs`.

String refs are deprecated in React. Use callback refs instead.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <div ref="ref" />;
  //              ^^^^^
  //              - [Deprecated] Use callback refs instead.
}
```

### Passing

```tsx
import React, { useRef } from "react";

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-string-refs.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-string-refs.spec.ts)

---

## See Also

- [`no-create-ref`](./no-create-ref)\
  Prevents usage of `createRef()` in function components.
