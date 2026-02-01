[@eslint-react/shared](../README.md) / report

# Function: report()

```ts
function report(context: RuleContext): (descriptor?: ReportDescriptor<string> | null) => void;
```

Creates a report function for the given rule context.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`RuleContext`](../type-aliases/RuleContext.md) | The ESLint rule context. |

## Returns

A function that can be used to report violations.

```ts
(descriptor?: ReportDescriptor<string> | null): void;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `descriptor?` | `ReportDescriptor`\<`string`\> \| `null` |

### Returns

`void`
