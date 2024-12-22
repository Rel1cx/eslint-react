# no-access-state-in-setstate

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-access-state-in-setstate
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-access-state-in-setstate
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-access-state-in-setstate.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-access-state-in-setstate.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-access-state-in-setstate.md)

## What it does

Disallows accessing `this.state` inside `setState` calls.

Usage of `this.state` inside `setState` calls might result in errors when two state calls are called in batch and thus referencing old state and not the current state.

## Examples

### Failing

```tsx
import React from "react";

interface ExampleProps {}

interface ExampleState {
  foo: number;
}

class Example extends React.Component<ExampleProps, ExampleState> {
  state = {
    foo: 1,
  };

  render() {
    return (
      <button onClick={() => this.setState({ foo: this.state.foo + 1 })} />
      //                                          ^^^^^^^^^^^^^^
      //                                          - Do not access 'this.state' within 'setState'. Use the update function instead.
    );
  }
}
```

### Passing

```tsx
import React from "react";

interface ExampleProps {}

interface ExampleState {
  foo: number;
}

class Example extends React.Component<ExampleProps, ExampleState> {
  state = {
    foo: 1,
  };

  render() {
    return (
      <button
        onClick={() => this.setState((state) => ({ foo: state.foo + 1 }))}
      />
    );
  }
}
```
