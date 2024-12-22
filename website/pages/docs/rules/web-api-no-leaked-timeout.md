# no-leaked-timeout

**Full Name in `eslint-plugin-react-web-api`**

```plain copy
react-web-api/no-leaked-timeout
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/web-api/no-leaked-timeout
```

**Features**

`🔍`

**Presets**

- `web-api`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces that every `setTimeout` in a component or custom hook has a corresponding `clearTimeout`.

Scheduling a timeout within the setup function of `useEffect` without canceling it in the cleanup function can lead to unwanted `setTimeout` callback executions and may also result in using stale values captured by previous render's effects after each subsequent re-render.

## Examples

### Failing

```tsx
import React, { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => console.log(count), 1000);
    //                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                - A 'setTimeout' created in 'useEffect' must be cleared in the cleanup function.
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
    const timeoutId = setTimeout(() => console.log(count), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-timeout.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-timeout.spec.ts)

## Further Reading

- [MDN: setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN: clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [React: synchronizing with effects](https://react.dev/learn/synchronizing-with-effects#putting-it-all-together)
