@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Classes

- [CaseValidator](classes/CaseValidator.md)

### Type Aliases

- [Additional](README.md#additional)
- [Ban](README.md#ban)
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
- [ReactHostComponentType](README.md#reacthostcomponenttype)
- [RuleCategory](README.md#rulecategory)
- [RuleContext](README.md#rulecontext)
- [RuleDeclaration](README.md#ruledeclaration)
- [RuleName](README.md#rulename)
- [RuleNameWithAdditional](README.md#rulenamewithadditional)
- [RuleOptions](README.md#ruleoptions)
- [RulePreset](README.md#rulepreset)
- [Severity](README.md#severity)
- [Term](README.md#term)

### Variables

- [GITHUB\_URL](README.md#github_url)
- [HostHTMLComponentTypes](README.md#hosthtmlcomponenttypes)
- [HostSVGComponentTypes](README.md#hostsvgcomponenttypes)
- [NPM\_SCOPE](README.md#npm_scope)
- [RE\_JAVASCRIPT\_PROTOCOL](README.md#re_javascript_protocol)
- [ReactHostHTMLComponent](README.md#reacthosthtmlcomponent)
- [ReactHostSVGComponent](README.md#reacthostsvgcomponent)
- [ReactHostWebComponent](README.md#reacthostwebcomponent)
- [WEBSITE\_URL](README.md#website_url)
- [presetRules](README.md#presetrules)
- [uid](README.md#uid)

### Functions

- [createRuleForPlugin](README.md#createruleforplugin)
- [getCaseValidator](README.md#getcasevalidator)
- [getRule](README.md#getrule)
- [isHostHTMLComponentName](README.md#ishosthtmlcomponentname)
- [isHostSVGComponentName](README.md#ishostsvgcomponentname)
- [isHostWebComponentName](README.md#ishostwebcomponentname)
- [mergeConfigs](README.md#mergeconfigs)
- [splitName](README.md#splitname)

## Type Aliases

### Additional

Ƭ **Additional**: `string`

---

### Ban

Ƭ **Ban**: `"ban"`

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

Ƭ **Namespace**: `"debug"` \| `"experimental"` \| `"jsx"` \| `"naming-convention"` \| `"react"` \| `"react-hooks"`

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

### ReactHostComponentType

Ƭ **ReactHostComponentType**: `0` \| `1` \| `2`

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

Ƭ **Term**: `"argument"` \| `"array"` \| `"array-index"` \| `"arrow-function"` \| `"attribute"` \| `"callback"` \| `"children"` \| `"class"` \| `"class-component"` \| `"class-method"` \| `"class-property"` \| `"clone-element"` \| `"comment"` \| `"component"` \| `"components"` \| `"computed"` \| `"computed-property"` \| `"conditional-rendering"` \| `"const"` \| `"constant"` \| `"constructor"` \| `"context"` \| `"context-consumer"` \| `"context-provider"` \| `"context-value"` \| `"create-ref"` \| `"custom-hooks"` \| `"default-props"` \| `"deps"` \| `"destructuring"` \| `"destructuring-assignment"` \| `"direct-mutation"` \| `"display-name"` \| `"document"` \| `"effect"` \| `"element"` \| `"error"` \| `"event"` \| `"event-handler"` \| `"exhaustive-deps"` \| `"expression"` \| `"false"` \| `"filename"` \| `"forward-ref"` \| `"fragment"` \| `"function"` \| `"function-component"` \| `"function-name"` \| `"global"` \| `"handler"` \| `"hook"` \| `"html"` \| `"id"` \| `"index"` \| `"input"` \| `"key"` \| `"list-rendering"` \| `"literal"` \| `"map"` \| `"memo"` \| `"memoized-function"` \| `"method"` \| `"name"` \| `"namespace"` \| `"node"` \| `"parameter"` \| `"prop"` \| `"ref"` \| `"render"` \| `"return"` \| `"spread"` \| `"state"` \| `"string"` \| `"string-refs"` \| `"style"` \| `"textnodes"` \| `"use-callback"` \| `"use-context"` \| `"use-effect"` \| `"use-imperative-handle"` \| `"use-layout-effect"` \| `"use-memo"` \| `"use-reducer"` \| `"use-ref"` \| `"use-state"` \| `"value"` \| `"variable"`

## Variables

### GITHUB\_URL

• `Const` **GITHUB\_URL**: `"https://github.com/rel1cx/eslint-react/blob/main"`

---

### HostHTMLComponentTypes

• `Const` **HostHTMLComponentTypes**: readonly [`"aside"`, `"audio"`, `"b"`, `"base"`, `"bdi"`, `"bdo"`, `"blockquote"`, `"body"`, `"br"`, `"button"`, `"canvas"`, `"caption"`, `"cite"`, `"code"`, `"col"`, `"colgroup"`, `"data"`, `"datalist"`, `"dd"`, `"del"`, `"details"`, `"dfn"`, `"dialog"`, `"div"`, `"dl"`, `"dt"`, `"em"`, `"embed"`, `"fieldset"`, `"figcaption"`, `"figure"`, `"footer"`, `"form"`, `"h1"`, `"head"`, `"header"`, `"hgroup"`, `"hr"`, `"html"`, `"i"`, `"iframe"`, `"img"`, `"input"`, `"ins"`, `"kbd"`, `"label"`, `"legend"`, `"li"`, `"link"`, `"main"`, `"map"`, `"mark"`, `"menu"`, `"meta"`, `"meter"`, `"nav"`, `"noscript"`, `"object"`, `"ol"`, `"optgroup"`, `"option"`, `"output"`, `"p"`, `"picture"`, `"pre"`, `"progress"`, `"q"`, `"rp"`, `"rt"`, `"ruby"`, `"s"`, `"samp"`, `"script"`, `"section"`, `"select"`, `"slot"`, `"small"`, `"source"`, `"span"`, `"strong"`, `"style"`, `"sub"`, `"summary"`, `"sup"`, `"table"`, `"tbody"`, `"td"`, `"template"`, `"textarea"`, `"tfoot"`, `"th"`, `"thead"`, `"time"`, `"title"`, `"tr"`, `"track"`, `"u"`, `"ul"`, `"var"`, `"video"`, `"wbr"`]

---

### HostSVGComponentTypes

• `Const` **HostSVGComponentTypes**: readonly [`"a"`, `"animate"`, `"animateMotion"`, `"animateTransform"`, `"circle"`, `"clipPath"`, `"defs"`, `"desc"`, `"discard"`, `"ellipse"`, `"feBlend"`, `"feColorMatrix"`, `"feComponentTransfer"`, `"feComposite"`, `"feConvolveMatrix"`, `"feDiffuseLighting"`, `"feDisplacementMap"`, `"feDistantLight"`, `"feDropShadow"`, `"feFlood"`, `"feFuncA"`, `"feFuncB"`, `"feFuncG"`, `"feFuncR"`, `"feGaussianBlur"`, `"feImage"`, `"feMerge"`, `"feMergeNode"`, `"feMorphology"`, `"feOffset"`, `"fePointLight"`, `"feSpecularLighting"`, `"feSpotLight"`, `"feTile"`, `"feTurbulence"`, `"filter"`, `"foreignObject"`, `"g"`, `"hatch"`, `"hatchpath"`, `"image"`, `"line"`, `"linearGradient"`, `"marker"`, `"mask"`, `"metadata"`, `"mpath"`, `"path"`, `"pattern"`, `"polygon"`, `"polyline"`, `"radialGradient"`, `"rect"`, `"script"`, `"set"`, `"stop"`, `"style"`, `"svg"`, `"switch"`, `"symbol"`, `"text"`, `"textPath"`, `"title"`, `"tspan"`, `"use"`, `"view"`]

---

### NPM\_SCOPE

• `Const` **NPM\_SCOPE**: `"@eslint-react"`

---

### RE\_JAVASCRIPT\_PROTOCOL

• `Const` **RE\_JAVASCRIPT\_PROTOCOL**: `RegExp`

---

### ReactHostHTMLComponent

• `Const` **ReactHostHTMLComponent**: `0`

---

### ReactHostSVGComponent

• `Const` **ReactHostSVGComponent**: `1`

---

### ReactHostWebComponent

• `Const` **ReactHostWebComponent**: `2`

---

### WEBSITE\_URL

• `Const` **WEBSITE\_URL**: `"https://eslint-react.rel1cx.io"`

---

### presetRules

• `Const` **presetRules**: `PresetRules`

---

### uid

• `Const` **uid**: `default`

## Functions

### createRuleForPlugin

▸ **createRuleForPlugin**(`pluginName`): \<TOptions, TMessageIds\>(`urlCreator`: `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\>) => `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `pluginName` | `string` |

#### Returns

`fn`

▸ \<`TOptions`, `TMessageIds`\>(`urlCreator`): `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Creates reusable function to create rules with default options and docs URLs.

##### Type parameters

| Name          | Type                         |
| :------------ | :--------------------------- |
| `TOptions`    | extends readonly `unknown`[] |
| `TMessageIds` | extends `string`             |

##### Parameters

| Name         | Type                                                             | Description                                        |
| :----------- | :--------------------------------------------------------------- | :------------------------------------------------- |
| `urlCreator` | `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\> | Creates a documentation URL for a given rule name. |

##### Returns

`RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Function to create a rule with the docs URL format.

---

### getCaseValidator

▸ **getCaseValidator**(`ruleName`, `ignorePattern?`): [`CaseValidator`](classes/CaseValidator.md)

#### Parameters

| Name            | Type       | Default value |
| :-------------- | :--------- | :------------ |
| `ruleName`      | `string`   | `undefined`   |
| `ignorePattern` | `string`[] | `[]`          |

#### Returns

[`CaseValidator`](classes/CaseValidator.md)

---

### getRule

▸ **getRule**(`expression`, `preset?`): `Rule`

#### Parameters

| Name         | Type          | Default value |
| :----------- | :------------ | :------------ |
| `expression` | `string`      | `undefined`   |
| `preset`     | `PresetRules` | `presetRules` |

#### Returns

`Rule`

---

### isHostHTMLComponentName

▸ **isHostHTMLComponentName**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

---

### isHostSVGComponentName

▸ **isHostSVGComponentName**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

---

### isHostWebComponentName

▸ **isHostWebComponentName**(`name`): `void`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`void`

---

### mergeConfigs

▸ **mergeConfigs**\<`Ts`\>(`...objects`): `DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: `"DeepMergeArraysDefaultURI"` ; `DeepMergeMapsURI`: `"DeepMergeMapsDefaultURI"` ; `DeepMergeOthersURI`: `"DeepMergeLeafURI"` ; `DeepMergeRecordsURI`: `"DeepMergeRecordsDefaultURI"` ; `DeepMergeSetsURI`: `"DeepMergeSetsDefaultURI"` }\>, \{ `keyPath`: `PropertyKey`[] }\>

Deeply merge two or more objects using the given options and meta data.

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `Ts` | extends readonly `unknown`[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `...objects` | `Ts` |

#### Returns

`DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: `"DeepMergeArraysDefaultURI"` ; `DeepMergeMapsURI`: `"DeepMergeMapsDefaultURI"` ; `DeepMergeOthersURI`: `"DeepMergeLeafURI"` ; `DeepMergeRecordsURI`: `"DeepMergeRecordsDefaultURI"` ; `DeepMergeSetsURI`: `"DeepMergeSetsDefaultURI"` }\>, \{ `keyPath`: `PropertyKey`[] }\>

---

### splitName

▸ **splitName**(`name`): `string`[]

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`string`[]
