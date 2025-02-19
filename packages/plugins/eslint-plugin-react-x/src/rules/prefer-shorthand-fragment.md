---
title: prefer-shorthand-fragment
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-shorthand-fragment
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-shorthand-fragment
```

**Features**

`🔍` `🔧`

## What it does

Enforces the use of shorthand syntax for fragments.

A **safe** auto-fix is available for this rule.

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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-fragment.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-fragment.spec.ts)

---

## See Also

- [`avoid-shorthand-fragment`](./avoid-shorthand-fragment)\
  Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.
