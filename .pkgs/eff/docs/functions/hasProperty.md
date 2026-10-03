[@local/eff](../README.md) / hasProperty

# Function: hasProperty()

```ts
function hasProperty<P extends PropertyKey>(data: unknown, property: P): data is { [K in PropertyKey]: unknown };
```

Checks whether a value has a given property key.

## Type Parameters

| Type Parameter              |
| --------------------------- |
| `P` _extends_ `PropertyKey` |

## Parameters

| Parameter  | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `data`     | `unknown` | The variable to check.        |
| `property` | `P`       | The property key to look for. |

## Returns

`data is { [K in PropertyKey]: unknown }`

True if the passed input has the property, false otherwise.
