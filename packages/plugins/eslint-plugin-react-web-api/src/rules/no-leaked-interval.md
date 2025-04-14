---
title: no-leaked-interval
---

**Full Name in `eslint-plugin-react-web-api`**

```plain copy
react-web-api/no-leaked-interval
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/web-api/no-leaked-interval
```

**Presets**

- `web-api`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Enforces that every `setInterval` in a component or custom Hook has a corresponding `clearInterval`.

Scheduling a interval within the setup function of `useEffect` without canceling it in the cleanup function can lead to unwanted `setInterval` callback executions and may also result in using stale values captured by previous render's effects after each subsequent re-render.

## Examples

### Failing

```tsx
import React, { useEffect, useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => console.log(count), 1000);
    //                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                 - A 'setInterval' created in 'useEffect' must be cleared in the cleanup function.
  }, []);

  return null;
}
```

### Passing

```tsx
import React, { useEffect, useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => console.log(count), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return null;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval.spec.ts)

## Further Reading

- [MDN: `setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [MDN: `clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [React Docs: Synchronizing with effects](https://react.dev/learn/synchronizing-with-effects#putting-it-all-together)

---

## See Also

- [no-leaked-timeout](./web-api-no-leaked-timeout)\
  Enforces that every `setTimeout` in a component or custom Hook has a corresponding `clearTimeout`.
