# no-unsafe-target-blank

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-unsafe-target-blank
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-unsafe-target-blank
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return (
    <a href="https://example.com" target="_blank">
      Example
    </a>
  );
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return (
    <a href="https://example.com" target="_blank" rel="noreferrer noopener">
      Example
    </a>
  );
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-unsafe-target-blank.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-unsafe-target-blank.spec.ts)
