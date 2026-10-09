[@local/testkit](../README.md) / createMockContext

# Function: createMockContext()

```ts
function createMockContext(options?: MockContextOptions): TestRuleContext;
```

Builds a rule-context-like object. When `options.code` is given,
`sourceCode.getText` slices the source text; otherwise it returns the
identifier's name for Identifier nodes and an empty string for other
nodes. When `options.parsed` is given, `sourceCode.getScope` resolves
against the real scope manager; otherwise it returns an empty object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`MockContextOptions`](../interfaces/MockContextOptions.md) | The mock context options. |

## Returns

[`TestRuleContext`](../type-aliases/TestRuleContext.md)

A rule-context-like object covering `sourceCode.getText` and
`sourceCode.getScope`.
