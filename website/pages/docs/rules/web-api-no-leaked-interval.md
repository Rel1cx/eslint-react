# no-leaked-interval

**Full Name in `eslint-plugin-react-web-api`**

```plain copy
react-web-api/no-leaked-interval
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/web-api/no-leaked-interval
```

**Features**

`🔍`

**Presets**

- `web-api`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-interval.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/web-api-no-leaked-interval.md)

## What it does

Enforces that every `setInterval` in a component or custom hook has a corresponding `clearInterval`.

Scheduling a interval within the setup function of `useEffect` without canceling it in the cleanup function can lead to unwanted `setInterval` callback executions and may also result in using stale values captured by previous render's effects after each subsequent re-render.

## Examples

### Failing

```tsx
import React, { useEffect, useState } from "react";

function Example() {
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

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => console.log(count), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return null;
}
```

## Further Reading

- [MDN: setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [MDN: clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [React: synchronizing with effects](https://react.dev/learn/synchronizing-with-effects#putting-it-all-together)
