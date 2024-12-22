# no-unused-class-component-members

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unused-class-component-members
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unused-class-component-members
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-class-component-members.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-class-component-members.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-unused-class-component-members.md)

## What it does

Warns unused class component methods and properties.

## Examples

### Failing

```tsx
import React from "react";

class Example extends React.Component {
  handleClick() {} // Unused
  render() {
    return null;
  }
}
```

### Passing

```tsx
import React from "react";

class Example extends React.Component {
  static getDerivedStateFromError(error: React.ErrorInfo) {
    return { hasError: true };
  }
  action() {}
  componentDidMount() {
    this.action();
  }
  render() {
    return null;
  }
}
```
