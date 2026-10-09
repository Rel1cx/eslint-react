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
  options?: RuleRunOptions,
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

| Parameter      | Type                                                                                                                 | Description                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `code`         | `string`                                                                                                             | The source code to lint.                      |
| `getCollector` | (`context`: [`TestRuleContext`](../type-aliases/TestRuleContext.md)) => \{ `api`: `A`; `visitor`: `RuleListener`; \} | Builds the collector from the rule context.   |
| `harvest`      | (`api`: `A`, `program`: `Program`) => `R`                                                                            | Extracts the result from the collector's api. |
| `options`      | [`RuleRunOptions`](../type-aliases/RuleRunOptions.md)                                                                | Parser options (filename, JSX, source type).  |

## Returns

`R`

The value returned by `harvest`.
