[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getPropertyName

# Function: getPropertyName()

```ts
function getPropertyName(
  property: Property,
  effort?: "min" | "std" | "max",
  initialScope?: Scope,
): string | null;
```

Get the static name of an object property's key.

Symbol keys and object/function key coercion are not supported by this string-name lookup.

## Parameters

| Parameter       | Type                          | Default value | Description                                                                                                                                                                                            |
| --------------- | ----------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `property`      | `Property`                    | `undefined`   | The property to inspect.                                                                                                                                                                               |
| `effort`        | `"min"` \| `"std"` \| `"max"` | `"min"`       | `"min"` only matches plain identifiers; `"std"` also resolves string literals and simple template literals; `"max"` additionally evaluates computed keys and converts known primitive keys to strings. |
| `initialScope?` | `Scope`                       | `undefined`   | The key's scope for `"max"` evaluation. Without it, scope-dependent keys cannot be resolved. Ignored by `"min"` and `"std"`.                                                                           |

## Returns

`string` \| `null`

The property name, or `null` when it cannot be statically determined.
