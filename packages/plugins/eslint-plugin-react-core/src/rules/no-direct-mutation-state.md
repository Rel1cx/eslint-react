# no-direct-mutation-state

## Rule category

Correctness.

## What it does

Disallows direct mutation of `this.state`.

## Why is this bad?

NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

The only place that's acceptable to assign `this.state` is in a class component's `constructor`.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  state = {
    foo: "bar",
  };

  componentDidMount() {
    this.state.foo = "baz";
  }

  render() {
    return <div>{this.state.foo}</div>;
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
    };
  }

  componentDidMount() {
    this.setState({ foo: "baz" });
  }

  render() {
    return <div>{this.state.foo}</div>;
  }
}
```

```tsx
import React from "react";

class MyComponent extends React.Component {
  state = {
    foo: "bar",
  };

  componentDidMount() {
    this.setState({ foo: "baz" });
  }

  render() {
    return <div>{this.state.foo}</div>;
  }
}
```
