# react/no-set-state-in-component-will-update

## Rule category

Suspicious.

## What it does

Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.

## Why is this bad?

Updating the state after a component mount will trigger a second render() call and can lead to property/layout thrashing.

## Examples

### Fail

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillUpdate() {
    this.setState({ name: "John" });
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}
```

### Pass

```tsx
import React from "react";

class MyComponent extends React.Component {
  componentWillUpdate() {
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
