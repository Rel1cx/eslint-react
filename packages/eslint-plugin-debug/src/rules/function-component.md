# debug/function-component

⚠️🚫 This rule _warns_ in the `debug-legacy` config. This rule is _disabled_ in the `off-legacy` config.

<!-- end auto-generated rule header -->

Warns when a function component is found. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Rule Details

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
