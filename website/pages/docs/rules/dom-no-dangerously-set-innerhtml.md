# no-dangerously-set-innerhtml

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-dangerously-set-innerhtml
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-dangerously-set-innerhtml
```

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-dangerously-set-innerhtml.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-dangerously-set-innerhtml.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/dom-no-dangerously-set-innerhtml.md)

## What it does

Warns when using `dangerouslySetInnerHTML`.

This should be used with extreme caution! If the HTML inside isn’t trusted (for example, if it’s based on user data), you risk introducing an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability.

Read more about using [dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

## Examples

### Failing

```tsx
import React from "react";

function Example() {
  return <div dangerouslySetInnerHTML={{ __html: "Hello, World!" }} />;
}
```
