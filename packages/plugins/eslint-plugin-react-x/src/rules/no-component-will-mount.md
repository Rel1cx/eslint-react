---
title: no-component-will-mount
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-component-will-mount
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-component-will-mount
```

**Features**

`🔄`

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `componentWillMount` with `UNSAFE_componentWillMount`.

This API has been renamed from `componentWillMount` to `UNSAFE_componentWillMount`. The old name has been deprecated. In a future major version of React, only the new name will work.

## Examples

### Before

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps> {
  componentWillMount() {
    // ...
  }
}
```

### After

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps> {
  UNSAFE_componentWillMount() {
    // ...
  }
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-mount.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-mount.spec.ts)

## Further Reading

- [Legacy React APIs `componentWillMount`](https://react.dev/reference/react/Component#componentwillmount)

---

## See Also

- [no-component-will-receive-props](./no-component-will-receive-props)\
  Replace usages of `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps`.
- [no-component-will-update](./no-component-will-update)\
  Replace usages of `componentWillUpdate` with `UNSAFE_componentWillUpdate`.
