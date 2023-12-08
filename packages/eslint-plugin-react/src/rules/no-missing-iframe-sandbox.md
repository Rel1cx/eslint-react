# react/no-missing-iframe-sandbox

<!-- end auto-generated rule header -->

## Rule category

Security.

## What it does

Enforces explicit `sandbox` attribute for `iframe` elements.

## Why is this bad?

The sandbox attribute enables an extra set of restrictions for the content in the iframe. Using sandbox attribute is considered a good security practice.

## Examples

This rule checks all React iframe elements and verifies that there is sandbox attribute and that it's value is valid.

### ❌ Incorrect

```tsx
import React from "react";

const Component = () => {
  return <iframe src="https://example.com" />;
};
```

```tsx
import React from "react";

const Component = () => {
  return React.createElement("iframe", { src: "https://example.com" });
};
```

### ✅ Correct

```tsx
import React from "react";

const Component = () => {
  return <iframe src="https://example.com" sandbox="allow-popups" />;
};
```

```tsx
import React from "react";

const Component = () => {
  return React.createElement("iframe", {
    src: "https://example.com",
    sandbox: "allow-popups",
  });
};
```

## Further Reading

-[MDN: iframe - sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)
