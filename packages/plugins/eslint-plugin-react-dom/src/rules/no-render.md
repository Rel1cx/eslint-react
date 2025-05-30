---
title: no-render
---

**Full Name in `eslint-plugin-react-dom`**

```sh copy
react-dom/no-render
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/dom/no-render
```

**Features**

`🔄`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `ReactDom.render()` with `createRoot(node).render()`.

## Examples

### Before

```tsx
import ReactDom from "react-dom";
import Component from "Component";

ReactDom.render(<Component />, document.getElementById("app"));
```

### After

```tsx
import { createRoot } from "react-dom/client";
import Component from "Component";

createRoot(document.getElementById("app")).render(<Component />);
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render.spec.ts)

## Further Reading

- [React Docs: DOM `render`](https://18.react.dev/reference/react-dom/render)
- [React DOM `createRoot`](https://react.dev/reference/react-dom/client/createRoot)

---

## See Also

- [no-render-return-value](./dom-no-render-return-value)\
  Prevents usage of the return value of `ReactDOM.render`.
- [no-hydrate](./dom-no-hydrate)\
  Replaces usages of `ReactDom.hydrate()` with `createRoot(node).hydrate()`.
