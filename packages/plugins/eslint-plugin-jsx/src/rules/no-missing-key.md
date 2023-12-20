# jsx/no-missing-key

## Rule category

Correctness.

## What it does

Prevents missing `key` prop on items in list rendering.

## Why is this bad?

React needs keys to identify items in the list. If you don’t specify a key, React will use the array index as a key, which often leads to subtle and confusing bugs.

## Examples

### Failing

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => <Todo {...todo} />)}
  </ul>
);
```

### Passing

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => <Todo {...todo} key={todo.id} />)}
  </ul>
);
```

## Further Reading

- [react.dev: Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
