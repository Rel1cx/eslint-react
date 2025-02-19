---
title: no-unstable-context-value
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unstable-context-value
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unstable-context-value
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`.

React will re-render all consumers of a context whenever the context value changes, and if the value is not stable, this can lead to unnecessary re-renders.

## Examples

### Failing

```tsx
import React from "react";

const MyContext = React.createContext({});

function MyComponentProvider() {
  return (
    <MyContext.Provider value={{ foo: "bar" }}>
      {/*                      ^^^^^^^^^^^^^^ */}
      {/*                      - A/an 'Object literal' passed as the value prop to the context provider should not be constructed. It will change on every render. Consider wrapping it in a useMemo hook */}
      <ExampleConsumer />
    </MyContext.Provider>
  );
}
```

### Passing

```tsx
import React, { useMemo } from "react";

const MyContext = React.createContext({});

const value = { foo: "bar" };

function MyComponentProvider() {
  return (
    <MyContext.Provider value={value}>
      <ExampleConsumer />
    </MyContext.Provider>
  );
}
```

## Legitimate Uses

React Context, and all its child nodes and Consumers are rerendered whenever the value prop changes. Because each Javascript object carries its own identity, things like object expressions (`{foo: 'bar'}`) or function expressions get a new identity on every run through the component. This makes the context think it has gotten a new object and can cause needless rerenders and unintended consequences.

This can be a pretty large performance hit because not only will it cause the context providers and consumers to rerender with all the elements in its subtree, the processing for the tree scan react does to render the provider and find consumers is also wasted.

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value.spec.ts)

---

## See Also

- [`no-unstable-default-props`](./no-unstable-default-props)\
  Prevents usage of referential-type values as default props in object destructuring.
