# prefer-shorthand-boolean

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-shorthand-boolean
```

**Features**

`🔍` `🔧`

## What it does

Enforces the use of shorthand syntax for boolean attributes.

A **safe** auto-fix is available for this rule.

## Examples

This rule enforces the use of shorthand syntax for boolean attributes.

### Failing

```tsx
import React from "react";

function Example() {
  return <button disabled={true} />;
  //             ^^^^^^^^^^^^^^^
  //             - Use shorthand boolean attribute 'disabled'.
}
```

### Passing

```tsx
import React from "react";

function Example() {
  return <button disabled />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-shorthand-boolean.spec.ts)
