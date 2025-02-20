---
title: no-unsafe-component-will-mount
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unsafe-component-will-mount
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unsafe-component-will-mount
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Warns the usage of `UNSAFE_componentWillMount` in class components.

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

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unsafe-component-will-mount.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unsafe-component-will-mount.spec.ts)

---

## See Also

- [`no-unsafe-component-will-receive-props`](./no-unsafe-component-will-receive-props)\
  Prevents usage of `UNSAFE_componentWillReceiveProps` in class components.
- [`no-unsafe-component-will-update`](./no-unsafe-component-will-update)\
  Prevents usage of `UNSAFE_componentWillUpdate` in class components.
