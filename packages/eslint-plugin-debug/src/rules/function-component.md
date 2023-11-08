# debug/function-component

<!-- end auto-generated rule header -->

## Rule category

Verbose.

## What it does

Reports all function components. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Why is this good?

This rule is useful for debugging.

## Examples

### ❌ Incorrect

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
