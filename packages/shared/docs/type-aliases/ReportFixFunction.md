[@eslint-react/shared](../README.md) / ReportFixFunction

# Type Alias: ReportFixFunction()

```ts
type ReportFixFunction = (fixer: RuleFixer) => 
  | IterableIterator<RuleFix>
  | readonly RuleFix[]
  | RuleFix
  | null;
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `fixer` | [`RuleFixer`](../interfaces/RuleFixer.md) |

## Returns

  \| `IterableIterator`\<[`RuleFix`](../interfaces/RuleFix.md)\>
  \| readonly [`RuleFix`](../interfaces/RuleFix.md)[]
  \| [`RuleFix`](../interfaces/RuleFix.md)
  \| `null`
