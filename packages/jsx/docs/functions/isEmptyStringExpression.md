[@eslint-react/jsx](../README.md) / isEmptyStringExpression

# Function: isEmptyStringExpression()

```ts
function isEmptyStringExpression(node: JSXChild): boolean;
```

Check whether a JSX child node is an **empty string expression** (`{""}`).

React's reconciler and SSR renderer explicitly skip empty strings,
producing no DOM node (see `ReactChildFiber.js` and `ReactFizzConfigDOM.js`).
Such expressions are therefore treated as non-rendered children, in the same
way as whitespace padding.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXChild` | A JSX child node. |

## Returns

`boolean`

`true` when the node is a `{""}` expression container.

## Example

```ts
import { isEmptyStringExpression } from "@eslint-react/jsx";

// <div>{""}</div> -> the expression container is an empty string expression
const meaningful = element.children.filter(
  (child) => !isEmptyStringExpression(child),
);
```
