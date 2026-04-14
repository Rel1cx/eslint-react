[@eslint-react/jsx](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

```ts
function resolveAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike): JsxAttributeValue;
```

Resolve the value of a JSX attribute (or spread attribute) into a
[JsxAttributeValue](../type-aliases/JsxAttributeValue.md) descriptor that can be inspected further.

This is the low‑level building block – it operates on a single attribute
node that the caller has already located.  For the higher‑level "find by
name **and** resolve" combo, see [getAttributeValue](getAttributeValue.md).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context (needed for scope look‑ups). |
| `attribute` | `TSESTreeJSXAttributeLike` | A `JSXAttribute` or `JSXSpreadAttribute` node. |

## Returns

[`JsxAttributeValue`](../type-aliases/JsxAttributeValue.md)

A discriminated‑union descriptor of the attribute's value.

## Example

```ts
import { findAttribute, resolveAttributeValue } from "@eslint-react/jsx";

const attr = findAttribute(context, element, "sandbox");
if (attr != null) {
  const value = resolveAttributeValue(context, attr);
  if (value.kind === "literal") {
    console.log(value.toStatic());
  }
}
```
