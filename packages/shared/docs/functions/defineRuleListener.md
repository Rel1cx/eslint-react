[@eslint-react/shared](../README.md) / defineRuleListener

# Function: defineRuleListener()

```ts
function defineRuleListener(visitor: RuleListener, ...visitors: RuleListener[]): RuleListener;
```

Defines a RuleListener by merging multiple visitor objects

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `visitor` | `RuleListener` | The base visitor object |
| ...`visitors` | `RuleListener`[] | Additional visitor objects to merge |

## Returns

`RuleListener`

The merged RuleListener
