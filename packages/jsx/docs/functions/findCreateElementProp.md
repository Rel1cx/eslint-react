[@eslint-react/jsx](../README.md) / findCreateElementProp

# Function: findCreateElementProp()

```ts
function findCreateElementProp(context: RuleContext, call: CreateElementCall | null, name: string): Property | null;
```

Find a statically named property in the props object of a `createElement` call.

Matching follows JavaScript object semantics: properties are scanned in
reverse (later entries win), nested spreads are resolved recursively, and
statically evaluable computed keys are matched. The property matcher is shared
with `findSpreadProperty`, so JSX spread attributes and `createElement` props
have identical name-resolution behavior.

## Parameters

| Parameter | Type                                                                | Description                                                |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `context` | `RuleContext`                                                       | The ESLint rule context.                                   |
| `call`    | [`CreateElementCall`](../interfaces/CreateElementCall.md) \| `null` | The parsed call, or `null`.                                |
| `name`    | `string`                                                            | The property name to look for (ex: `"children"`, `"key"`). |

## Returns

`Property` \| `null`

The matching `Property` node, or `null` when not found.
