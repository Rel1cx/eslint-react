[@eslint-react/core](../README.md) / isHookName

# Function: isHookName()

```ts
function isHookName(name: string): boolean;
```

Check if the name is a hook name (starts with `use` followed by an uppercase letter or digit).

## Parameters

| Parameter | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| `name`    | `string` | The name of the identifier to check. |

## Returns

`boolean`

`true` if the name is a hook name.

## See

https://github.com/facebook/react/blob/1d6c8168db1d82713202e842df3167787ffa00ed/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L16
