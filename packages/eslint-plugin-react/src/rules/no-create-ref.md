# react/no-create-ref

<!-- end auto-generated rule header -->

> Prevent usage of `createRef()` in function components.

## Rule Details

### ❌ Incorrect

```tsx
function Component() {
  const ref = React.createRef<HTMLDivElement>();

  return <div ref={ref} />;
}
```

### ✅ Correct

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

- [react.dev: legacy createRef](https://react.dev/reference/react/createRef)
