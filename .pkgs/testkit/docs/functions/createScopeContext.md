[@local/testkit](../README.md) / createScopeContext

# Function: createScopeContext()

```ts
function createScopeContext(parsed: ParseForESLintResult): TestRuleContext;
```

Builds a rule-context-like object whose `sourceCode.getScope` resolves
against the real scope manager of a parsed program.

## Parameters

| Parameter | Type                   |
| --------- | ---------------------- |
| `parsed`  | `ParseForESLintResult` |

## Returns

[`TestRuleContext`](../type-aliases/TestRuleContext.md)
