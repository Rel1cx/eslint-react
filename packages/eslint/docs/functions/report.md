[@eslint-react/eslint](../README.md) / report

# Function: report()

```ts
function report(context: RuleContext): (desc?: ReportDescriptor<string> | null) => void;
```

Creates a report function for the given rule context.

## Parameters

| Parameter | Type                                            | Description              |
| --------- | ----------------------------------------------- | ------------------------ |
| `context` | [`RuleContext`](../type-aliases/RuleContext.md) | The ESLint rule context. |

## Returns

A function that can be used to report violations.

(`desc?`: `ReportDescriptor`\<`string`\> \| `null`) => `void`
