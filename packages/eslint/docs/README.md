# @eslint-react/eslint

## Interfaces

| Interface                            | Description |
| ------------------------------------ | ----------- |
| [RuleFix](interfaces/RuleFix.md)     | -           |
| [RuleFixer](interfaces/RuleFixer.md) | -           |

## Type Aliases

| Type Alias                                             | Description                         |
| ------------------------------------------------------ | ----------------------------------- |
| [ReportFixFunction](type-aliases/ReportFixFunction.md) | -                                   |
| [RuleContext](type-aliases/RuleContext.md)             | Represents the ESLint rule context. |
| [RuleFeature](type-aliases/RuleFeature.md)             | Represents the feature of a rule.   |
| [RuleListener](type-aliases/RuleListener.md)           | -                                   |

## Variables

| Variable                              | Description                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| [createRule](variables/createRule.md) | The rule creator that generates documentation URLs for ESLint React rules. |

## Functions

| Function                                                                  | Description                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [complete](functions/complete.md)                                         | Merge the rule options supplied by the user with the rule's default options.                                                                                                                         |
| [getConstrainedTypeAtLocation](functions/getConstrainedTypeAtLocation.md) | Resolves the given node's type. Will return the type's generic constraint, if it has one.                                                                                                            |
| [getText](functions/getText.md)                                           | Gets the source text of the given node or token. Can be used as `(context, node)` to get the text directly, or as `(context)` to get a `(node) => string` function (ex: for use in array callbacks). |
| [merge](functions/merge.md)                                               | Merge multiple visitor objects into a single visitor object.                                                                                                                                         |
| [report](functions/report.md)                                             | Creates a report function for the given rule context.                                                                                                                                                |
