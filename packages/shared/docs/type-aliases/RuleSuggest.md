[@eslint-react/shared](../README.md) / RuleSuggest

# Type Alias: RuleSuggest\<MessageIds\>

```ts
type RuleSuggest<MessageIds> = {
  data?: Record<string, unknown>;
  fix: tseslint.ReportFixFunction;
  messageId: MessageIds;
};
```

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `MessageIds` *extends* `string` | `string` |

## Properties

| Property | Type |
| ------ | ------ |
| <a id="data"></a> `data?` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> |
| <a id="fix"></a> `fix` | `tseslint.ReportFixFunction` |
| <a id="messageid"></a> `messageId` | `MessageIds` |
