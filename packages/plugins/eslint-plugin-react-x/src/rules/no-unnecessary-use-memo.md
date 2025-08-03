---
title: no-unnecessary-use-memo
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-unnecessary-use-memo
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-unnecessary-use-memo
```

**Features**

`🧪`

## Description

Disallow unnecessary usage of `useMemo`.

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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unnecessary-use-memo.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unnecessary-use-memo.spec.ts)

---

## See Also

- [`no-unnecessary-use-callback`](./no-unnecessary-use-callback)\
  Disallows unnecessary usage of `useCallback`.
