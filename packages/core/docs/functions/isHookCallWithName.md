[@eslint-react/core](../README.md) / isHookCallWithName

# Function: isHookCallWithName()

```ts
function isHookCallWithName(node: Node | undefined): (name: string) => boolean;
```

Checks if a node is a call to a specific React hook.
Returns a function that accepts a hook name to check against.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |

## Returns

A function that takes a hook name and returns boolean

```ts
(name: string): boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

### Returns

`boolean`
