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

## Examples

```ts
const { query, visitor } = kit.collect.components(ctx);

return merge(
  visitor,
  {
    "Program:exit"(program) {
      for (const component of query.all(program)) {
        // inspect components
      }
    },
  },
);
```

```ts
// Merging a component collector and a hook collector
const fc = kit.collect.components(ctx);
const hk = kit.collect.hooks(ctx);

return merge(fc.visitor, hk.visitor, {
  "Program:exit"(program) {
    const components = fc.query.all(program);
    const hooks = hk.query.all(program);
    // analyze everything together
  },
});
```
