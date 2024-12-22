# no-missing-component-display-name

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-missing-component-display-name
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-missing-component-display-name
```

**Features**

`🔍`

## What it does

Enforces that all components have a `displayName` or `name` which React can use as its `displayName` in devtools.

## Why is this bad?

When defining a React component, if you specify its component name in a way that React can't infer its `displayName`, it will show up as an `anonymous` component in devtools, which makes debugging more difficult.

## Examples

### Failing

```tsx
import React from "react";

const Button = React.memo(() => <div />);
//                        ^^^^^^^^^^^^^
//                        - Add missing 'displayName' for component.
```

```tsx
import React from "react";

const Button = React.forwardRef(() => <div />);
//                              ^^^^^^^^^^^^^
//                              - Add missing 'displayName' for component.
```

(Not supported yet)

```tsx
import React from "react";

export default () => <div />;
//             ^^^^^^^^^^^^^
//             - Add missing 'displayName' for component.
```

### Passing

```tsx
import React from "react";

const Button = React.memo(function Button() {
  return <div />;
});
```

```tsx
import React from "react";

const Button = React.memo(() => <div />);
Button.displayName = "Button";
```

```tsx
import React from "react";

const Button = React.forwardRef(function Button() {
  return <div />;
});
```

```tsx
import React from "react";

const Button = React.forwardRef(() => <div />);
Button.displayName = "Button";
```

```tsx
import React from "react";

export default function Button() {
  return <div />;
}
```
