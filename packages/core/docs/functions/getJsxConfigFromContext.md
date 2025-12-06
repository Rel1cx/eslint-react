[@eslint-react/core](../README.md) / getJsxConfigFromContext

# Function: getJsxConfigFromContext()

```ts
function getJsxConfigFromContext(context: RuleContext): {
  jsx: 4 | JsxEmit;
  jsxFactory: string;
  jsxFragmentFactory: string;
  jsxImportSource: string;
};
```

Get JsxConfig from the rule context by reading compiler options

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The RuleContext |

## Returns

```ts
{
  jsx: 4 | JsxEmit;
  jsxFactory: string;
  jsxFragmentFactory: string;
  jsxImportSource: string;
}
```

JsxConfig derived from compiler options

| Name | Type |
| ------ | ------ |
| `jsx` | `4` \| `JsxEmit` |
| `jsxFactory` | `string` |
| `jsxFragmentFactory` | `string` |
| `jsxImportSource` | `string` |
