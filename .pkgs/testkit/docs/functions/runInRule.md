[@local/testkit](../README.md) / runInRule

# Function: runInRule()

```ts
function runInRule<T>(
   code: string, 
   fn: (context: TestRuleContext, program: Program) => T, 
   options?: RuleRunOptions
): T;
```

Runs `code` through a real `Linter` with an inline test rule and calls `fn`
from its `Program` listener, giving the callback a real rule context
(scope manager, static evaluation, ...).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | `string` | The source code to lint. |
| `fn` | (`context`: [`TestRuleContext`](../type-aliases/TestRuleContext.md), `program`: `Program`) => `T` | The callback invoked from the rule's `Program` listener. |
| `options` | [`RuleRunOptions`](../type-aliases/RuleRunOptions.md) | Parser options (filename, JSX, source type). |

## Returns

`T`

The value returned by `fn`.
