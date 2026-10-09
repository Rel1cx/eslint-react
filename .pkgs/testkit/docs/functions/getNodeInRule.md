[@local/testkit](../README.md) / getNodeInRule

# Function: getNodeInRule()

```ts
function getNodeInRule<T extends Node>(
   code: string, 
   visitorKey: string, 
   options?: RuleRunOptions
): {
  context: TestRuleContext;
  node: T;
};
```

Runs `code` through a real `Linter` and captures the first node visited by
`visitorKey` (e.g. `"JSXElement"`) together with the rule context.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | `string` | The source code to lint. |
| `visitorKey` | `string` | The visitor key whose first match is captured. |
| `options` | [`RuleRunOptions`](../type-aliases/RuleRunOptions.md) | Parser options (filename, JSX, source type). |

## Returns

```ts
{
  context: TestRuleContext;
  node: T;
}
```

The captured node and the rule context.

| Name | Type |
| ------ | ------ |
| `context` | [`TestRuleContext`](../type-aliases/TestRuleContext.md) |
| `node` | `T` |
