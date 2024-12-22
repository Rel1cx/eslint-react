# no-children-prop

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-children-prop
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-children-prop
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Disallows passing 'children' as a prop.

Most of the time, `children` should be actual `children`, not passed in as a `prop`.

When using JSX, the `children` should be nested between the opening and closing tags. When not using JSX, the `children` should be passed as additional arguments to `React.createElement`.

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  return <div children={children} />;
  //          ^^^^^^^^^^^^^^^^^^^
  //          - Children should always be actual children, not passed in as a prop.
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-prop.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-children-prop.spec.ts)
