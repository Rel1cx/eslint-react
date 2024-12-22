# no-unsafe-component-will-mount

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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unsafe-component-will-mount.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unsafe-component-will-mount.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-unsafe-component-will-mount.md)

## What it does

Warns the usage of `UNSAFE_componentWillMount` in class components.

Using unsafe lifecycle methods like `UNSAFE_componentWillMount` makes your component's behavior less predictable and are more likely to cause bugs.

## Examples

### Failing

```tsx
import React from "react";

class Example extends React.Component {
  UNSAFE_componentWillMount() {
    // ...
  }
}
```
