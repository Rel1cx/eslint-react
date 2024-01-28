# no-unused-class-component-members

## Rule category

Correctness.

## What it does

Warns unused class component methods and properties.

## Examples

### Failing

```tsx
class Foo extends React.Component {
  handleClick() {}
  render() {
    return null;
  }
}
```

### Passing

```tsx
class Foo extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  action() {}
  componentDidMount() {
    this.action();
  }
  render() {
    return null;
  }
}
```
