@eslint-react/core

# @eslint-react/core

## Table of contents

### Interfaces

- [ERClassComponent](interfaces/ERClassComponent.md)
- [ERFunctionComponent](interfaces/ERFunctionComponent.md)
- [ERHook](interfaces/ERHook.md)
- [ERSemanticNode](interfaces/ERSemanticNode.md)

### Type Aliases

- [ERClassComponentFlag](README.md#erclasscomponentflag)
- [ERComponent](README.md#ercomponent)
- [ERComponentHint](README.md#ercomponenthint)
- [ERComponentInitPath](README.md#ercomponentinitpath)
- [ERComponentKind](README.md#ercomponentkind)
- [ERFunctionComponentFlag](README.md#erfunctioncomponentflag)

### Variables

- [DEFAULT\_COMPONENT\_HINT](README.md#default_component_hint)
- [ERClassComponentFlag](README.md#erclasscomponentflag-1)
- [ERComponentHint](README.md#ercomponenthint-1)
- [ERFunctionComponentFlag](README.md#erfunctioncomponentflag-1)
- [RE\_COMPONENT\_NAME](README.md#re_component_name)
- [RE\_HOOK\_NAME](README.md#re_hook_name)

### Functions

- [getComponentInitPath](README.md#getcomponentinitpath)
- [getComponentNameFromIdentifier](README.md#getcomponentnamefromidentifier)
- [getFunctionComponentIdentifier](README.md#getfunctioncomponentidentifier)
- [getParentClassComponent](README.md#getparentclasscomponent)
- [hasCallInInitPath](README.md#hascallininitpath)
- [hasNoneOrValidComponentName](README.md#hasnoneorvalidcomponentname)
- [isChildrenCount](README.md#ischildrencount)
- [isChildrenCountCall](README.md#ischildrencountcall)
- [isChildrenForEach](README.md#ischildrenforeach)
- [isChildrenForEachCall](README.md#ischildrenforeachcall)
- [isChildrenMap](README.md#ischildrenmap)
- [isChildrenMapCall](README.md#ischildrenmapcall)
- [isChildrenOnly](README.md#ischildrenonly)
- [isChildrenOnlyCall](README.md#ischildrenonlycall)
- [isChildrenToArray](README.md#ischildrentoarray)
- [isChildrenToArrayCall](README.md#ischildrentoarraycall)
- [isClassComponent](README.md#isclasscomponent)
- [isCloneElement](README.md#iscloneelement)
- [isCloneElementCall](README.md#iscloneelementcall)
- [isComponentName](README.md#iscomponentname)
- [isCreateContext](README.md#iscreatecontext)
- [isCreateContextCall](README.md#iscreatecontextcall)
- [isCreateElement](README.md#iscreateelement)
- [isCreateElementCall](README.md#iscreateelementcall)
- [isCreateRef](README.md#iscreateref)
- [isCreateRefCall](README.md#iscreaterefcall)
- [isForwardRef](README.md#isforwardref)
- [isForwardRefCall](README.md#isforwardrefcall)
- [isFunctionOfRenderMethod](README.md#isfunctionofrendermethod)
- [isInsideReactHook](README.md#isinsidereacthook)
- [isInsideReactHookCall](README.md#isinsidereacthookcall)
- [isInsideRenderMethod](README.md#isinsiderendermethod)
- [isMemo](README.md#ismemo)
- [isMemoCall](README.md#ismemocall)
- [isPureComponent](README.md#ispurecomponent)
- [isReactAPICallWithName](README.md#isreactapicallwithname)
- [isReactAPIWithName](README.md#isreactapiwithname)
- [isReactHook](README.md#isreacthook)
- [isReactHookCall](README.md#isreacthookcall)
- [isReactHookCallWithName](README.md#isreacthookcallwithname)
- [isReactHookCallWithNameLoose](README.md#isreacthookcallwithnameloose)
- [isReactHookName](README.md#isreacthookname)
- [isUseCallbackCall](README.md#isusecallbackcall)
- [isUseContextCall](README.md#isusecontextcall)
- [isUseDebugValueCall](README.md#isusedebugvaluecall)
- [isUseDeferredValueCall](README.md#isusedeferredvaluecall)
- [isUseEffectCall](README.md#isuseeffectcall)
- [isUseIdCall](README.md#isuseidcall)
- [isUseImperativeHandleCall](README.md#isuseimperativehandlecall)
- [isUseInsertionEffectCall](README.md#isuseinsertioneffectcall)
- [isUseLayoutEffectCall](README.md#isuselayouteffectcall)
- [isUseMemoCall](README.md#isusememocall)
- [isUseReducerCall](README.md#isusereducercall)
- [isUseRefCall](README.md#isuserefcall)
- [isUseStateCall](README.md#isusestatecall)
- [isUseSyncExternalStoreCall](README.md#isusesyncexternalstorecall)
- [isUseTransitionCall](README.md#isusetransitioncall)
- [unsafeIsDeclaredInRenderProp](README.md#unsafeisdeclaredinrenderprop)
- [unsafeIsRenderFunction](README.md#unsafeisrenderfunction)
- [unsafeIsRenderProp](README.md#unsafeisrenderprop)
- [useComponentCollector](README.md#usecomponentcollector)
- [useComponentCollectorLegacy](README.md#usecomponentcollectorlegacy)
- [useHookCollector](README.md#usehookcollector)

## Type Aliases

### ERClassComponentFlag

Ƭ **ERClassComponentFlag**: `bigint`

___

### ERComponent

Ƭ **ERComponent**: [`ERClassComponent`](interfaces/ERClassComponent.md) \| [`ERFunctionComponent`](interfaces/ERFunctionComponent.md)

___

### ERComponentHint

Ƭ **ERComponentHint**: `bigint`

___

### ERComponentInitPath

Ƭ **ERComponentInitPath**: readonly [`TSESTree.FunctionDeclaration`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.CallExpression`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.VariableDeclaration`, `TSESTree.VariableDeclarator`, `TSESTree.ObjectExpression`, `TSESTree.Property`, `TSESTree.CallExpression`, `TSESTree.CallExpression`, `TSESTreeFunction`] \| readonly [`TSESTree.ClassDeclaration`, `TSESTree.ClassBody`, `TSESTree.MethodDefinition`, `TSESTreeFunction`] \| readonly [`TSESTree.ClassDeclaration`, `TSESTree.ClassBody`, `TSESTree.PropertyDefinition`, `TSESTreeFunction`]

___

### ERComponentKind

Ƭ **ERComponentKind**: ``"class"`` \| ``"function"``

___

### ERFunctionComponentFlag

Ƭ **ERFunctionComponentFlag**: `bigint`

## Variables

### DEFAULT\_COMPONENT\_HINT

• `Const` **DEFAULT\_COMPONENT\_HINT**: `bigint`

___

### ERClassComponentFlag

• **ERClassComponentFlag**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `None` | `bigint` |
| `PureComponent` | `bigint` |

___

### ERComponentHint

• **ERComponentHint**: `Object`

hints for component collector

#### Type declaration

| Name | Type |
| :------ | :------ |
| `None` | `0n` |
| `SkipBooleanLiteral` | `bigint` |
| `SkipClassMethod` | `bigint` |
| `SkipClassProperty` | `bigint` |
| `SkipCreateElement` | `bigint` |
| `SkipForwardRef` | `bigint` |
| `SkipMapCallback` | `bigint` |
| `SkipMemo` | `bigint` |
| `SkipNullLiteral` | `bigint` |
| `SkipNumberLiteral` | `bigint` |
| `SkipObjectMethod` | `bigint` |
| `SkipStringLiteral` | `bigint` |
| `SkipUndefinedLiteral` | `bigint` |
| `StrictArray` | `bigint` |
| `StrictConditional` | `bigint` |
| `StrictLogical` | `bigint` |

___

### ERFunctionComponentFlag

• **ERFunctionComponentFlag**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ForwardRef` | `bigint` |
| `Memo` | `bigint` |
| `None` | `bigint` |

___

### RE\_COMPONENT\_NAME

• `Const` **RE\_COMPONENT\_NAME**: `RegExp`

___

### RE\_HOOK\_NAME

• `Const` **RE\_HOOK\_NAME**: `RegExp`

## Functions

### getComponentInitPath

▸ **getComponentInitPath**(`node`): `O.Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `TSESTreeFunction` |

#### Returns

`O.Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>

___

### getComponentNameFromIdentifier

▸ **getComponentNameFromIdentifier**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `Identifier`[] |

#### Returns

`string`

___

### getFunctionComponentIdentifier

▸ **getFunctionComponentIdentifier**(`node`, `context`): `O.Option`\<`TSESTree.Identifier` \| `TSESTree.Identifier`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `TSESTreeFunction` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`O.Option`\<`TSESTree.Identifier` \| `TSESTree.Identifier`[]\>

___

### getParentClassComponent

▸ **getParentClassComponent**(`node`, `context`): `O.Option`\<`TSESTreeClass`\>

Get the parent class component of a node up to global scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The AST node to start searching from |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`O.Option`\<`TSESTreeClass`\>

**`Deprecated`**

It will be removed in the future

___

### hasCallInInitPath

▸ **hasCallInInitPath**(`callName`): (`initPath`: `Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\>) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callName` | `string` |

#### Returns

`fn`

▸ (`initPath`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `initPath` | `Option`\<[`ERComponentInitPath`](README.md#ercomponentinitpath)\> |

##### Returns

`boolean`

___

### hasNoneOrValidComponentName

▸ **hasNoneOrValidComponentName**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `TSESTreeFunction` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isChildrenCount

▸ **isChildrenCount**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenCountCall

▸ **isChildrenCountCall**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenForEach

▸ **isChildrenForEach**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenForEachCall

▸ **isChildrenForEachCall**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenMap

▸ **isChildrenMap**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenMapCall

▸ **isChildrenMapCall**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenOnly

▸ **isChildrenOnly**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenOnlyCall

▸ **isChildrenOnlyCall**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenToArray

▸ **isChildrenToArray**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isChildrenToArrayCall

▸ **isChildrenToArrayCall**(`node`, `context`, `pragma?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma?` | `string` |

#### Returns

`boolean`

___

### isClassComponent

▸ **isClassComponent**(`node`, `context`): node is TSESTreeClass

Check if a node is a React class component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

node is TSESTreeClass

___

### isCloneElement

▸ **isCloneElement**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCloneElementCall

▸ **isCloneElementCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isComponentName

▸ **isComponentName**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

___

### isCreateContext

▸ **isCreateContext**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCreateContextCall

▸ **isCreateContextCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCreateElement

▸ **isCreateElement**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCreateElementCall

▸ **isCreateElementCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCreateRef

▸ **isCreateRef**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isCreateRefCall

▸ **isCreateRefCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isForwardRef

▸ **isForwardRef**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isForwardRefCall

▸ **isForwardRefCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isFunctionOfRenderMethod

▸ **isFunctionOfRenderMethod**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `TSESTreeFunction` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isInsideReactHook

▸ **isInsideReactHook**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

___

### isInsideReactHookCall

▸ **isInsideReactHookCall**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

___

### isInsideRenderMethod

▸ **isInsideRenderMethod**(`node`, `context`): `boolean`

Check whether given node is declared inside class component's render block
```jsx
class Component extends React.Component {
  render() {
    class NestedClassComponent extends React.Component {
     render() { return <div />; }
    }
    const nestedFunctionComponent = () => <div />;
 }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The AST node being checked |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |  |

#### Returns

`boolean`

`true` if node is inside class component's render block, `false` if not

**`Deprecated`**

It will be removed in the future

___

### isMemo

▸ **isMemo**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Identifier` \| `MemberExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isMemoCall

▸ **isMemoCall**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

___

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

Check if a node is a React PureComponent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

___

### isReactAPICallWithName

▸ **isReactAPICallWithName**(`name`): `ReturnType`\<typeof `isCallFromPragma`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`ReturnType`\<typeof `isCallFromPragma`\>

▸ **isReactAPICallWithName**(`name`, `member`): `ReturnType`\<typeof `isCallFromPragmaMember`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `member` | `string` |

#### Returns

`ReturnType`\<typeof `isCallFromPragmaMember`\>

___

### isReactAPIWithName

▸ **isReactAPIWithName**(`name`): `ReturnType`\<typeof `isFromPragma`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`ReturnType`\<typeof `isFromPragma`\>

▸ **isReactAPIWithName**(`name`, `member`): `ReturnType`\<typeof `isFromPragmaMember`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `member` | `string` |

#### Returns

`ReturnType`\<typeof `isFromPragmaMember`\>

___

### isReactHook

▸ **isReactHook**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `TSESTreeFunction` |

#### Returns

`boolean`

___

### isReactHookCall

▸ **isReactHookCall**(`node`): `boolean`

Check if the given node is a React Hook call by its name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `CallExpression` | The node to check. |

#### Returns

`boolean`

`true` if the node is a React Hook call, `false` otherwise.

___

### isReactHookCallWithName

▸ **isReactHookCallWithName**(`name`): (`node`: `CallExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>, `pragma`: `string`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`fn`

▸ (`node`, `context`, `pragma`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

##### Returns

`boolean`

___

### isReactHookCallWithNameLoose

▸ **isReactHookCallWithNameLoose**(`name`): (`node`: `CallExpression`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`fn`

▸ (`node`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |

##### Returns

`boolean`

___

### isReactHookName

▸ **isReactHookName**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

___

### isUseCallbackCall

▸ **isUseCallbackCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseContextCall

▸ **isUseContextCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseDebugValueCall

▸ **isUseDebugValueCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseDeferredValueCall

▸ **isUseDeferredValueCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseEffectCall

▸ **isUseEffectCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseIdCall

▸ **isUseIdCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseImperativeHandleCall

▸ **isUseImperativeHandleCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseInsertionEffectCall

▸ **isUseInsertionEffectCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseLayoutEffectCall

▸ **isUseLayoutEffectCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseMemoCall

▸ **isUseMemoCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseReducerCall

▸ **isUseReducerCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseRefCall

▸ **isUseRefCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseStateCall

▸ **isUseStateCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseSyncExternalStoreCall

▸ **isUseSyncExternalStoreCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### isUseTransitionCall

▸ **isUseTransitionCall**(`node`, `context`, `pragma`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `CallExpression` |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma` | `string` |

#### Returns

`boolean`

___

### unsafeIsDeclaredInRenderProp

▸ **unsafeIsDeclaredInRenderProp**(`node`): `boolean`

Unsafe check whether given node is declared inside a render prop
```jsx
_ = <Component renderRow={"node"} />
`                         ^^^^^^   `
_ = <Component rows={ [{ render: "node" }] } />
`                                ^^^^^^       `
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if component is declared inside a render prop, `false` if not

___

### unsafeIsRenderFunction

▸ **unsafeIsRenderFunction**(`node`, `context`): `boolean`

Unsafe check whether given node is a render function
```jsx
const renderRow = () => <div />
`                 ^^^^^^^^^^^^`
_ = <Component renderRow={() => <div />} />
`                         ^^^^^^^^^^^^^   `
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `TSESTreeFunction` | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

`true` if node is a render function, `false` if not

___

### unsafeIsRenderProp

▸ **unsafeIsRenderProp**(`node`, `context`): `boolean`

Unsafe check whether given JSXAttribute is a render prop
```jsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `JSXAttribute` | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

`true` if node is a render prop, `false` if not

___

### useComponentCollector

▸ **useComponentCollector**(`context`, `hint?`, `pragma?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined` |
| `hint` | `bigint` | `DEFAULT_COMPONENT_HINT` |
| `pragma` | `string` | `undefined` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ctx` | \{ `getCurrentFunction`: () => `Option`\<[node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]]\> ; `getAllComponents`: (`_`: `Program`) => `Map`\<`string`, [`ERFunctionComponent`](interfaces/ERFunctionComponent.md)\> ; `getCurrentComponents`: () => `Map`\<`string`, [`ERFunctionComponent`](interfaces/ERFunctionComponent.md)\> ; `getCurrentFunctionStack`: () => [node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]][]  } |
| `ctx.getCurrentFunction` | () => `Option`\<[node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]]\> |
| `ctx.getAllComponents` | [object Object] |
| `ctx.getCurrentComponents` | [object Object] |
| `ctx.getCurrentFunctionStack` | [object Object] |
| `listeners` | \{ `:function`: (`node`: `TSESTreeFunction`) => `MutableList`\<[node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]]\> = onFunctionEnter; `:function:exit`: () => `undefined` \| [node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]] = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: () => `void` ; `AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']`: (`node`: `Node`) => `void` ; `CallExpression:exit`: (`node`: `CallExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void`  } |
| `listeners.:function` | (`node`: `TSESTreeFunction`) => `MutableList`\<[node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]]\> |
| `listeners.:function:exit` | () => `undefined` \| [node: TSESTreeFunction, isComponent: boolean, hookCalls: CallExpression[]] |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']` | [object Object] |
| `listeners.AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']` | [object Object] |
| `listeners.CallExpression:exit` | [object Object] |
| `listeners.ReturnStatement` | [object Object] |

___

### useComponentCollectorLegacy

▸ **useComponentCollectorLegacy**(`context`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ctx` | \{ `getAllComponents`: (`_`: `Program`) => `Map`\<`string`, [`ERClassComponent`](interfaces/ERClassComponent.md)\> ; `getCurrentComponents`: () => `Map`\<`string`, [`ERClassComponent`](interfaces/ERClassComponent.md)\>  } |
| `ctx.getAllComponents` | [object Object] |
| `ctx.getCurrentComponents` | [object Object] |
| `listeners` | \{ `ClassDeclaration`: (`node`: `TSESTreeClass`) => `void` = collect; `ClassExpression`: (`node`: `TSESTreeClass`) => `void` = collect } |
| `listeners.ClassDeclaration` | (`node`: `TSESTreeClass`) => `void` |
| `listeners.ClassExpression` | (`node`: `TSESTreeClass`) => `void` |

___

### useHookCollector

▸ **useHookCollector**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ctx` | \{ `getAllHooks`: (`_`: `Program`) => `Map`\<`string`, [`ERHook`](interfaces/ERHook.md)\> ; `getCurrentHooks`: () => `Map`\<`string`, [`ERHook`](interfaces/ERHook.md)\>  } |
| `ctx.getAllHooks` | [object Object] |
| `ctx.getCurrentHooks` | [object Object] |
| `listeners` | `ESLintUtils.RuleListener` |
