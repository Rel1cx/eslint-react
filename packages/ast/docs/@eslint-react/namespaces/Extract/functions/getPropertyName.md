[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getPropertyName

# Function: getPropertyName()

```ts
function getPropertyName(property: Property, effort?: "min" | "max"): string | null;
```

Get the static name of an object property's key.

## Parameters

| Parameter  | Type               | Default value | Description                                                                                                 |
| ---------- | ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------- |
| `property` | `Property`         | `undefined`   | The property to inspect.                                                                                    |
| `effort`   | `"min"` \| `"max"` | `"min"`       | `"min"` only matches plain identifiers; `"max"` also resolves string literals and simple template literals. |

## Returns

`string` \| `null`

The property name, or `null` when it cannot be statically determined.
