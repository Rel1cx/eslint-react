# react/no-class-component

<!-- end auto-generated rule header -->

> Component is the base class for the React components defined as JavaScript classes. Class components are still supported by React, but we don’t recommend using them in new code.
>
> We recommend defining components as functions instead of classes. [See how to migrate](https://react.dev/reference/react/Component#alternatives).

## Rule Details

This rule aims to prevent usage of class components in React.

### ❌ Incorrect

```tsx
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### ✅ Correct

```tsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

## Further Reading

- [react.dev: Legacy React APIs Component](https://react.dev/reference/react/Component)
