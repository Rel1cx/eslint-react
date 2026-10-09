[@local/testkit](../README.md) / createRuleTesterForJsxEmit

# Function: createRuleTesterForJsxEmit()

```ts
function createRuleTesterForJsxEmit(jsxEmit: JsxEmit): RuleTester;
```

Creates a `RuleTester` pinned to the tsconfig for the given JSX emit mode,
replacing per-spec hand-rolled `new RuleTester({...})` instances.

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `jsxEmit` | `JsxEmit` |

## Returns

`RuleTester`
