[@eslint-react/jsx](../README.md) / hasAttribute

# Function: hasAttribute()

```ts
function hasAttribute(
   context: RuleContext, 
   element: JSXElement, 
   name: string): boolean;
```

Check whether a JSX element carries a given attribute (prop).

This is a thin convenience wrapper around [findAttribute](findAttribute.md) for the
common case where you only need a boolean answer.

Spread attributes are taken into account: `<Comp {...{ disabled: true }} />`
will report `true` for `"disabled"`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement` | The `JSXElement` node to inspect. |
| `name` | `string` | The attribute name to look for (e.g. `"className"`). |

## Returns

`boolean`

`true` when the attribute is present on the element.

## Example

```ts
import { hasAttribute } from "@eslint-react/jsx";

if (hasAttribute(context, node, "key")) {
  // element has a `key` prop
}
```
