[@eslint-react/core](../README.md) / isReactHookCallWithNameAlias

# Function: isReactHookCallWithNameAlias()

```ts
function isReactHookCallWithNameAlias(name: string, alias: string[] | undefined): (node: CallExpression) => boolean;
```

Checks if a node is a call to a specific React hook or one of its aliases.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `name` | `string` | `undefined` | The primary hook name to check |
| `alias` | `string`[] \| `undefined` | `[]` | Optional array of alias names to also accept |

## Returns

Function that checks if a node matches the hook name or aliases

```ts
(node: CallExpression): boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `CallExpression` |

### Returns

`boolean`
