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
import Component from "Component";

createRoot(document.getElementById("app")).render(<Component />);
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.spec.ts)

## Further Reading

- [React: react-dom/render](https://18.react.dev/reference/react-dom/render)
- [React: react-dom/createRoot](https://react.dev/reference/react-dom/client/createRoot)

---

## See Also

- [no-render-return-value](./no-render-return-value.md)\
  Prevents usage of the return value of `ReactDOM.render`.
