# jsx/no-array-index-key

## Rule category

Suspicious.

## What it does

Warns when an array `index` is used as a `key` prop.

## Why is this bad?

The order of items in a list rendering can change over time if an item is inserted, deleted, or the array is reordered. Indexes as keys often lead to subtle and confusing errors.

## Examples

### Failing

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo, index) => <Todo {...todo} key={index} />)}
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
