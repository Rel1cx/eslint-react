---
title: no-render-return-value
---

**Full Name in `eslint-plugin-react-dom`**

```sh copy
react-dom/no-render-return-value
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/dom/no-render-return-value
```

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow the return value of `ReactDOM.render`.

`ReactDOM.render()` currently returns a reference to the root ReactComponent instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root ReactComponent instance, the preferred solution is to attach a [callback ref](https://react.dev/learn/manipulating-the-dom-with-refs) to the root element.

## Examples

### Failing

```tsx
import React from "react";
import ReactDOM from "react-dom";

const instance = ReactDOM.render(<div id="app" />, document.body);
//    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//    - Do not depend on the return value from '{{objectName}}.render'.
```

### Passing

```tsx
import React from "react";
import ReactDOM from "react-dom";

function doSomethingWithInst(inst: HTMLDivElement | null) {
  // ...
}

ReactDOM.render(<div id="app" ref={doSomethingWithInst} />, document.body);
```

## Implementation

- [Rule Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render-return-value.ts)
- [Test Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-render-return-value.spec.ts)

## Further Reading

- [React Docs: DOM `render`](https://18.react.dev/reference/react-dom/render)

---

## See Also

- [no-render](./dom-no-render)\
  Replaces usages of `ReactDom.render()` with `createRoot(node).render()`.
