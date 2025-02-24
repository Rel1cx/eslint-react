---
title: no-dangerously-set-innerhtml
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-dangerously-set-innerhtml
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-dangerously-set-innerhtml
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Warns when using `dangerouslySetInnerHTML`.

This should be used with extreme caution! If the HTML inside isn’t trusted (for example, if it’s based on user data), you risk introducing an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability.

Read more about using [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: "Hello, World!" }} />;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-dangerously-set-innerhtml.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-dangerously-set-innerhtml.spec.ts)

---

## See Also

- [`no-dangerously-set-innerhtml-with-children`](./dom-no-dangerously-set-innerhtml-with-children)\
  Disallows DOM elements using `children` and `dangerouslySetInnerHTML` at the same time.
- [`no-void-elements-with-children`](./dom-no-void-elements-with-children)\
  Prevents the use of `children` in void DOM elements.
