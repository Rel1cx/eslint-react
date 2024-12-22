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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-namespace.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-namespace.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/dom-no-namespace.md)

## What it does

Enforces the absence of a `namespace` in React elements.

## Why is this bad?

Namespaces, such as with `svg:circle` are not supported in React.

## Examples

### Failing

```tsx
import React from "react";

function Example() {
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

function Example() {
  return <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />;
}
```
