[@eslint-react/shared](../README.md) / getReactVersion

# Function: getReactVersion()

```ts
function getReactVersion(fallback: string): string;
```

Gets the React version from the project's dependencies.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fallback` | `string` | The fallback version to return if React is not found. |

## Returns

`string`

The detected React version or the fallback version.
