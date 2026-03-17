[@eslint-react/kit](../README.md) / merge

# Function: merge()

```ts
function merge(...listeners: RuleListener[]): RuleListener;
```

Merges multiple RuleListener (visitor) objects into a single listener.

When two or more listeners define the same visitor key, the handlers are
chained so that they execute in order. This is essential for combining a
collector's visitor with your own inspection logic.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`listeners` | `RuleListener`[] | The visitor objects to merge. |

## Returns

`RuleListener`

A single merged RuleListener.

## Example

```ts
const collectorVisitor = { Identifier: () => console.log("collect") };
const inspectVisitor   = { Identifier: () => console.log("inspect") };
const merged = merge(collectorVisitor, inspectVisitor);
// When encountering Identifier nodes, outputs "collect" then "inspect"
```
