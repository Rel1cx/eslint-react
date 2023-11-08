# jsx/no-missing-key

<!-- end auto-generated rule header -->

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

[react.dev why-does-react-need-keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
