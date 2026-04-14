[@eslint-react/jsx](../README.md) / findAttribute

# Function: findAttribute()

```ts
function findAttribute(
   context: RuleContext, 
   element: JSXElement, 
   name: string): TSESTreeJSXAttributeLike | undefined;
```

Find a JSX attribute (or spread attribute containing the property) by name
on a given element.

Returns the **last** matching attribute to mirror React's behaviour where
later props win, or `undefined` when the attribute is not present.

Spread attributes are resolved when possible: if the spread argument is an
identifier that resolves to an object expression, the object's properties
are searched for a matching key.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement` | The `JSXElement` node to search. |
| `name` | `string` | The attribute name to look for (e.g. `"className"`). |

## Returns

`TSESTreeJSXAttributeLike` \| `undefined`

The matching `JSXAttribute` or `JSXSpreadAttribute`, or
         `undefined` when not found.

## Example

```ts
const attr = findAttribute(context, node, "sandbox");
if (attr != null) {
  // attribute (or spread containing it) exists on the element
}
```
