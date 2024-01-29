# no-component-will-receive-props

## Rule category

Restriction.

## What it does

Prevents usage of `componentWillReceiveProps` in class components.

## Why is this bad?

This API has been renamed from `componentWillReceiveProps` to `UNSAFE_componentWillReceiveProps`. The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [rename-unsafe-lifecycles codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillReceiveProps() {
    // ...
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillReceiveProps() {
    // ...
  }
}
```

## Further Reading

- [react.dev: Legacy React APIs componentWillReceiveProps](https://react.dev/reference/react/Component#componentwillreceiveprops)
