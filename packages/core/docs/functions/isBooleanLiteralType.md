[@eslint-react/core](../README.md) / isBooleanLiteralType

# Function: isBooleanLiteralType()

```ts
function isBooleanLiteralType<TType>(type: TType): type is TType & { intrinsicName: "true" | "false" };
```

## Type Parameters

| Type Parameter           |
| ------------------------ |
| `TType` _extends_ `Type` |

## Parameters

| Parameter | Type    |
| --------- | ------- |
| `type`    | `TType` |

## Returns

type is TType & \{ intrinsicName: "true" \| "false" \}
