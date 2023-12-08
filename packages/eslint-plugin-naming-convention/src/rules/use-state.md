# naming-convention/use-state

## Rule category

Style.

## What it does

Enforces destructuring and symmetric naming of `useState` hook value and setter variables

## Why is this good?

Following naming conventions can make codebase more consistent and easier to understand, navigate and work with.

## Examples

### ❌ Incorrect

```tsx
import React, { useState } from "react";

const Counter = () => {
  const useStateResult = useState(0);

  return <div>{useStateResult[0]}</div>;
};
```

### ✅ Correct

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
