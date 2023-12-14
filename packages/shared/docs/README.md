@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Type Aliases

- [ESLintReactSettings](README.md#eslintreactsettings)
- [ESLintSettings](README.md#eslintsettings)
- [ReactHostComponentType](README.md#reacthostcomponenttype)

### Variables

- [DEFAULT\_ESLINT\_REACT\_SETTINGS](README.md#default_eslint_react_settings)
- [ESLintReactSettingsSchema](README.md#eslintreactsettingsschema)
- [ESLintSettingsSchema](README.md#eslintsettingsschema)
- [GITHUB\_URL](README.md#github_url)
- [HostHTMLComponentTypes](README.md#hosthtmlcomponenttypes)
- [HostSVGComponentTypes](README.md#hostsvgcomponenttypes)
- [NPM\_SCOPE](README.md#npm_scope)
- [RE\_JAVASCRIPT\_PROTOCOL](README.md#re_javascript_protocol)
- [ReactHostHTMLComponent](README.md#reacthosthtmlcomponent)
- [ReactHostSVGComponent](README.md#reacthostsvgcomponent)
- [ReactHostWebComponent](README.md#reacthostwebcomponent)
- [WEBSITE\_URL](README.md#website_url)

### Functions

- [isHostHTMLComponentName](README.md#ishosthtmlcomponentname)
- [isHostSVGComponentName](README.md#ishostsvgcomponentname)
- [isHostWebComponentName](README.md#ishostwebcomponentname)
- [parse](README.md#parse)
- [safeParse](README.md#safeparse)

## Type Aliases

### ESLintReactSettings

Ƭ **ESLintReactSettings**: `Output`\<typeof [`ESLintReactSettingsSchema`](README.md#eslintreactsettingsschema)\>

---

### ESLintSettings

Ƭ **ESLintSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `eslintReact`: [`ESLintReactSettings`](README.md#eslintreactsettings) }\>

---

### ReactHostComponentType

Ƭ **ReactHostComponentType**: `0` \| `1` \| `2`

## Variables

### DEFAULT\_ESLINT\_REACT\_SETTINGS

• `Const` **DEFAULT\_ESLINT\_REACT\_SETTINGS**: `Object` = `{}`

---

### ESLintReactSettingsSchema

• `Const` **ESLintReactSettingsSchema**: `ObjectSchema`\<\{ `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `jsxExtensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `fragment?`: `string` ; `jsxExtensions?`: `string`[] ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>

---

### ESLintSettingsSchema

• `Const` **ESLintSettingsSchema**: `ObjectSchema`\<\{ `eslintReact`: `OptionalSchema`\<`ObjectSchema`\<\{ `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `jsxExtensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `reactHooksVariants`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[] }\> ; `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> }, `undefined`, \{ `fragment?`: `string` ; `jsxExtensions?`: `string`[] ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\>, `undefined`, `undefined` \| \{ `fragment?`: `string` ; `jsxExtensions?`: `string`[] ; `pragma?`: `string` ; `reactHooksVariants?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `version?`: `string` }\> }, `undefined`, \{ `eslintReact?`: \{ fragment?: string \| undefined; jsxExtensions?: string[] \| undefined; pragma?: string \| undefined; reactHooksVariants?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; ... 12 more ...; useTransition?: string[] \| undefined; } \| undefined; version?: string \| undefined; } }\>

---

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

## Functions

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

### parse

▸ **parse**\<`TSchema`\>(`schema`, `input`, `info?`): `Output`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name      | Type                                 |
| :-------- | :----------------------------------- |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name     | Type                                                                                                                                                               | Description              |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `schema` | `TSchema`                                                                                                                                                          | The schema to be used.   |
| `input`  | `unknown`                                                                                                                                                          | The input to be parsed.  |
| `info?`  | `Pick`\<`Partial`\<`Pick`\<`Issue`, `"origin"` \| `"abortEarly"` \| `"abortPipeEarly"` \| `"skipPipe"`\>\>, `"abortEarly"` \| `"abortPipeEarly"` \| `"skipPipe"`\> | The optional parse info. |

#### Returns

`Output`\<`TSchema`\>

The parsed output.

---

### safeParse

▸ **safeParse**\<`TSchema`\>(`schema`, `input`, `info?`): `SafeParseResult`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name      | Type                                 |
| :-------- | :----------------------------------- |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name     | Type                                                                                                                                                               | Description              |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `schema` | `TSchema`                                                                                                                                                          | The schema to be used.   |
| `input`  | `unknown`                                                                                                                                                          | The input to be parsed.  |
| `info?`  | `Pick`\<`Partial`\<`Pick`\<`Issue`, `"origin"` \| `"abortEarly"` \| `"abortPipeEarly"` \| `"skipPipe"`\>\>, `"abortEarly"` \| `"abortPipeEarly"` \| `"skipPipe"`\> | The optional parse info. |

#### Returns

`SafeParseResult`\<`TSchema`\>

The parsed output.
