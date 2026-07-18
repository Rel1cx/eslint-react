[@local/testkit](../README.md) / runInRule

# Function: runInRule()

```ts
function runInRule<T>(code: string, fn: (context: TestRuleContext, program: Program) => T): T;
```

Runs `code` through a real `Linter` with an inline test rule and calls `fn`
from its `Program` listener, giving the callback a real rule context
(scope manager, static evaluation, ...).

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------- |
| `code`    | `string`                                                                                          |
| `fn`      | (`context`: [`TestRuleContext`](../type-aliases/TestRuleContext.md), `program`: `Program`) => `T` |

## Returns

`T`
