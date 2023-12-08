# jsx/no-duplicate-key

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Prevents duplicate `key` props on elements in the same array or a list of `children`.

## Why is this bad?

React uses keys to identify elements in an array. If two elements have the same key, React will not be able to distinguish them. This can lead to issues with state and rendering.

## Examples

### ❌ Incorrect

```tsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => <Todo {...todo} key="key" />)}
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

- [react.dev why-does-react-need-keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
