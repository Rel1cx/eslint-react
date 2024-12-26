# no-component-will-receive-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-component-will-receive-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-component-will-receive-props
```

**Labels**

`Deprecated React APIs` `Class Components` `Lifecycle Methods`

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents usage of `componentWillReceiveProps` in class components.

This API has been renamed from `componentWillReceiveProps` to `UNSAFE_componentWillReceiveProps`. The old name has been deprecated. In a future major version of React, only the new name will work.

A **safe** codemod is available for this rule.

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

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-receive-props.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-receive-props.spec.ts)

## Further Reading

- [React: Legacy React APIs componentWillReceiveProps](https://react.dev/reference/react/Component#componentwillreceiveprops)
