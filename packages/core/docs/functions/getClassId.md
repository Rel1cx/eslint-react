[@eslint-react/core](../README.md) / getClassId

# Function: getClassId()

```ts
function getClassId(node: TSESTreeClass): BindingName | null;
```

Get the class identifier of a class node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeClass` | The class node to get the identifier from |

## Returns

`BindingName` \| `null`

The class identifier or null if not found
