# no-leaked-resize-observer

**Full Name in `eslint-plugin-react-web-api`**

```plain copy
react-web-api/no-leaked-resize-observer
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/web-api/no-leaked-resize-observer
```

**Features**

`🔍`

**Presets**

- `web-api`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces that every `ResizeObserver` created in a component or custom Hook has a corresponding `ResizeObserver.disconnect()`.

Creating a `ResizeObserver` without disconnecting it can lead to memory leaks and unexpected behavior.

## Examples

### Failing

```tsx
import React, { useEffect, useRef } from "react";

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(() => console.log("resize"));
    //         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //         - A 'ResizeObserver' in 'useEffect' should have a corresponding 'resizeObserver.disconnect()' in its cleanup function.
    ro.observe(ref.current);
  }, []);

  return <div ref={ref} />;
}
```

### Passing

```tsx
import React, { useEffect, useRef } from "react";

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(() => console.log("resize"));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return <div ref={ref} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-resize-observer.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api/src/rules/no-leaked-resize-observer.spec.ts)

## Further Reading

- [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [React: Connecting to an external system](https://react.dev/reference/react/useEffect#connecting-to-an-external-system)
