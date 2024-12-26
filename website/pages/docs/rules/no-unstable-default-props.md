# no-unstable-default-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unstable-default-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unstable-default-props
```

**Labels**

`Performance` `Re-render` `Component Props` `Destructuring` `Default Props`

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents usage of referential-type values as default props in object destructuring.

When using object destructuring syntax you can set the default value for a given property if it does not exist. If you set the default value to one of the values that is compared by identity, then each time the destructuring is evaluated, the JS engine will create a new, distinct value in the destructured variable.

This harms performance as it means that React will have to re-evaluate hooks and re-render memoized components more often than necessary.

To fix the violations, the easiest way is to use a referencing variable in module scope instead of using the literal values.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent({ items = [] }: MyComponentProps) {
  //                           ^^
  //                           - A/an 'Array literal' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'Array literal'.
  return null;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  items: Record<string, string>;
}

function MyComponent({ items = {} }: MyComponentProps) {
  //                           ^^
  //                           - A/an 'Object literal' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'Object literal'.
  return null;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  onClick: () => void;
}

function MyComponent({ onClick = () => {} }: MyComponentProps) {
  //                             ^^^^^^^^
  //                             - A/an 'arrow function expression' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'arrow function expression'.
  return null;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  items: string[];
}

function MyComponent(props: MyComponentProps) {
  const { items = [] } = props;
  //              ^^
  //              - A/an 'Array literal' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'Array literal'.
  return null;
}
```

### Passing

```tsx
import React from "react";

const emptyArray: string[] = [];

interface MyComponentProps {
  items: string[];
}

function MyComponent({ items = emptyArray }: MyComponentProps) {
  return null;
}
```

```tsx
import React from "react";

const emptyObject = {};

interface MyComponentProps {
  items: Record<string, string>;
}

function MyComponent({ items = emptyObject }: MyComponentProps) {
  return null;
}
```

```tsx
import React from "react";

const noop = () => {};

interface MyComponentProps {
  onClick: () => void;
}

function MyComponent({ onClick = noop }: MyComponentProps) {
  return null;
}
```

```tsx
import React from "react";

const emptyArray: string[] = [];

interface MyComponentProps {
  items: string[];
}

function MyComponent(props: MyComponentProps) {
  const { items = emptyArray } = props;

  return null;
}
```

```tsx
import React from "react";

interface MyComponentProps {
  num: number;
  str: string;
  bool: boolean;
}

function MyComponent({ num = 3, str = "foo", bool = true }: MyComponentProps) {
  //                 -------------------------------------
  //                 - Primitives are all compared by value, so are safe to be inlined as default props.
  return null;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props.spec.ts)
