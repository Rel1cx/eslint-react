# no-unsafe-iframe-sandbox

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-unsafe-iframe-sandbox
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-unsafe-iframe-sandbox
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-unsafe-iframe-sandbox.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-unsafe-iframe-sandbox.spec.ts)

## What it does

Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.

If `sandbox` attribute is not set, the iframe content can have abilities that are not intended to be allowed.

## Examples

This rule reports cases where attribute contains `allow-scripts` and `allow-same-origin` at the same time as this combination allows the embedded document to remove the sandbox attribute and bypass the restrictions.

### Failing

```tsx
import React from "react";

function Example() {
  return (
    <iframe
      src="https://example.com"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

### Passing

```tsx
import React from "react";

function Example() {
  return <iframe src="https://example.com" sandbox="allow-popups" />;
}
```

## Further Reading

- [MDN: iframe - sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)
