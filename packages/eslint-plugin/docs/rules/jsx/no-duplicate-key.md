# @eslint-react/jsx/no-duplicate-key

## Rule details

This rule aims to prevent duplicate key props on elements in the same array. Keys must be unique among siblings.

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

## Further reading

[react.dev why-does-react-need-keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
