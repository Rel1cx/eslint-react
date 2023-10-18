@eslint-react/component

# @eslint-react/component

## Table of contents

### Type Aliases

- [ComponentCollectorCache](README.md#componentcollectorcache)
- [ComponentCollectorOptions](README.md#componentcollectoroptions)

### Variables

- [RE\_COMPONENT\_NAME](README.md#re_component_name)

### Functions

- [componentCollector](README.md#componentcollector)
- [componentCollectorLegacy](README.md#componentcollectorlegacy)
- [getParentClassComponent](README.md#getparentclasscomponent)
- [hasInvalidHierarchicalRelationship](README.md#hasinvalidhierarchicalrelationship)
- [hasInvalidName](README.md#hasinvalidname)
- [isClassComponent](README.md#isclasscomponent)
- [isFunctionOfRenderMethod](README.md#isfunctionofrendermethod)
- [isInsideRenderMethod](README.md#isinsiderendermethod)
- [isPureComponent](README.md#ispurecomponent)
- [isStateMemberExpression](README.md#isstatememberexpression)
- [isValidReactComponentName](README.md#isvalidreactcomponentname)

## Type Aliases

### ComponentCollectorCache

Ƭ **ComponentCollectorCache**: `WeakMap`<`TSESTreeFunction`, [`ComponentCollectorOptions`](README.md#componentcollectoroptions)\>

---

### ComponentCollectorOptions

Ƭ **ComponentCollectorOptions**: `JSXValueCheckOptions` & { `cache?`: [`ComponentCollectorCache`](README.md#componentcollectorcache) ; `ignoreMapCall?`: `boolean` }

## Variables

### RE\_COMPONENT\_NAME

• `Const` **RE\_COMPONENT\_NAME**: `RegExp`

## Functions

### componentCollector

▸ **componentCollector**(`context`, `options?`, `cache?`): `Object`

#### Parameters

| Name      | Type                                                               | Default value                      |
| :-------- | :----------------------------------------------------------------- | :--------------------------------- |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\>        | `undefined`                        |
| `options` | [`ComponentCollectorOptions`](README.md#componentcollectoroptions) | `defaultComponentCollectorOptions` |
| `cache`   | [`ComponentCollectorCache`](README.md#componentcollectorcache)     | `undefined`                        |

#### Returns

`Object`

| Name                                                             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                                                            | { `getCurrentFunction`: () => `Option`<`NonNullable`<`undefined` \| `TSESTreeFunction`\>\> ; `getAllComponents`: () => `Either`<`Error`, `TSESTreeFunction`[]\> ; `getCurrentComponents`: () => `TSESTreeFunction`[] ; `getCurrentFunctionStack`: () => `TSESTreeFunction`[] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ctx.getCurrentFunction`                                         | () => `Option`<`NonNullable`<`undefined` \| `TSESTreeFunction`\>\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ctx.getAllComponents`                                           | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `ctx.getCurrentComponents`                                       | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `ctx.getCurrentFunctionStack`                                    | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `listeners`                                                      | { `ArrowFunctionExpression`: (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\> = onFunctionEnter; `ArrowFunctionExpression:exit`: () => `undefined` \| `TSESTreeFunction` = onFunctionExit; `FunctionDeclaration`: (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\> = onFunctionEnter; `FunctionDeclaration:exit`: () => `undefined` \| `TSESTreeFunction` = onFunctionExit; `FunctionExpression`: (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\> = onFunctionEnter; `FunctionExpression:exit`: () => `undefined` \| `TSESTreeFunction` = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: (`node`: `ArrowFunctionExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void` } |
| `listeners.ArrowFunctionExpression`                              | (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `listeners.ArrowFunctionExpression:exit`                         | () => `undefined` \| `TSESTreeFunction`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `listeners.FunctionDeclaration`                                  | (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `listeners.FunctionDeclaration:exit`                             | () => `undefined` \| `TSESTreeFunction`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `listeners.FunctionExpression`                                   | (`node`: `TSESTreeFunction`) => `MutableList`<`TSESTreeFunction`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `listeners.FunctionExpression:exit`                              | () => `undefined` \| `TSESTreeFunction`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']` | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `listeners.ReturnStatement`                                      | [object Object]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

### componentCollectorLegacy

▸ **componentCollectorLegacy**(`context`): `Object`

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name                         | Type                                                                                                                                    |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                        | { `getAllComponents`: () => `Either`<`Error`, `TSESTreeClass`[]\> ; `getCurrentComponents`: () => `TSESTreeClass`[] }                   |
| `ctx.getAllComponents`       | [object Object]                                                                                                                         |
| `ctx.getCurrentComponents`   | [object Object]                                                                                                                         |
| `listeners`                  | { `ClassDeclaration`: (`node`: `TSESTreeClass`) => `void` = collect; `ClassExpression`: (`node`: `TSESTreeClass`) => `void` = collect } |
| `listeners.ClassDeclaration` | (`node`: `TSESTreeClass`) => `void`                                                                                                     |
| `listeners.ClassExpression`  | (`node`: `TSESTreeClass`) => `void`                                                                                                     |

---

### getParentClassComponent

▸ **getParentClassComponent**(`context`): `null` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

Get the parent class component of a node up to global scope

#### Parameters

| Name      | Type                                                        | Description      |
| :-------- | :---------------------------------------------------------- | :--------------- |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`null` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

**`Deprecated`**

It will be removed in the future.

---

### hasInvalidHierarchicalRelationship

▸ **hasInvalidHierarchicalRelationship**(`node`, `context`, `ignoreMapCall?`): `boolean`

#### Parameters

| Name            | Type                                                        | Default value |
| :-------------- | :---------------------------------------------------------- | :------------ |
| `node`          | `TSESTreeFunction`                                          | `undefined`   |
| `context`       | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined`   |
| `ignoreMapCall` | `boolean`                                                   | `false`       |

#### Returns

`boolean`

---

### hasInvalidName

▸ **hasInvalidName**(`node`): `null` \| `boolean`

#### Parameters

| Name   | Type               |
| :----- | :----------------- |
| `node` | `TSESTreeFunction` |

#### Returns

`null` \| `boolean`

---

### isClassComponent

▸ **isClassComponent**(`node`, `context`): node is TSESTreeClass

Check if a node is a React class component

#### Parameters

| Name      | Type                                                        | Description       |
| :-------- | :---------------------------------------------------------- | :---------------- |
| `node`    | `Node`                                                      | The node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context  |

#### Returns

node is TSESTreeClass

**`Deprecated`**

It will be removed in the future.

---

### isFunctionOfRenderMethod

▸ **isFunctionOfRenderMethod**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `node`    | `TSESTreeFunction`                                          |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

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

| Name      | Type                                                        | Description                |
| :-------- | :---------------------------------------------------------- | :------------------------- |
| `node`    | `Node`                                                      | The AST node being checked |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |                            |

#### Returns

`boolean`

`true` if node is inside class component's render block, `false` if not

**`Deprecated`**

It will be removed in the future.

---

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

Check if a node is a React PureComponent

#### Parameters

| Name      | Type                                                        | Description       |
| :-------- | :---------------------------------------------------------- | :---------------- |
| `node`    | `Node`                                                      | The node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context  |

#### Returns

`boolean`

**`Deprecated`**

It will be removed in the future.

---

### isStateMemberExpression

▸ **isStateMemberExpression**(`node`): `boolean`

Check if a node is a MemberExpression of state

#### Parameters

| Name   | Type   | Description       |
| :----- | :----- | :---------------- |
| `node` | `Node` | The node to check |

#### Returns

`boolean`

**`Deprecated`**

It will be removed in the future.

---

### isValidReactComponentName

▸ **isValidReactComponentName**(`name`): name is string

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `undefined` \| `null` \| `string` |

#### Returns

name is string
