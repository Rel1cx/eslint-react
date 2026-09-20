[@eslint-react/core](../README.md) / buildRichContext

# Function: buildRichContext()

```ts
function buildRichContext<M extends string = string, O extends readonly unknown[] = readonly unknown[]>(context: RuleContext<M, O>): RichContext<M, O>;
```

Builds a `RichContext` from a rule's `RuleContext`.

## Type Parameters

| Type Parameter                     | Default type         |
| ---------------------------------- | -------------------- |
| `M` _extends_ `string`             | `string`             |
| `O` _extends_ readonly `unknown`[] | readonly `unknown`[] |

## Parameters

| Parameter | Type                      | Description              |
| --------- | ------------------------- | ------------------------ |
| `context` | `RuleContext`\<`M`, `O`\> | The ESLint rule context. |

## Returns

[`RichContext`](../type-aliases/RichContext.md)\<`M`, `O`\>

A `RichContext` wrapping the given rule context.
