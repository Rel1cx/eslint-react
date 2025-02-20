---
title: no-missing-context-display-name
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-missing-context-display-name
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-missing-context-display-name
```

**Features**

`🔍`

## What it does

Enforces that all contexts have a `displayName` which React can use as its `displayName` in devtools.

## Examples

### Failing

```tsx
import React from "react";

const MyContext = React.createContext();
```

### Passing

```tsx
import React from "react";

const MyContext = React.createContext();
MyContext.displayName = "MyContext";
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-missing-context-display-name.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-missing-context-display-name.spec.ts)

---

## See Also

- [`no-missing-component-display-name`](./no-missing-component-display-name)\
  Enforces that all components have a `displayName` which React can use as its `displayName` in devtools.
