[@eslint-react/shared](../README.md) / normalizeSettings

# Function: normalizeSettings()

```ts
function normalizeSettings(__namedParameters: {
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
}): {
  importSource: string;
  polymorphicPropName: string;
  version: string;
};
```

Normalizes ESLint React settings to a consistent internal format
Transforms component definitions and resolves version information

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `__namedParameters` | \{ `importSource?`: `string`; `polymorphicPropName?`: `string`; `version?`: `string`; \} | - |
| `__namedParameters.importSource?` | `string` | The source where React is imported from Allows specifying a custom import location for React **Default** `"react"` **Example** `"@pika/react"` |
| `__namedParameters.polymorphicPropName?` | `string` | The prop name used for polymorphic components Used to determine the component's type **Example** `"as"` |
| `__namedParameters.version?` | `string` | React version to use "detect" means auto-detect React version from project dependencies **Example** `"18.3.1"` **Default** `"detect"` |

## Returns

```ts
{
  importSource: string;
  polymorphicPropName: string;
  version: string;
}
```

| Name | Type |
| ------ | ------ |
| `importSource` | `string` |
| `polymorphicPropName` | `string` |
| `version` | `string` |
