# no-unstable-default-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unstable-default-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unstable-default-props
```

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

interface ExampleProps {
  items: string[];
}

function Example({ items = [] }: ExampleProps) {
  //                       ^^
  //                       - A/an 'Array literal' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'Array literal'.
  return null;
}
```

```tsx
import React from "react";

interface ExampleProps {
  items: Record<string, string>;
}

function Example({ items = {} }: ExampleProps) {
  //                       ^^
  //                       - A/an 'Object literal' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'Object literal'.
  return null;
}
```

```tsx
import React from "react";

interface ExampleProps {
  onClick: () => void;
}

function Example({ onClick = () => {} }: ExampleProps) {
  //                         ^^^^^^^^
  //                         - A/an 'arrow function expression' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of 'arrow function expression'.
  return null;
}
```

```tsx
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example(props: ExampleProps) {
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

interface ExampleProps {
  items: string[];
}

function Example({ items = emptyArray }: ExampleProps) {
  return null;
}
```

```tsx
import React from "react";

const emptyObject = {};

interface ExampleProps {
  items: Record<string, string>;
}

function Example({ items = emptyObject }: ExampleProps) {
  return null;
}
```

```tsx
import React from "react";

const noop = () => {};

interface ExampleProps {
  onClick: () => void;
}

function Example({ onClick = noop }: ExampleProps) {
  return null;
}
```

```tsx
import React from "react";

const emptyArray: string[] = [];

interface ExampleProps {
  items: string[];
}

function Example(props: ExampleProps) {
  const { items = emptyArray } = props;

  return null;
}
```

```tsx
import React from "react";

interface ExampleProps {
  num: number;
  str: string;
  bool: boolean;
}

// @log: Primitives are all compared by value, so are safe to be inlined
function Example({ num = 3, str = "foo", bool = true }: ExampleProps) {
  return null;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unstable-default-props.spec.ts)
