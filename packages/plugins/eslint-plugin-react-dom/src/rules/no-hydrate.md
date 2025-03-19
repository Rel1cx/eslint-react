---
title: no-hydrate
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-hydrate
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-hydrate
```

**Features**

`🔍` `🔄`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `ReactDom.hydrate()` with `hydrateRoot()`.

An **unsafe** codemod is available for this rule.

## Examples

### Failing

```tsx
import ReactDom from "react-dom";
import Component from "Component";

ReactDom.hydrate(<Component />, document.getElementById("app"));
```

### Passing

```tsx
import { hydrateRoot } from "react-dom/client";
import ReactDom from "react-dom";
import Component from "Component";

hydrateRoot(document.getElementById("app"), <Component />);
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-hydrate.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-hydrate.spec.ts)

## Further Reading

- [React: react-dom/hydrate](https://18.react.dev/reference/react-dom/hydrate)
- [React: react-dom/createRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

---

## See Also

- [no-return](./dom-no-hydrate)\
  Replaces usages of `ReactDom.hydrate()` with `createRoot(node).hydrate()`.
