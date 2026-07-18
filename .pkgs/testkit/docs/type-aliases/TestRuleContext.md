[@local/testkit](../README.md) / TestRuleContext

# Type Alias: TestRuleContext

```ts
type TestRuleContext = RuleContext<string, readonly unknown[]>;
```

The rule context surface handed to unit-test harness callbacks.
Matches `@eslint-react/eslint`'s `RuleContext` without depending on it.
