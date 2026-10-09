[@eslint-react/core](../README.md) / isBooleanLiteralType

# Function: isBooleanLiteralType()

```ts
function isBooleanLiteralType<TType extends Type>(type: TType): type is TType & { intrinsicName: "false" | "true" };
```

Check if the type is a boolean literal type.

## Type Parameters

| Type Parameter |
| ------ |
| `TType` *extends* `Type` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `TType` | The type to check. |

## Returns

type is TType & \{ intrinsicName: "false" \| "true" \}

`true` if the type is a boolean literal type.
