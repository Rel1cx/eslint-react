---
title: avoid-shorthand-boolean
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/avoid-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/avoid-shorthand-boolean
```

**Features**

`🔍` `🔧`

## What it does

Enforces the use of explicit boolean values for boolean attributes.

A **safe** auto-fix is available for this rule.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled />;
  //             ^^^^^^^^
  //             - Avoid using shorthand syntax for 'disabled' attribute.
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <button disabled={true} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.spec.ts)

---

## See Also

- [`avoid-shorthand-fragment`](./avoid-shorthand-fragment)\
  Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.
- [`prefer-shorthand-boolean`](./prefer-shorthand-boolean)\
  Enforces the use of shorthand syntax for boolean attributes.
- [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.
