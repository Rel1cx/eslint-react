[@eslint-react/jsx](../README.md) / getAttributeStaticValueByName

# Function: getAttributeStaticValueByName()

```ts
function getAttributeStaticValueByName(context: RuleContext, element: JSXElement, name: string): unknown;
```

Find the last direct attribute with the given full name and get its static value.

Returns `undefined` when no matching direct attribute is present, or when its
value is a JSX element or fragment, is a `missing` descriptor, cannot be
statically evaluated, or evaluates to `undefined`. A statically known
`undefined` is likewise indistinguishable from an absent or indeterminate
value; use [hasAttribute](hasAttribute.md) when presence itself matters. Spread
attributes are ignored; a spread after the matched attribute may still
override it at runtime.

## Parameters

| Parameter | Type          | Description                                                        |
| --------- | ------------- | ------------------------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                                           |
| `element` | `JSXElement`  | The `JSXElement` node to check.                                    |
| `name`    | `string`      | The full attribute name to look up (ex: "className", "xml:space"). |

## Returns

`unknown`

The static value of the attribute, or `undefined` when absent or indeterminate.
