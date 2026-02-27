[@eslint-react/eff](../README.md) / pipeArguments

# Function: pipeArguments()

```ts
function pipeArguments<A>(self: A, args: IArguments): unknown;
```

Applies a pipeline of functions to a value, passing the result of each function
to the next one in sequence.

## Type Parameters

| Type Parameter |
| ------ |
| `A` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `self` | `A` | The value to pipe. |
| `args` | `IArguments` | The functions to apply. |

## Returns

`unknown`

The result of applying all functions in sequence.

## Since

1.0.0
