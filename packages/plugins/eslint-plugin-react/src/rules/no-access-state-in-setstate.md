# react/no-access-state-in-setstate

## Rule category

Correctness.

## What it does

Disallows accessing `this.state` inside `setState` calls.

## Why is this bad?

Usage of `this.state` inside `setState` calls might result in errors when two state calls are called in batch and thus referencing old state and not the current state.

## Examples

### Failing

```tsx
class MyComponent extends React.Component {
  state = {
    foo: 1,
  };

  render() {
    return <div onClick={() => this.setState({ foo: this.state.foo + 1 })} />;
  }
}
```

### Passing

```tsx
class MyComponent extends React.Component {
  state = {
    foo: 1,
  };

  render() {
    return <div onClick={() => this.setState({ foo: this.state.foo + 1 })} />;
  }
}
```
