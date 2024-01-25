# react-dom/no-find-dom-node

## Rule category

Restriction.

## What it does

This rule disallows the use of `findDOMNode`.

## Why is this bad?

This API will be removed in a future major version of React. [See the alternatives](https://react.dev/reference/react-dom/findDOMNode#alternatives).

## Examples

### Failing

```tsx
import { Component } from "react";
import { findDOMNode } from "react-dom";

class AutoSelectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    input.select();
  }
  render() {
    return <input defaultValue="Hello" />;
  }
}

export default AutoSelectingInput;
```

### Passing

```tsx
import { createRef, Component } from "react";

class AutoSelectingInput extends Component {
  inputRef = createRef(null);

  componentDidMount() {
    const input = this.inputRef.current;
    input.select();
  }

  render() {
    return <input ref={this.inputRef} defaultValue="Hello" />;
  }
}
```

## Further Reading

- [react.dev: APIs findDOMNode](https://react.dev/reference/react-dom/findDOMNode)
