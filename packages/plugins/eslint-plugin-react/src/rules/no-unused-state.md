# react/no-unused-state

## Rule category

Correctness.

## What it does

Warns unused class component state.

## Examples

### Failing

```tsx
class MyComponent extends React.Component {
  state = {
    foo: 1,
  };

  render() {
    return <div />;
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
    return <div>{this.state.foo}</div>;
  }
}
```
