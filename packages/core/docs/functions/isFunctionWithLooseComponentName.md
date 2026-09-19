[@eslint-react/core](../README.md) / isFunctionWithLooseComponentName

# Function: isFunctionWithLooseComponentName()

```ts
function isFunctionWithLooseComponentName(
  context: RichContext,
  fn: TSESTreeFunction,
  allowNone?: boolean,
): boolean;
```

Check if a function has a loose component name.

## Parameters

| Parameter   | Type                                            | Default value | Description               |
| ----------- | ----------------------------------------------- | ------------- | ------------------------- |
| `context`   | [`RichContext`](../type-aliases/RichContext.md) | `undefined`   | The rich rule context.    |
| `fn`        | `TSESTreeFunction`                              | `undefined`   | The function to check.    |
| `allowNone` | `boolean`                                       | `false`       | Whether to allow no name. |

## Returns

`boolean`

`true` if the function has a loose component name.
