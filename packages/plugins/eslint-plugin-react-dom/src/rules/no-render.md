---
title: no-render
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-render
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-render
```

**Features**

`🔍` `🔄`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Replaces usages of `ReactDom.render()` with `createRoot(node).render()`.

An **unsafe** codemod is available for this rule.

## Examples

### Failing

```tsx
import ReactDom from "react-dom";
import Component from "Component";

ReactDom.render(<Component />, document.getElementById("app"));
```

### Passing

```tsx
import { createRoot } from "react-dom/client";
import ReactDom from "react-dom";
import Component from "Component";

const root = createRoot(document.getElementById("app"));
root.render(<Component />);
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.spec.ts)

## Further Reading

---

## See Also
