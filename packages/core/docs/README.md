@eslint-react/core

# @eslint-react/core

## Table of contents

### Type Aliases

- [ReactComponentType](README.md#reactcomponenttype)
- [ReactHookFlag](README.md#reacthookflag)
- [ReactHostComponentType](README.md#reacthostcomponenttype)

### Variables

- [ComponentCollectorHint](README.md#componentcollectorhint)
- [ComponentCollectorLegacyHint](README.md#componentcollectorlegacyhint)
- [RE\_COMPONENT\_NAME](README.md#re_component_name)
- [RE\_HOOK\_NAME](README.md#re_hook_name)
- [ReactClassComponent](README.md#reactclasscomponent)
- [ReactContextConsumer](README.md#reactcontextconsumer)
- [ReactContextProvider](README.md#reactcontextprovider)
- [ReactDehydratedFragment](README.md#reactdehydratedfragment)
- [ReactForwardRef](README.md#reactforwardref)
- [ReactFragment](README.md#reactfragment)
- [ReactFunctionComponent](README.md#reactfunctioncomponent)
- [ReactHookFlag](README.md#reacthookflag-1)
- [ReactHostComponent](README.md#reacthostcomponent)
- [ReactHostHTMLComponent](README.md#reacthosthtmlcomponent)
- [ReactHostPortal](README.md#reacthostportal)
- [ReactHostRoot](README.md#reacthostroot)
- [ReactHostSVGComponent](README.md#reacthostsvgcomponent)
- [ReactHostText](README.md#reacthosttext)
- [ReactHostWebComponent](README.md#reacthostwebcomponent)
- [ReactLazyComponent](README.md#reactlazycomponent)
- [ReactMemoComponent](README.md#reactmemocomponent)
- [ReactMode](README.md#reactmode)
- [ReactProfiler](README.md#reactprofiler)
- [ReactSuspenseComponent](README.md#reactsuspensecomponent)
- [ReactSuspenseListComponent](README.md#reactsuspenselistcomponent)
- [defaultComponentCollectorHint](README.md#defaultcomponentcollectorhint)

### Functions

- [componentCollector](README.md#componentcollector)
- [componentCollectorLegacy](README.md#componentcollectorlegacy)
- [getParentClassComponent](README.md#getparentclasscomponent)
- [hookCollector](README.md#hookcollector)
- [isChildrenCount](README.md#ischildrencount)
- [isChildrenForEach](README.md#ischildrenforeach)
- [isChildrenMap](README.md#ischildrenmap)
- [isChildrenOnly](README.md#ischildrenonly)
- [isChildrenToArray](README.md#ischildrentoarray)
- [isClassComponent](README.md#isclasscomponent)
- [isCreateContext](README.md#iscreatecontext)
- [isFunctionOfRenderMethod](README.md#isfunctionofrendermethod)
- [isInsideRenderMethod](README.md#isinsiderendermethod)
- [isMemberExpressionOfReactMember](README.md#ismemberexpressionofreactmember)
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

### ReactComponentType

Ƭ **ReactComponentType**: `0` \| `1` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `16` \| `18` \| `19` \| `20`

---

### ReactHookFlag

Ƭ **ReactHookFlag**: `bigint`

---

### ReactHostComponentType

Ƭ **ReactHostComponentType**: `0` \| `1` \| `2`

## Variables

### ComponentCollectorHint

• `Const` **ComponentCollectorHint**: `Object`

#### Type declaration

| Name                   | Type     |
| :--------------------- | :------- |
| `None`                 | `0n`     |
| `SkipBooleanLiteral`   | `bigint` |
| `SkipClassMethod`      | `bigint` |
| `SkipClassProperty`    | `bigint` |
| `SkipCreateElement`    | `bigint` |
| `SkipForwardRef`       | `bigint` |
| `SkipMapCallback`      | `bigint` |
| `SkipMemo`             | `bigint` |
| `SkipNullLiteral`      | `bigint` |
| `SkipNumberLiteral`    | `bigint` |
| `SkipObjectMethod`     | `bigint` |
| `SkipStringLiteral`    | `bigint` |
| `SkipUndefinedLiteral` | `bigint` |
| `StrictArray`          | `bigint` |
| `StrictConditional`    | `bigint` |
| `StrictLogical`        | `bigint` |

---

### ComponentCollectorLegacyHint

• `Const` **ComponentCollectorLegacyHint**: `Object`

#### Type declaration

| Name                   | Type     |
| :--------------------- | :------- |
| `None`                 | `0n`     |
| `SkipBooleanLiteral`   | `bigint` |
| `SkipCreateElement`    | `bigint` |
| `SkipNullLiteral`      | `bigint` |
| `SkipNumberLiteral`    | `bigint` |
| `SkipStringLiteral`    | `bigint` |
| `SkipUndefinedLiteral` | `bigint` |
| `StrictArray`          | `bigint` |
| `StrictConditional`    | `bigint` |
| `StrictLogical`        | `bigint` |

---

### RE\_COMPONENT\_NAME

• `Const` **RE\_COMPONENT\_NAME**: `RegExp`

---

### RE\_HOOK\_NAME

• `Const` **RE\_HOOK\_NAME**: `RegExp`

---

### ReactClassComponent

• `Const` **ReactClassComponent**: `1`

---

### ReactContextConsumer

• `Const` **ReactContextConsumer**: `9`

---

### ReactContextProvider

• `Const` **ReactContextProvider**: `10`

---

### ReactDehydratedFragment

• `Const` **ReactDehydratedFragment**: `18`

---

### ReactForwardRef

• `Const` **ReactForwardRef**: `11`

---

### ReactFragment

• `Const` **ReactFragment**: `7`

---

### ReactFunctionComponent

• `Const` **ReactFunctionComponent**: `0`

---

### ReactHookFlag

• **ReactHookFlag**: `Object`

#### Type declaration

| Name        | Type     |
| :---------- | :------- |
| `HasEffect` | `bigint` |
| `Insertion` | `bigint` |
| `Layout`    | `bigint` |
| `None`      | `bigint` |
| `Passive`   | `bigint` |

---

### ReactHostComponent

• `Const` **ReactHostComponent**: `5`

---

### ReactHostHTMLComponent

• `Const` **ReactHostHTMLComponent**: `0`

---

### ReactHostPortal

• `Const` **ReactHostPortal**: `4`

---

### ReactHostRoot

• `Const` **ReactHostRoot**: `3`

---

### ReactHostSVGComponent

• `Const` **ReactHostSVGComponent**: `1`

---

### ReactHostText

• `Const` **ReactHostText**: `6`

---

### ReactHostWebComponent

• `Const` **ReactHostWebComponent**: `2`

---

### ReactLazyComponent

• `Const` **ReactLazyComponent**: `16`

---

### ReactMemoComponent

• `Const` **ReactMemoComponent**: `14`

---

### ReactMode

• `Const` **ReactMode**: `8`

---

### ReactProfiler

• `Const` **ReactProfiler**: `12`

---

### ReactSuspenseComponent

• `Const` **ReactSuspenseComponent**: `13`

---

### ReactSuspenseListComponent

• `Const` **ReactSuspenseListComponent**: `19`

---

### defaultComponentCollectorHint

• `Const` **defaultComponentCollectorHint**: `bigint`

## Functions

### componentCollector

▸ **componentCollector**(`context`, `hint?`): `Object`

#### Parameters

| Name      | Type                                                          | Default value                   |
| :-------- | :------------------------------------------------------------ | :------------------------------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined`                     |
| `hint`    | `bigint`                                                      | `defaultComponentCollectorHint` |

#### Returns

`Object`

| Name                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                                                                                                          | \{ `getCurrentFunction`: () => `Option`\<`NonNullable`\<`undefined` \| `TSESTreeFunction`\>\> ; `getAllComponents`: () => `Either`\<`Error`, `Map`\<`string`, `ESLRFunctionComponent`\>\> ; `getCurrentComponents`: () => `Map`\<`string`, `ESLRFunctionComponent`\> ; `getCurrentFunctionStack`: () => `TSESTreeFunction`[] }                                                                                                                                                                           |
| `ctx.getCurrentFunction`                                                                                       | () => `Option`\<`NonNullable`\<`undefined` \| `TSESTreeFunction`\>\>                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `ctx.getAllComponents`                                                                                         | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `ctx.getCurrentComponents`                                                                                     | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `ctx.getCurrentFunctionStack`                                                                                  | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `listeners`                                                                                                    | \{ `:function`: (`node`: `TSESTreeFunction`) => `MutableList`\<`TSESTreeFunction`\> = onFunctionEnter; `:function:exit`: () => `undefined` \| `TSESTreeFunction` = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: (`node`: `ArrowFunctionExpression`) => `void` ; `AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']`: (`node`: `AssignmentExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void` } |
| `listeners.:function`                                                                                          | (`node`: `TSESTreeFunction`) => `MutableList`\<`TSESTreeFunction`\>                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `listeners.:function:exit`                                                                                     | () => `undefined` \| `TSESTreeFunction`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']`                                               | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `listeners.AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']` | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `listeners.ReturnStatement`                                                                                    | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

---

### componentCollectorLegacy

▸ **componentCollectorLegacy**(`context`, `hint?`): `Object`

#### Parameters

| Name      | Type                                                          | Default value                       |
| :-------- | :------------------------------------------------------------ | :---------------------------------- |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined`                         |
| `hint`    | `bigint`                                                      | `ComponentCollectorLegacyHint.None` |

#### Returns

`Object`

| Name                         | Type                                                                                                                                                                |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ctx`                        | \{ `getAllComponents`: () => `Either`\<`Error`, `Map`\<`string`, `ESLRClassComponent`\>\> ; `getCurrentComponents`: () => `Map`\<`string`, `ESLRClassComponent`\> } |
| `ctx.getAllComponents`       | [object Object]                                                                                                                                                     |
| `ctx.getCurrentComponents`   | [object Object]                                                                                                                                                     |
| `listeners`                  | \{ `ClassDeclaration`: (`node`: `TSESTreeClass`) => `void` = collect; `ClassExpression`: (`node`: `TSESTreeClass`) => `void` = collect }                            |
| `listeners.ClassDeclaration` | (`node`: `TSESTreeClass`) => `void`                                                                                                                                 |
| `listeners.ClassExpression`  | (`node`: `TSESTreeClass`) => `void`                                                                                                                                 |

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

### hookCollector

▸ **hookCollector**(`context`): `Object`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name                  | Type                                                                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `ctx`                 | \{ `getAllHooks`: () => `Either`\<`Error`, `Map`\<`string`, `ESLRHook`\>\> ; `getCurrentHooks`: () => `Map`\<`string`, `ESLRHook`\> } |
| `ctx.getAllHooks`     | [object Object]                                                                                                                       |
| `ctx.getCurrentHooks` | [object Object]                                                                                                                       |
| `listeners`           | `ESLintUtils.RuleListener`                                                                                                            |

---

### isChildrenCount

▸ **isChildrenCount**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string`                                                      |

#### Returns

`boolean`

---

### isChildrenForEach

▸ **isChildrenForEach**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string`                                                      |

#### Returns

`boolean`

---

### isChildrenMap

▸ **isChildrenMap**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string`                                                      |

#### Returns

`boolean`

---

### isChildrenOnly

▸ **isChildrenOnly**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string`                                                      |

#### Returns

`boolean`

---

### isChildrenToArray

▸ **isChildrenToArray**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string`                                                      |

#### Returns

`boolean`

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

### isMemberExpressionOfReactMember

▸ **isMemberExpressionOfReactMember**(`pragmaMemberName`, `memberName`): (`node`: `MemberExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>, `pragma`: `string`) => `boolean`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `pragmaMemberName` | `string` |
| `memberName`       | `string` |

#### Returns

`fn`

▸ (`node`, `context`, `pragma?`): `boolean`

##### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `MemberExpression`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

##### Returns

`boolean`

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
