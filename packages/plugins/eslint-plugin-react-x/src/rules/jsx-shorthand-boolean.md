---
title: jsx-shorthand-boolean
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/jsx-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/jsx-shorthand-boolean
```

**Features**

`🔧`

## Description

Enforces the use of shorthand syntax for boolean attributes.

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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-shorthand-boolean.spec.ts)

---

## See Also

- [`jsx-shorthand-fragment`](./jsx-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.
