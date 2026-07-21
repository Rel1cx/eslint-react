[@eslint-react/core](../README.md) / isBooleanLiteralType

# Function: isBooleanLiteralType()

```ts
function isBooleanLiteralType<TType>(type: TType): type is TType & { intrinsicName: "true" | "false" };
```

Check if the type is a boolean literal type.

## Type Parameters

| Type Parameter           |
| ------------------------ |
| `TType` _extends_ `Type` |

## Parameters

| Parameter | Type    | Description        |
| --------- | ------- | ------------------ |
| `type`    | `TType` | The type to check. |

## Returns

type is TType & \{ intrinsicName: "true" \| "false" \}

`true` if the type is a boolean literal type.
