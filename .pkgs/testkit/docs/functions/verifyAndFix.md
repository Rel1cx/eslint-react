[@local/testkit](../README.md) / verifyAndFix

# Function: verifyAndFix()

```ts
function verifyAndFix(code: string, rule: RuleModule, options?: readonly unknown[]): FixReport;
```

Run a rule with fixes enabled until the code stabilizes (or ESLint's fix limit is reached).

## Parameters

| Parameter  | Type                 | Default value | Description                                        |
| ---------- | -------------------- | ------------- | -------------------------------------------------- |
| `code`     | `string`             | `undefined`   | The source code to lint.                           |
| `rule`     | `RuleModule`         | `undefined`   | The rule to run.                                   |
| `options?` | readonly `unknown`[] | `[]`          | The rule options (the entries after the severity). |

## Returns

`FixReport`

The result of `Linter#verifyAndFix`.
