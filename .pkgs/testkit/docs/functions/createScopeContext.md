[@local/testkit](../README.md) / createScopeContext

# Function: createScopeContext()

```ts
function createScopeContext(parsed: ParseForESLintResult, code?: string): TestRuleContext;
```

Builds a rule-context-like object whose `sourceCode.getScope` resolves
against the real scope manager of a parsed program. When `code` is given,
`sourceCode.getText` is also implemented by slicing the source text.

## Parameters

| Parameter | Type                   |
| --------- | ---------------------- |
| `parsed`  | `ParseForESLintResult` |
| `code?`   | `string`               |

## Returns

[`TestRuleContext`](../type-aliases/TestRuleContext.md)
