# no-direct-mutation-state

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-direct-mutation-state
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-direct-mutation-state
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Disallows direct mutation of `this.state`.

NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

The only place that's acceptable to assign `this.state` is in a class component's `constructor`.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {}

interface ExampleState {
  foo: string;
}

class MyComponent extends React.Component<MyComponentProps, ExampleState> {
  state = {
    foo: "bar",
  };

  render() {
    return (
      <div
        onClick={() => {
          this.state.foo = "baz";
          //   ^^^^^^^^^^^^^^^^^
          //   - Do not mutate state directly. Use 'setState()' instead.
        }}
      >
        {this.state.foo}
      </div>
    );
  }
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {}

interface ExampleState {
  foo: string;
}

class MyComponent extends React.Component<MyComponentProps, ExampleState> {
  state = {
    foo: "bar",
  };

  render() {
    return (
      <div
        onClick={() => {
          this.setState({ foo: "baz" });
        }}
      >
        {this.state.foo}
      </div>
    );
  }
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-direct-mutation-state.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-direct-mutation-state.spec.ts)
