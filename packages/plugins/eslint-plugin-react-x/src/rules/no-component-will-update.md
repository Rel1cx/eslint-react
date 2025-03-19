---
title: no-component-will-update
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-component-will-update
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-component-will-update
```

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `componentWillUpdate` with `UNSAFE_componentWillUpdate`.

This API has been renamed from `componentWillUpdate` to `UNSAFE_componentWillUpdate`. The old name has been deprecated. In a future major version of React, only the new name will work.

A **safe** codemod is available for this rule.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillUpdate() {
    // ...
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  UNSAFE_componentWillUpdate() {
    // ...
  }
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-update.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-update.spec.ts)

## Further Reading

- [React: Legacy React APIs componentWillUpdate](https://react.dev/reference/react/Component#componentwillupdate)

---

## See Also

- [no-component-will-mount](./no-component-will-mount)\
  Replaces usages of `componentWillMount` with `UNSAFE_componentWillMount`.
- [no-component-will-receive-props](./no-component-will-receive-props)\
  Replaces usages of `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps`.
