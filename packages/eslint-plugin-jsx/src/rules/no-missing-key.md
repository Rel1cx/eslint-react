# jsx/no-missing-key

## Rule category

Correctness.

## What it does

Prevents missing `key` prop on items in list rendering.

## Examples

### ❌ Incorrect

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => <Todo {...todo} />)}
  </ul>
);
```

### ✅ Correct

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => <Todo {...todo} key={todo.id} />)}
  </ul>
);
```

## Further Reading

- [react.dev: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
