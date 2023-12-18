@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Classes

- [CaseValidator](classes/CaseValidator.md)

### Type Aliases

- [ESLintReactSettings](README.md#eslintreactsettings)
- [ESLintSettings](README.md#eslintsettings)

### Variables

- [ESLintReactSettingsSchema](README.md#eslintreactsettingsschema)
- [ESLintSettingsSchema](README.md#eslintsettingsschema)
- [GITHUB\_URL](README.md#github_url)
- [HOST\_HTML\_COMPONENT\_TYPES](README.md#host_html_component_types)
- [HOST\_SVG\_COMPONENT\_TYPES](README.md#host_svg_component_types)
- [NPM\_SCOPE](README.md#npm_scope)
- [RE\_JAVASCRIPT\_PROTOCOL](README.md#re_javascript_protocol)
- [WEBSITE\_URL](README.md#website_url)
- [presetRules](README.md#presetrules)

### Functions

- [getCaseValidator](README.md#getcasevalidator)
- [getRule](README.md#getrule)
- [parse](README.md#parse)
- [safeParse](README.md#safeparse)
- [splitName](README.md#splitname)

## Type Aliases

### ESLintReactSettings

Ƭ **ESLintReactSettings**: `ReadonlyDeep`\<`Output`\<typeof [`ESLintReactSettingsSchema`](README.md#eslintreactsettingsschema)\>\>

___

### ESLintSettings

Ƭ **ESLintSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `eslintReact?`: [`ESLintReactSettings`](README.md#eslintreactsettings)  }\>

## Variables

### ESLintReactSettingsSchema

• `Const` **ESLintReactSettingsSchema**: `ObjectSchema`\<\{ `jsx`: `OptionalSchema`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\>  }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string`  }\>, `undefined`, `undefined` \| \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string`  }\> ; `namingConvention`: `OptionalSchema`\<`ObjectSchema`\<{}, `undefined`, {}\>, `undefined`, `undefined` \| {}\> ; `react`: `OptionalSchema`\<`ObjectSchema`\<\{ `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\>  }, `undefined`, \{ `version?`: `string`  }\>, `undefined`, `undefined` \| \{ `version?`: `string`  }\> ; `reactHooks`: `OptionalSchema`\<`ObjectSchema`\<\{ `alias`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\>  }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[]  }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[]  }\> ; `debug`: `OptionalSchema`\<`ObjectSchema`\<{}, `undefined`, {}\>, `undefined`, `undefined` \| {}\>  }, `undefined`, \{ `alias?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `debug?`: \{}  }\>, `undefined`, `undefined` \| \{ `alias?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `debug?`: \{}  }\>  }, `undefined`, \{ `jsx?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; } ; `namingConvention?`: \{} ; `react?`: \{ version?: string \| undefined; } ; `reactHooks?`: \{ alias?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; ... 9 more ...; useTransition?: string[] \| undefined; } \| undefined; debug?: \{} \| undefined; }  }\>

___

### ESLintSettingsSchema

• `Const` **ESLintSettingsSchema**: `ObjectSchema`\<\{ `eslintReact`: `OptionalSchema`\<`ObjectSchema`\<\{ `jsx`: `OptionalSchema`\<`ObjectSchema`\<\{ `extensions`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `fragment`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\> ; `pragma`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\>  }, `undefined`, \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string`  }\>, `undefined`, `undefined` \| \{ `extensions?`: `string`[] ; `fragment?`: `string` ; `pragma?`: `string`  }\> ; `namingConvention`: `OptionalSchema`\<`ObjectSchema`\<{}, `undefined`, {}\>, `undefined`, `undefined` \| {}\> ; `react`: `OptionalSchema`\<`ObjectSchema`\<\{ `version`: `OptionalSchema`\<`StringSchema`\<`string`\>, `undefined`, `undefined` \| `string`\>  }, `undefined`, \{ `version?`: `string`  }\>, `undefined`, `undefined` \| \{ `version?`: `string`  }\> ; `reactHooks`: `OptionalSchema`\<`ObjectSchema`\<\{ `alias`: `OptionalSchema`\<`ObjectSchema`\<\{ `useCallback`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useContext`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDebugValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useDeferredValue`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useId`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useImperativeHandle`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useInsertionEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useLayoutEffect`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useMemo`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useReducer`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useRef`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useState`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useSyncExternalStore`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\> ; `useTransition`: `OptionalSchema`\<`ArraySchema`\<`StringSchema`\<`string`\>, `string`[]\>, `undefined`, `undefined` \| `string`[]\>  }, `undefined`, \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[]  }\>, `undefined`, `undefined` \| \{ `useCallback?`: `string`[] ; `useContext?`: `string`[] ; `useDebugValue?`: `string`[] ; `useDeferredValue?`: `string`[] ; `useEffect?`: `string`[] ; `useId?`: `string`[] ; `useImperativeHandle?`: `string`[] ; `useInsertionEffect?`: `string`[] ; `useLayoutEffect?`: `string`[] ; `useMemo?`: `string`[] ; `useReducer?`: `string`[] ; `useRef?`: `string`[] ; `useState?`: `string`[] ; `useSyncExternalStore?`: `string`[] ; `useTransition?`: `string`[]  }\> ; `debug`: `OptionalSchema`\<`ObjectSchema`\<{}, `undefined`, {}\>, `undefined`, `undefined` \| {}\>  }, `undefined`, \{ `alias?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `debug?`: \{}  }\>, `undefined`, `undefined` \| \{ `alias?`: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; useId?: string[] \| undefined; ... 8 more ...; useTransition?: string[] \| undefined; } ; `debug?`: \{}  }\>  }, `undefined`, \{ `jsx?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; } ; `namingConvention?`: \{} ; `react?`: \{ version?: string \| undefined; } ; `reactHooks?`: \{ alias?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; ... 9 more ...; useTransition?: string[] \| undefined; } \| undefined; debug?: \{} \| undefined; }  }\>, `undefined`, `undefined` \| \{ `jsx?`: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; } ; `namingConvention?`: \{} ; `react?`: \{ version?: string \| undefined; } ; `reactHooks?`: \{ alias?: \{ useCallback?: string[] \| undefined; useContext?: string[] \| undefined; useDebugValue?: string[] \| undefined; useDeferredValue?: string[] \| undefined; useEffect?: string[] \| undefined; ... 9 more ...; useTransition?: string[] \| undefined; } \| undefined; debug?: \{} \| undefined; }  }\>  }, `undefined`, \{ `eslintReact?`: \{ jsx?: \{ extensions?: string[] \| undefined; fragment?: string \| undefined; pragma?: string \| undefined; } \| undefined; namingConvention?: \{} \| undefined; react?: \{ version?: string \| undefined; } \| undefined; reactHooks?: \{ ...; } \| undefined; }  }\>

___

### GITHUB\_URL

• `Const` **GITHUB\_URL**: ``"https://github.com/rel1cx/eslint-react/blob/main"``

___

### HOST\_HTML\_COMPONENT\_TYPES

• `Const` **HOST\_HTML\_COMPONENT\_TYPES**: readonly [``"aside"``, ``"audio"``, ``"b"``, ``"base"``, ``"bdi"``, ``"bdo"``, ``"blockquote"``, ``"body"``, ``"br"``, ``"button"``, ``"canvas"``, ``"caption"``, ``"cite"``, ``"code"``, ``"col"``, ``"colgroup"``, ``"data"``, ``"datalist"``, ``"dd"``, ``"del"``, ``"details"``, ``"dfn"``, ``"dialog"``, ``"div"``, ``"dl"``, ``"dt"``, ``"em"``, ``"embed"``, ``"fieldset"``, ``"figcaption"``, ``"figure"``, ``"footer"``, ``"form"``, ``"h1"``, ``"head"``, ``"header"``, ``"hgroup"``, ``"hr"``, ``"html"``, ``"i"``, ``"iframe"``, ``"img"``, ``"input"``, ``"ins"``, ``"kbd"``, ``"label"``, ``"legend"``, ``"li"``, ``"link"``, ``"main"``, ``"map"``, ``"mark"``, ``"menu"``, ``"meta"``, ``"meter"``, ``"nav"``, ``"noscript"``, ``"object"``, ``"ol"``, ``"optgroup"``, ``"option"``, ``"output"``, ``"p"``, ``"picture"``, ``"pre"``, ``"progress"``, ``"q"``, ``"rp"``, ``"rt"``, ``"ruby"``, ``"s"``, ``"samp"``, ``"script"``, ``"section"``, ``"select"``, ``"slot"``, ``"small"``, ``"source"``, ``"span"``, ``"strong"``, ``"style"``, ``"sub"``, ``"summary"``, ``"sup"``, ``"table"``, ``"tbody"``, ``"td"``, ``"template"``, ``"textarea"``, ``"tfoot"``, ``"th"``, ``"thead"``, ``"time"``, ``"title"``, ``"tr"``, ``"track"``, ``"u"``, ``"ul"``, ``"var"``, ``"video"``, ``"wbr"``]

___

### HOST\_SVG\_COMPONENT\_TYPES

• `Const` **HOST\_SVG\_COMPONENT\_TYPES**: readonly [``"a"``, ``"animate"``, ``"animateMotion"``, ``"animateTransform"``, ``"circle"``, ``"clipPath"``, ``"defs"``, ``"desc"``, ``"discard"``, ``"ellipse"``, ``"feBlend"``, ``"feColorMatrix"``, ``"feComponentTransfer"``, ``"feComposite"``, ``"feConvolveMatrix"``, ``"feDiffuseLighting"``, ``"feDisplacementMap"``, ``"feDistantLight"``, ``"feDropShadow"``, ``"feFlood"``, ``"feFuncA"``, ``"feFuncB"``, ``"feFuncG"``, ``"feFuncR"``, ``"feGaussianBlur"``, ``"feImage"``, ``"feMerge"``, ``"feMergeNode"``, ``"feMorphology"``, ``"feOffset"``, ``"fePointLight"``, ``"feSpecularLighting"``, ``"feSpotLight"``, ``"feTile"``, ``"feTurbulence"``, ``"filter"``, ``"foreignObject"``, ``"g"``, ``"hatch"``, ``"hatchpath"``, ``"image"``, ``"line"``, ``"linearGradient"``, ``"marker"``, ``"mask"``, ``"metadata"``, ``"mpath"``, ``"path"``, ``"pattern"``, ``"polygon"``, ``"polyline"``, ``"radialGradient"``, ``"rect"``, ``"script"``, ``"set"``, ``"stop"``, ``"style"``, ``"svg"``, ``"switch"``, ``"symbol"``, ``"text"``, ``"textPath"``, ``"title"``, ``"tspan"``, ``"use"``, ``"view"``]

___

### NPM\_SCOPE

• `Const` **NPM\_SCOPE**: ``"@eslint-react"``

___

### RE\_JAVASCRIPT\_PROTOCOL

• `Const` **RE\_JAVASCRIPT\_PROTOCOL**: `RegExp`

___

### WEBSITE\_URL

• `Const` **WEBSITE\_URL**: ``"https://eslint-react.rel1cx.io"``

___

### presetRules

• `Const` **presetRules**: `PresetRules`

## Functions

### getCaseValidator

▸ **getCaseValidator**(`ruleName`, `ignorePattern?`): [`CaseValidator`](classes/CaseValidator.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ruleName` | `string` | `undefined` |
| `ignorePattern` | `string`[] | `[]` |

#### Returns

[`CaseValidator`](classes/CaseValidator.md)

___

### getRule

▸ **getRule**(`expression`, `preset?`): `Rule`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expression` | `string` | `undefined` |
| `preset` | `PresetRules` | `presetRules` |

#### Returns

`Rule`

___

### parse

▸ **parse**\<`TSchema`\>(`schema`, `input`, `info?`): `Output`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `TSchema` | The schema to be used. |
| `input` | `unknown` | The input to be parsed. |
| `info?` | `Pick`\<`Partial`\<`Pick`\<`Issue`, ``"origin"`` \| ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\>\>, ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\> | The optional parse info. |

#### Returns

`Output`\<`TSchema`\>

The parsed output.

___

### safeParse

▸ **safeParse**\<`TSchema`\>(`schema`, `input`, `info?`): `SafeParseResult`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `TSchema` | The schema to be used. |
| `input` | `unknown` | The input to be parsed. |
| `info?` | `Pick`\<`Partial`\<`Pick`\<`Issue`, ``"origin"`` \| ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\>\>, ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\> | The optional parse info. |

#### Returns

`SafeParseResult`\<`TSchema`\>

The parsed output.

___

### splitName

▸ **splitName**(`name`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`[]
