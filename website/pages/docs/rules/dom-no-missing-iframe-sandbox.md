# no-missing-iframe-sandbox

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-missing-iframe-sandbox
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-missing-iframe-sandbox
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces explicit `sandbox` attribute for `iframe` elements.

The sandbox attribute enables an extra set of restrictions for the content in the iframe. Using sandbox attribute is considered a good security practice.

## Examples

This rule checks all React iframe elements and verifies that there is sandbox attribute and that it's value is valid.

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <iframe src="https://eslint-react.xyz" />;
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //     - Missing 'sandbox' attribute on iframe component.
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

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-missing-iframe-sandbox.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-missing-iframe-sandbox.spec.ts)

## Further Reading

- [MDN: iframe - sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)
