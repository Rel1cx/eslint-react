---
title: no-string-style-prop
---

**Full Name in `eslint-plugin-react-dom`**

```sh copy
react-dom/no-string-style-prop
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/dom/no-string-style-prop
```

**Presets**

- `dom`
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

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-string-style-prop.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-string-style-prop.spec.ts)
