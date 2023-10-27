# jsx/no-array-index-key

<!-- end auto-generated rule header -->

## Rule details

This rule aims to prevent array index as key props on elements in an array. It will warn when an element in an array is using an array index as a key prop.

You might be tempted to use an item’s index in the array as its key. In fact, that’s what React will use if you don’t specify a key at all. But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered. Index as a key often leads to subtle and confusing bugs.

Similarly, do not generate keys on the fly, e.g. with key={Math.random()}. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.

Note that your components won’t receive key as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: `<Profile key={id} userId={id} />`.

### ❌ Incorrect

```tsx
const TodoList = ({ todos }) => (
    <ul>
        {todos.map((todo, index) => <Todo {...todo} key={index} />)}
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
