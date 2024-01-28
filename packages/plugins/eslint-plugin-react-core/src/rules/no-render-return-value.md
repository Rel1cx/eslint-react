# no-render-return-value

## Rule category

Restriction.

## What it does

Prevents usage of the return value of `ReactDOM.render`.

## Why is this bad?

`ReactDOM.render()` currently returns a reference to the root ReactComponent instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root ReactComponent instance, the preferred solution is to attach a [callback ref](https://react.dev/learn/manipulating-the-dom-with-refs) to the root element.

## Examples

### Failing

```tsx
const inst = ReactDOM.render(<App />, document.body);
doSomethingWithInst(inst);
```

### Passing

```tsx
ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);

ReactDOM.render(<App />, document.body, doSomethingWithInst);
```

## Further Reading

- [legacy.reactjs.org: react-dom/render](https://legacy.reactjs.org/docs/react-dom.html#render)
