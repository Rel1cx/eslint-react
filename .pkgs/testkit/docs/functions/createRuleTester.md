[@local/testkit](../README.md) / createRuleTester

# Function: createRuleTester()

```ts
function createRuleTester(options?: TestLanguageOptionsInput): RuleTester;
```

The single construction site for `RuleTester` instances. Pass
`types: true` for type-aware rules backed by the project service, or
`types: { tsconfig }` to pin a specific tsconfig (see
`createRuleTesterForTsconfig` for the fixture-keyed convenience).

## Parameters

| Parameter  | Type                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| `options?` | [`TestLanguageOptionsInput`](../interfaces/TestLanguageOptionsInput.md) |

## Returns

`RuleTester`
