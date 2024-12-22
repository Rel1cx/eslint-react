# no-find-dom-node

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-find-dom-node
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-find-dom-node
```

**Features**

`🔍`

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-find-dom-node.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-find-dom-node.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/dom-no-find-dom-node.md)

## What it does

This rule disallows the use of `findDOMNode`.

This API will be removed in a future major version of React. [See the alternatives](https://react.dev/reference/react-dom/findDOMNode#alternatives).

## Examples

### Failing

```tsx
import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class AutoSelectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    //            ^^^^^^^^^^^^^^^^^
    //            - The 'findDOMNode' will be removed in a future version of React. Use the the alternatives instead.
    if (input instanceof HTMLInputElement) {
      input.select();
    }
  }
  render() {
    return <input defaultValue="Hello" />;
  }
}
```

### Passing

```tsx
import React, { Component } from "react";

class AutoSelectingInput extends Component {
  inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    const input = this.inputRef.current;
    input?.select();
  }

  render() {
    return <input ref={this.inputRef} defaultValue="Hello" />;
  }
}
```

## Further Reading

- [React: APIs findDOMNode](https://react.dev/reference/react-dom/findDOMNode)
