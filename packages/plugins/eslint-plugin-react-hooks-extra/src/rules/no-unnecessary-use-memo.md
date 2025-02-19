---
title: no-unnecessary-use-memo
---

**Full Name in `eslint-plugin-react-hooks-extra`**

```plain copy
react-hooks-extra/no-unnecessary-use-memo
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/hooks-extra/no-unnecessary-use-memo
```

**Features**

`🔍`

## What it does

Disallows unnecessary usage of `useMemo`.

React Hooks `useMemo` has empty dependencies array like what's in the examples, are unnecessary. The hook can be removed and it's value can be calculated in the component body or hoisted to the outer scope of the component.

## Examples

### Failing

```tsx
import React, { useMemo } from "react";
import { Button, MantineTheme } from "@mantine/core";

function MyComponent() {
  const style = useMemo(
    (theme: MantineTheme) => ({
      input: {
        fontFamily: theme.fontFamilyMonospace,
      },
    }),
    [],
  );
  return <Button sx={style} />;
}
```

### Passing

```tsx
import React from "react";
import { Button, MantineTheme } from "@mantine/core";

const style = (theme: MantineTheme) => ({
  input: {
    fontFamily: theme.fontFamilyMonospace,
  },
});

function MyComponent() {
  return <Button sx={style} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-memo.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-memo.spec.ts)

---

## See Also

- [`no-unnecessary-use-callback`](./hooks-extra-no-unnecessary-use-callback)\
  Disallows unnecessary usage of `useCallback`.
