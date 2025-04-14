---
title: no-misused-capture-owner-stack
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-misused-capture-owner-stack
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-misused-capture-owner-stack
```

**Features**

`🧪`

## Description

Prevents incorrect usage of `captureOwnerStack`.

The `captureOwnerStack` is only available in development builds of React and must be:

1. Imported via namespace to avoid direct named imports.
2. Conditionally accessed within an `if (process.env.NODE_ENV !== 'production') {...}` block to prevent execution in production environments.
3. The call of `captureOwnerStack` happened inside of a React controlled function (**not implemented yet**).

## Examples

### Failing

```tsx
// Failing: Using named import directly
import { captureOwnerStack } from "react";
//       ^^^^^^^^^^^^^^^^^
//       - Don't use named imports of `captureOwnerStack` in files that are bundled for development and production. Use a namespace import instead.

if (process.env.NODE_ENV !== "production") {
  const ownerStack = React.captureOwnerStack();
  console.log("Owner Stack", ownerStack);
}
```

```tsx
// Failing: Missing environment check
import * as React from "react";

const ownerStack = React.captureOwnerStack();
//                 ^^^^^^^^^^^^^^^^^^^^^^^^^
//                 - `captureOwnerStack` should only be used in development builds. Use an environment check to ensure it is not executed in production.
console.log(ownerStack);
```

### Passing

```tsx
// Passing: Correct namespace import with environment check
import * as React from "react";

if (process.env.NODE_ENV !== "production") {
  const ownerStack = React.captureOwnerStack();
  console.log("Owner Stack", ownerStack);
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-misused-capture-owner-stack.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-misused-capture-owner-stack.spec.ts)

## Further Reading

- [React `captureOwnerStack`](https://react.dev/reference/react/captureOwnerStack)
  - [The Owner Stack is `null`](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)
  - [`captureOwnerStack` is not available](https://react.dev/reference/react/captureOwnerStack#captureownerstack-is-not-available)
