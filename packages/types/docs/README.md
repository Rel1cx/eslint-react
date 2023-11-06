@eslint-react/types

# @eslint-react/types

## Table of contents

### Type Aliases

- [Additional](README.md#additional)
- [Ban](README.md#ban)
- [Category](README.md#category)
- [Cond](README.md#cond)
- [CreateRule](README.md#createrule)
- [Descriptive](README.md#descriptive)
- [Modifier](README.md#modifier)
- [Namespace](README.md#namespace)
- [NegativeDescriptive](README.md#negativedescriptive)
- [NegativeModifier](README.md#negativemodifier)
- [NeutralDescriptive](README.md#neutraldescriptive)
- [NeutralModifier](README.md#neutralmodifier)
- [PositiveDescriptive](README.md#positivedescriptive)
- [PositiveModifier](README.md#positivemodifier)
- [ReactSettings](README.md#reactsettings)
- [RuleContext](README.md#rulecontext)
- [RuleDeclaration](README.md#ruledeclaration)
- [RuleName](README.md#rulename)
- [RuleNameWithAdditional](README.md#rulenamewithadditional)
- [RuleOptions](README.md#ruleoptions)
- [RulePreset](README.md#rulepreset)
- [Severity](README.md#severity)
- [Term](README.md#term)

## Type Aliases

### Additional

Ƭ **Additional**: `string`

---

### Ban

Ƭ **Ban**: `"ban"`

---

### Category

Ƭ **Category**: `"complexity"` \| `"correctness"` \| `"pedantic"` \| `"perf"` \| `"restriction"` \| `"security"` \| `"style"` \| `"suspicious"`

---

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

### Descriptive

Ƭ **Descriptive**: [`NegativeDescriptive`](README.md#negativedescriptive) \| [`NeutralDescriptive`](README.md#neutraldescriptive) \| [`PositiveDescriptive`](README.md#positivedescriptive)

---

### Modifier

Ƭ **Modifier**: [`NegativeModifier`](README.md#negativemodifier) \| [`NeutralModifier`](README.md#neutralmodifier) \| [`PositiveModifier`](README.md#positivemodifier)

---

### Namespace

Ƭ **Namespace**: `"debug"` \| `"experimental"` \| `"hooks"` \| `"jsx"` \| `"naming-convention"` \| `"react"`

---

### NegativeDescriptive

Ƭ **NegativeDescriptive**: `"complicated"` \| `"confusing"` \| `"constructed"` \| `"duplicate"` \| `"empty"` \| `"extra"` \| `"falsely"` \| `"implicit"` \| `"invalid"` \| `"leaked"` \| `"legacy"` \| `"missing"` \| `"misused"` \| `"mixing"` \| `"nested"` \| `"redundant"` \| `"suppressing"` \| `"suspicious"` \| `"unknown"` \| `"unreachable"` \| `"unsafe"` \| `"unsorted"` \| `"unstable"` \| `"unused"` \| `"useless"`

---

### NegativeModifier

Ƭ **NegativeModifier**: `"no"`

---

### NeutralDescriptive

Ƭ **NeutralDescriptive**: `"access"` \| `"calling"` \| `"inside"` \| `"outside"`

---

### NeutralModifier

Ƭ **NeutralModifier**: `"max"` \| `"min"`

---

### PositiveDescriptive

Ƭ **PositiveDescriptive**: `"explicit"` \| `"optimal"` \| `"optimized"` \| `"standard"` \| `"strict"`

---

### PositiveModifier

Ƭ **PositiveModifier**: `"ensure"` \| `"prefer"` \| `"strict"`

---

### ReactSettings

Ƭ **ReactSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `fragment`: `string` ; `pragma`: `string` ; `version`: `string` }\>

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

### RuleName

Ƭ **RuleName**: \`$\{Ban}-$\{Term}\` \| \`$\{NeutralModifier}-$\{Term}\` \| \`$\{NegativeModifier}-$\{NegativeDescriptive}-$\{Term}\` \| \`$\{NegativeModifier}-$\{NeutralDescriptive}-$\{Term}\` \| \`$\{PositiveModifier}-$\{NeutralDescriptive}-$\{Term}\` \| \`$\{PositiveModifier}-$\{PositiveDescriptive}-$\{Term}\`

---

### RuleNameWithAdditional

Ƭ **RuleNameWithAdditional**: \`$\{RuleName}-$\{Additional}\`

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

---

### Term

Ƭ **Term**: `"argument"` \| `"array"` \| `"array-index"` \| `"arrow-function"` \| `"attribute"` \| `"callback"` \| `"children"` \| `"class"` \| `"class-component"` \| `"class-method"` \| `"class-property"` \| `"clone-element"` \| `"comment"` \| `"component"` \| `"components"` \| `"computed"` \| `"computed-property"` \| `"conditional-rendering"` \| `"const"` \| `"constant"` \| `"constructor"` \| `"context"` \| `"context-consumer"` \| `"context-provider"` \| `"context-value"` \| `"create-ref"` \| `"custom-hooks"` \| `"default-props"` \| `"deps"` \| `"destructuring"` \| `"destructuring-assignment"` \| `"direct-mutation"` \| `"display-name"` \| `"document"` \| `"effect"` \| `"element"` \| `"error"` \| `"event"` \| `"event-handler"` \| `"exhaustive-deps"` \| `"expression"` \| `"false"` \| `"filename"` \| `"forward-ref"` \| `"fragment"` \| `"function"` \| `"function-component"` \| `"function-name"` \| `"global"` \| `"handler"` \| `"hook"` \| `"html"` \| `"id"` \| `"index"` \| `"input"` \| `"key"` \| `"literal"` \| `"map"` \| `"memo"` \| `"memoized-function"` \| `"method"` \| `"name"` \| `"namespace"` \| `"node"` \| `"parameter"` \| `"prop"` \| `"ref"` \| `"render"` \| `"return"` \| `"spread"` \| `"state"` \| `"string"` \| `"string-refs"` \| `"style"` \| `"textnodes"` \| `"use-callback"` \| `"use-context"` \| `"use-effect"` \| `"use-imperative-handle"` \| `"use-layout-effect"` \| `"use-memo"` \| `"use-reducer"` \| `"use-ref"` \| `"use-state"` \| `"value"` \| `"variable"`
