[eslint-plugin-react-ts](../README.md) / src/utils/variable

# Module: src/utils/variable

## Table of contents

### Functions

- [findVariableByName](src_utils_variable.md#findvariablebyname)
- [findVariableByNameUpToGlobal](src_utils_variable.md#findvariablebynameuptoglobal)
- [getVariableNthDefNodeInit](src_utils_variable.md#getvariablenthdefnodeinit)
- [getVariablesUpToGlobal](src_utils_variable.md#getvariablesuptoglobal)

## Functions

### findVariableByName

▸ **findVariableByName**(`name`): (`variables`: `Variable`[]) => [`Option`](src_lib_primitives.O.md#option)<`Variable`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`fn`

▸ (`variables`): [`Option`](src_lib_primitives.O.md#option)<`Variable`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `Variable`[] |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`Variable`\>

#### Defined in

[src/utils/variable.ts:6](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/variable.ts#L6)

___

### findVariableByNameUpToGlobal

▸ **findVariableByNameUpToGlobal**(`name`, `startScope`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`Variable`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `startScope` | `Scope` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`Variable`\>\>

#### Defined in

[src/utils/variable.ts:24](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/variable.ts#L24)

___

### getVariableNthDefNodeInit

▸ **getVariableNthDefNodeInit**(`at`): (`variable`: `Variable`) => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `at` | `number` |

#### Returns

`fn`

▸ (`variable`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | `Variable` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

#### Defined in

[src/utils/variable.ts:28](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/variable.ts#L28)

___

### getVariablesUpToGlobal

▸ **getVariablesUpToGlobal**(`startScope`): `Variable`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `startScope` | `Scope` |

#### Returns

`Variable`[]

#### Defined in

[src/utils/variable.ts:12](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/variable.ts#L12)
