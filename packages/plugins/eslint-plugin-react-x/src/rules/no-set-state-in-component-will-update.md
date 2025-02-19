---
title: no-set-state-in-component-will-update
---

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

## What it does

Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.

Updating the state after a component mount will trigger a second `render()` call and can lead to property/layout thrashing.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {}

interface MyComponentState {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
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

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-will-update.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-set-state-in-component-will-update.spec.ts)

## See Also

- [`no-set-state-in-component-did-mount`](./no-set-state-in-component-did-mount)\
  Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.
- [`no-set-state-in-component-did-update`](./no-set-state-in-component-did-update)\
  Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.
