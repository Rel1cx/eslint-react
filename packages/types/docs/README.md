@eslint-react/types

# @eslint-react/types

## Table of contents

### Type Aliases

- [Cond](README.md#cond)
- [CreateRule](README.md#createrule)
- [RuleCategory](README.md#rulecategory)
- [RuleContext](README.md#rulecontext)
- [RuleNamespace](README.md#rulenamespace)
- [RuleOptions](README.md#ruleoptions)
- [RulePreset](README.md#rulepreset)
- [Severity](README.md#severity)

## Type Aliases

### Cond

Ƭ **Cond**: ``"always"`` \| ``"never"``

Rule application condition.

**`Since`**

0.0.1

___

### CreateRule

Ƭ **CreateRule**: `Parameters`\<`ReturnType`\<typeof `ESLintUtils.RuleCreator`\>\>[``0``][``"create"``]

Rule creator function.

**`Since`**

0.0.1

___

### RuleCategory

Ƭ **RuleCategory**: ``"complexity"`` \| ``"correctness"`` \| ``"debug"`` \| ``"deprecated"`` \| ``"nursery"`` \| ``"pedantic"`` \| ``"perf"`` \| ``"restriction"`` \| ``"security"`` \| ``"style"`` \| ``"suspicious"`` \| ``"verbose"``

___

### RuleContext

Ƭ **RuleContext**: `Parameters`\<[`CreateRule`](README.md#createrule)\>[``0``]

Rule context.

**`Since`**

0.0.1

___

### RuleNamespace

Ƭ **RuleNamespace**: ``"debug"`` \| ``"experimental"`` \| ``"jsx"`` \| ``"naming-convention"`` \| ``"react"`` \| ``"react-hooks"``

___

### RuleOptions

Ƭ **RuleOptions**: `Parameters`\<[`CreateRule`](README.md#createrule)\>[``1``]

Rule options.

**`Since`**

0.0.1

___

### RulePreset

Ƭ **RulePreset**: `Record`\<`string`, `RuleDeclaration`\>

Rule config preset.

**`Since`**

0.0.1

___

### Severity

Ƭ **Severity**: ``"error"`` \| ``"off"`` \| ``"warn"``

Rule severity.

**`Since`**

0.0.1
