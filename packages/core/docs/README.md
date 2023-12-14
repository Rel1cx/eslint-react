@eslint-react/core

# @eslint-react/core

## Table of contents

### Type Aliases

- [ERClassComponent](README.md#erclasscomponent)
- [ERClassComponentFlag](README.md#erclasscomponentflag)
- [ERComponent](README.md#ercomponent)
- [ERComponentCollectorHint](README.md#ercomponentcollectorhint)
- [ERComponentInitPath](README.md#ercomponentinitpath)
- [ERComponentKind](README.md#ercomponentkind)
- [ERFunctionComponent](README.md#erfunctioncomponent)
- [ERFunctionComponentFlag](README.md#erfunctioncomponentflag)
- [ERHook](README.md#erhook)

### Variables

- [DEFAULT\_COMPONENT\_COLLECTOR\_HINT](README.md#default_component_collector_hint)
- [ERClassComponentFlag](README.md#erclasscomponentflag-1)
- [ERComponentCollectorHint](README.md#ercomponentcollectorhint-1)
- [ERFunctionComponentFlag](README.md#erfunctioncomponentflag-1)
- [RE\_COMPONENT\_NAME](README.md#re_component_name)
- [RE\_HOOK\_NAME](README.md#re_hook_name)

### Functions

- [componentCollector](README.md#componentcollector)
- [componentCollectorLegacy](README.md#componentcollectorlegacy)
- [getComponentInitPath](README.md#getcomponentinitpath)
- [getComponentNameFromIdentifier](README.md#getcomponentnamefromidentifier)
- [getFunctionComponentIdentifier](README.md#getfunctioncomponentidentifier)
- [getParentClassComponent](README.md#getparentclasscomponent)
- [hasCallInInitPath](README.md#hascallininitpath)
- [hasNoneOrValidComponentName](README.md#hasnoneorvalidcomponentname)
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
- [isMemoOrForwardRefCall](README.md#ismemoorforwardrefcall)
- [isPureComponent](README.md#ispurecomponent)
- [isReactHookCall](README.md#isreacthookcall)
- [isReactHookCallWithName](README.md#isreacthookcallwithname)
- [isUseCallbackCall](README.md#isusecallbackcall)
- [isUseContextCall](README.md#isusecontextcall)
- [isUseDebugValueCall](README.md#isusedebugvaluecall)
- [isUseEffectCall](README.md#isuseeffectcall)
- [isUseImperativeHandleCall](README.md#isuseimperativehandlecall)
- [isUseLayoutEffectCall](README.md#isuselayouteffectcall)
- [isUseMemoCall](README.md#isusememocall)
- [isUseReducerCall](README.md#isusereducercall)
- [isUseRefCall](README.md#isuserefcall)
- [isUseStateCall](README.md#isusestatecall)
- [isValidComponentName](README.md#isvalidcomponentname)
- [isValidReactHookName](README.md#isvalidreacthookname)
- [unsafeIsDeclaredInRenderProp](README.md#unsafeisdeclaredinrenderprop)
- [unsafeIsDirectValueOfRenderProperty](README.md#unsafeisdirectvalueofrenderproperty)
- [unsafeIsInsideReactHookCall](README.md#unsafeisinsidereacthookcall)
- [unsafeIsReactHookCall](README.md#unsafeisreacthookcall)
- [unsafeIsRenderFunction](README.md#unsafeisrenderfunction)
- [unsafeIsRenderProp](README.md#unsafeisrenderprop)

## Type Aliases

### ERClassComponent

Ƭ **ERClassComponent**: `Object`

#### Type declaration

| Name          | Type                                                             |
| :------------ | :--------------------------------------------------------------- |
| `_`           | `string`                                                         |
| `displayName` | `O.Option`\<`TSESTree.Expression`\>                              |
| `flag`        | [`ERClassComponentFlag`](README.md#erclasscomponentflag-1)       |
| `id`          | `O.Option`\<`TSESTree.Identifier`\>                              |
| `kind`        | `"class"`                                                        |
| `methods`     | (`TSESTree.MethodDefinition` \| `TSESTree.PropertyDefinition`)[] |
| `name`        | `O.Option`\<`string`\>                                           |
| `node`        | `TSESTreeClass`                                                  |

---

### ERClassComponentFlag

Ƭ **ERClassComponentFlag**: `bigint`

---

### ERComponent

Ƭ **ERComponent**: [`ERClassComponent`](README.md#erclasscomponent) \| [`ERFunctionComponent`](README.md#erfunctioncomponent)

---

### ERComponentCollectorHint

Ƭ **ERComponentCollectorHint**: `bigint`

---

### ERComponentInitPath

Ƭ **ERComponentInitPath**: readonly [`TSESTree.FunctionDeclaration`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.CallExpression`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTree.CallExpression`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.ClassDeclaration`, `TSESTree.ClassBody`, `TSESTree.MethodDefinition`, `TSESTreeFunction`] \| readonly [`TSESTree.ClassDeclaration`, `TSESTree.ClassBody`, `TSESTree.PropertyDefinition`, `TSESTreeFunction`]

---

### ERComponentKind

Ƭ **ERComponentKind**: `"class"` \| `"function"`

---

### ERFunctionComponent

Ƭ **ERFunctionComponent**: `Object`

#### Type declaration

| Name          | Type                                                                 |
| :------------ | :------------------------------------------------------------------- |
| `_`           | `string`                                                             |
| `displayName` | `O.Option`\<`TSESTree.Expression`\>                                  |
| `flag`        | [`ERFunctionComponentFlag`](README.md#erfunctioncomponentflag-1)     |
| `hint`        | [`ERComponentCollectorHint`](README.md#ercomponentcollectorhint-1)   |
| `hookCalls`   | `TSESTree.CallExpression`[]                                          |
| `id`          | `O.Option`\<`TSESTree.Identifier` \| `TSESTree.Identifier`[]\>       |
| `initPath`    | `O.Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\> |
| `kind`        | `"function"`                                                         |
| `name`        | `O.Option`\<`string`\>                                               |
| `node`        | `TSESTreeFunction`                                                   |

---

### ERFunctionComponentFlag

Ƭ **ERFunctionComponentFlag**: `bigint`

---

### ERHook

Ƭ **ERHook**: `Object`

#### Type declaration

| Name        | Type                        |
| :---------- | :-------------------------- |
| `_`         | `string`                    |
| `hookCalls` | `TSESTree.CallExpression`[] |
| `id`        | `TSESTree.Identifier`       |
| `name`      | `string`                    |
| `node`      | `TSESTreeFunction`          |

## Variables

### DEFAULT\_COMPONENT\_COLLECTOR\_HINT

• `Const` **DEFAULT\_COMPONENT\_COLLECTOR\_HINT**: `bigint`

---

### ERClassComponentFlag

• **ERClassComponentFlag**: `Object`

#### Type declaration

| Name            | Type     |
| :-------------- | :------- |
| `None`          | `bigint` |
| `PureComponent` | `bigint` |

---

### ERComponentCollectorHint

• **ERComponentCollectorHint**: `Object`

hints for component collector

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

### ERFunctionComponentFlag

• **ERFunctionComponentFlag**: `Object`

#### Type declaration

| Name         | Type     |
| :----------- | :------- |
| `ForwardRef` | `bigint` |
| `Memo`       | `bigint` |
| `None`       | `bigint` |

---

### RE\_COMPONENT\_NAME

• `Const` **RE\_COMPONENT\_NAME**: `RegExp`

---

### RE\_HOOK\_NAME

• `Const` **RE\_HOOK\_NAME**: `RegExp`

## Functions

### componentCollector

▸ **componentCollector**(`context`, `hint?`, `pragma?`): `Object`

#### Parameters

| Name      | Type                                                          | Default value                      |
| :-------- | :------------------------------------------------------------ | :--------------------------------- |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined`                        |
| `hint`    | `bigint`                                                      | `DEFAULT_COMPONENT_COLLECTOR_HINT` |
| `pragma`  | `string`                                                      | `undefined`                        |

#### Returns

`Object`

| Name                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ctx`                                                                                                          | \{ `getCurrentFunction`: () => `Option`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\> ; `getAllComponents`: (`_`: `Program`) => `Map`\<`string`, [`ERFunctionComponent`](README.md#erfunctioncomponent)\> ; `getCurrentComponents`: () => `Map`\<`string`, [`ERFunctionComponent`](README.md#erfunctioncomponent)\> ; `getCurrentFunctionStack`: () => [`TSESTreeFunction`, `boolean`, `CallExpression`[]][] }                                                                                                                                                                                 |
| `ctx.getCurrentFunction`                                                                                       | () => `Option`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ctx.getAllComponents`                                                                                         | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `ctx.getCurrentComponents`                                                                                     | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `ctx.getCurrentFunctionStack`                                                                                  | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `listeners`                                                                                                    | \{ `:function`: (`node`: `TSESTreeFunction`) => `MutableList`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\> = onFunctionEnter; `:function:exit`: () => `undefined` \| [`TSESTreeFunction`, `boolean`, `CallExpression`[]] = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: () => `void` ; `AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']`: (`node`: `AssignmentExpression`) => `void` ; `CallExpression:exit`: (`node`: `CallExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void` } |
| `listeners.:function`                                                                                          | (`node`: `TSESTreeFunction`) => `MutableList`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `listeners.:function:exit`                                                                                     | () => `undefined` \| [`TSESTreeFunction`, `boolean`, `CallExpression`[]]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']`                                               | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `listeners.AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']` | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `listeners.CallExpression:exit`                                                                                | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `listeners.ReturnStatement`                                                                                    | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

---

### componentCollectorLegacy

▸ **componentCollectorLegacy**(`context`): `Object`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name                         | Type                                                                                                                                                                                                                 |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                        | \{ `getAllComponents`: (`_`: `Program`) => `Map`\<`string`, [`ERClassComponent`](README.md#erclasscomponent)\> ; `getCurrentComponents`: () => `Map`\<`string`, [`ERClassComponent`](README.md#erclasscomponent)\> } |
| `ctx.getAllComponents`       | [object Object]                                                                                                                                                                                                      |
| `ctx.getCurrentComponents`   | [object Object]                                                                                                                                                                                                      |
| `listeners`                  | \{ `ClassDeclaration`: (`node`: `TSESTreeClass`) => `void` = collect; `ClassExpression`: (`node`: `TSESTreeClass`) => `void` = collect }                                                                             |
| `listeners.ClassDeclaration` | (`node`: `TSESTreeClass`) => `void`                                                                                                                                                                                  |
| `listeners.ClassExpression`  | (`node`: `TSESTreeClass`) => `void`                                                                                                                                                                                  |

---

### getComponentInitPath

▸ **getComponentInitPath**(`node`): `O.Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>

#### Parameters

| Name   | Type               |
| :----- | :----------------- |
| `node` | `TSESTreeFunction` |

#### Returns

`O.Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>

---

### getComponentNameFromIdentifier

▸ **getComponentNameFromIdentifier**(`node`): `string`

#### Parameters

| Name   | Type                           |
| :----- | :----------------------------- |
| `node` | `Identifier` \| `Identifier`[] |

#### Returns

`string`

---

### getFunctionComponentIdentifier

▸ **getFunctionComponentIdentifier**(`node`, `context`): `O.Option`\<`TSESTree.Identifier` \| `TSESTree.Identifier`[]\>

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `TSESTreeFunction`                                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`O.Option`\<`TSESTree.Identifier` \| `TSESTree.Identifier`[]\>

---

### getParentClassComponent

▸ **getParentClassComponent**(`node`, `context`): `O.Option`\<`TSESTreeClass`\>

Get the parent class component of a node up to global scope

#### Parameters

| Name      | Type                                                          | Description                          |
| :-------- | :------------------------------------------------------------ | :----------------------------------- |
| `node`    | `Node`                                                        | The AST node to start searching from |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context                     |

#### Returns

`O.Option`\<`TSESTreeClass`\>

**`Deprecated`**

It will be removed in the future

---

### hasCallInInitPath

▸ **hasCallInInitPath**(`callName`): (`initPath`: `Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>) => `boolean`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `callName` | `string` |

#### Returns

`fn`

▸ (`initPath`): `boolean`

##### Parameters

| Name       | Type                                                               |
| :--------- | :----------------------------------------------------------------- |
| `initPath` | `Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\> |

##### Returns

`boolean`

---

### hasNoneOrValidComponentName

▸ **hasNoneOrValidComponentName**(`node`): `boolean`

#### Parameters

| Name   | Type               |
| :----- | :----------------- |
| `node` | `TSESTreeFunction` |

#### Returns

`boolean`

---

### hookCollector

▸ **hookCollector**(): `Object`

#### Returns

`Object`

| Name                  | Type                                                                                                                                                               |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                 | \{ `getAllHooks`: (`_`: `Program`) => `Map`\<`string`, [`ERHook`](README.md#erhook)\> ; `getCurrentHooks`: () => `Map`\<`string`, [`ERHook`](README.md#erhook)\> } |
| `ctx.getAllHooks`     | [object Object]                                                                                                                                                    |
| `ctx.getCurrentHooks` | [object Object]                                                                                                                                                    |
| `listeners`           | `ESLintUtils.RuleListener`                                                                                                                                         |

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

▸ **isMemberExpressionOfReactMember**(`pragmaMemberName`, `memberName`): (`node`: `TSESTree.MemberExpression`, `context`: `ER.RuleContext`, `pragma?`: `string`) => `boolean`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `pragmaMemberName` | `string` |
| `memberName`       | `string` |

#### Returns

`fn`

▸ (`node`, `context`, `pragma?`): `boolean`

##### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `node`    | `TSESTree.MemberExpression` |
| `context` | `ER.RuleContext`            |
| `pragma?` | `string`                    |

##### Returns

`boolean`

---

### isMemoOrForwardRefCall

▸ **isMemoOrForwardRefCall**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `Node`                                                        |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

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

---

### isReactHookCall

▸ **isReactHookCall**(`node`): `void`

TODO: Implement this function.
Check if the given node is a React Hook call by its name and its hierarchy.

#### Parameters

| Name   | Type             | Description        |
| :----- | :--------------- | :----------------- |
| `node` | `CallExpression` | The node to check. |

#### Returns

`void`

---

### isReactHookCallWithName

▸ **isReactHookCallWithName**(`name`): (`node`: `CallExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>, `pragma`: `string`) => `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`fn`

▸ (`node`, `context`, `pragma`): `boolean`

##### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

##### Returns

`boolean`

---

### isUseCallbackCall

▸ **isUseCallbackCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseContextCall

▸ **isUseContextCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseDebugValueCall

▸ **isUseDebugValueCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseEffectCall

▸ **isUseEffectCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseImperativeHandleCall

▸ **isUseImperativeHandleCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseLayoutEffectCall

▸ **isUseLayoutEffectCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseMemoCall

▸ **isUseMemoCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseReducerCall

▸ **isUseReducerCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseRefCall

▸ **isUseRefCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isUseStateCall

▸ **isUseStateCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`boolean`

---

### isValidComponentName

▸ **isValidComponentName**(`name`): name is string

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

name is string

---

### isValidReactHookName

▸ **isValidReactHookName**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

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

Check if the given node is a React Hook call by its name.

#### Parameters

| Name   | Type             | Description        |
| :----- | :--------------- | :----------------- |
| `node` | `CallExpression` | The node to check. |

#### Returns

`boolean`

`true` if the node is a React hook call, `false` otherwise.

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
