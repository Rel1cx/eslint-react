[@eslint-react/core](../README.md) / isInitializedFromReactNative

# Function: isInitializedFromReactNative()

```ts
function isInitializedFromReactNative(
   name: string, 
   initialScope: Scope, 
   importSource?: string): boolean;
```

if a variable is initialized from React Native import

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `name` | `string` | `undefined` | The variable name |
| `initialScope` | `Scope` | `undefined` | The initial scope |
| `importSource` | `string` | `"react-native"` | Alternative import source of React Native (e.g., "react-native-web") |

## Returns

`boolean`

True if the variable is initialized from React Native import
