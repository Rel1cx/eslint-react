# react/no-set-state-in-component-did-mount

## Rule category

Suspicious.

## What it does

Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.

## Why is this bad?

Updating the state after a component mount will trigger a second render() call and can lead to property/layout thrashing.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentDidMount() {
    this.setState({ name: "John" });
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentDidMount() {
    this.onMount(function callback(newName) {
      this.setState({
        name: newName,
      });
    });
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}
```
