# react-ts/debug/function-component

Warns when a function component is found. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Rule Details

Examples of **non-component**:

```tsx
function foo() {
    return "bar";
}
```

```tsx
// render functions are not components
function renderItem(name: string) {
    return <div>{name}</div>;
}
```

Examples of **component**:

```tsx
function Component() {
    return <div />;
}
```

```tsx
function Component() {
    return React.createElement("div");
}
```

```tsx
const Component = () => <div />;
```

```tsx
const Component = () => React.createElement("div");
```

```tsx
import React from "react";

const Component = React.memo(() => <div />);
```

```tsx
import React from "react";

const Component = React.forwardRef(() => <div />);
```

## Rule Options

This rule has no options.
