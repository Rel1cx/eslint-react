# react/no-component-will-mount

## Rule category

Correctness.

## What it does

Prevents usage of `componentWillMount` in class components.

## Why is this bad?

This API has been renamed from `componentWillMount` to `UNSAFE_componentWillMount`. The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [rename-unsafe-lifecycles codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

## Examples

### ❌ Incorrect

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillMount() {
    // ...
  }
}
```

### ✅ Correct

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillMount() {
    // ...
  }
}
```

## Further Reading

- [react.dev: Legacy React APIs componentWillMount](https://react.dev/reference/react/Component#componentwillmount)
