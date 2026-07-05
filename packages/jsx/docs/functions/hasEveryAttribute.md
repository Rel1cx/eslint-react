[@eslint-react/jsx](../README.md) / hasEveryAttribute

# Function: hasEveryAttribute()

```ts
function hasEveryAttribute(
  context: RuleContext,
  element: JSXElement,
  names: string[],
): boolean;
```

Check whether a JSX element carries all of the given attributes (props)

This is a batch variant of [hasAttribute](hasAttribute.md) for the common pattern
where a rule needs to verify that a set of required props are all present.

Spread attributes are taken into account (see [findAttribute](findAttribute.md)).

## Parameters

| Parameter | Type          | Description                                                                   |
| --------- | ------------- | ----------------------------------------------------------------------------- |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes) |
| `element` | `JSXElement`  | The `JSXElement` node to inspect                                              |
| `names`   | `string`[]    | The attribute names to look for                                               |

## Returns

`boolean`

`true` when every name in `names` is present on the element
