# react/no-unsafe-component-will-receive-props

## Rule category

Suspicious.

## What it does

Warns usage of `UNSAFE_componentWillReceiveProps` in class components.

## Why is this bad?

Using unsafe lifecycle methods like `UNSAFE_componentWillReceiveProps` makes your component's behavior less predictable and are more likely to cause bugs.

## Examples

### ❌ Incorrect

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillReceiveProps() {
    // ...
  }
}
```
