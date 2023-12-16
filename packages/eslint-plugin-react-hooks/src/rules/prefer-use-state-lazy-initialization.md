# react-hooks/prefer-use-state-lazy-initialization

## Rule category

Perf.

## What it does

Warns about function calls made inside `useState` calls.

## Why is this bad?

A function can be invoked inside a useState call to help create its initial state. However, subsequent renders will still invoke the function while discarding its return value. This is wasteful and can cause performance issues if the function call is expensive.

To combat this issue React allows useState calls to use an [initializer function](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state) which will only be called on the first render.

## Examples

### Fail

```tsx
const [value, setValue] = useState(generateTodos());
```

### Pass

```tsx
const [value, setValue] = useState(() => generateTodos());
```

## Further Reading

- [Official React documentation on useState](https://react.dev/reference/react/useState)
