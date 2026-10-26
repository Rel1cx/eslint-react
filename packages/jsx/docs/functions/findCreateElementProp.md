[@eslint-react/jsx](../README.md) / findCreateElementProp

# Function: findCreateElementProp()

```ts
function findCreateElementProp(context: RuleContext, call: CreateElementCall | null, name: string): Property | null;
```

Find a statically named direct property in the props object of a `createElement` call.

Properties are scanned in reverse so that later entries win. Only direct
properties are considered; spread properties are ignored rather than
statically resolved. Statically evaluable computed keys are matched.

## Parameters

| Parameter | Type                                                                | Description                                                |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `context` | `RuleContext`                                                       | The ESLint rule context.                                   |
| `call`    | [`CreateElementCall`](../interfaces/CreateElementCall.md) \| `null` | The parsed call, or `null`.                                |
| `name`    | `string`                                                            | The property name to look for (ex: `"children"`, `"key"`). |

## Returns

`Property` \| `null`

The matching `Property` node, or `null` when not found.
