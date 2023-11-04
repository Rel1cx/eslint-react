@eslint-react/core

# @eslint-react/core

## Table of contents

### Type Aliases

- [ComponentCollectorCache](README.md#componentcollectorcache)
- [ComponentCollectorLegacyCache](README.md#componentcollectorlegacycache)
- [ComponentType](README.md#componenttype)
- [HostComponentType](README.md#hostcomponenttype)

### Variables

- [ClassComponent](README.md#classcomponent)
- [ComponentCollectorHint](README.md#componentcollectorhint)
- [ComponentCollectorLegacyHint](README.md#componentcollectorlegacyhint)
- [ContextConsumer](README.md#contextconsumer)
- [ContextProvider](README.md#contextprovider)
- [DehydratedFragment](README.md#dehydratedfragment)
- [ForwardRef](README.md#forwardref)
- [Fragment](README.md#fragment)
- [FunctionComponent](README.md#functioncomponent)
- [HostComponent](README.md#hostcomponent)
- [HostHTMLComponent](README.md#hosthtmlcomponent)
- [HostHTMLComponentTypes](README.md#hosthtmlcomponenttypes)
- [HostPortal](README.md#hostportal)
- [HostRoot](README.md#hostroot)
- [HostSVGComponent](README.md#hostsvgcomponent)
- [HostSVGComponentTypes](README.md#hostsvgcomponenttypes)
- [HostText](README.md#hosttext)
- [HostWebComponent](README.md#hostwebcomponent)
- [LazyComponent](README.md#lazycomponent)
- [MemoComponent](README.md#memocomponent)
- [Mode](README.md#mode)
- [Profiler](README.md#profiler)
- [RE\_COMPONENT\_NAME](README.md#re_component_name)
- [RE\_HOOK\_NAME](README.md#re_hook_name)
- [SuspenseComponent](README.md#suspensecomponent)
- [SuspenseListComponent](README.md#suspenselistcomponent)

### Functions

- [componentCollector](README.md#componentcollector)
- [componentCollectorLegacy](README.md#componentcollectorlegacy)
- [getParentClassComponent](README.md#getparentclasscomponent)
- [hooksCollector](README.md#hookscollector)
- [isClassComponent](README.md#isclasscomponent)
- [isCreateContext](README.md#iscreatecontext)
- [isFunctionOfRenderMethod](README.md#isfunctionofrendermethod)
- [isHostHTMLComponentName](README.md#ishosthtmlcomponentname)
- [isHostSVGComponentName](README.md#ishostsvgcomponentname)
- [isHostWebComponentName](README.md#ishostwebcomponentname)
- [isInsideRenderMethod](README.md#isinsiderendermethod)
- [isPureComponent](README.md#ispurecomponent)
- [isStateMemberExpression](README.md#isstatememberexpression)
- [isValidReactComponentName](README.md#isvalidreactcomponentname)
- [isValidReactHookName](README.md#isvalidreacthookname)
- [unsafeIsDeclaredInRenderProp](README.md#unsafeisdeclaredinrenderprop)
- [unsafeIsDirectValueOfRenderProperty](README.md#unsafeisdirectvalueofrenderproperty)
- [unsafeIsInsideReactHookCall](README.md#unsafeisinsidereacthookcall)
- [unsafeIsReactHookCall](README.md#unsafeisreacthookcall)
- [unsafeIsRenderFunction](README.md#unsafeisrenderfunction)
- [unsafeIsRenderProp](README.md#unsafeisrenderprop)

## Type Aliases

### ComponentCollectorCache

Ƭ **ComponentCollectorCache**: `WeakMap`\<`TSESTreeFunction`, `bigint`\>

---

### ComponentCollectorLegacyCache

Ƭ **ComponentCollectorLegacyCache**: `WeakMap`\<`TSESTreeClass`, `bigint`\>

---

### ComponentType

Ƭ **ComponentType**: `0` \| `1` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `16` \| `18` \| `19` \| `20`

---

### HostComponentType

Ƭ **HostComponentType**: `0` \| `1` \| `2`

## Variables

### ClassComponent

• `Const` **ClassComponent**: `1`

---

### ComponentCollectorHint

• `Const` **ComponentCollectorHint**: `Object`

#### Type declaration

| Name                    | Type     |
| :---------------------- | :------- |
| `IgnoreCreateElement`   | `bigint` |
| `IgnoreMapCall`         | `bigint` |
| `IgnoreNull`            | `bigint` |
| `None`                  | `0n`     |
| `StrictArrayExpression` | `bigint` |
| `StrictConditional`     | `bigint` |
| `StrictLogical`         | `bigint` |

---

### ComponentCollectorLegacyHint

• `Const` **ComponentCollectorLegacyHint**: `Object`

#### Type declaration

| Name                    | Type     |
| :---------------------- | :------- |
| `IgnoreCreateElement`   | `bigint` |
| `IgnoreNull`            | `bigint` |
| `None`                  | `0n`     |
| `StrictArrayExpression` | `bigint` |
| `StrictConditional`     | `bigint` |
| `StrictLogical`         | `bigint` |

---

### ContextConsumer

• `Const` **ContextConsumer**: `9`

---

### ContextProvider

• `Const` **ContextProvider**: `10`

---

### DehydratedFragment

• `Const` **DehydratedFragment**: `18`

---

### ForwardRef

• `Const` **ForwardRef**: `11`

---

### Fragment

• `Const` **Fragment**: `7`

---

### FunctionComponent

• `Const` **FunctionComponent**: `0`

---

### HostComponent

• `Const` **HostComponent**: `5`

---

### HostHTMLComponent

• `Const` **HostHTMLComponent**: `0`

---

### HostHTMLComponentTypes

• `Const` **HostHTMLComponentTypes**: readonly [`"aside"`, `"audio"`, `"b"`, `"base"`, `"bdi"`, `"bdo"`, `"blockquote"`, `"body"`, `"br"`, `"button"`, `"canvas"`, `"caption"`, `"cite"`, `"code"`, `"col"`, `"colgroup"`, `"data"`, `"datalist"`, `"dd"`, `"del"`, `"details"`, `"dfn"`, `"dialog"`, `"div"`, `"dl"`, `"dt"`, `"em"`, `"embed"`, `"fieldset"`, `"figcaption"`, `"figure"`, `"footer"`, `"form"`, `"h1"`, `"head"`, `"header"`, `"hgroup"`, `"hr"`, `"html"`, `"i"`, `"iframe"`, `"img"`, `"input"`, `"ins"`, `"kbd"`, `"label"`, `"legend"`, `"li"`, `"link"`, `"main"`, `"map"`, `"mark"`, `"menu"`, `"meta"`, `"meter"`, `"nav"`, `"noscript"`, `"object"`, `"ol"`, `"optgroup"`, `"option"`, `"output"`, `"p"`, `"picture"`, `"pre"`, `"progress"`, `"q"`, `"rp"`, `"rt"`, `"ruby"`, `"s"`, `"samp"`, `"script"`, `"section"`, `"select"`, `"slot"`, `"small"`, `"source"`, `"span"`, `"strong"`, `"style"`, `"sub"`, `"summary"`, `"sup"`, `"table"`, `"tbody"`, `"td"`, `"template"`, `"textarea"`, `"tfoot"`, `"th"`, `"thead"`, `"time"`, `"title"`, `"tr"`, `"track"`, `"u"`, `"ul"`, `"var"`, `"video"`, `"wbr"`]

---

### HostPortal

• `Const` **HostPortal**: `4`

---

### HostRoot

• `Const` **HostRoot**: `3`

---

### HostSVGComponent

• `Const` **HostSVGComponent**: `1`

---

### HostSVGComponentTypes

• `Const` **HostSVGComponentTypes**: readonly [`"a"`, `"animate"`, `"animateMotion"`, `"animateTransform"`, `"circle"`, `"clipPath"`, `"defs"`, `"desc"`, `"discard"`, `"ellipse"`, `"feBlend"`, `"feColorMatrix"`, `"feComponentTransfer"`, `"feComposite"`, `"feConvolveMatrix"`, `"feDiffuseLighting"`, `"feDisplacementMap"`, `"feDistantLight"`, `"feDropShadow"`, `"feFlood"`, `"feFuncA"`, `"feFuncB"`, `"feFuncG"`, `"feFuncR"`, `"feGaussianBlur"`, `"feImage"`, `"feMerge"`, `"feMergeNode"`, `"feMorphology"`, `"feOffset"`, `"fePointLight"`, `"feSpecularLighting"`, `"feSpotLight"`, `"feTile"`, `"feTurbulence"`, `"filter"`, `"foreignObject"`, `"g"`, `"hatch"`, `"hatchpath"`, `"image"`, `"line"`, `"linearGradient"`, `"marker"`, `"mask"`, `"metadata"`, `"mpath"`, `"path"`, `"pattern"`, `"polygon"`, `"polyline"`, `"radialGradient"`, `"rect"`, `"script"`, `"set"`, `"stop"`, `"style"`, `"svg"`, `"switch"`, `"symbol"`, `"text"`, `"textPath"`, `"title"`, `"tspan"`, `"use"`, `"view"`]

---

### HostText

• `Const` **HostText**: `6`

---

### HostWebComponent

• `Const` **HostWebComponent**: `2`

---

### LazyComponent

• `Const` **LazyComponent**: `16`

---

### MemoComponent

• `Const` **MemoComponent**: `14`

---

### Mode

• `Const` **Mode**: `8`

---

### Profiler

• `Const` **Profiler**: `12`

---

### RE\_COMPONENT\_NAME

• `Const` **RE\_COMPONENT\_NAME**: `RegExp`

---

### RE\_HOOK\_NAME

• `Const` **RE\_HOOK\_NAME**: `RegExp`

---

### SuspenseComponent

• `Const` **SuspenseComponent**: `13`

---

### SuspenseListComponent

• `Const` **SuspenseListComponent**: `19`

## Functions

### componentCollector

▸ **componentCollector**(`context`, `hint?`, `cache?`): `Object`

#### Parameters

| Name      | Type                                                           | Default value                 |
| :-------- | :------------------------------------------------------------- | :---------------------------- |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>  | `undefined`                   |
| `hint`    | `bigint`                                                       | `ComponentCollectorHint.None` |
| `cache`   | [`ComponentCollectorCache`](README.md#componentcollectorcache) | `undefined`                   |

#### Returns

`Object`

| Name                                                             | Type                                                                                                                                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                                                            | \{ `getCurrentFunction`: () => `Option`\<`NonNullable`\<`undefined` \| `TSESTreeFunction`\>\> ; `getAllComponents`: () => `Either`\<`Error`, `TSESTreeFunction`[]\> ; `getCurrentComponents`: () => `TSESTreeFunction`[] ; `getCurrentFunctionStack`: () => `TSESTreeFunction`[] }                                                                    |
| `ctx.getCurrentFunction`                                         | () => `Option`\<`NonNullable`\<`undefined` \| `TSESTreeFunction`\>\>                                                                                                                                                                                                                                                                                  |
| `ctx.getAllComponents`                                           | [object Object]                                                                                                                                                                                                                                                                                                                                       |
| `ctx.getCurrentComponents`                                       | [object Object]                                                                                                                                                                                                                                                                                                                                       |
| `ctx.getCurrentFunctionStack`                                    | [object Object]                                                                                                                                                                                                                                                                                                                                       |
| `listeners`                                                      | \{ `:function`: (`node`: `TSESTreeFunction`) => `MutableList`\<`TSESTreeFunction`\> = onFunctionEnter; `:function:exit`: () => `undefined` \| `TSESTreeFunction` = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: (`node`: `ArrowFunctionExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void` } |
| `listeners.:function`                                            | (`node`: `TSESTreeFunction`) => `MutableList`\<`TSESTreeFunction`\>                                                                                                                                                                                                                                                                                   |
| `listeners.:function:exit`                                       | () => `undefined` \| `TSESTreeFunction`                                                                                                                                                                                                                                                                                                               |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']` | [object Object]                                                                                                                                                                                                                                                                                                                                       |
| `listeners.ReturnStatement`                                      | [object Object]                                                                                                                                                                                                                                                                                                                                       |

---

### componentCollectorLegacy

▸ **componentCollectorLegacy**(`context`, `hint?`, `cache?`): `Object`

#### Parameters

| Name      | Type                                                                       | Default value                       |
| :-------- | :------------------------------------------------------------------------- | :---------------------------------- |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>              | `undefined`                         |
| `hint`    | `bigint`                                                                   | `ComponentCollectorLegacyHint.None` |
| `cache`   | [`ComponentCollectorLegacyCache`](README.md#componentcollectorlegacycache) | `undefined`                         |

#### Returns

`Object`

| Name                         | Type                                                                                                                                     |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                        | \{ `getAllComponents`: () => `Either`\<`Error`, `TSESTreeClass`[]\> ; `getCurrentComponents`: () => `TSESTreeClass`[] }                  |
| `ctx.getAllComponents`       | [object Object]                                                                                                                          |
| `ctx.getCurrentComponents`   | [object Object]                                                                                                                          |
| `listeners`                  | \{ `ClassDeclaration`: (`node`: `TSESTreeClass`) => `void` = collect; `ClassExpression`: (`node`: `TSESTreeClass`) => `void` = collect } |
| `listeners.ClassDeclaration` | (`node`: `TSESTreeClass`) => `void`                                                                                                      |
| `listeners.ClassExpression`  | (`node`: `TSESTreeClass`) => `void`                                                                                                      |

---

### getParentClassComponent

▸ **getParentClassComponent**(`context`): `null` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

Get the parent class component of a node up to global scope

#### Parameters

| Name      | Type                                                          | Description      |
| :-------- | :------------------------------------------------------------ | :--------------- |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`null` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

**`Deprecated`**

It will be removed in the future

---

### hooksCollector

▸ **hooksCollector**(`context`): `Object`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name                           | Type                                                                                                                                                                                                                                                   |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                          | \{ `getAllHooks`: () => `Either`\<`Error`, `TSESTreeFunction`[]\> ; `getAllRedundantHooks`: () => `Either`\<`Error`, `TSESTreeFunction`[]\> ; `getCurrentHooks`: () => `TSESTreeFunction`[] ; `getCurrentRedundantHooks`: () => `TSESTreeFunction`[] } |
| `ctx.getAllHooks`              | [object Object]                                                                                                                                                                                                                                        |
| `ctx.getAllRedundantHooks`     | [object Object]                                                                                                                                                                                                                                        |
| `ctx.getCurrentHooks`          | [object Object]                                                                                                                                                                                                                                        |
| `ctx.getCurrentRedundantHooks` | [object Object]                                                                                                                                                                                                                                        |
| `listeners`                    | `ESLintUtils.RuleListener`                                                                                                                                                                                                                             |

---

### isClassComponent

▸ **isClassComponent**(`node`, `context`): node is TSESTreeClass

Check if a node is a React class component

#### Parameters

| Name      | Type                                                          | Description           |
| :-------- | :------------------------------------------------------------ | :-------------------- |
| `node`    | `Node`                                                        | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

node is TSESTreeClass

**`Deprecated`**

It will be removed in the future

---

### isCreateContext

▸ **isCreateContext**(`node`): `boolean`

Determines whether `createContext` is used

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if the node is a call expression to `createContext`

---

### isFunctionOfRenderMethod

▸ **isFunctionOfRenderMethod**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `TSESTreeFunction`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

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

▸ **isHostWebComponentName**(): `void`

#### Returns

`void`

---

### isInsideRenderMethod

▸ **isInsideRenderMethod**(`node`, `context`): `boolean`

Check whether given node is declared inside class component's render block

```jsx
class Component extends React.Component {
  render() {
    class NestedClassComponent extends React.Component {
      render() {
        return <div />;
      }
    }
    const nestedFunctionComponent = () => <div />;
  }
}
```

#### Parameters

| Name      | Type                                                          | Description                |
| :-------- | :------------------------------------------------------------ | :------------------------- |
| `node`    | `Node`                                                        | The AST node being checked |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |                            |

#### Returns

`boolean`

`true` if node is inside class component's render block, `false` if not

**`Deprecated`**

It will be removed in the future

---

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

Check if a node is a React PureComponent

#### Parameters

| Name      | Type                                                          | Description           |
| :-------- | :------------------------------------------------------------ | :-------------------- |
| `node`    | `Node`                                                        | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

`boolean`

**`Deprecated`**

It will be removed in the future

---

### isStateMemberExpression

▸ **isStateMemberExpression**(`node`): `boolean`

Check if a node is a MemberExpression of state

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

**`Deprecated`**

It will be removed in the future

---

### isValidReactComponentName

▸ **isValidReactComponentName**(`name`): name is string

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `undefined` \| `null` \| `string` |

#### Returns

name is string

---

### isValidReactHookName

▸ **isValidReactHookName**(`name`): name is string

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `undefined` \| `null` \| `string` |

#### Returns

name is string

---

### unsafeIsDeclaredInRenderProp

▸ **unsafeIsDeclaredInRenderProp**(`node`): `boolean`

Unsafe check whether given node is declared inside a render prop

```jsx
_ = <Component renderRow={"node"} />;
`                         ^^^^^^   `;
_ = <Component rows={[{ render: "node" }]} />;
`                                ^^^^^^       `;
```

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if component is declared inside a render prop, `false` if not

---

### unsafeIsDirectValueOfRenderProperty

▸ **unsafeIsDirectValueOfRenderProperty**(`node`): `boolean`

Unsafe check whether given node is declared directly inside a render property

```jsx
const rows = { render: () => <div /> }`                      ^^^^^^^^^^^^^ `;
_ = <Component rows={[{ render: () => <div /> }]} />;
`                                ^^^^^^^^^^^^^       `;
```

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if component is declared inside a render property, `false` if not

---

### unsafeIsInsideReactHookCall

▸ **unsafeIsInsideReactHookCall**(`node`): `boolean`

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`boolean`

---

### unsafeIsReactHookCall

▸ **unsafeIsReactHookCall**(`node`): `boolean`

#### Parameters

| Name   | Type             |
| :----- | :--------------- |
| `node` | `CallExpression` |

#### Returns

`boolean`

---

### unsafeIsRenderFunction

▸ **unsafeIsRenderFunction**(`node`, `context`): `boolean`

Unsafe check whether given node is a render function

```jsx
const renderRow = () => <div />;
`                 ^^^^^^^^^^^^`;
_ = <Component renderRow={() => <div />} />;
`                         ^^^^^^^^^^^^^   `;
```

#### Parameters

| Name      | Type                                                          | Description           |
| :-------- | :------------------------------------------------------------ | :-------------------- |
| `node`    | `TSESTreeFunction`                                            | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

`boolean`

`true` if node is a render function, `false` if not

---

### unsafeIsRenderProp

▸ **unsafeIsRenderProp**(`node`, `context`): `boolean`

Unsafe check whether given JSXAttribute is a render prop

```jsx
_ = <Component renderRow={() => <div />} />;
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `;
```

#### Parameters

| Name      | Type                                                          | Description           |
| :-------- | :------------------------------------------------------------ | :-------------------- |
| `node`    | `JSXAttribute`                                                | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

`boolean`

`true` if node is a render prop, `false` if not
