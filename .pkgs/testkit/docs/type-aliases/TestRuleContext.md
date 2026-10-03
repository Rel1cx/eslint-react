[@local/testkit](../README.md) / TestRuleContext

# Type Alias: TestRuleContext

```ts
type TestRuleContext = RuleContext<string, readonly unknown[]>;
```

The rule context surface handed to unit-test harness callbacks.
Structurally identical to `@eslint-react/eslint`'s `RuleContext`
(both are `tseslint.RuleContext<string, readonly unknown[]>` and the
whole workspace resolves a single `@typescript-eslint/utils` instance),
so values of this type are assignable in both directions; any
`context as never` casts at call sites are unnecessary leftovers.
