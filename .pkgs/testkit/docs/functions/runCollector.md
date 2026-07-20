[@local/testkit](../README.md) / runCollector

# Function: runCollector()

```ts
function runCollector<A, R>(
  code: string,
  getCollector: (context: TestRuleContext) => {
    api: A;
    visitor: RuleListener;
  },
  harvest: (api: A, program: Program) => R,
): R;
```

Runs `code` through a real `Linter`, spreads the collector's own `visitor`
into the rule, and harvests the result via the collector's `api` on
`Program:exit`.

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `R`            |

## Parameters

| Parameter      | Type                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `code`         | `string`                                                                                                             |
| `getCollector` | (`context`: [`TestRuleContext`](../type-aliases/TestRuleContext.md)) => \{ `api`: `A`; `visitor`: `RuleListener`; \} |
| `harvest`      | (`api`: `A`, `program`: `Program`) => `R`                                                                            |

## Returns

`R`
