---
title: no-create-ref
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-create-ref
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-create-ref
```

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow `createRef` in function components.

`createRef()` is a legacy API that is not recommended for use in new code. Instead, prefer using `useRef()` with function components.

## Examples

### Failing

```tsx
import React, { createRef } from "react";

function MyComponent() {
  const ref = React.createRef<HTMLDivElement>();
  //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //          - [Deprecated] Use 'useRef' instead.

  return <div ref={ref} />;
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

```tsx
import React, { createRef } from "react";

class MyComponent extends React.Component {
  inputRef = createRef();
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-create-ref.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-create-ref.spec.ts)

## Further Reading

- [React: Legacy React APIs createRef](https://react.dev/reference/react/createRef)

---

## See Also

- [`no-string-refs`](./no-string-refs)\
  Disallows using deprecated `string refs`.
