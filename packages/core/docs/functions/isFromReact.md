[@eslint-react/core](../README.md) / isFromReact

# Function: isFromReact()

```ts
function isFromReact(
   node: JSXIdentifier | Identifier, 
   initialScope: Scope, 
   importSource: string): boolean;
```

Check if an identifier node is initialized from React

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `node` | `JSXIdentifier` \| `Identifier` | `undefined` | The identifier node to check |
| `initialScope` | `Scope` | `undefined` | Initial scope to search for the identifier |
| `importSource` | `string` | `"react"` | The import source to check against |

## Returns

`boolean`

Whether the identifier node is initialized from React
