# naming-convention/use-state

## Rule category

Style.

## What it does

Enforces destructuring and symmetric naming of `useState` hook value and setter variables

## Examples

### Failing

```tsx
import React, { useState } from "react";

const Counter = () => {
  const useStateResult = useState(0);

  return <div>{useStateResult[0]}</div>;
};
```

### Passing

```tsx
import React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  return <div>{count}</div>;
};
```

```tsx
import React from "react";

const Comp = () => {
  const [{ foo, bar, baz }, setFooBarBaz] = React.useState({ foo: "bbb", bar: "aaa", baz: "qqq" });

  return <div>{foo}</div>;
};
```
