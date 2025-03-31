---
title: jsx-uses-react
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/jsx-uses-react
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/jsx-uses-react
```

**Presets**

- `core`
- `recommended`

## Description

Marks React variables as used when JSX is used in the file.

If you are using the `@jsx` pragma this rule will mark the designated variable and not the React one.

This rule does nothing when using the [New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) or if the `no-unused-vars` rule is not enabled.

## Examples

### Failing

```tsx
import React from "react";
// nothing to do with React
```

```tsx
/** @jsx Foo */
import React from "react";
// nothing to do with React

const Hello = <div>Hello</div>;
```

### Passing

```tsx
import React from "react";

const Hello = <div>Hello</div>;
```

```tsx
/** @jsx Foo */
import Foo from "foo";

const Hello = <div>Hello</div>;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-uses-react.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-uses-react.spec.ts)
