[@eslint-react/shared](../README.md) / RuleSuggest

# Type Alias: RuleSuggest\<MessageIds\>

```ts
type RuleSuggest<MessageIds> = {
  data?: Record<string, unknown>;
  fix: ReportFixFunction;
  messageId: MessageIds;
};
```

A suggestion for fixing a reported issue.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `MessageIds` *extends* `string` | `string` |

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-data"></a> `data?` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | Optional data to pass to the message formatter. |
| <a id="property-fix"></a> `fix` | [`ReportFixFunction`](ReportFixFunction.md) | The fix function to apply the suggestion. |
| <a id="property-messageid"></a> `messageId` | `MessageIds` | The message ID for the suggestion. |
