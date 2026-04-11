[@eslint-react/eslint](../README.md) / merge

# Function: merge()

```ts
function merge(base: RuleListener, ...rest: RuleListener[]): RuleListener;
```

Merges multiple visitor objects into a single visitor object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | [`RuleListener`](../type-aliases/RuleListener.md) | Base visitor object (target of merge) |
| ...`rest` | [`RuleListener`](../type-aliases/RuleListener.md)[] | Additional visitor objects to merge (one or more) |

## Returns

[`RuleListener`](../type-aliases/RuleListener.md)

Merged visitor object

## Example

```typescript
const visitor1 = { Identifier: () => console.log(1) };
const visitor2 = { Identifier: () => console.log(2) };
const merged = merge(visitor1, visitor2);
// When encountering Identifier nodes, outputs 1 then 2
```
