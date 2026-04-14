[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(
   context: RuleContext, 
   element: JSXElement, 
   name: string): JsxAttributeValue | undefined;
```

Find an attribute by name on a JSX element **and** resolve its value in a
single call.

This is a convenience composition of [findAttribute](findAttribute.md) and
[resolveAttributeValue](resolveAttributeValue.md) that eliminates the most common two-step
pattern in lint rules:

```ts
const attr = findAttribute(context, element, name);
if (attr == null) return;
const value = resolveAttributeValue(context, attr);
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context. |
| `element` | `JSXElement` | The `JSXElement` node to search. |
| `name` | `string` | The attribute name to look up (e.g. `"className"`). |

## Returns

[`JsxAttributeValue`](../type-aliases/JsxAttributeValue.md) \| `undefined`

A [JsxAttributeValue](../type-aliases/JsxAttributeValue.md) descriptor, or `undefined` when the
         attribute is not present on the element.

## Example

```ts
const value = getAttributeValue(context, node, "sandbox");
if (value?.kind === "literal") {
  console.log(value.toStatic()); // the literal value
}
```
