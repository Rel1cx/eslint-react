---
title: no-use-in-try-catch
---

**Full Name in `eslint-plugin-react-hooks-extra`**

```plain copy
react-hooks-extra/no-use-in-try-catch
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/hooks-extra/no-use-in-try-catch
```

**Features**

`🔍`

**Presets**

- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

This rule disallows the use of `use` in a try-catch block.

`use` cannot be called in a try-catch block. Instead of a try-catch block [wrap your component in an Error Boundary](https://react.dev/reference/react/use#displaying-an-error-to-users-with-error-boundary), or [provide an alternative value to use with the Promise’s `.catch` method](https://react.dev/reference/react/use#providing-an-alternative-value-with-promise-catch).

## Examples

### Failing

```tsx
function Message({ messagePromise }) {
  try {
    const content = use(messagePromise);
    //              ^^^
    //              - 'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s .catch method.
    return <p>Here is the message: {content}</p>;
  } catch (error) {
    return <p>⚠️Something went wrong</p>;
  }
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-use-in-try-catch.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-use-in-try-catch.spec.ts)

## Further Reading

- [React: use](https://react.dev/reference/react/use)
- [React: use#dealing-with-rejected-promises](https://react.dev/reference/react/use#dealing-with-rejected-promises)
