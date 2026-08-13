[@eslint-react/core](../README.md) / getCreateElementProp

# Function: getCreateElementProp()

```ts
function getCreateElementProp(
  context: RuleContext,
  node: Node | null,
  name: string,
): Property | null;
```

Find a statically named property in the props object of a `createElement` call.

Statically resolvable names include plain identifier keys as well as
string-literal and simple template-literal keys (computed or not).

## Parameters

| Parameter | Type             | Description                                                |
| --------- | ---------------- | ---------------------------------------------------------- |
| `context` | `RuleContext`    | The ESLint rule context.                                   |
| `node`    | `Node` \| `null` | The node to inspect.                                       |
| `name`    | `string`         | The property name to look for (ex: `"children"`, `"key"`). |

## Returns

`Property` \| `null`

The matching `Property` node, or `null` when the call has no static property with that name.

## Example

```ts
import { getCreateElementProp } from "@eslint-react/core";

const childrenProp = getCreateElementProp(context, node, "children");
```
