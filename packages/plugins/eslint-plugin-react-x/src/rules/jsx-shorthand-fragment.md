---
title: jsx-shorthand-fragment
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/jsx-shorthand-fragment
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/jsx-shorthand-fragment
```

**Features**

`🔧`

## Description

Enforces the use of shorthand `<>` or `</>` syntax or `<React.Fragment>` element.

## Examples

### Failing

```tsx
import React, { Fragment } from "react";

function MyComponent() {
  return (
    <Fragment>
      <button />
      <button />
    </Fragment>
  );
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return (
    <>
      <button />
      <button />
    </>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-shorthand-fragment.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-shorthand-fragment.spec.ts)

---

## See Also

- [`jsx-shorthand-boolean`](./jsx-shorthand-boolean)\
  Enforces the use of shorthand or explicit boolean attributes.
