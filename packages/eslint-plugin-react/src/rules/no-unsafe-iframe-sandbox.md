# react/no-unsafe-iframe-sandbox

Enforce `sandbox` attribute for iframe elements is not set to unsafe combinations.

## Rule Details

This rule reports cases where attribute contains allow-scripts and allow-same-origin at the same time as this combination allows the embedded document to remove the sandbox attribute and bypass the restrictions.

### ❌ Incorrect

```tsx
import React from "react";

const Component = () => {
  return <iframe src="https://example.com" sandbox="allow-scripts allow-same-origin" />;
};
```

```tsx
import React from "react";

const Component = () => {
  return React.createElement("iframe", {
    src: "https://example.com",
    sandbox: "allow-scripts allow-same-origin",
  });
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

## When not to use

If you don't want to enforce sandbox attribute on iframe elements.
