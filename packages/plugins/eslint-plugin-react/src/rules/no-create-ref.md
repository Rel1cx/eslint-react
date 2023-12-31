# react/no-create-ref

## Rule category

Restriction.

## What it does

Prevents usage of `createRef()` in function components.

## Why is this bad?

`createRef()` is a legacy API that is not recommended for use in new code. Instead, prefer using `useRef()` with function components.

## Examples

### Failing

```tsx
function Component() {
  const ref = React.createRef<HTMLDivElement>();

  return <div ref={ref} />;
}
```

### Passing

```tsx
function Component() {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref} />;
}
```

```tsx
class Input extends Component {
  inputRef = createRef();
  // ...
}
```

## Further Reading

- [react.dev: Legacy React APIs createRef](https://react.dev/reference/react/createRef)
