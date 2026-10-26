[@eslint-react/jsx](../README.md) / findCreateElementProp

# Function: findCreateElementProp()

```ts
function findCreateElementProp(context: RuleContext, call: CreateElementCall | null, name: string): Property | null;
```

Find a statically named direct property in the props object of a `createElement` call.

Properties are scanned in reverse so that the last direct property takes precedence.
Spread properties are ignored rather than statically resolved; a spread after
the returned property may still override it at runtime. Statically evaluable
computed keys are matched.

Returns `null` when the call is `null` or has no statically identifiable props
object, that is, when the second argument is absent or is not an object
literal after unwrapping type/chain expressions.

## Parameters

| Parameter | Type                                                                | Description                                                |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `context` | `RuleContext`                                                       | The ESLint rule context.                                   |
| `call`    | [`CreateElementCall`](../interfaces/CreateElementCall.md) \| `null` | The parsed call, or `null`.                                |
| `name`    | `string`                                                            | The property name to look for (ex: `"children"`, `"key"`). |

## Returns

`Property` \| `null`

The last matching `Property` node, or `null` when not found.
