# jsx/no-duplicate-key

💼🚫 This rule is enabled in the following configs: `all-legacy`, 🎨 `jsx`, `jsx-legacy`, 👍 `recommended`, `recommended-legacy`, `recommended-type-checked-legacy`. This rule is _disabled_ in the `off-legacy` config.

<!-- end auto-generated rule header -->

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
