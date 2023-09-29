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

Find a variable through a list of variables by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the variable to find |

#### Returns

`fn`

▸ (`variables`): [`Option`](src_lib_primitives.O.md#option)<`Variable`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `variables` | `Variable`[] |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`Variable`\>

___

### findVariableByNameUpToGlobal

▸ **findVariableByNameUpToGlobal**(`name`, `startScope`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`Variable`\>\>

Find a variable through a list of variables by name, starting from the given scope and going up to the global scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the variable to find |
| `startScope` | `Scope` | The scope to start from |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`Variable`\>\>

___

### getVariableNthDefNodeInit

▸ **getVariableNthDefNodeInit**(`at`): (`variable`: `Variable`) => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

Get the init node of the nth definition of a variable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `at` | `number` | The index of the definition to get, negative numbers are counted from the end, -1 is the last definition |

#### Returns

`fn`

▸ (`variable`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | `Variable` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`ArrowFunctionExpression` \| `FunctionExpression` \| `ArrayExpression` \| `ArrayPattern` \| `AssignmentExpression` \| `AwaitExpression` \| `BinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpression` \| `UpdateExpression` \| `LetOrConstOrVarDeclaration` \| `YieldExpression`\>\>

___

### getVariablesUpToGlobal

▸ **getVariablesUpToGlobal**(`startScope`): `Variable`[]

Get all variables from the given scope up to the global scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startScope` | `Scope` | The scope to start from |

#### Returns

`Variable`[]
