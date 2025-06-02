---
title: no-direct-set-state-in-use-effect
---

**Full Name in `eslint-plugin-react-hooks-extra`**

```sh copy
react-hooks-extra/no-direct-set-state-in-use-effect
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/hooks-extra/no-direct-set-state-in-use-effect
```

**Features**

`🧪`

**Presets**

- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow **direct** calls to the [`set` function](https://react.dev/reference/react/useState#setstate) of `useState` in `useEffect`.

Directly setting state in `useEffect` can lead to:

- **Redundant state**: You might be duplicating derived values that could be computed during render.
- **Unnecessary effects**: Triggering re-renders that could be avoided.
- **Confusing logic**: It can make component behavior harder to reason about.

### What counts as a violation?

This is **not allowed**:

```tsx
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);
```

Instead, compute the value during render:

```tsx
const fullName = firstName + " " + lastName;
```

### What is allowed?

The rule **does not flag** indirect calls, such as:

- Inside event handlers.
- Inside `async` functions.
- Inside `setTimeout`, `setInterval`, `Promise.then`, etc.

### Known limitations

- It doesn’t check `set` calls in `useEffect` cleanup functions.

  ```tsx {2}
  useEffect(() => {
    return () => {
      setFullName(firstName + " " + lastName); // ❌ Direct call
    };
  }, [firstName, lastName]);
  ```

- It doesn’t detect `set` calls in `async` functions are being called before or after the `await` statement.

  ```tsx {2}
  useEffect(() => {
    const fetchData = async () => {
      setFullName(data.name); // ❌ Direct call
    };
    fetchData();
  }, []);
  ```

## Examples

The first three cases are common valid use cases because they are not called the `set` function directly in `useEffect`:

### Passing

```tsx
import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = () => setCount((c) => c + 1);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return <h1>{count}</h1>;
}
```

### Passing

```tsx
import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}
```

### Passing

```tsx
import { useState, useEffect } from "react";

export default function RemoteContent() {
  const [content, setContent] = useState("");

  useEffect(() => {
    let discarded = false;
    fetch("https://eslint-react.xyz/content")
      .then((resp) => resp.text())
      .then((text) => {
        if (discarded) return;
        setContent(text);
      });
    return () => {
      discarded = true;
    };
  }, []);

  return <h1>{count}</h1>;
}
```

The following examples are derived from the [React documentation](https://react.dev/learn/you-might-not-need-an-effect):

### Failing

```tsx
import { useEffect, useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);
  // ...
}
```

### Passing

```tsx
import { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");
  // ✅ Good: calculated during rendering
  const fullName = firstName + " " + lastName;
  // ...
}
```

### Failing

```tsx
import { useEffect, useState } from "react";

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

### Passing

```tsx
import { useMemo, useState } from "react";

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );
  // ...
}
```

### Failing

```tsx
import { useEffect, useState } from "react";

export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState("");

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment("");
  }, [userId]);
  // ...
}
```

### Passing

```tsx
import { useState } from "react";

export default function ProfilePage({ userId }) {
  return <Profile userId={userId} key={userId} />;
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState("");
  // ...
}
```

### Failing

```tsx
import { useEffect, useState } from "react";

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```

### Passing

```tsx
import { useState } from "react";

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

```tsx
import { useState } from "react";

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find((item) => item.id === selectedId) ?? null;
  // ...
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-direct-set-state-in-use-effect.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-direct-set-state-in-use-effect.spec.ts)

## Further Reading

- [React Docs: `useState` Hook](https://react.dev/reference/react/useState)
- [React Docs: `useEffect` Hook](https://react.dev/reference/react/useEffect)
- [React Docs: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

## See Also

- [`no-direct-set-state-in-use-layout-effect`](./hooks-extra-no-direct-set-state-in-use-layout-effect)\
  Disallow **direct** calls to the [`set` function](https://react.dev/reference/react/useState#setstate) of `useState` in `useLayoutEffect`.
