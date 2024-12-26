# no-render-return-value

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-render-return-value
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-render-return-value
```

**Labels**

`DOM` `Legacy React APIs`

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents usage of the return value of `ReactDOM.render`.

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

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-render-return-value.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/dom-no-render-return-value.spec.ts)

## Further Reading

- [Legacy React: react-dom/render](https://legacy.reactjs.org/docs/react-dom.html#render)
