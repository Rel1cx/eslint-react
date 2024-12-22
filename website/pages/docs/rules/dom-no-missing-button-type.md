# no-missing-button-type

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-missing-button-type
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-missing-button-type
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces explicit `type` attribute for `button` elements.

The default `type` of a button is `submit`, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

Allowed button types are: `submit`, `button` or `reset`.

## Examples

### Failing

```tsx
import React from "react";

function Example() {
  return <button>Click me</button>;
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^
  //     - Missing 'type' attribute on button component.
}
```

### Passing

```tsx
import React from "react";

function Example() {
  return <button type="button">Click me</button>;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-missing-button-type.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-missing-button-type.spec.ts)

## Further Reading

- [MDN: button - notes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#notes)
