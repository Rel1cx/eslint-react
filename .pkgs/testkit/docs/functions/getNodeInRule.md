[@local/testkit](../README.md) / getNodeInRule

# Function: getNodeInRule()

```ts
function getNodeInRule<T>(code: string, visitorKey: string): {
  context: TestRuleContext;
  node: T;
};
```

Runs `code` through a real `Linter` and captures the first node visited by
`visitorKey` (e.g. `"JSXElement"`) together with the rule context.

## Type Parameters

| Type Parameter       |
| -------------------- |
| `T` _extends_ `Node` |

## Parameters

| Parameter    | Type     |
| ------------ | -------- |
| `code`       | `string` |
| `visitorKey` | `string` |

## Returns

```ts
{
  context: TestRuleContext;
  node: T;
}
```

| Name      | Type                                                    |
| --------- | ------------------------------------------------------- |
| `context` | [`TestRuleContext`](../type-aliases/TestRuleContext.md) |
| `node`    | `T`                                                     |
