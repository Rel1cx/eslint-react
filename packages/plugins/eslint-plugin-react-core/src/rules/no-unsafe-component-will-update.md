# no-unsafe-component-will-update

## Rule category

Suspicious.

## What it does

Warns usage of `UNSAFE_componentWillUpdate` in class components.

## Why is this bad?

Using unsafe lifecycle methods like `UNSAFE_componentWillUpdate` makes your component's behavior less predictable and are more likely to cause bugs.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillUpdate() {
    // ...
  }
}
```
