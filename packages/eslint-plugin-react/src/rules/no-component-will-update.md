# react/no-component-will-update

## Rule category

Correctness.

## What it does

Prevents usage of `componentWillUpdate` in class components.

## Why is this bad?

This API has been renamed from `componentWillUpdate` to `UNSAFE_componentWillUpdate`. The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [rename-unsafe-lifecycles codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

## Examples

### Fail

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillUpdate() {
    // ...
  }
}
```

### Pass

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillUpdate() {
    // ...
  }
}
```

## Further Reading

- [react.dev: Legacy React APIs componentWillUpdate](https://react.dev/reference/react/Component#componentwillupdate)
