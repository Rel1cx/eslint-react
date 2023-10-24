# @eslint-react/debug/class-component

Warns when a class component is found. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Rule Details

### ❌ Incorrect

```tsx
class Component extends React.Component {
    render() {
        return <div />;
    }
}
```

```tsx
class Component extends React.PureComponent {
    render() {
        return <div />;
    }
}
```

```tsx
class Component extends React.PureComponent<Props> {
    render() {
        return <div />;
    }
}
```

```tsx
const Component = class extends React.Component {
    render() {
        return <div />;
    }
};
```
