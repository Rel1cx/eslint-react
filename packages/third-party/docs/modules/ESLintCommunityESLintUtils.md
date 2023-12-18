[@eslint-react/third-party](../README.md) / ESLintCommunityESLintUtils

# Namespace: ESLintCommunityESLintUtils

## Table of contents

### Functions

- [getFunctionHeadLocation](ESLintCommunityESLintUtils.md#getfunctionheadlocation)
- [getFunctionNameWithKind](ESLintCommunityESLintUtils.md#getfunctionnamewithkind)
- [getPropertyName](ESLintCommunityESLintUtils.md#getpropertyname)
- [getStaticValue](ESLintCommunityESLintUtils.md#getstaticvalue)
- [getStringIfConstant](ESLintCommunityESLintUtils.md#getstringifconstant)
- [hasSideEffect](ESLintCommunityESLintUtils.md#hassideeffect)
- [isParenthesized](ESLintCommunityESLintUtils.md#isparenthesized)

## Functions

### getFunctionHeadLocation

▸ **getFunctionHeadLocation**(`node`, `sourceCode`): `SourceLocation`

Get the proper location of a given function node to report.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `ArrowFunctionExpression` \| `FunctionDeclaration` \| `FunctionExpression` |
| `sourceCode` | `SourceCode` |

#### Returns

`SourceLocation`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionheadlocation](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionheadlocation)

___

### getFunctionNameWithKind

▸ **getFunctionNameWithKind**(`node`, `sourceCode?`): `string`

Get the name and kind of a given function node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `ArrowFunctionExpression` \| `FunctionDeclaration` \| `FunctionExpression` |
| `sourceCode?` | `SourceCode` |

#### Returns

`string`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionnamewithkind](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionnamewithkind)

___

### getPropertyName

▸ **getPropertyName**(`node`, `initialScope?`): ``null`` \| `string`

Get the property name of a given property node.
If the node is a computed property, this tries to compute the property name by the getStringIfConstant function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `MemberExpression` \| `MethodDefinition` \| `Property` \| `PropertyDefinition` |
| `initialScope?` | `Scope` |

#### Returns

``null`` \| `string`

The property name of the node. If the property name is not constant then it returns `null`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getpropertyname](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getpropertyname)

___

### getStaticValue

▸ **getStaticValue**(`node`, `initialScope?`): ``null`` \| \{ `value`: `unknown`  }

Get the value of a given node if it can decide the value statically.
If the 2nd parameter `initialScope` was given, this function tries to resolve identifier references which are in the
given node as much as possible. In the resolving way, it does on the assumption that built-in global objects have
not been modified.
For example, it considers `Symbol.iterator`, ` String.raw``hello`` `, and `Object.freeze({a: 1}).a` as static.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `initialScope?` | `Scope` |

#### Returns

``null`` \| \{ `value`: `unknown`  }

The `{ value: any }` shaped object. The `value` property is the static value. If it couldn't compute the
static value of the node, it returns `null`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue)

___

### getStringIfConstant

▸ **getStringIfConstant**(`node`, `initialScope?`): ``null`` \| `string`

Get the string value of a given node.
This function is a tiny wrapper of the getStaticValue function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `initialScope?` | `Scope` |

#### Returns

``null`` \| `string`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstringifconstant](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstringifconstant)

___

### hasSideEffect

▸ **hasSideEffect**(`node`, `sourceCode`, `options?`): `boolean`

Check whether a given node has any side effect or not.
The side effect means that it may modify a certain variable or object member. This function considers the node which
contains the following types as the node which has side effects:
- `AssignmentExpression`
- `AwaitExpression`
- `CallExpression`
- `ImportExpression`
- `NewExpression`
- `UnaryExpression([operator = "delete"])`
- `UpdateExpression`
- `YieldExpression`
- When `options.considerGetters` is `true`:
- `MemberExpression`
- When `options.considerImplicitTypeConversion` is `true`:
- `BinaryExpression([operator = "==" | "!=" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in"])`
- `MemberExpression([computed = true])`
- `MethodDefinition([computed = true])`
- `Property([computed = true])`
- `UnaryExpression([operator = "-" | "+" | "!" | "~"])`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `sourceCode` | `SourceCode` |
| `options?` | `Object` |
| `options.considerGetters?` | `boolean` |
| `options.considerImplicitTypeConversion?` | `boolean` |

#### Returns

`boolean`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#hassideeffect](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#hassideeffect)

___

### isParenthesized

▸ **isParenthesized**(`node`, `sourceCode`): `boolean`

Check whether a given node is parenthesized or not.
This function detects it correctly even if it's parenthesized by specific syntax.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `sourceCode` | `SourceCode` |

#### Returns

`boolean`

`true` if the node is parenthesized.
If `times` was given, it returns `true` only if the node is parenthesized the `times` times.
For example, `isParenthesized(2, node, sourceCode)` returns true for `((foo))`, but not for `(foo)`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#isparenthesized](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#isparenthesized)

▸ **isParenthesized**(`times`, `node`, `sourceCode`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `times` | `number` |
| `node` | `Node` |
| `sourceCode` | `SourceCode` |

#### Returns

`boolean`
