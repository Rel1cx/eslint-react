---
title: avoid-shorthand-fragment
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/avoid-shorthand-fragment
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/avoid-shorthand-fragment
```

## Description

Enforces explicit `<Fragment>` components instead of the shorthand `<>` or `</>` syntax.

## Examples

### Failing

```tsx
import React from "react";

export function MyComponent() {
  return (
    <>
      <button />
      <button />
    </>
  );
}
```

### Passing

```tsx
import React, { Fragment } from "react";

export function MyComponent() {
  return (
    <Fragment>
      <button />
      <button />
    </Fragment>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.spec.ts)

---

## See Also

- [`avoid-shorthand-boolean`](./avoid-shorthand-boolean)\
  Enforces the use of explicit boolean values for boolean attributes.
- [`prefer-shorthand-boolean`](./prefer-shorthand-boolean)\
  Enforces the use of shorthand syntax for boolean attributes.
- [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.
