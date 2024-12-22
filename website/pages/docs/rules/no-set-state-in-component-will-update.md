# no-set-state-in-component-will-update

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-set-state-in-component-will-update
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-set-state-in-component-will-update
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-will-update.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-will-update.spec.ts)

## What it does

Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.

Updating the state after a component mount will trigger a second `render()` call and can lead to property/layout thrashing.

## Examples

### Failing

```tsx
import React from "react";

interface ExampleProps {}

interface ExampleState {
  name: string;
}

class Example extends React.Component<ExampleProps, ExampleState> {
  componentWillUpdate() {
    this.setState({ name: "John" });
    //   ^^^^^^^^^^^^^^^^^^^^^^^^^^
    //   - Do not call `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}
```
