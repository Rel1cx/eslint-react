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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/avoid-shorthand-boolean.md)

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
