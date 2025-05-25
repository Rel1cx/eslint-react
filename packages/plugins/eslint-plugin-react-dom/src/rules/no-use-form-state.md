---
title: no-use-form-state
---

**Full Name in `eslint-plugin-react-dom`**

```sh copy
react-dom/no-use-form-state
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/dom/no-use-form-state
```

**Features**

`🔄`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `useFormState` with `useActionState`.

## Examples

### Failing

```tsx
import { useFormState } from "react-dom";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useFormState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  );
}
```

### Passing

```tsx
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-use-form-state.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-use-form-state.spec.ts)

## Further Reading

- [React Docs: `useActionState` Hook](https://react.dev/reference/react/useActionState)
