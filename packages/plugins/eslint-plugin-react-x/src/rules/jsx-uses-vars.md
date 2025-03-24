---
title: jsx-uses-vars
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/jsx-uses-vars
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/jsx-uses-vars
```

**Presets**

- `core`
- `recommended`

## Description

Marks variables used in JSX as used.

Since 0.17.0 the eslint `no-unused-vars` rule does not detect variables used in JSX (see details). This rule will find variables used in JSX and mark them as used.
This rule only has an effect when the `no-unused-vars` rule is enabled.

## Examples

### Failing

```tsx
const Hello = require("./Hello");
```

### Passing

```tsx
const Hello = require("./Hello");

<Hello name="John" />;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-uses-vars.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-uses-vars.spec.ts)
