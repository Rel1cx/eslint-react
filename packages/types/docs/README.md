@eslint-react/types

# @eslint-react/types

## Table of contents

### Type Aliases

- [Cond](README.md#cond)
- [CreateRule](README.md#createrule)
- [ERSettings](README.md#ersettings)
- [ESLintPluginSettings](README.md#eslintpluginsettings)
- [RuleCategory](README.md#rulecategory)
- [RuleContext](README.md#rulecontext)
- [RuleDeclaration](README.md#ruledeclaration)
- [RuleNamespace](README.md#rulenamespace)
- [RuleOptions](README.md#ruleoptions)
- [RulePreset](README.md#rulepreset)
- [Severity](README.md#severity)

### Variables

- [ERSettingsSchema](README.md#ersettingsschema)
- [ESLintPluginSettingsSchema](README.md#eslintpluginsettingsschema)

### Functions

- [parseERSettings](README.md#parseersettings)
- [parseESLintPluginSettings](README.md#parseeslintpluginsettings)
- [safeParseERSettings](README.md#safeparseersettings)
- [safeParseESLintPluginSettings](README.md#safeparseeslintpluginsettings)

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

### ERSettings

Ƭ **ERSettings**: `Output`\<typeof [`ERSettingsSchema`](README.md#ersettingsschema)\>

---

### ESLintPluginSettings

Ƭ **ESLintPluginSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `eslintReact`: [`ERSettings`](README.md#ersettings) }\>

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

## Variables

### ERSettingsSchema

• `Const` **ERSettingsSchema**: `ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>

---

### ESLintPluginSettingsSchema

• `Const` **ESLintPluginSettingsSchema**: `ObjectSchema`\<\{ `eslintReact`: `OptionalSchema`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>, `undefined`, `undefined` \| \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\> }, `undefined`, \{ `eslintReact?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; reactHooksVariants?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; ... 12 more ...; useTransition?: string[] \| undefined; } \| undefined; version?: string \| undefined; } }\>

## Functions

### parseERSettings

▸ **parseERSettings**(`data`): `Object`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`Object`

| Name                  | Type                                                                                                                                                                                                                                                                                    |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extensions?`         | `string`[]                                                                                                                                                                                                                                                                              |
| `fragment?`           | `string`                                                                                                                                                                                                                                                                                |
| `pragma?`             | `string`                                                                                                                                                                                                                                                                                |
| `reactHooksVariants?` | \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } |
| `version?`            | `string`                                                                                                                                                                                                                                                                                |

---

### parseESLintPluginSettings

▸ **parseESLintPluginSettings**(`data`): `Object`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`Object`

| Name           | Type                                                                                                                                                                                                                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eslintReact?` | \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; reactHooksVariants?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; ... 12 more ...; useTransition?: string[] \| undefined; } \| undefined; version?: string \| undefined; } |

---

### safeParseERSettings

▸ **safeParseERSettings**(`data`): `SafeParseResult`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>\>

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`SafeParseResult`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>\>

---

### safeParseESLintPluginSettings

▸ **safeParseESLintPluginSettings**(`data`): `SafeParseResult`\<`ObjectSchema`\<\{ `eslintReact`: `OptionalSchema`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>, `undefined`, `undefined` \| \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\> }, `undefined`, \{ `eslintReact?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; reactHooksVariants?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; ... 12 more ...; useTransition?: string[] \| undefined; } \| undefined; version?: string \| undefined; } }\>\>

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `data` | `unknown` |

#### Returns

`SafeParseResult`\<`ObjectSchema`\<\{ `eslintReact`: `OptionalSchema`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>, `undefined`, `undefined` \| \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\> }, `undefined`, \{ `eslintReact?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; reactHooksVariants?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; ... 12 more ...; useTransition?: string[] \| undefined; } \| undefined; version?: string \| undefined; } }\>\>
