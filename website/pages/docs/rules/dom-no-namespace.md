# no-namespace

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-namespace
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-namespace
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces the absence of a `namespace` in React elements.

Namespaces, such as with `svg:circle` are not supported in React.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return (
    <svg:circle
      cx="50"
      cy="50"
      r="40"
      stroke="black"
      stroke-width="3"
      fill="red"
    />
  );
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-namespace.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-namespace.spec.ts)
