# no-class-component

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-class-component
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-class-component
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of class components.

Component is the base class for the React components defined as JavaScript classes. Class components are still supported by React, but we don’t recommend using them in new code.

It is recommended to define components as functions instead of classes. [See how to migrate](https://react.dev/reference/react/Component#alternatives).

## Examples

This rule aims to prevent usage of class components in React.

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

function MyComponent({ name }: MyComponentProps) {
  return <h1>Hello, {name}!</h1>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-class-component.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-class-component.spec.ts)

## Further Reading

- [React: Legacy React APIs Component](https://react.dev/reference/react/Component)
