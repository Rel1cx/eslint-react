---
title: no-flush-sync
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-flush-sync
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-flush-sync
```

**Features**

`🔍`

## What it does

This rule reports usages of `flushSync`.

`flushSync` can significantly hurt performance, and may unexpectedly force pending Suspense boundaries to show their fallback state.

Most of the time, `flushSync` can be avoided, so use `flushSync` as a last resort.

## Examples

### Failing

```tsx
import { flushSync } from "react-dom";

flushSync(() => {
  setSomething(123);
});
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-flush-sync.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-flush-sync.spec.ts)

## Further Reading

- [React DOM: APIs flushSync](https://react.dev/reference/react-dom/flushSync)
