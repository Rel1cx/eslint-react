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
