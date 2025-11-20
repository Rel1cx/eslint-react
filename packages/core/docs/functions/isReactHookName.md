[@eslint-react/core](../README.md) / isReactHookName

# Function: isReactHookName()

```ts
function isReactHookName(name: string): boolean;
```

Catch all identifiers that begin with "use" followed by an uppercase Latin
character to exclude identifiers like "user".

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the identifier to check. |

## Returns

`boolean`

## See

https://github.com/facebook/react/blob/1d6c8168db1d82713202e842df3167787ffa00ed/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L16
