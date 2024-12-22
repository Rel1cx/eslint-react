# no-dangerously-set-innerhtml-with-children

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-dangerously-set-innerhtml-with-children
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-dangerously-set-innerhtml-with-children
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-dangerously-set-innerhtml-with-children.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-dangerously-set-innerhtml-with-children.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/dom-no-dangerously-set-innerhtml-with-children.md)

## What it does

Disallows `DOM element` using `children` and `dangerouslySetInnerHTML` at the same time.

When using `dangerouslySetInnerHTML`, the content of the DOM element is set from the `__html` property. The content of the DOM element is completely replaced, so the children will not be rendered as expected.

## Examples

### Failing

```tsx
import React from "react";

function Example() {
  return (
    <div dangerouslySetInnerHTML={{ __html: "Hello World" }}>
      <p>Goodbye World</p>
    </div>
  );
}
```

### Passing

```tsx
import React from "react";

function Example() {
  return <div dangerouslySetInnerHTML={{ __html: "Hello World" }} />;
}
```
