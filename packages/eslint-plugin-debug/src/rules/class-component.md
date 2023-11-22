# debug/class-component

<!-- end auto-generated rule header -->

## Rule category

Debug.

## What it does

Reports all class components. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Examples

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
