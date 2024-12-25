# no-script-url

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-script-url
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-script-url
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents usage of `javascript:` URLs as the value of certain attributes.

`javascript:` URLs are a form of [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) attack. They allow an attacker to execute arbitrary JavaScript in the context of your website, which can be used to steal user data, deface your website, or perform other malicious actions.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <a href="javascript:alert('Hello, world!')">Click me</a>;
  //        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //        - Using a `javascript:` URL is a security risk and should be avoided.
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <a href="/some-page">Click me</a>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-script-url.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-script-url.spec.ts)
