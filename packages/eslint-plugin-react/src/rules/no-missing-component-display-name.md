# react/no-missing-component-display-name

<!-- end auto-generated rule header -->

## Rule category

Debug.

## What it does

Enforces that all components have a `displayName` or `name` which React can use as its `displayName` in devtools.

## Why is this bad?

When defining a React component, if you specify its component name in a way that React can't infer its `displayName`, it will show up as an `anonymous` component in devtools, which makes debugging more difficult.

## Examples

### ❌ Incorrect

```tsx
const Button = React.memo(() => <div />);
```

```tsx
const Button = React.forwardRef(() => <div />);
```

```tsx
export default () => <div />;
```

### ✅ Correct

```tsx
const Button = React.memo(() => <div />);
Button.displayName = "Button";
```

```tsx
const Button = React.memo(function Button() {
  return <div />;
});
```

```tsx
const Button = React.forwardRef(() => <div />);
Button.displayName = "Button";
```

```tsx
const Button = React.forwardRef(function Button() {
  return <div />;
});
```

```tsx
export default function Button() {
  return <div />;
}
```
