[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / findProperty

# Function: findProperty()

```ts
function findProperty(properties: ObjectLiteralElement[], name: string): Property | null;
```

Find a property by name in a list of object literal properties, recursing into spread object expressions.

## Parameters

| Parameter    | Type                     | Description                              |
| ------------ | ------------------------ | ---------------------------------------- |
| `properties` | `ObjectLiteralElement`[] | The object literal properties to search. |
| `name`       | `string`                 | The property name to look for.           |

## Returns

`Property` \| `null`

The matching `Property` node, or `null` when not found.
