---
title: avoid-shorthand-fragment
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/avoid-shorthand-fragment
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/avoid-shorthand-fragment
```

**Features**

`🔍`

## What it does

Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.

## Examples

### Failing

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

### Passing

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

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.spec.ts)

---

## See Also

- [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.
