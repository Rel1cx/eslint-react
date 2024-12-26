# use-state

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/use-state
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/use-state
```

**Labels**

`React Hooks` `useState`

**Features**

`🔍`

## What it does

Enforces destructuring and symmetric naming of `useState` hook value and setter variables

## Examples

### Failing

```tsx
import React, { useState } from "react";

function MyComponent() {
  const useStateResult = useState(0);
  //    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //    - 'useState' call is not destructured into value + setter pair.

  return <div>{useStateResult[0]}</div>;
}
```

### Passing

```tsx
import React, { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}
```

```tsx
import React, { useState } from "react";

function MyComponent() {
  const [{ foo, bar, baz }, setFooBarBaz] = useState({
    foo: "bbb",
    bar: "aaa",
    baz: "qqq",
  });

  return <div>{foo}</div>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/use-state.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/use-state.spec.ts)
