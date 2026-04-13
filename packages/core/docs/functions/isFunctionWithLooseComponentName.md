[@eslint-react/core](../README.md) / isFunctionWithLooseComponentName

# Function: isFunctionWithLooseComponentName()

```ts
function isFunctionWithLooseComponentName(
   context: RuleContext, 
   fn: FunctionExpression, 
   allowNone?: boolean): boolean;
```

Check if a function has a loose component name

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `context` | `RuleContext` | `undefined` | The rule context |
| `fn` | `FunctionExpression` | `undefined` | The function to check |
| `allowNone` | `boolean` | `false` | Whether to allow no name |

## Returns

`boolean`

Whether the function has a loose component name
