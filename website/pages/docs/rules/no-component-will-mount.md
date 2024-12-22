# no-component-will-mount

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-component-will-mount
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-component-will-mount
```

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-mount.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-component-will-mount.spec.ts)

## What it does

Prevents usage of `componentWillMount` in class components.

This API has been renamed from `componentWillMount` to `UNSAFE_componentWillMount`. The old name has been deprecated. In a future major version of React, only the new name will work.

## Examples

### Failing

```tsx
import React from "react";

interface ExampleProps {
  name: string;
}

class Example extends React.Component<ExampleProps> {
  componentWillMount() {
    // ...
  }
}
```

### Passing

```tsx
import React from "react";

interface ExampleProps {
  name: string;
}

class Example extends React.Component<ExampleProps> {
  UNSAFE_componentWillMount() {
    // ...
  }
}
```

## Further Reading

- [React: Legacy React APIs componentWillMount](https://react.dev/reference/react/Component#componentwillmount)
