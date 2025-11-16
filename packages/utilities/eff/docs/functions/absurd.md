[@eslint-react/eff](../README.md) / absurd

# Function: absurd()

```ts
function absurd<A>(_: never): A;
```

The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
meaning that it should be impossible for this code to be executed.

This function is particularly useful when it's necessary to specify that certain cases are impossible.

## Type Parameters

| Type Parameter |
| ------ |
| `A` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_` | `never` | The value of type `never` that is passed to the function. |

## Returns

`A`

## Since

1.0.0
