[@eslint-react/core](../README.md) / isHookTag

# Function: isHookTag()

```ts
function isHookTag(tag: Node | null): boolean;
```

Checks if the given expression is a hook tag (callee / tagged template tag).

## Parameters

| Parameter | Type             | Description                  |
| --------- | ---------------- | ---------------------------- |
| `tag`     | `Node` \| `null` | The expression node to check |

## Returns

`boolean`

`true` if the expression is a hook identifier or member expression with hook name, `false` otherwise
