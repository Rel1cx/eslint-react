# @local/testkit

## Interfaces

| Interface                                          | Description |
| -------------------------------------------------- | ----------- |
| [ParseCodeOptions](interfaces/ParseCodeOptions.md) | -           |

## Type Aliases

| Type Alias                                         | Description                                                                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [TestRuleContext](type-aliases/TestRuleContext.md) | The rule context surface handed to unit-test harness callbacks. Matches `@eslint-react/eslint`'s `RuleContext` without depending on it. |

## Variables

| Variable                                                                        | Description |
| ------------------------------------------------------------------------------- | ----------- |
| [defaultLanguageOptions](variables/defaultLanguageOptions.md)                   | -           |
| [defaultLanguageOptionsWithTypes](variables/defaultLanguageOptionsWithTypes.md) | -           |
| [ruleTester](variables/ruleTester.md)                                           | -           |
| [ruleTesterWithTypes](variables/ruleTesterWithTypes.md)                         | -           |

## Functions

| Function                                                              | Description                                                                                                                                                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [collectNodes](functions/collectNodes.md)                             | -                                                                                                                                                                                         |
| [createRuleTesterForJsxEmit](functions/createRuleTesterForJsxEmit.md) | Creates a `RuleTester` pinned to the tsconfig for the given JSX emit mode, replacing per-spec hand-rolled `new RuleTester({...})` instances.                                              |
| [createScopeContext](functions/createScopeContext.md)                 | Builds a rule-context-like object whose `sourceCode.getScope` resolves against the real scope manager of a parsed program.                                                                |
| [getFirstNodeOfType](functions/getFirstNodeOfType.md)                 | -                                                                                                                                                                                         |
| [getFixturesRootDir](functions/getFixturesRootDir.md)                 | -                                                                                                                                                                                         |
| [getNodeInRule](functions/getNodeInRule.md)                           | Runs `code` through a real `Linter` and captures the first node visited by `visitorKey` (e.g. `"JSXElement"`) together with the rule context.                                             |
| [getProjectForJsxEmit](functions/getProjectForJsxEmit.md)             | -                                                                                                                                                                                         |
| [lintWithConfig](functions/lintWithConfig.md)                         | -                                                                                                                                                                                         |
| [parseCode](functions/parseCode.md)                                   | -                                                                                                                                                                                         |
| [runCollector](functions/runCollector.md)                             | Runs `code` through a real `Linter`, spreads the collector's own `visitor` into the rule, and harvests the result via the collector's `api` on `Program:exit`.                            |
| [runInRule](functions/runInRule.md)                                   | Runs `code` through a real `Linter` with an inline test rule and calls `fn` from its `Program` listener, giving the callback a real rule context (scope manager, static evaluation, ...). |
