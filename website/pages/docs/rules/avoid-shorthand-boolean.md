# avoid-shorthand-boolean

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

## Examples

### Failing

```tsx
import React from "react";

function Example() {
  return <button disabled />;
  //             ^^^^^^^^
  //             - Avoid using shorthand syntax for 'disabled' attribute.
}
```

### Passing

```tsx
import React from "react";

function Example() {
  return <button disabled={true} />;
}
```
