[@eslint-react/jsx](../README.md) / isHostElement

# Function: isHostElement()

```ts
function isHostElement(node: Node): node is JSXElement;
```

Check whether a node is a **host** (intrinsic / DOM) element.

A host element is a `JSXElement` whose tag name is a plain `JSXIdentifier`
starting with a lowercase letter – the same heuristic React uses to
distinguish `<div>` from `<MyComponent>`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to test. |

## Returns

`node is JSXElement`

`true` when the node is a `JSXElement` with a lowercase tag name.

## Example

```ts
// <div className="box" />  -> true
// <span />                 -> true
// <MyComponent />          -> false
// <Foo.Bar />              -> false
isHostElement(node);
```
