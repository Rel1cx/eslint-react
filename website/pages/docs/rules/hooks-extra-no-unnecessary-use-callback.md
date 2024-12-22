# no-unnecessary-use-callback

**Full Name in `eslint-plugin-react-hooks-extra`**

```plain copy
react-hooks-extra/no-unnecessary-use-callback
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/hooks-extra/no-unnecessary-use-callback
```

**Features**

`🔍`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-callback.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-callback.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/hooks-extra-no-unnecessary-use-callback.md)

## What it does

Disallows unnecessary usage of `useCallback`.

## Why is this bad?

React Hooks `useCallback` has empty dependencies array like what's in the examples, are unnecessary. The hook can be removed and it's value can be created in the component body or hoisted to the outer scope of the component.

## Examples

### Failing

```tsx
import React, { useCallback } from "react";

function Example() {
  // @warn: useCallback has empty dependencies array

  const onClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <button type="button" onClick={onClick} />;
}
```

### Passing

```tsx
import React from "react";

function onClick() {
  console.log("clicked");
}

function Example() {
  return <button type="button" onClick={onClick} />;
}
```
