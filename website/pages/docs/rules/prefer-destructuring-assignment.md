# prefer-destructuring-assignment

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-destructuring-assignment
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-destructuring-assignment
```

**Labels**

`Stylstic Issues` `Destructuring` `Assignment` `Component Props`

**Features**

`🔍`

## What it does

Enforces the use of destructuring assignment over property assignment.

## Examples

This rule aims to enforce the use of destructuring assignment over property assignment.

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent(props: MyComponentProps) {
  const items = props.items;
  //            ^^^^^^^^^^^
  //            - Use destructuring assignment for props.

  return <div>{items}</div>;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent(props: MyComponentProps) {
  return <div>{props.items}</div>;
  //           ^^^^^^^^^^^
  //           - Use destructuring assignment for props.
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent(props: MyComponentProps) {
  const { items } = props;

  return <div>{items}</div>;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent({ items }: MyComponentProps) {
  return <div>{items}</div>;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent({ items, ...rest }: MyComponentProps) {
  return <div {...rest}>{items}</div>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-destructuring-assignment.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-destructuring-assignment.spec.ts)

## Further Reading

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [React: passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component#step-2-read-props-inside-the-child-component)
