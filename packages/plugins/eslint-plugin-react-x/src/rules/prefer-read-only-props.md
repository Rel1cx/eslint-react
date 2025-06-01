---
title: prefer-read-only-props
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/prefer-read-only-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/prefer-read-only-props
```

**Features**

`💭`

## Description

Enforces read-only props in components.

Props are read-only snapshots in time: every render receives a new version of props. You can't change props. This rule enforces that you don't accidentally mutate props.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent(props: { name: string }) {
  //                 ^^^^^^^^^^^^^^^^^^^^^^^
  //                 - A function component's props should be read-only.
  return <div>{props.name}</div>;
}
```

```tsx
import React from "react";

interface Props {
  name: string;
}

function MyComponent(props: Props) {
  //                 ^^^^^^^^^^^^
  //                 - A function component's props should be read-only.
  return <div>{props.name}</div>;
}
```

### Passing

```tsx
import React from "react";

function MyComponent(props: { readonly name: string }) {
  return <div>{props.name}</div>;
}
```

```tsx
import React from "react";

interface Props {
  readonly name: string;
}

function MyComponent(props: Props) {
  return <div>{props.name}</div>;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-read-only-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-read-only-props.spec.ts)

## Further Reading

- [React Docs: Passing props to a component](https://react.dev/learn/passing-props-to-a-component#recap)
