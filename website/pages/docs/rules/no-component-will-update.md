# no-component-will-update

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

## What it does

Prevents usage of `componentWillUpdate` in class components.

## Why is this bad?

This API has been renamed from `componentWillUpdate` to `UNSAFE_componentWillUpdate`. The old name has been deprecated. In a future major version of React, only the new name will work.

## Examples

### Failing

```tsx
import React from "react";

class ExampleComponent extends React.Component {
  componentWillUpdate() {
    // ...
  }
}
```

### Passing

```tsx
import React from "react";

class ExampleComponent extends React.Component {
  UNSAFE_componentWillUpdate() {
    // ...
  }
}
```

## Further Reading

- [React: Legacy React APIs componentWillUpdate](https://react.dev/reference/react/Component#componentwillupdate)
