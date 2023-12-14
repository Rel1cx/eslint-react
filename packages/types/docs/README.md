@eslint-react/types

# @eslint-react/types

## Table of contents

### Type Aliases

- [Cond](README.md#cond)
- [CreateRule](README.md#createrule)
- [RuleCategory](README.md#rulecategory)
- [RuleContext](README.md#rulecontext)
- [RuleDeclaration](README.md#ruledeclaration)
- [RuleNamespace](README.md#rulenamespace)
- [RuleOptions](README.md#ruleoptions)
- [RulePreset](README.md#rulepreset)
- [Severity](README.md#severity)

## Type Aliases

### Cond

Ƭ **Cond**: `"always"` \| `"never"`

Rule application condition.

**`Since`**

0.0.1

---

### CreateRule

Ƭ **CreateRule**: `Parameters`\<`ReturnType`\<typeof `ESLintUtils.RuleCreator`\>\>[`0`][`"create"`]

Rule creator function.

**`Since`**

0.0.1

---

### RuleCategory

Ƭ **RuleCategory**: `"complexity"` \| `"correctness"` \| `"debug"` \| `"deprecated"` \| `"nursery"` \| `"pedantic"` \| `"perf"` \| `"restriction"` \| `"security"` \| `"style"` \| `"suspicious"` \| `"verbose"`

---

### RuleContext

Ƭ **RuleContext**: `Parameters`\<[`CreateRule`](README.md#createrule)\>[`0`]

Rule context.

**`Since`**

0.0.1

---

### RuleDeclaration

Ƭ **RuleDeclaration**: [[`Severity`](README.md#severity), Record\<string, unknown\>?] \| [`Severity`](README.md#severity)

Rule declaration.

**`Since`**

0.0.1

---

### RuleNamespace

Ƭ **RuleNamespace**: `"debug"` \| `"experimental"` \| `"jsx"` \| `"naming-convention"` \| `"react"` \| `"react-hooks"`

---

### RuleOptions

Ƭ **RuleOptions**: `Parameters`\<[`CreateRule`](README.md#createrule)\>[`1`]

Rule options.

**`Since`**

0.0.1

---

### RulePreset

Ƭ **RulePreset**: `Record`\<`string`, [`RuleDeclaration`](README.md#ruledeclaration)\>

Rule config preset.

**`Since`**

0.0.1

---

### Severity

Ƭ **Severity**: `"error"` \| `"off"` \| `"warn"`

Rule severity.

**`Since`**

0.0.1
