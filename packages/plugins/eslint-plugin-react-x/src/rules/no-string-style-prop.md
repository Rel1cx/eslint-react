---
title: no-string-style-prop
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-string-style-prop
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-string-style-prop
```

**Presets**

- `x`
- `recommended`

## Description

Disallow the use of string style prop in JSX. Use an object instead.

## Examples

### Before

```tsx
import React from "react";

function MyComponent() {
  return <div style="color: red;" />;
}
```

### After

```tsx
import React from "react";

function MyComponent() {
  return <div style={{ color: "red" }} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-string-style-prop.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-string-style-prop.spec.ts)
