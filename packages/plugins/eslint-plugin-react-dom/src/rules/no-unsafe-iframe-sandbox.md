---
title: no-unsafe-iframe-sandbox
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-unsafe-iframe-sandbox
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-unsafe-iframe-sandbox
```

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.

This rule reports cases where attribute contains `allow-scripts` and `allow-same-origin` at the same time as this combination allows the embedded document to remove the sandbox attribute and bypass the restrictions.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return (
    <iframe
      src="https://eslint-react.xyz"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <iframe src="https://eslint-react.xyz" sandbox="allow-popups" />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-unsafe-iframe-sandbox.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-unsafe-iframe-sandbox.spec.ts)

## Further Reading

- [MDN: `iframe` `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)

---

## See Also

- [`no-missing-iframe-sandbox`](./dom-no-missing-iframe-sandbox)\
  Enforces explicit `sandbox` attribute for `iframe` elements.
- [`no-unsafe-target-blank`](./dom-no-unsafe-target-blank)\
  Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.
