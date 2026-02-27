[@eslint-react/shared](../README.md) / defineRuleListener

# Function: defineRuleListener()

```ts
function defineRuleListener(base: RuleListener, ...rest: RuleListener[]): RuleListener;
```

Defines a rule listener by merging multiple visitor objects

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `RuleListener` | Base visitor object (target of merge) |
| ...`rest` | `RuleListener`[] | Additional visitor objects to merge (one or more) |

## Returns

`RuleListener`

Merged RuleListener object

## Example

```typescript
const listener1 = { Identifier: () => console.log(1) };
const listener2 = { Identifier: () => console.log(2) };
const merged = defineRuleListener(listener1, listener2);
// When encountering Identifier nodes, outputs 1 then 2
```
