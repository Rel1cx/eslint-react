# no-component-will-receive-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-component-will-receive-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-component-will-receive-props
```

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-receive-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-receive-props.spec.ts)

## What it does

Prevents usage of `componentWillReceiveProps` in class components.

This API has been renamed from `componentWillReceiveProps` to `UNSAFE_componentWillReceiveProps`. The old name has been deprecated. In a future major version of React, only the new name will work.

## Examples

### Failing

```tsx
import React from "react";

class Example extends React.Component {
  componentWillReceiveProps() {
    // ...
  }
}
```

### Passing

```tsx
import React from "react";

class Example extends React.Component {
  UNSAFE_componentWillReceiveProps() {
    // ...
  }
}
```

## Further Reading

- [React: Legacy React APIs componentWillReceiveProps](https://react.dev/reference/react/Component#componentwillreceiveprops)
