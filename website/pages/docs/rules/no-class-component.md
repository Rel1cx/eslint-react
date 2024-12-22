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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-class-component.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-class-component.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-class-component.md)

## What it does

Prevents the use of class components.

Component is the base class for the React components defined as JavaScript classes. Class components are still supported by React, but we don’t recommend using them in new code.

It is recommended to define components as functions instead of classes. [See how to migrate](https://react.dev/reference/react/Component#alternatives).

## Examples

This rule aims to prevent usage of class components in React.

### Failing

```tsx
import React from "react";

interface ExampleProps {
  name: string;
}

class Example extends React.Component<ExampleProps> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Passing

```tsx
import React from "react";

interface ExampleProps {
  name: string;
}

function Example({ name }: ExampleProps) {
  return <h1>Hello, {name}!</h1>;
}
```

## Further Reading

- [React: Legacy React APIs Component](https://react.dev/reference/react/Component)
