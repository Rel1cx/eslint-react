# avoid-shorthand-fragment

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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-fragment.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/avoid-shorthand-fragment.md)

## What it does

Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.

## Examples

### Failing

```tsx
import React from "react";

function Example() {
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

function Example() {
  return (
    <Fragment>
      <button />
      <button />
    </Fragment>
  );
}
```
