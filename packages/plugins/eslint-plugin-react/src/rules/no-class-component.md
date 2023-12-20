# react/no-class-component

## Rule category

Restriction.

## What it does

Prevents the use of `class component` in React.

## Why is this bad?

Component is the base class for the React components defined as JavaScript classes. Class components are still supported by React, but we don’t recommend using them in new code.

It is recommended to define components as functions instead of classes. [See how to migrate](https://react.dev/reference/react/Component#alternatives).

## Examples

This rule aims to prevent usage of class components in React.

### Failing

```tsx
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Passing

```tsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

## Further Reading

- [react.dev: Legacy React APIs Component](https://react.dev/reference/react/Component)
