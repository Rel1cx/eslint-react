# no-unsafe-component-will-mount

## Rule category

Suspicious.

## What it does

Warns usage of `UNSAFE_componentWillMount` in class components.

## Why is this bad?

Using unsafe lifecycle methods like `UNSAFE_componentWillMount` makes your component's behavior less predictable and are more likely to cause bugs.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillMount() {
    // ...
  }
}
```
