---
title: prefer-shorthand-boolean
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-shorthand-boolean
```

**Features**

`🔧`

## Description

Enforces the use of shorthand syntax for boolean attributes.

A **safe** auto-fix is available for this rule.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled={true} />;
  //             ^^^^^^^^^^^^^^^
  //             - Use shorthand boolean attribute 'disabled'.
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-boolean.spec.ts)

---

## See Also

- [`avoid-shorthand-boolean`](./avoid-shorthand-boolean)\
  Enforces the use of explicit boolean values for boolean attributes.
- [`avoid-shorthand-fragment`](./avoid-shorthand-fragment)\
  Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.
- [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.
