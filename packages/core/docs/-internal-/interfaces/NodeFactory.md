[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / NodeFactory

# Interface: NodeFactory

## Methods

### createAdd()

> **createAdd**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createArrayBindingPattern()

> **createArrayBindingPattern**(`elements`): [`ArrayBindingPattern`](ArrayBindingPattern.md)

#### Parameters

##### elements

readonly [`ArrayBindingElement`](../type-aliases/ArrayBindingElement.md)[]

#### Returns

[`ArrayBindingPattern`](ArrayBindingPattern.md)

***

### createArrayLiteralExpression()

> **createArrayLiteralExpression**(`elements`?, `multiLine`?): [`ArrayLiteralExpression`](ArrayLiteralExpression.md)

#### Parameters

##### elements?

readonly [`Expression`](Expression.md)[]

##### multiLine?

`boolean`

#### Returns

[`ArrayLiteralExpression`](ArrayLiteralExpression.md)

***

### createArrayTypeNode()

> **createArrayTypeNode**(`elementType`): [`ArrayTypeNode`](ArrayTypeNode.md)

#### Parameters

##### elementType

[`TypeNode`](TypeNode.md)

#### Returns

[`ArrayTypeNode`](ArrayTypeNode.md)

***

### createArrowFunction()

> **createArrowFunction**(`modifiers`, `typeParameters`, `parameters`, `type`, `equalsGreaterThanToken`, `body`): [`ArrowFunction`](ArrowFunction.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### equalsGreaterThanToken

`undefined` | [`EqualsGreaterThanToken`](../type-aliases/EqualsGreaterThanToken.md)

##### body

[`ConciseBody`](../type-aliases/ConciseBody.md)

#### Returns

[`ArrowFunction`](ArrowFunction.md)

***

### createAsExpression()

> **createAsExpression**(`expression`, `type`): [`AsExpression`](AsExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`AsExpression`](AsExpression.md)

***

### ~~createAssertClause()~~

> **createAssertClause**(`elements`, `multiLine`?): `AssertClause`

#### Parameters

##### elements

[`NodeArray`](NodeArray.md)\<`AssertEntry`\>

##### multiLine?

`boolean`

#### Returns

`AssertClause`

#### Deprecated

***

### ~~createAssertEntry()~~

> **createAssertEntry**(`name`, `value`): `AssertEntry`

#### Parameters

##### name

[`ImportAttributeName`](../type-aliases/ImportAttributeName.md)

##### value

[`Expression`](Expression.md)

#### Returns

`AssertEntry`

#### Deprecated

***

### createAssignment()

#### Call Signature

> **createAssignment**(`left`, `right`): [`DestructuringAssignment`](../type-aliases/DestructuringAssignment.md)

##### Parameters

###### left

[`ArrayLiteralExpression`](ArrayLiteralExpression.md) | [`ObjectLiteralExpression`](ObjectLiteralExpression.md)

###### right

[`Expression`](Expression.md)

##### Returns

[`DestructuringAssignment`](../type-aliases/DestructuringAssignment.md)

#### Call Signature

> **createAssignment**(`left`, `right`): [`AssignmentExpression`](AssignmentExpression.md)\<[`EqualsToken`](../type-aliases/EqualsToken.md)\>

##### Parameters

###### left

[`Expression`](Expression.md)

###### right

[`Expression`](Expression.md)

##### Returns

[`AssignmentExpression`](AssignmentExpression.md)\<[`EqualsToken`](../type-aliases/EqualsToken.md)\>

***

### createAwaitExpression()

> **createAwaitExpression**(`expression`): [`AwaitExpression`](AwaitExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`AwaitExpression`](AwaitExpression.md)

***

### createBigIntLiteral()

> **createBigIntLiteral**(`value`): [`BigIntLiteral`](BigIntLiteral.md)

#### Parameters

##### value

`string` | [`PseudoBigInt`](PseudoBigInt.md)

#### Returns

[`BigIntLiteral`](BigIntLiteral.md)

***

### createBinaryExpression()

> **createBinaryExpression**(`left`, `operator`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### operator

[`BinaryOperatorToken`](../type-aliases/BinaryOperatorToken.md) | [`BinaryOperator`](../type-aliases/BinaryOperator.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createBindingElement()

> **createBindingElement**(`dotDotDotToken`, `propertyName`, `name`, `initializer`?): [`BindingElement`](BindingElement.md)

#### Parameters

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### propertyName

`undefined` | `string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### name

`string` | [`BindingName`](../type-aliases/BindingName.md)

##### initializer?

[`Expression`](Expression.md)

#### Returns

[`BindingElement`](BindingElement.md)

***

### createBitwiseAnd()

> **createBitwiseAnd**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createBitwiseNot()

> **createBitwiseNot**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createBitwiseOr()

> **createBitwiseOr**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createBitwiseXor()

> **createBitwiseXor**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createBlock()

> **createBlock**(`statements`, `multiLine`?): [`Block`](Block.md)

#### Parameters

##### statements

readonly [`Statement`](Statement.md)[]

##### multiLine?

`boolean`

#### Returns

[`Block`](Block.md)

***

### createBreakStatement()

> **createBreakStatement**(`label`?): [`BreakStatement`](BreakStatement.md)

#### Parameters

##### label?

`string` | [`Identifier`](Identifier.md)

#### Returns

[`BreakStatement`](BreakStatement.md)

***

### createBundle()

> **createBundle**(`sourceFiles`): [`Bundle`](Bundle.md)

#### Parameters

##### sourceFiles

readonly [`SourceFile`](SourceFile.md)[]

#### Returns

[`Bundle`](Bundle.md)

***

### createCallChain()

> **createCallChain**(`expression`, `questionDotToken`, `typeArguments`, `argumentsArray`): [`CallChain`](CallChain.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

`undefined` | readonly [`Expression`](Expression.md)[]

#### Returns

[`CallChain`](CallChain.md)

***

### createCallExpression()

> **createCallExpression**(`expression`, `typeArguments`, `argumentsArray`): [`CallExpression`](CallExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

`undefined` | readonly [`Expression`](Expression.md)[]

#### Returns

[`CallExpression`](CallExpression.md)

***

### createCallSignature()

> **createCallSignature**(`typeParameters`, `parameters`, `type`): [`CallSignatureDeclaration`](CallSignatureDeclaration.md)

#### Parameters

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`CallSignatureDeclaration`](CallSignatureDeclaration.md)

***

### createCaseBlock()

> **createCaseBlock**(`clauses`): [`CaseBlock`](CaseBlock.md)

#### Parameters

##### clauses

readonly [`CaseOrDefaultClause`](../type-aliases/CaseOrDefaultClause.md)[]

#### Returns

[`CaseBlock`](CaseBlock.md)

***

### createCaseClause()

> **createCaseClause**(`expression`, `statements`): [`CaseClause`](CaseClause.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`CaseClause`](CaseClause.md)

***

### createCatchClause()

> **createCatchClause**(`variableDeclaration`, `block`): [`CatchClause`](CatchClause.md)

#### Parameters

##### variableDeclaration

`undefined` | `string` | [`VariableDeclaration`](VariableDeclaration.md) | [`BindingName`](../type-aliases/BindingName.md)

##### block

[`Block`](Block.md)

#### Returns

[`CatchClause`](CatchClause.md)

***

### createClassDeclaration()

> **createClassDeclaration**(`modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`ClassDeclaration`](ClassDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`undefined` | `string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`ClassElement`](ClassElement.md)[]

#### Returns

[`ClassDeclaration`](ClassDeclaration.md)

***

### createClassExpression()

> **createClassExpression**(`modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`ClassExpression`](ClassExpression.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`undefined` | `string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`ClassElement`](ClassElement.md)[]

#### Returns

[`ClassExpression`](ClassExpression.md)

***

### createClassStaticBlockDeclaration()

> **createClassStaticBlockDeclaration**(`body`): [`ClassStaticBlockDeclaration`](ClassStaticBlockDeclaration.md)

#### Parameters

##### body

[`Block`](Block.md)

#### Returns

[`ClassStaticBlockDeclaration`](ClassStaticBlockDeclaration.md)

***

### createComma()

> **createComma**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createCommaListExpression()

> **createCommaListExpression**(`elements`): [`CommaListExpression`](CommaListExpression.md)

#### Parameters

##### elements

readonly [`Expression`](Expression.md)[]

#### Returns

[`CommaListExpression`](CommaListExpression.md)

***

### createComputedPropertyName()

> **createComputedPropertyName**(`expression`): [`ComputedPropertyName`](ComputedPropertyName.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ComputedPropertyName`](ComputedPropertyName.md)

***

### createConditionalExpression()

> **createConditionalExpression**(`condition`, `questionToken`, `whenTrue`, `colonToken`, `whenFalse`): [`ConditionalExpression`](ConditionalExpression.md)

#### Parameters

##### condition

[`Expression`](Expression.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### whenTrue

[`Expression`](Expression.md)

##### colonToken

`undefined` | [`ColonToken`](../type-aliases/ColonToken.md)

##### whenFalse

[`Expression`](Expression.md)

#### Returns

[`ConditionalExpression`](ConditionalExpression.md)

***

### createConditionalTypeNode()

> **createConditionalTypeNode**(`checkType`, `extendsType`, `trueType`, `falseType`): [`ConditionalTypeNode`](ConditionalTypeNode.md)

#### Parameters

##### checkType

[`TypeNode`](TypeNode.md)

##### extendsType

[`TypeNode`](TypeNode.md)

##### trueType

[`TypeNode`](TypeNode.md)

##### falseType

[`TypeNode`](TypeNode.md)

#### Returns

[`ConditionalTypeNode`](ConditionalTypeNode.md)

***

### createConstructorDeclaration()

> **createConstructorDeclaration**(`modifiers`, `parameters`, `body`): [`ConstructorDeclaration`](ConstructorDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`ConstructorDeclaration`](ConstructorDeclaration.md)

***

### createConstructorTypeNode()

> **createConstructorTypeNode**(`modifiers`, `typeParameters`, `parameters`, `type`): [`ConstructorTypeNode`](ConstructorTypeNode.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`ConstructorTypeNode`](ConstructorTypeNode.md)

***

### createConstructSignature()

> **createConstructSignature**(`typeParameters`, `parameters`, `type`): [`ConstructSignatureDeclaration`](ConstructSignatureDeclaration.md)

#### Parameters

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`ConstructSignatureDeclaration`](ConstructSignatureDeclaration.md)

***

### createContinueStatement()

> **createContinueStatement**(`label`?): [`ContinueStatement`](ContinueStatement.md)

#### Parameters

##### label?

`string` | [`Identifier`](Identifier.md)

#### Returns

[`ContinueStatement`](ContinueStatement.md)

***

### createDebuggerStatement()

> **createDebuggerStatement**(): [`DebuggerStatement`](DebuggerStatement.md)

#### Returns

[`DebuggerStatement`](DebuggerStatement.md)

***

### createDecorator()

> **createDecorator**(`expression`): [`Decorator`](Decorator.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`Decorator`](Decorator.md)

***

### createDefaultClause()

> **createDefaultClause**(`statements`): [`DefaultClause`](DefaultClause.md)

#### Parameters

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`DefaultClause`](DefaultClause.md)

***

### createDeleteExpression()

> **createDeleteExpression**(`expression`): [`DeleteExpression`](DeleteExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`DeleteExpression`](DeleteExpression.md)

***

### createDivide()

> **createDivide**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createDoStatement()

> **createDoStatement**(`statement`, `expression`): [`DoStatement`](DoStatement.md)

#### Parameters

##### statement

[`Statement`](Statement.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`DoStatement`](DoStatement.md)

***

### createElementAccessChain()

> **createElementAccessChain**(`expression`, `questionDotToken`, `index`): [`ElementAccessChain`](ElementAccessChain.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### index

`number` | [`Expression`](Expression.md)

#### Returns

[`ElementAccessChain`](ElementAccessChain.md)

***

### createElementAccessExpression()

> **createElementAccessExpression**(`expression`, `index`): [`ElementAccessExpression`](ElementAccessExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### index

`number` | [`Expression`](Expression.md)

#### Returns

[`ElementAccessExpression`](ElementAccessExpression.md)

***

### createEmptyStatement()

> **createEmptyStatement**(): [`EmptyStatement`](EmptyStatement.md)

#### Returns

[`EmptyStatement`](EmptyStatement.md)

***

### createEnumDeclaration()

> **createEnumDeclaration**(`modifiers`, `name`, `members`): [`EnumDeclaration`](EnumDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`Identifier`](Identifier.md)

##### members

readonly [`EnumMember`](EnumMember.md)[]

#### Returns

[`EnumDeclaration`](EnumDeclaration.md)

***

### createEnumMember()

> **createEnumMember**(`name`, `initializer`?): [`EnumMember`](EnumMember.md)

#### Parameters

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### initializer?

[`Expression`](Expression.md)

#### Returns

[`EnumMember`](EnumMember.md)

***

### createEquality()

> **createEquality**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createExponent()

> **createExponent**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createExportAssignment()

> **createExportAssignment**(`modifiers`, `isExportEquals`, `expression`): [`ExportAssignment`](ExportAssignment.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### isExportEquals

`undefined` | `boolean`

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExportAssignment`](ExportAssignment.md)

***

### createExportDeclaration()

> **createExportDeclaration**(`modifiers`, `isTypeOnly`, `exportClause`, `moduleSpecifier`?, `attributes`?): [`ExportDeclaration`](ExportDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### isTypeOnly

`boolean`

##### exportClause

`undefined` | [`NamedExportBindings`](../type-aliases/NamedExportBindings.md)

##### moduleSpecifier?

[`Expression`](Expression.md)

##### attributes?

`ImportAttributes`

#### Returns

[`ExportDeclaration`](ExportDeclaration.md)

***

### createExportDefault()

> **createExportDefault**(`expression`): [`ExportAssignment`](ExportAssignment.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExportAssignment`](ExportAssignment.md)

***

### createExportSpecifier()

> **createExportSpecifier**(`isTypeOnly`, `propertyName`, `name`): [`ExportSpecifier`](ExportSpecifier.md)

#### Parameters

##### isTypeOnly

`boolean`

##### propertyName

`undefined` | `string` | [`ModuleExportName`](../type-aliases/ModuleExportName.md)

##### name

`string` | [`ModuleExportName`](../type-aliases/ModuleExportName.md)

#### Returns

[`ExportSpecifier`](ExportSpecifier.md)

***

### createExpressionStatement()

> **createExpressionStatement**(`expression`): [`ExpressionStatement`](ExpressionStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExpressionStatement`](ExpressionStatement.md)

***

### createExpressionWithTypeArguments()

> **createExpressionWithTypeArguments**(`expression`, `typeArguments`): [`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)

***

### createExternalModuleExport()

> **createExternalModuleExport**(`exportName`): [`ExportDeclaration`](ExportDeclaration.md)

#### Parameters

##### exportName

[`Identifier`](Identifier.md)

#### Returns

[`ExportDeclaration`](ExportDeclaration.md)

***

### createExternalModuleReference()

> **createExternalModuleReference**(`expression`): [`ExternalModuleReference`](ExternalModuleReference.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExternalModuleReference`](ExternalModuleReference.md)

***

### createFalse()

> **createFalse**(): [`FalseLiteral`](FalseLiteral.md)

#### Returns

[`FalseLiteral`](FalseLiteral.md)

***

### createForInStatement()

> **createForInStatement**(`initializer`, `expression`, `statement`): [`ForInStatement`](ForInStatement.md)

#### Parameters

##### initializer

[`ForInitializer`](../type-aliases/ForInitializer.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForInStatement`](ForInStatement.md)

***

### createForOfStatement()

> **createForOfStatement**(`awaitModifier`, `initializer`, `expression`, `statement`): [`ForOfStatement`](ForOfStatement.md)

#### Parameters

##### awaitModifier

`undefined` | [`AwaitKeyword`](../type-aliases/AwaitKeyword.md)

##### initializer

[`ForInitializer`](../type-aliases/ForInitializer.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForOfStatement`](ForOfStatement.md)

***

### createForStatement()

> **createForStatement**(`initializer`, `condition`, `incrementor`, `statement`): [`ForStatement`](ForStatement.md)

#### Parameters

##### initializer

`undefined` | [`ForInitializer`](../type-aliases/ForInitializer.md)

##### condition

`undefined` | [`Expression`](Expression.md)

##### incrementor

`undefined` | [`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForStatement`](ForStatement.md)

***

### createFunctionDeclaration()

> **createFunctionDeclaration**(`modifiers`, `asteriskToken`, `name`, `typeParameters`, `parameters`, `type`, `body`): [`FunctionDeclaration`](FunctionDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

`undefined` | `string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`FunctionDeclaration`](FunctionDeclaration.md)

***

### createFunctionExpression()

> **createFunctionExpression**(`modifiers`, `asteriskToken`, `name`, `typeParameters`, `parameters`, `type`, `body`): [`FunctionExpression`](FunctionExpression.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

`undefined` | `string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

`undefined` | readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

[`Block`](Block.md)

#### Returns

[`FunctionExpression`](FunctionExpression.md)

***

### createFunctionTypeNode()

> **createFunctionTypeNode**(`typeParameters`, `parameters`, `type`): [`FunctionTypeNode`](FunctionTypeNode.md)

#### Parameters

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`FunctionTypeNode`](FunctionTypeNode.md)

***

### createGetAccessorDeclaration()

> **createGetAccessorDeclaration**(`modifiers`, `name`, `parameters`, `type`, `body`): [`GetAccessorDeclaration`](GetAccessorDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`GetAccessorDeclaration`](GetAccessorDeclaration.md)

***

### createGreaterThan()

> **createGreaterThan**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createGreaterThanEquals()

> **createGreaterThanEquals**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createHeritageClause()

> **createHeritageClause**(`token`, `types`): [`HeritageClause`](HeritageClause.md)

#### Parameters

##### token

[`ExtendsKeyword`](../enumerations/SyntaxKind.md#extendskeyword) | [`ImplementsKeyword`](../enumerations/SyntaxKind.md#implementskeyword)

##### types

readonly [`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)[]

#### Returns

[`HeritageClause`](HeritageClause.md)

***

### createIdentifier()

> **createIdentifier**(`text`): [`Identifier`](Identifier.md)

#### Parameters

##### text

`string`

#### Returns

[`Identifier`](Identifier.md)

***

### createIfStatement()

> **createIfStatement**(`expression`, `thenStatement`, `elseStatement`?): [`IfStatement`](IfStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### thenStatement

[`Statement`](Statement.md)

##### elseStatement?

[`Statement`](Statement.md)

#### Returns

[`IfStatement`](IfStatement.md)

***

### createImmediatelyInvokedArrowFunction()

#### Call Signature

> **createImmediatelyInvokedArrowFunction**(`statements`): [`ImmediatelyInvokedArrowFunction`](../type-aliases/ImmediatelyInvokedArrowFunction.md)

##### Parameters

###### statements

readonly [`Statement`](Statement.md)[]

##### Returns

[`ImmediatelyInvokedArrowFunction`](../type-aliases/ImmediatelyInvokedArrowFunction.md)

#### Call Signature

> **createImmediatelyInvokedArrowFunction**(`statements`, `param`, `paramValue`): [`ImmediatelyInvokedArrowFunction`](../type-aliases/ImmediatelyInvokedArrowFunction.md)

##### Parameters

###### statements

readonly [`Statement`](Statement.md)[]

###### param

[`ParameterDeclaration`](ParameterDeclaration.md)

###### paramValue

[`Expression`](Expression.md)

##### Returns

[`ImmediatelyInvokedArrowFunction`](../type-aliases/ImmediatelyInvokedArrowFunction.md)

***

### createImmediatelyInvokedFunctionExpression()

#### Call Signature

> **createImmediatelyInvokedFunctionExpression**(`statements`): [`CallExpression`](CallExpression.md)

##### Parameters

###### statements

readonly [`Statement`](Statement.md)[]

##### Returns

[`CallExpression`](CallExpression.md)

#### Call Signature

> **createImmediatelyInvokedFunctionExpression**(`statements`, `param`, `paramValue`): [`CallExpression`](CallExpression.md)

##### Parameters

###### statements

readonly [`Statement`](Statement.md)[]

###### param

[`ParameterDeclaration`](ParameterDeclaration.md)

###### paramValue

[`Expression`](Expression.md)

##### Returns

[`CallExpression`](CallExpression.md)

***

### createImportAttribute()

> **createImportAttribute**(`name`, `value`): `ImportAttribute`

#### Parameters

##### name

[`ImportAttributeName`](../type-aliases/ImportAttributeName.md)

##### value

[`Expression`](Expression.md)

#### Returns

`ImportAttribute`

***

### createImportAttributes()

> **createImportAttributes**(`elements`, `multiLine`?): `ImportAttributes`

#### Parameters

##### elements

[`NodeArray`](NodeArray.md)\<`ImportAttribute`\>

##### multiLine?

`boolean`

#### Returns

`ImportAttributes`

***

### createImportClause()

> **createImportClause**(`isTypeOnly`, `name`, `namedBindings`): [`ImportClause`](ImportClause.md)

#### Parameters

##### isTypeOnly

`boolean`

##### name

`undefined` | [`Identifier`](Identifier.md)

##### namedBindings

`undefined` | [`NamedImportBindings`](../type-aliases/NamedImportBindings.md)

#### Returns

[`ImportClause`](ImportClause.md)

***

### createImportDeclaration()

> **createImportDeclaration**(`modifiers`, `importClause`, `moduleSpecifier`, `attributes`?): [`ImportDeclaration`](ImportDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### importClause

`undefined` | [`ImportClause`](ImportClause.md)

##### moduleSpecifier

[`Expression`](Expression.md)

##### attributes?

`ImportAttributes`

#### Returns

[`ImportDeclaration`](ImportDeclaration.md)

***

### createImportEqualsDeclaration()

> **createImportEqualsDeclaration**(`modifiers`, `isTypeOnly`, `name`, `moduleReference`): [`ImportEqualsDeclaration`](ImportEqualsDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### isTypeOnly

`boolean`

##### name

`string` | [`Identifier`](Identifier.md)

##### moduleReference

[`ModuleReference`](../type-aliases/ModuleReference.md)

#### Returns

[`ImportEqualsDeclaration`](ImportEqualsDeclaration.md)

***

### createImportSpecifier()

> **createImportSpecifier**(`isTypeOnly`, `propertyName`, `name`): [`ImportSpecifier`](ImportSpecifier.md)

#### Parameters

##### isTypeOnly

`boolean`

##### propertyName

`undefined` | [`ModuleExportName`](../type-aliases/ModuleExportName.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`ImportSpecifier`](ImportSpecifier.md)

***

### ~~createImportTypeAssertionContainer()~~

> **createImportTypeAssertionContainer**(`clause`, `multiLine`?): [`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

#### Parameters

##### clause

`AssertClause`

##### multiLine?

`boolean`

#### Returns

[`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

#### Deprecated

***

### createImportTypeNode()

> **createImportTypeNode**(`argument`, `attributes`?, `qualifier`?, `typeArguments`?, `isTypeOf`?): [`ImportTypeNode`](ImportTypeNode.md)

#### Parameters

##### argument

[`TypeNode`](TypeNode.md)

##### attributes?

`ImportAttributes`

##### qualifier?

[`EntityName`](../type-aliases/EntityName.md)

##### typeArguments?

readonly [`TypeNode`](TypeNode.md)[]

##### isTypeOf?

`boolean`

#### Returns

[`ImportTypeNode`](ImportTypeNode.md)

***

### createIndexedAccessTypeNode()

> **createIndexedAccessTypeNode**(`objectType`, `indexType`): [`IndexedAccessTypeNode`](IndexedAccessTypeNode.md)

#### Parameters

##### objectType

[`TypeNode`](TypeNode.md)

##### indexType

[`TypeNode`](TypeNode.md)

#### Returns

[`IndexedAccessTypeNode`](IndexedAccessTypeNode.md)

***

### createIndexSignature()

> **createIndexSignature**(`modifiers`, `parameters`, `type`): [`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

***

### createInequality()

> **createInequality**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createInferTypeNode()

> **createInferTypeNode**(`typeParameter`): [`InferTypeNode`](InferTypeNode.md)

#### Parameters

##### typeParameter

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

#### Returns

[`InferTypeNode`](InferTypeNode.md)

***

### createInterfaceDeclaration()

> **createInterfaceDeclaration**(`modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`InterfaceDeclaration`](InterfaceDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`TypeElement`](TypeElement.md)[]

#### Returns

[`InterfaceDeclaration`](InterfaceDeclaration.md)

***

### createIntersectionTypeNode()

> **createIntersectionTypeNode**(`types`): [`IntersectionTypeNode`](IntersectionTypeNode.md)

#### Parameters

##### types

readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`IntersectionTypeNode`](IntersectionTypeNode.md)

***

### createJSDocAllType()

> **createJSDocAllType**(): [`JSDocAllType`](JSDocAllType.md)

#### Returns

[`JSDocAllType`](JSDocAllType.md)

***

### createJSDocAugmentsTag()

> **createJSDocAugmentsTag**(`tagName`, `className`, `comment`?): [`JSDocAugmentsTag`](JSDocAugmentsTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### className

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md) & `object`

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocAugmentsTag`](JSDocAugmentsTag.md)

***

### createJSDocAuthorTag()

> **createJSDocAuthorTag**(`tagName`, `comment`?): [`JSDocAuthorTag`](JSDocAuthorTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocAuthorTag`](JSDocAuthorTag.md)

***

### createJSDocCallbackTag()

> **createJSDocCallbackTag**(`tagName`, `typeExpression`, `fullName`?, `comment`?): [`JSDocCallbackTag`](JSDocCallbackTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocSignature`](JSDocSignature.md)

##### fullName?

[`Identifier`](Identifier.md) | [`JSDocNamespaceDeclaration`](JSDocNamespaceDeclaration.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocCallbackTag`](JSDocCallbackTag.md)

***

### createJSDocClassTag()

> **createJSDocClassTag**(`tagName`, `comment`?): [`JSDocClassTag`](JSDocClassTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocClassTag`](JSDocClassTag.md)

***

### createJSDocComment()

> **createJSDocComment**(`comment`?, `tags`?): [`JSDoc`](JSDoc.md)

#### Parameters

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

##### tags?

readonly [`JSDocTag`](JSDocTag.md)[]

#### Returns

[`JSDoc`](JSDoc.md)

***

### createJSDocDeprecatedTag()

> **createJSDocDeprecatedTag**(`tagName`, `comment`?): [`JSDocDeprecatedTag`](JSDocDeprecatedTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocDeprecatedTag`](JSDocDeprecatedTag.md)

***

### createJSDocEnumTag()

> **createJSDocEnumTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocEnumTag`](JSDocEnumTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocEnumTag`](JSDocEnumTag.md)

***

### createJSDocFunctionType()

> **createJSDocFunctionType**(`parameters`, `type`): [`JSDocFunctionType`](JSDocFunctionType.md)

#### Parameters

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`JSDocFunctionType`](JSDocFunctionType.md)

***

### createJSDocImplementsTag()

> **createJSDocImplementsTag**(`tagName`, `className`, `comment`?): [`JSDocImplementsTag`](JSDocImplementsTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### className

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md) & `object`

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocImplementsTag`](JSDocImplementsTag.md)

***

### createJSDocImportTag()

> **createJSDocImportTag**(`tagName`, `importClause`, `moduleSpecifier`, `attributes`?, `comment`?): [`JSDocImportTag`](JSDocImportTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### importClause

`undefined` | [`ImportClause`](ImportClause.md)

##### moduleSpecifier

[`Expression`](Expression.md)

##### attributes?

`ImportAttributes`

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocImportTag`](JSDocImportTag.md)

***

### createJSDocLink()

> **createJSDocLink**(`name`, `text`): [`JSDocLink`](JSDocLink.md)

#### Parameters

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLink`](JSDocLink.md)

***

### createJSDocLinkCode()

> **createJSDocLinkCode**(`name`, `text`): [`JSDocLinkCode`](JSDocLinkCode.md)

#### Parameters

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLinkCode`](JSDocLinkCode.md)

***

### createJSDocLinkPlain()

> **createJSDocLinkPlain**(`name`, `text`): [`JSDocLinkPlain`](JSDocLinkPlain.md)

#### Parameters

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLinkPlain`](JSDocLinkPlain.md)

***

### createJSDocMemberName()

> **createJSDocMemberName**(`left`, `right`): [`JSDocMemberName`](JSDocMemberName.md)

#### Parameters

##### left

[`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### right

[`Identifier`](Identifier.md)

#### Returns

[`JSDocMemberName`](JSDocMemberName.md)

***

### createJSDocNamepathType()

> **createJSDocNamepathType**(`type`): [`JSDocNamepathType`](JSDocNamepathType.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocNamepathType`](JSDocNamepathType.md)

***

### createJSDocNameReference()

> **createJSDocNameReference**(`name`): [`JSDocNameReference`](JSDocNameReference.md)

#### Parameters

##### name

[`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

#### Returns

[`JSDocNameReference`](JSDocNameReference.md)

***

### createJSDocNonNullableType()

> **createJSDocNonNullableType**(`type`, `postfix`?): [`JSDocNonNullableType`](JSDocNonNullableType.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

##### postfix?

`boolean`

#### Returns

[`JSDocNonNullableType`](JSDocNonNullableType.md)

***

### createJSDocNullableType()

> **createJSDocNullableType**(`type`, `postfix`?): [`JSDocNullableType`](JSDocNullableType.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

##### postfix?

`boolean`

#### Returns

[`JSDocNullableType`](JSDocNullableType.md)

***

### createJSDocOptionalType()

> **createJSDocOptionalType**(`type`): [`JSDocOptionalType`](JSDocOptionalType.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocOptionalType`](JSDocOptionalType.md)

***

### createJSDocOverloadTag()

> **createJSDocOverloadTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocOverloadTag`](JSDocOverloadTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocSignature`](JSDocSignature.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocOverloadTag`](JSDocOverloadTag.md)

***

### createJSDocOverrideTag()

> **createJSDocOverrideTag**(`tagName`, `comment`?): [`JSDocOverrideTag`](JSDocOverrideTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocOverrideTag`](JSDocOverrideTag.md)

***

### createJSDocParameterTag()

> **createJSDocParameterTag**(`tagName`, `name`, `isBracketed`, `typeExpression`?, `isNameFirst`?, `comment`?): [`JSDocParameterTag`](JSDocParameterTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### name

[`EntityName`](../type-aliases/EntityName.md)

##### isBracketed

`boolean`

##### typeExpression?

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### isNameFirst?

`boolean`

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocParameterTag`](JSDocParameterTag.md)

***

### createJSDocPrivateTag()

> **createJSDocPrivateTag**(`tagName`, `comment`?): [`JSDocPrivateTag`](JSDocPrivateTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPrivateTag`](JSDocPrivateTag.md)

***

### createJSDocPropertyTag()

> **createJSDocPropertyTag**(`tagName`, `name`, `isBracketed`, `typeExpression`?, `isNameFirst`?, `comment`?): [`JSDocPropertyTag`](JSDocPropertyTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### name

[`EntityName`](../type-aliases/EntityName.md)

##### isBracketed

`boolean`

##### typeExpression?

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### isNameFirst?

`boolean`

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPropertyTag`](JSDocPropertyTag.md)

***

### createJSDocProtectedTag()

> **createJSDocProtectedTag**(`tagName`, `comment`?): [`JSDocProtectedTag`](JSDocProtectedTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocProtectedTag`](JSDocProtectedTag.md)

***

### createJSDocPublicTag()

> **createJSDocPublicTag**(`tagName`, `comment`?): [`JSDocPublicTag`](JSDocPublicTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPublicTag`](JSDocPublicTag.md)

***

### createJSDocReadonlyTag()

> **createJSDocReadonlyTag**(`tagName`, `comment`?): [`JSDocReadonlyTag`](JSDocReadonlyTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocReadonlyTag`](JSDocReadonlyTag.md)

***

### createJSDocReturnTag()

> **createJSDocReturnTag**(`tagName`, `typeExpression`?, `comment`?): [`JSDocReturnTag`](JSDocReturnTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression?

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocReturnTag`](JSDocReturnTag.md)

***

### createJSDocSatisfiesTag()

> **createJSDocSatisfiesTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocSatisfiesTag`](JSDocSatisfiesTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocSatisfiesTag`](JSDocSatisfiesTag.md)

***

### createJSDocSeeTag()

> **createJSDocSeeTag**(`tagName`, `nameExpression`, `comment`?): [`JSDocSeeTag`](JSDocSeeTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### nameExpression

`undefined` | [`JSDocNameReference`](JSDocNameReference.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocSeeTag`](JSDocSeeTag.md)

***

### createJSDocSignature()

> **createJSDocSignature**(`typeParameters`, `parameters`, `type`?): [`JSDocSignature`](JSDocSignature.md)

#### Parameters

##### typeParameters

`undefined` | readonly [`JSDocTemplateTag`](JSDocTemplateTag.md)[]

##### parameters

readonly [`JSDocParameterTag`](JSDocParameterTag.md)[]

##### type?

[`JSDocReturnTag`](JSDocReturnTag.md)

#### Returns

[`JSDocSignature`](JSDocSignature.md)

***

### createJSDocTemplateTag()

> **createJSDocTemplateTag**(`tagName`, `constraint`, `typeParameters`, `comment`?): [`JSDocTemplateTag`](JSDocTemplateTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### constraint

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### typeParameters

readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTemplateTag`](JSDocTemplateTag.md)

***

### createJSDocText()

> **createJSDocText**(`text`): [`JSDocText`](JSDocText.md)

#### Parameters

##### text

`string`

#### Returns

[`JSDocText`](JSDocText.md)

***

### createJSDocThisTag()

> **createJSDocThisTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocThisTag`](JSDocThisTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocThisTag`](JSDocThisTag.md)

***

### createJSDocThrowsTag()

> **createJSDocThrowsTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocThrowsTag`](JSDocThrowsTag.md)

#### Parameters

##### tagName

[`Identifier`](Identifier.md)

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocThrowsTag`](JSDocThrowsTag.md)

***

### createJSDocTypedefTag()

> **createJSDocTypedefTag**(`tagName`, `typeExpression`?, `fullName`?, `comment`?): [`JSDocTypedefTag`](JSDocTypedefTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression?

[`JSDocTypeExpression`](JSDocTypeExpression.md) | [`JSDocTypeLiteral`](JSDocTypeLiteral.md)

##### fullName?

[`Identifier`](Identifier.md) | [`JSDocNamespaceDeclaration`](JSDocNamespaceDeclaration.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTypedefTag`](JSDocTypedefTag.md)

***

### createJSDocTypeExpression()

> **createJSDocTypeExpression**(`type`): [`JSDocTypeExpression`](JSDocTypeExpression.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocTypeExpression`](JSDocTypeExpression.md)

***

### createJSDocTypeLiteral()

> **createJSDocTypeLiteral**(`jsDocPropertyTags`?, `isArrayType`?): [`JSDocTypeLiteral`](JSDocTypeLiteral.md)

#### Parameters

##### jsDocPropertyTags?

readonly [`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md)[]

##### isArrayType?

`boolean`

#### Returns

[`JSDocTypeLiteral`](JSDocTypeLiteral.md)

***

### createJSDocTypeTag()

> **createJSDocTypeTag**(`tagName`, `typeExpression`, `comment`?): [`JSDocTypeTag`](JSDocTypeTag.md)

#### Parameters

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTypeTag`](JSDocTypeTag.md)

***

### createJSDocUnknownTag()

> **createJSDocUnknownTag**(`tagName`, `comment`?): [`JSDocUnknownTag`](JSDocUnknownTag.md)

#### Parameters

##### tagName

[`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocUnknownTag`](JSDocUnknownTag.md)

***

### createJSDocUnknownType()

> **createJSDocUnknownType**(): [`JSDocUnknownType`](JSDocUnknownType.md)

#### Returns

[`JSDocUnknownType`](JSDocUnknownType.md)

***

### createJSDocVariadicType()

> **createJSDocVariadicType**(`type`): [`JSDocVariadicType`](JSDocVariadicType.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocVariadicType`](JSDocVariadicType.md)

***

### createJsxAttribute()

> **createJsxAttribute**(`name`, `initializer`): [`JsxAttribute`](JsxAttribute.md)

#### Parameters

##### name

[`JsxAttributeName`](../type-aliases/JsxAttributeName.md)

##### initializer

`undefined` | [`JsxAttributeValue`](../type-aliases/JsxAttributeValue.md)

#### Returns

[`JsxAttribute`](JsxAttribute.md)

***

### createJsxAttributes()

> **createJsxAttributes**(`properties`): [`JsxAttributes`](JsxAttributes.md)

#### Parameters

##### properties

readonly [`JsxAttributeLike`](../type-aliases/JsxAttributeLike.md)[]

#### Returns

[`JsxAttributes`](JsxAttributes.md)

***

### createJsxClosingElement()

> **createJsxClosingElement**(`tagName`): [`JsxClosingElement`](JsxClosingElement.md)

#### Parameters

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

#### Returns

[`JsxClosingElement`](JsxClosingElement.md)

***

### createJsxElement()

> **createJsxElement**(`openingElement`, `children`, `closingElement`): [`JsxElement`](JsxElement.md)

#### Parameters

##### openingElement

[`JsxOpeningElement`](JsxOpeningElement.md)

##### children

readonly [`JsxChild`](../type-aliases/JsxChild.md)[]

##### closingElement

[`JsxClosingElement`](JsxClosingElement.md)

#### Returns

[`JsxElement`](JsxElement.md)

***

### createJsxExpression()

> **createJsxExpression**(`dotDotDotToken`, `expression`): [`JsxExpression`](JsxExpression.md)

#### Parameters

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### expression

`undefined` | [`Expression`](Expression.md)

#### Returns

[`JsxExpression`](JsxExpression.md)

***

### createJsxFragment()

> **createJsxFragment**(`openingFragment`, `children`, `closingFragment`): [`JsxFragment`](JsxFragment.md)

#### Parameters

##### openingFragment

[`JsxOpeningFragment`](JsxOpeningFragment.md)

##### children

readonly [`JsxChild`](../type-aliases/JsxChild.md)[]

##### closingFragment

[`JsxClosingFragment`](JsxClosingFragment.md)

#### Returns

[`JsxFragment`](JsxFragment.md)

***

### createJsxJsxClosingFragment()

> **createJsxJsxClosingFragment**(): [`JsxClosingFragment`](JsxClosingFragment.md)

#### Returns

[`JsxClosingFragment`](JsxClosingFragment.md)

***

### createJsxNamespacedName()

> **createJsxNamespacedName**(`namespace`, `name`): `JsxNamespacedName`

#### Parameters

##### namespace

[`Identifier`](Identifier.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

`JsxNamespacedName`

***

### createJsxOpeningElement()

> **createJsxOpeningElement**(`tagName`, `typeArguments`, `attributes`): [`JsxOpeningElement`](JsxOpeningElement.md)

#### Parameters

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### attributes

[`JsxAttributes`](JsxAttributes.md)

#### Returns

[`JsxOpeningElement`](JsxOpeningElement.md)

***

### createJsxOpeningFragment()

> **createJsxOpeningFragment**(): [`JsxOpeningFragment`](JsxOpeningFragment.md)

#### Returns

[`JsxOpeningFragment`](JsxOpeningFragment.md)

***

### createJsxSelfClosingElement()

> **createJsxSelfClosingElement**(`tagName`, `typeArguments`, `attributes`): [`JsxSelfClosingElement`](JsxSelfClosingElement.md)

#### Parameters

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### attributes

[`JsxAttributes`](JsxAttributes.md)

#### Returns

[`JsxSelfClosingElement`](JsxSelfClosingElement.md)

***

### createJsxSpreadAttribute()

> **createJsxSpreadAttribute**(`expression`): [`JsxSpreadAttribute`](JsxSpreadAttribute.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`JsxSpreadAttribute`](JsxSpreadAttribute.md)

***

### createJsxText()

> **createJsxText**(`text`, `containsOnlyTriviaWhiteSpaces`?): [`JsxText`](JsxText.md)

#### Parameters

##### text

`string`

##### containsOnlyTriviaWhiteSpaces?

`boolean`

#### Returns

[`JsxText`](JsxText.md)

***

### createKeywordTypeNode()

> **createKeywordTypeNode**\<`TKind`\>(`kind`): [`KeywordTypeNode`](KeywordTypeNode.md)\<`TKind`\>

#### Type Parameters

• **TKind** *extends* [`KeywordTypeSyntaxKind`](../type-aliases/KeywordTypeSyntaxKind.md)

#### Parameters

##### kind

`TKind`

#### Returns

[`KeywordTypeNode`](KeywordTypeNode.md)\<`TKind`\>

***

### createLabeledStatement()

> **createLabeledStatement**(`label`, `statement`): [`LabeledStatement`](LabeledStatement.md)

#### Parameters

##### label

`string` | [`Identifier`](Identifier.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`LabeledStatement`](LabeledStatement.md)

***

### createLeftShift()

> **createLeftShift**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createLessThan()

> **createLessThan**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createLessThanEquals()

> **createLessThanEquals**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createLiteralTypeNode()

> **createLiteralTypeNode**(`literal`): [`LiteralTypeNode`](LiteralTypeNode.md)

#### Parameters

##### literal

[`LiteralExpression`](LiteralExpression.md) | [`BooleanLiteral`](../type-aliases/BooleanLiteral.md) | [`PrefixUnaryExpression`](PrefixUnaryExpression.md) | [`NullLiteral`](NullLiteral.md)

#### Returns

[`LiteralTypeNode`](LiteralTypeNode.md)

***

### createLogicalAnd()

> **createLogicalAnd**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createLogicalNot()

> **createLogicalNot**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createLogicalOr()

> **createLogicalOr**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createLoopVariable()

> **createLoopVariable**(`reservedInNestedScopes`?): [`Identifier`](Identifier.md)

Create a unique temporary variable for use in a loop.

#### Parameters

##### reservedInNestedScopes?

`boolean`

When `true`, reserves the temporary variable name in all nested scopes
during emit so that the variable can be referenced in a nested function body. This is an alternative to
setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.

#### Returns

[`Identifier`](Identifier.md)

***

### createMappedTypeNode()

> **createMappedTypeNode**(`readonlyToken`, `typeParameter`, `nameType`, `questionToken`, `type`, `members`): [`MappedTypeNode`](MappedTypeNode.md)

#### Parameters

##### readonlyToken

`undefined` | [`ReadonlyKeyword`](../type-aliases/ReadonlyKeyword.md) | [`PlusToken`](../type-aliases/PlusToken.md) | [`MinusToken`](../type-aliases/MinusToken.md)

##### typeParameter

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

##### nameType

`undefined` | [`TypeNode`](TypeNode.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md) | [`PlusToken`](../type-aliases/PlusToken.md) | [`MinusToken`](../type-aliases/MinusToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### members

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeElement`](TypeElement.md)\>

#### Returns

[`MappedTypeNode`](MappedTypeNode.md)

***

### createMetaProperty()

> **createMetaProperty**(`keywordToken`, `name`): [`MetaProperty`](MetaProperty.md)

#### Parameters

##### keywordToken

[`ImportKeyword`](../enumerations/SyntaxKind.md#importkeyword) | [`NewKeyword`](../enumerations/SyntaxKind.md#newkeyword)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`MetaProperty`](MetaProperty.md)

***

### createMethodDeclaration()

> **createMethodDeclaration**(`modifiers`, `asteriskToken`, `name`, `questionToken`, `typeParameters`, `parameters`, `type`, `body`): [`MethodDeclaration`](MethodDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`MethodDeclaration`](MethodDeclaration.md)

***

### createMethodSignature()

> **createMethodSignature**(`modifiers`, `name`, `questionToken`, `typeParameters`, `parameters`, `type`): [`MethodSignature`](MethodSignature.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`MethodSignature`](MethodSignature.md)

***

### createModifier()

> **createModifier**\<`T`\>(`kind`): [`ModifierToken`](ModifierToken.md)\<`T`\>

#### Type Parameters

• **T** *extends* [`ModifierSyntaxKind`](../type-aliases/ModifierSyntaxKind.md)

#### Parameters

##### kind

`T`

#### Returns

[`ModifierToken`](ModifierToken.md)\<`T`\>

***

### createModifiersFromModifierFlags()

> **createModifiersFromModifierFlags**(`flags`): `undefined` \| [`Modifier`](../type-aliases/Modifier.md)[]

#### Parameters

##### flags

[`ModifierFlags`](../enumerations/ModifierFlags.md)

#### Returns

`undefined` \| [`Modifier`](../type-aliases/Modifier.md)[]

***

### createModuleBlock()

> **createModuleBlock**(`statements`): [`ModuleBlock`](ModuleBlock.md)

#### Parameters

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`ModuleBlock`](ModuleBlock.md)

***

### createModuleDeclaration()

> **createModuleDeclaration**(`modifiers`, `name`, `body`, `flags`?): [`ModuleDeclaration`](ModuleDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`ModuleName`](../type-aliases/ModuleName.md)

##### body

`undefined` | [`ModuleBody`](../type-aliases/ModuleBody.md)

##### flags?

[`NodeFlags`](../enumerations/NodeFlags.md)

#### Returns

[`ModuleDeclaration`](ModuleDeclaration.md)

***

### createModulo()

> **createModulo**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createMultiply()

> **createMultiply**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createNamedExports()

> **createNamedExports**(`elements`): [`NamedExports`](NamedExports.md)

#### Parameters

##### elements

readonly [`ExportSpecifier`](ExportSpecifier.md)[]

#### Returns

[`NamedExports`](NamedExports.md)

***

### createNamedImports()

> **createNamedImports**(`elements`): [`NamedImports`](NamedImports.md)

#### Parameters

##### elements

readonly [`ImportSpecifier`](ImportSpecifier.md)[]

#### Returns

[`NamedImports`](NamedImports.md)

***

### createNamedTupleMember()

> **createNamedTupleMember**(`dotDotDotToken`, `name`, `questionToken`, `type`): [`NamedTupleMember`](NamedTupleMember.md)

#### Parameters

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### name

[`Identifier`](Identifier.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`NamedTupleMember`](NamedTupleMember.md)

***

### createNamespaceExport()

> **createNamespaceExport**(`name`): [`NamespaceExport`](NamespaceExport.md)

#### Parameters

##### name

[`ModuleExportName`](../type-aliases/ModuleExportName.md)

#### Returns

[`NamespaceExport`](NamespaceExport.md)

***

### createNamespaceExportDeclaration()

> **createNamespaceExportDeclaration**(`name`): [`NamespaceExportDeclaration`](NamespaceExportDeclaration.md)

#### Parameters

##### name

`string` | [`Identifier`](Identifier.md)

#### Returns

[`NamespaceExportDeclaration`](NamespaceExportDeclaration.md)

***

### createNamespaceImport()

> **createNamespaceImport**(`name`): [`NamespaceImport`](NamespaceImport.md)

#### Parameters

##### name

[`Identifier`](Identifier.md)

#### Returns

[`NamespaceImport`](NamespaceImport.md)

***

### createNewExpression()

> **createNewExpression**(`expression`, `typeArguments`, `argumentsArray`): [`NewExpression`](NewExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

`undefined` | readonly [`Expression`](Expression.md)[]

#### Returns

[`NewExpression`](NewExpression.md)

***

### createNodeArray()

> **createNodeArray**\<`T`\>(`elements`?, `hasTrailingComma`?): [`NodeArray`](NodeArray.md)\<`T`\>

#### Type Parameters

• **T** *extends* [`Node`](Node.md)

#### Parameters

##### elements?

readonly `T`[]

##### hasTrailingComma?

`boolean`

#### Returns

[`NodeArray`](NodeArray.md)\<`T`\>

***

### createNonNullChain()

> **createNonNullChain**(`expression`): [`NonNullChain`](NonNullChain.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`NonNullChain`](NonNullChain.md)

***

### createNonNullExpression()

> **createNonNullExpression**(`expression`): [`NonNullExpression`](NonNullExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`NonNullExpression`](NonNullExpression.md)

***

### createNoSubstitutionTemplateLiteral()

#### Call Signature

> **createNoSubstitutionTemplateLiteral**(`text`, `rawText`?): [`NoSubstitutionTemplateLiteral`](NoSubstitutionTemplateLiteral.md)

##### Parameters

###### text

`string`

###### rawText?

`string`

##### Returns

[`NoSubstitutionTemplateLiteral`](NoSubstitutionTemplateLiteral.md)

#### Call Signature

> **createNoSubstitutionTemplateLiteral**(`text`, `rawText`): [`NoSubstitutionTemplateLiteral`](NoSubstitutionTemplateLiteral.md)

##### Parameters

###### text

`undefined` | `string`

###### rawText

`string`

##### Returns

[`NoSubstitutionTemplateLiteral`](NoSubstitutionTemplateLiteral.md)

***

### createNotEmittedStatement()

> **createNotEmittedStatement**(`original`): [`NotEmittedStatement`](NotEmittedStatement.md)

#### Parameters

##### original

[`Node`](Node.md)

#### Returns

[`NotEmittedStatement`](NotEmittedStatement.md)

***

### createNotEmittedTypeElement()

> **createNotEmittedTypeElement**(): [`NotEmittedTypeElement`](NotEmittedTypeElement.md)

#### Returns

[`NotEmittedTypeElement`](NotEmittedTypeElement.md)

***

### createNull()

> **createNull**(): [`NullLiteral`](NullLiteral.md)

#### Returns

[`NullLiteral`](NullLiteral.md)

***

### createNumericLiteral()

> **createNumericLiteral**(`value`, `numericLiteralFlags`?): [`NumericLiteral`](NumericLiteral.md)

#### Parameters

##### value

`string` | `number`

##### numericLiteralFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

#### Returns

[`NumericLiteral`](NumericLiteral.md)

***

### createObjectBindingPattern()

> **createObjectBindingPattern**(`elements`): [`ObjectBindingPattern`](ObjectBindingPattern.md)

#### Parameters

##### elements

readonly [`BindingElement`](BindingElement.md)[]

#### Returns

[`ObjectBindingPattern`](ObjectBindingPattern.md)

***

### createObjectLiteralExpression()

> **createObjectLiteralExpression**(`properties`?, `multiLine`?): [`ObjectLiteralExpression`](ObjectLiteralExpression.md)

#### Parameters

##### properties?

readonly [`ObjectLiteralElementLike`](../type-aliases/ObjectLiteralElementLike.md)[]

##### multiLine?

`boolean`

#### Returns

[`ObjectLiteralExpression`](ObjectLiteralExpression.md)

***

### createOmittedExpression()

> **createOmittedExpression**(): [`OmittedExpression`](OmittedExpression.md)

#### Returns

[`OmittedExpression`](OmittedExpression.md)

***

### createOptionalTypeNode()

> **createOptionalTypeNode**(`type`): [`OptionalTypeNode`](OptionalTypeNode.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`OptionalTypeNode`](OptionalTypeNode.md)

***

### createParameterDeclaration()

> **createParameterDeclaration**(`modifiers`, `dotDotDotToken`, `name`, `questionToken`?, `type`?, `initializer`?): [`ParameterDeclaration`](ParameterDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### name

`string` | [`BindingName`](../type-aliases/BindingName.md)

##### questionToken?

[`QuestionToken`](../type-aliases/QuestionToken.md)

##### type?

[`TypeNode`](TypeNode.md)

##### initializer?

[`Expression`](Expression.md)

#### Returns

[`ParameterDeclaration`](ParameterDeclaration.md)

***

### createParenthesizedExpression()

> **createParenthesizedExpression**(`expression`): [`ParenthesizedExpression`](ParenthesizedExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ParenthesizedExpression`](ParenthesizedExpression.md)

***

### createParenthesizedType()

> **createParenthesizedType**(`type`): [`ParenthesizedTypeNode`](ParenthesizedTypeNode.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`ParenthesizedTypeNode`](ParenthesizedTypeNode.md)

***

### createPartiallyEmittedExpression()

> **createPartiallyEmittedExpression**(`expression`, `original`?): [`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### original?

[`Node`](Node.md)

#### Returns

[`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)

***

### createPostfixDecrement()

> **createPostfixDecrement**(`operand`): [`PostfixUnaryExpression`](PostfixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PostfixUnaryExpression`](PostfixUnaryExpression.md)

***

### createPostfixIncrement()

> **createPostfixIncrement**(`operand`): [`PostfixUnaryExpression`](PostfixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PostfixUnaryExpression`](PostfixUnaryExpression.md)

***

### createPostfixUnaryExpression()

> **createPostfixUnaryExpression**(`operand`, `operator`): [`PostfixUnaryExpression`](PostfixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

##### operator

[`PostfixUnaryOperator`](../type-aliases/PostfixUnaryOperator.md)

#### Returns

[`PostfixUnaryExpression`](PostfixUnaryExpression.md)

***

### createPrefixDecrement()

> **createPrefixDecrement**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createPrefixIncrement()

> **createPrefixIncrement**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createPrefixMinus()

> **createPrefixMinus**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createPrefixPlus()

> **createPrefixPlus**(`operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createPrefixUnaryExpression()

> **createPrefixUnaryExpression**(`operator`, `operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### operator

[`PrefixUnaryOperator`](../type-aliases/PrefixUnaryOperator.md)

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### createPrivateIdentifier()

> **createPrivateIdentifier**(`text`): [`PrivateIdentifier`](PrivateIdentifier.md)

#### Parameters

##### text

`string`

#### Returns

[`PrivateIdentifier`](PrivateIdentifier.md)

***

### createPropertyAccessChain()

> **createPropertyAccessChain**(`expression`, `questionDotToken`, `name`): [`PropertyAccessChain`](PropertyAccessChain.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### name

`string` | [`MemberName`](../type-aliases/MemberName.md)

#### Returns

[`PropertyAccessChain`](PropertyAccessChain.md)

***

### createPropertyAccessExpression()

> **createPropertyAccessExpression**(`expression`, `name`): [`PropertyAccessExpression`](PropertyAccessExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### name

`string` | [`MemberName`](../type-aliases/MemberName.md)

#### Returns

[`PropertyAccessExpression`](PropertyAccessExpression.md)

***

### createPropertyAssignment()

> **createPropertyAssignment**(`name`, `initializer`): [`PropertyAssignment`](PropertyAssignment.md)

#### Parameters

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### initializer

[`Expression`](Expression.md)

#### Returns

[`PropertyAssignment`](PropertyAssignment.md)

***

### createPropertyDeclaration()

> **createPropertyDeclaration**(`modifiers`, `name`, `questionOrExclamationToken`, `type`, `initializer`): [`PropertyDeclaration`](PropertyDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### questionOrExclamationToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md) | [`ExclamationToken`](../type-aliases/ExclamationToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`PropertyDeclaration`](PropertyDeclaration.md)

***

### createPropertySignature()

> **createPropertySignature**(`modifiers`, `name`, `questionToken`, `type`): [`PropertySignature`](PropertySignature.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`PropertySignature`](PropertySignature.md)

***

### createQualifiedName()

> **createQualifiedName**(`left`, `right`): [`QualifiedName`](QualifiedName.md)

#### Parameters

##### left

[`EntityName`](../type-aliases/EntityName.md)

##### right

`string` | [`Identifier`](Identifier.md)

#### Returns

[`QualifiedName`](QualifiedName.md)

***

### createRegularExpressionLiteral()

> **createRegularExpressionLiteral**(`text`): [`RegularExpressionLiteral`](RegularExpressionLiteral.md)

#### Parameters

##### text

`string`

#### Returns

[`RegularExpressionLiteral`](RegularExpressionLiteral.md)

***

### createRestTypeNode()

> **createRestTypeNode**(`type`): [`RestTypeNode`](RestTypeNode.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`RestTypeNode`](RestTypeNode.md)

***

### createReturnStatement()

> **createReturnStatement**(`expression`?): [`ReturnStatement`](ReturnStatement.md)

#### Parameters

##### expression?

[`Expression`](Expression.md)

#### Returns

[`ReturnStatement`](ReturnStatement.md)

***

### createRightShift()

> **createRightShift**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createSatisfiesExpression()

> **createSatisfiesExpression**(`expression`, `type`): `SatisfiesExpression`

#### Parameters

##### expression

[`Expression`](Expression.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

`SatisfiesExpression`

***

### createSemicolonClassElement()

> **createSemicolonClassElement**(): [`SemicolonClassElement`](SemicolonClassElement.md)

#### Returns

[`SemicolonClassElement`](SemicolonClassElement.md)

***

### createSetAccessorDeclaration()

> **createSetAccessorDeclaration**(`modifiers`, `name`, `parameters`, `body`): [`SetAccessorDeclaration`](SetAccessorDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`SetAccessorDeclaration`](SetAccessorDeclaration.md)

***

### createShorthandPropertyAssignment()

> **createShorthandPropertyAssignment**(`name`, `objectAssignmentInitializer`?): [`ShorthandPropertyAssignment`](ShorthandPropertyAssignment.md)

#### Parameters

##### name

`string` | [`Identifier`](Identifier.md)

##### objectAssignmentInitializer?

[`Expression`](Expression.md)

#### Returns

[`ShorthandPropertyAssignment`](ShorthandPropertyAssignment.md)

***

### createSourceFile()

> **createSourceFile**(`statements`, `endOfFileToken`, `flags`): [`SourceFile`](SourceFile.md)

#### Parameters

##### statements

readonly [`Statement`](Statement.md)[]

##### endOfFileToken

[`EndOfFileToken`](../type-aliases/EndOfFileToken.md)

##### flags

[`NodeFlags`](../enumerations/NodeFlags.md)

#### Returns

[`SourceFile`](SourceFile.md)

***

### createSpreadAssignment()

> **createSpreadAssignment**(`expression`): [`SpreadAssignment`](SpreadAssignment.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`SpreadAssignment`](SpreadAssignment.md)

***

### createSpreadElement()

> **createSpreadElement**(`expression`): [`SpreadElement`](SpreadElement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`SpreadElement`](SpreadElement.md)

***

### createStrictEquality()

> **createStrictEquality**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createStrictInequality()

> **createStrictInequality**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createStringLiteral()

> **createStringLiteral**(`text`, `isSingleQuote`?): [`StringLiteral`](StringLiteral.md)

#### Parameters

##### text

`string`

##### isSingleQuote?

`boolean`

#### Returns

[`StringLiteral`](StringLiteral.md)

***

### createStringLiteralFromNode()

> **createStringLiteralFromNode**(`sourceNode`, `isSingleQuote`?): [`StringLiteral`](StringLiteral.md)

#### Parameters

##### sourceNode

[`PrivateIdentifier`](PrivateIdentifier.md) | [`PropertyNameLiteral`](../type-aliases/PropertyNameLiteral.md)

##### isSingleQuote?

`boolean`

#### Returns

[`StringLiteral`](StringLiteral.md)

***

### createSubtract()

> **createSubtract**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createSuper()

> **createSuper**(): [`SuperExpression`](SuperExpression.md)

#### Returns

[`SuperExpression`](SuperExpression.md)

***

### createSwitchStatement()

> **createSwitchStatement**(`expression`, `caseBlock`): [`SwitchStatement`](SwitchStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### caseBlock

[`CaseBlock`](CaseBlock.md)

#### Returns

[`SwitchStatement`](SwitchStatement.md)

***

### createTaggedTemplateExpression()

> **createTaggedTemplateExpression**(`tag`, `typeArguments`, `template`): [`TaggedTemplateExpression`](TaggedTemplateExpression.md)

#### Parameters

##### tag

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### template

[`TemplateLiteral`](../type-aliases/TemplateLiteral.md)

#### Returns

[`TaggedTemplateExpression`](TaggedTemplateExpression.md)

***

### createTemplateExpression()

> **createTemplateExpression**(`head`, `templateSpans`): [`TemplateExpression`](TemplateExpression.md)

#### Parameters

##### head

[`TemplateHead`](TemplateHead.md)

##### templateSpans

readonly [`TemplateSpan`](TemplateSpan.md)[]

#### Returns

[`TemplateExpression`](TemplateExpression.md)

***

### createTemplateHead()

#### Call Signature

> **createTemplateHead**(`text`, `rawText`?, `templateFlags`?): [`TemplateHead`](TemplateHead.md)

##### Parameters

###### text

`string`

###### rawText?

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateHead`](TemplateHead.md)

#### Call Signature

> **createTemplateHead**(`text`, `rawText`, `templateFlags`?): [`TemplateHead`](TemplateHead.md)

##### Parameters

###### text

`undefined` | `string`

###### rawText

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateHead`](TemplateHead.md)

***

### createTemplateLiteralType()

> **createTemplateLiteralType**(`head`, `templateSpans`): [`TemplateLiteralTypeNode`](TemplateLiteralTypeNode.md)

#### Parameters

##### head

[`TemplateHead`](TemplateHead.md)

##### templateSpans

readonly [`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)[]

#### Returns

[`TemplateLiteralTypeNode`](TemplateLiteralTypeNode.md)

***

### createTemplateLiteralTypeSpan()

> **createTemplateLiteralTypeSpan**(`type`, `literal`): [`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

##### literal

[`TemplateMiddle`](TemplateMiddle.md) | [`TemplateTail`](TemplateTail.md)

#### Returns

[`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

***

### createTemplateMiddle()

#### Call Signature

> **createTemplateMiddle**(`text`, `rawText`?, `templateFlags`?): [`TemplateMiddle`](TemplateMiddle.md)

##### Parameters

###### text

`string`

###### rawText?

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateMiddle`](TemplateMiddle.md)

#### Call Signature

> **createTemplateMiddle**(`text`, `rawText`, `templateFlags`?): [`TemplateMiddle`](TemplateMiddle.md)

##### Parameters

###### text

`undefined` | `string`

###### rawText

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateMiddle`](TemplateMiddle.md)

***

### createTemplateSpan()

> **createTemplateSpan**(`expression`, `literal`): [`TemplateSpan`](TemplateSpan.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### literal

[`TemplateMiddle`](TemplateMiddle.md) | [`TemplateTail`](TemplateTail.md)

#### Returns

[`TemplateSpan`](TemplateSpan.md)

***

### createTemplateTail()

#### Call Signature

> **createTemplateTail**(`text`, `rawText`?, `templateFlags`?): [`TemplateTail`](TemplateTail.md)

##### Parameters

###### text

`string`

###### rawText?

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateTail`](TemplateTail.md)

#### Call Signature

> **createTemplateTail**(`text`, `rawText`, `templateFlags`?): [`TemplateTail`](TemplateTail.md)

##### Parameters

###### text

`undefined` | `string`

###### rawText

`string`

###### templateFlags?

[`TokenFlags`](../enumerations/TokenFlags.md)

##### Returns

[`TemplateTail`](TemplateTail.md)

***

### createTempVariable()

> **createTempVariable**(`recordTempVariable`, `reservedInNestedScopes`?): [`Identifier`](Identifier.md)

Create a unique temporary variable.

#### Parameters

##### recordTempVariable

An optional callback used to record the temporary variable name. This
should usually be a reference to `hoistVariableDeclaration` from a `TransformationContext`, but
can be `undefined` if you plan to record the temporary variable manually.

`undefined` | (`node`) => `void`

##### reservedInNestedScopes?

`boolean`

When `true`, reserves the temporary variable name in all nested scopes
during emit so that the variable can be referenced in a nested function body. This is an alternative to
setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.

#### Returns

[`Identifier`](Identifier.md)

***

### createThis()

> **createThis**(): [`ThisExpression`](ThisExpression.md)

#### Returns

[`ThisExpression`](ThisExpression.md)

***

### createThisTypeNode()

> **createThisTypeNode**(): [`ThisTypeNode`](ThisTypeNode.md)

#### Returns

[`ThisTypeNode`](ThisTypeNode.md)

***

### createThrowStatement()

> **createThrowStatement**(`expression`): [`ThrowStatement`](ThrowStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`ThrowStatement`](ThrowStatement.md)

***

### createToken()

#### Call Signature

> **createToken**(`token`): [`SuperExpression`](SuperExpression.md)

##### Parameters

###### token

[`SuperKeyword`](../enumerations/SyntaxKind.md#superkeyword)

##### Returns

[`SuperExpression`](SuperExpression.md)

#### Call Signature

> **createToken**(`token`): [`ThisExpression`](ThisExpression.md)

##### Parameters

###### token

[`ThisKeyword`](../enumerations/SyntaxKind.md#thiskeyword)

##### Returns

[`ThisExpression`](ThisExpression.md)

#### Call Signature

> **createToken**(`token`): [`NullLiteral`](NullLiteral.md)

##### Parameters

###### token

[`NullKeyword`](../enumerations/SyntaxKind.md#nullkeyword)

##### Returns

[`NullLiteral`](NullLiteral.md)

#### Call Signature

> **createToken**(`token`): [`TrueLiteral`](TrueLiteral.md)

##### Parameters

###### token

[`TrueKeyword`](../enumerations/SyntaxKind.md#truekeyword)

##### Returns

[`TrueLiteral`](TrueLiteral.md)

#### Call Signature

> **createToken**(`token`): [`FalseLiteral`](FalseLiteral.md)

##### Parameters

###### token

[`FalseKeyword`](../enumerations/SyntaxKind.md#falsekeyword)

##### Returns

[`FalseLiteral`](FalseLiteral.md)

#### Call Signature

> **createToken**(`token`): [`EndOfFileToken`](../type-aliases/EndOfFileToken.md)

##### Parameters

###### token

[`EndOfFileToken`](../README.md#endoffiletoken)

##### Returns

[`EndOfFileToken`](../type-aliases/EndOfFileToken.md)

#### Call Signature

> **createToken**(`token`): [`Token`](Token.md)\<[`Unknown`](../enumerations/SyntaxKind.md#unknown)\>

##### Parameters

###### token

[`Unknown`](../enumerations/SyntaxKind.md#unknown)

##### Returns

[`Token`](Token.md)\<[`Unknown`](../enumerations/SyntaxKind.md#unknown)\>

#### Call Signature

> **createToken**\<`TKind`\>(`token`): [`PunctuationToken`](PunctuationToken.md)\<`TKind`\>

##### Type Parameters

• **TKind** *extends* [`PunctuationSyntaxKind`](../type-aliases/PunctuationSyntaxKind.md)

##### Parameters

###### token

`TKind`

##### Returns

[`PunctuationToken`](PunctuationToken.md)\<`TKind`\>

#### Call Signature

> **createToken**\<`TKind`\>(`token`): [`KeywordTypeNode`](KeywordTypeNode.md)\<`TKind`\>

##### Type Parameters

• **TKind** *extends* [`KeywordTypeSyntaxKind`](../type-aliases/KeywordTypeSyntaxKind.md)

##### Parameters

###### token

`TKind`

##### Returns

[`KeywordTypeNode`](KeywordTypeNode.md)\<`TKind`\>

#### Call Signature

> **createToken**\<`TKind`\>(`token`): [`ModifierToken`](ModifierToken.md)\<`TKind`\>

##### Type Parameters

• **TKind** *extends* [`ModifierSyntaxKind`](../type-aliases/ModifierSyntaxKind.md)

##### Parameters

###### token

`TKind`

##### Returns

[`ModifierToken`](ModifierToken.md)\<`TKind`\>

#### Call Signature

> **createToken**\<`TKind`\>(`token`): [`KeywordToken`](KeywordToken.md)\<`TKind`\>

##### Type Parameters

• **TKind** *extends* [`KeywordSyntaxKind`](../type-aliases/KeywordSyntaxKind.md)

##### Parameters

###### token

`TKind`

##### Returns

[`KeywordToken`](KeywordToken.md)\<`TKind`\>

***

### createTrue()

> **createTrue**(): [`TrueLiteral`](TrueLiteral.md)

#### Returns

[`TrueLiteral`](TrueLiteral.md)

***

### createTryStatement()

> **createTryStatement**(`tryBlock`, `catchClause`, `finallyBlock`): [`TryStatement`](TryStatement.md)

#### Parameters

##### tryBlock

[`Block`](Block.md)

##### catchClause

`undefined` | [`CatchClause`](CatchClause.md)

##### finallyBlock

`undefined` | [`Block`](Block.md)

#### Returns

[`TryStatement`](TryStatement.md)

***

### createTupleTypeNode()

> **createTupleTypeNode**(`elements`): [`TupleTypeNode`](TupleTypeNode.md)

#### Parameters

##### elements

readonly ([`TypeNode`](TypeNode.md) \| [`NamedTupleMember`](NamedTupleMember.md))[]

#### Returns

[`TupleTypeNode`](TupleTypeNode.md)

***

### createTypeAliasDeclaration()

> **createTypeAliasDeclaration**(`modifiers`, `name`, `typeParameters`, `type`): [`TypeAliasDeclaration`](TypeAliasDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`TypeAliasDeclaration`](TypeAliasDeclaration.md)

***

### createTypeAssertion()

> **createTypeAssertion**(`type`, `expression`): [`TypeAssertion`](TypeAssertion.md)

#### Parameters

##### type

[`TypeNode`](TypeNode.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`TypeAssertion`](TypeAssertion.md)

***

### createTypeLiteralNode()

> **createTypeLiteralNode**(`members`): [`TypeLiteralNode`](TypeLiteralNode.md)

#### Parameters

##### members

`undefined` | readonly [`TypeElement`](TypeElement.md)[]

#### Returns

[`TypeLiteralNode`](TypeLiteralNode.md)

***

### createTypeOfExpression()

> **createTypeOfExpression**(`expression`): [`TypeOfExpression`](TypeOfExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`TypeOfExpression`](TypeOfExpression.md)

***

### createTypeOperatorNode()

> **createTypeOperatorNode**(`operator`, `type`): [`TypeOperatorNode`](TypeOperatorNode.md)

#### Parameters

##### operator

[`KeyOfKeyword`](../enumerations/SyntaxKind.md#keyofkeyword) | [`ReadonlyKeyword`](../enumerations/SyntaxKind.md#readonlykeyword) | [`UniqueKeyword`](../enumerations/SyntaxKind.md#uniquekeyword)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`TypeOperatorNode`](TypeOperatorNode.md)

***

### createTypeParameterDeclaration()

> **createTypeParameterDeclaration**(`modifiers`, `name`, `constraint`?, `defaultType`?): [`TypeParameterDeclaration`](TypeParameterDeclaration.md)

#### Parameters

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

`string` | [`Identifier`](Identifier.md)

##### constraint?

[`TypeNode`](TypeNode.md)

##### defaultType?

[`TypeNode`](TypeNode.md)

#### Returns

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

***

### createTypePredicateNode()

> **createTypePredicateNode**(`assertsModifier`, `parameterName`, `type`): [`TypePredicateNode`](TypePredicateNode.md)

#### Parameters

##### assertsModifier

`undefined` | [`AssertsKeyword`](../type-aliases/AssertsKeyword.md)

##### parameterName

`string` | [`Identifier`](Identifier.md) | [`ThisTypeNode`](ThisTypeNode.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`TypePredicateNode`](TypePredicateNode.md)

***

### createTypeQueryNode()

> **createTypeQueryNode**(`exprName`, `typeArguments`?): [`TypeQueryNode`](TypeQueryNode.md)

#### Parameters

##### exprName

[`EntityName`](../type-aliases/EntityName.md)

##### typeArguments?

readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`TypeQueryNode`](TypeQueryNode.md)

***

### createTypeReferenceNode()

> **createTypeReferenceNode**(`typeName`, `typeArguments`?): [`TypeReferenceNode`](TypeReferenceNode.md)

#### Parameters

##### typeName

`string` | [`EntityName`](../type-aliases/EntityName.md)

##### typeArguments?

readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`TypeReferenceNode`](TypeReferenceNode.md)

***

### createUnionTypeNode()

> **createUnionTypeNode**(`types`): [`UnionTypeNode`](UnionTypeNode.md)

#### Parameters

##### types

readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`UnionTypeNode`](UnionTypeNode.md)

***

### createUniqueName()

> **createUniqueName**(`text`, `flags`?): [`Identifier`](Identifier.md)

Create a unique name based on the supplied text.

#### Parameters

##### text

`string`

##### flags?

[`GeneratedIdentifierFlags`](../enumerations/GeneratedIdentifierFlags.md)

#### Returns

[`Identifier`](Identifier.md)

***

### createUniquePrivateName()

> **createUniquePrivateName**(`text`?): [`PrivateIdentifier`](PrivateIdentifier.md)

#### Parameters

##### text?

`string`

#### Returns

[`PrivateIdentifier`](PrivateIdentifier.md)

***

### createUnsignedRightShift()

> **createUnsignedRightShift**(`left`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### left

[`Expression`](Expression.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### createVariableDeclaration()

> **createVariableDeclaration**(`name`, `exclamationToken`?, `type`?, `initializer`?): [`VariableDeclaration`](VariableDeclaration.md)

#### Parameters

##### name

`string` | [`BindingName`](../type-aliases/BindingName.md)

##### exclamationToken?

[`ExclamationToken`](../type-aliases/ExclamationToken.md)

##### type?

[`TypeNode`](TypeNode.md)

##### initializer?

[`Expression`](Expression.md)

#### Returns

[`VariableDeclaration`](VariableDeclaration.md)

***

### createVariableDeclarationList()

> **createVariableDeclarationList**(`declarations`, `flags`?): [`VariableDeclarationList`](VariableDeclarationList.md)

#### Parameters

##### declarations

readonly [`VariableDeclaration`](VariableDeclaration.md)[]

##### flags?

[`NodeFlags`](../enumerations/NodeFlags.md)

#### Returns

[`VariableDeclarationList`](VariableDeclarationList.md)

***

### createVariableStatement()

> **createVariableStatement**(`modifiers`, `declarationList`): [`VariableStatement`](VariableStatement.md)

#### Parameters

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### declarationList

[`VariableDeclarationList`](VariableDeclarationList.md) | readonly [`VariableDeclaration`](VariableDeclaration.md)[]

#### Returns

[`VariableStatement`](VariableStatement.md)

***

### createVoidExpression()

> **createVoidExpression**(`expression`): [`VoidExpression`](VoidExpression.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

#### Returns

[`VoidExpression`](VoidExpression.md)

***

### createVoidZero()

> **createVoidZero**(): [`VoidExpression`](VoidExpression.md)

#### Returns

[`VoidExpression`](VoidExpression.md)

***

### createWhileStatement()

> **createWhileStatement**(`expression`, `statement`): [`WhileStatement`](WhileStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`WhileStatement`](WhileStatement.md)

***

### createWithStatement()

> **createWithStatement**(`expression`, `statement`): [`WithStatement`](WithStatement.md)

#### Parameters

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`WithStatement`](WithStatement.md)

***

### createYieldExpression()

#### Call Signature

> **createYieldExpression**(`asteriskToken`, `expression`): [`YieldExpression`](YieldExpression.md)

##### Parameters

###### asteriskToken

[`AsteriskToken`](../type-aliases/AsteriskToken.md)

###### expression

[`Expression`](Expression.md)

##### Returns

[`YieldExpression`](YieldExpression.md)

#### Call Signature

> **createYieldExpression**(`asteriskToken`, `expression`): [`YieldExpression`](YieldExpression.md)

##### Parameters

###### asteriskToken

`undefined`

###### expression

`undefined` | [`Expression`](Expression.md)

##### Returns

[`YieldExpression`](YieldExpression.md)

***

### getGeneratedNameForNode()

> **getGeneratedNameForNode**(`node`, `flags`?): [`Identifier`](Identifier.md)

Create a unique name generated for a node.

#### Parameters

##### node

`undefined` | [`Node`](Node.md)

##### flags?

[`GeneratedIdentifierFlags`](../enumerations/GeneratedIdentifierFlags.md)

#### Returns

[`Identifier`](Identifier.md)

***

### getGeneratedPrivateNameForNode()

> **getGeneratedPrivateNameForNode**(`node`): [`PrivateIdentifier`](PrivateIdentifier.md)

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

[`PrivateIdentifier`](PrivateIdentifier.md)

***

### replaceDecoratorsAndModifiers()

> **replaceDecoratorsAndModifiers**\<`T`\>(`node`, `modifiers`): `T`

Updates a node that may contain decorators or modifiers, replacing only the decorators and modifiers of the node.

#### Type Parameters

• **T** *extends* [`HasModifiers`](../type-aliases/HasModifiers.md) & [`HasDecorators`](../type-aliases/HasDecorators.md)

#### Parameters

##### node

`T`

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

#### Returns

`T`

***

### replaceModifiers()

> **replaceModifiers**\<`T`\>(`node`, `modifiers`): `T`

Updates a node that may contain modifiers, replacing only the modifiers of the node.

#### Type Parameters

• **T** *extends* [`HasModifiers`](../type-aliases/HasModifiers.md)

#### Parameters

##### node

`T`

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[] | [`ModifierFlags`](../enumerations/ModifierFlags.md)

#### Returns

`T`

***

### replacePropertyName()

> **replacePropertyName**\<`T`\>(`node`, `name`): `T`

Updates a node that contains a property name, replacing only the name of the node.

#### Type Parameters

• **T** *extends* [`MethodDeclaration`](MethodDeclaration.md) \| [`MethodSignature`](MethodSignature.md) \| [`PropertyAssignment`](PropertyAssignment.md) \| [`PropertyDeclaration`](PropertyDeclaration.md) \| [`PropertySignature`](PropertySignature.md) \| [`AccessorDeclaration`](../type-aliases/AccessorDeclaration.md)

#### Parameters

##### node

`T`

##### name

`T`\[`"name"`\]

#### Returns

`T`

***

### restoreOuterExpressions()

> **restoreOuterExpressions**(`outerExpression`, `innerExpression`, `kinds`?): [`Expression`](Expression.md)

#### Parameters

##### outerExpression

`undefined` | [`Expression`](Expression.md)

##### innerExpression

[`Expression`](Expression.md)

##### kinds?

[`OuterExpressionKinds`](../enumerations/OuterExpressionKinds.md)

#### Returns

[`Expression`](Expression.md)

***

### updateArrayBindingPattern()

> **updateArrayBindingPattern**(`node`, `elements`): [`ArrayBindingPattern`](ArrayBindingPattern.md)

#### Parameters

##### node

[`ArrayBindingPattern`](ArrayBindingPattern.md)

##### elements

readonly [`ArrayBindingElement`](../type-aliases/ArrayBindingElement.md)[]

#### Returns

[`ArrayBindingPattern`](ArrayBindingPattern.md)

***

### updateArrayLiteralExpression()

> **updateArrayLiteralExpression**(`node`, `elements`): [`ArrayLiteralExpression`](ArrayLiteralExpression.md)

#### Parameters

##### node

[`ArrayLiteralExpression`](ArrayLiteralExpression.md)

##### elements

readonly [`Expression`](Expression.md)[]

#### Returns

[`ArrayLiteralExpression`](ArrayLiteralExpression.md)

***

### updateArrayTypeNode()

> **updateArrayTypeNode**(`node`, `elementType`): [`ArrayTypeNode`](ArrayTypeNode.md)

#### Parameters

##### node

[`ArrayTypeNode`](ArrayTypeNode.md)

##### elementType

[`TypeNode`](TypeNode.md)

#### Returns

[`ArrayTypeNode`](ArrayTypeNode.md)

***

### updateArrowFunction()

> **updateArrowFunction**(`node`, `modifiers`, `typeParameters`, `parameters`, `type`, `equalsGreaterThanToken`, `body`): [`ArrowFunction`](ArrowFunction.md)

#### Parameters

##### node

[`ArrowFunction`](ArrowFunction.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### equalsGreaterThanToken

[`EqualsGreaterThanToken`](../type-aliases/EqualsGreaterThanToken.md)

##### body

[`ConciseBody`](../type-aliases/ConciseBody.md)

#### Returns

[`ArrowFunction`](ArrowFunction.md)

***

### updateAsExpression()

> **updateAsExpression**(`node`, `expression`, `type`): [`AsExpression`](AsExpression.md)

#### Parameters

##### node

[`AsExpression`](AsExpression.md)

##### expression

[`Expression`](Expression.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`AsExpression`](AsExpression.md)

***

### ~~updateAssertClause()~~

> **updateAssertClause**(`node`, `elements`, `multiLine`?): `AssertClause`

#### Parameters

##### node

`AssertClause`

##### elements

[`NodeArray`](NodeArray.md)\<`AssertEntry`\>

##### multiLine?

`boolean`

#### Returns

`AssertClause`

#### Deprecated

***

### ~~updateAssertEntry()~~

> **updateAssertEntry**(`node`, `name`, `value`): `AssertEntry`

#### Parameters

##### node

`AssertEntry`

##### name

[`ImportAttributeName`](../type-aliases/ImportAttributeName.md)

##### value

[`Expression`](Expression.md)

#### Returns

`AssertEntry`

#### Deprecated

***

### updateAwaitExpression()

> **updateAwaitExpression**(`node`, `expression`): [`AwaitExpression`](AwaitExpression.md)

#### Parameters

##### node

[`AwaitExpression`](AwaitExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`AwaitExpression`](AwaitExpression.md)

***

### updateBinaryExpression()

> **updateBinaryExpression**(`node`, `left`, `operator`, `right`): [`BinaryExpression`](BinaryExpression.md)

#### Parameters

##### node

[`BinaryExpression`](BinaryExpression.md)

##### left

[`Expression`](Expression.md)

##### operator

[`BinaryOperatorToken`](../type-aliases/BinaryOperatorToken.md) | [`BinaryOperator`](../type-aliases/BinaryOperator.md)

##### right

[`Expression`](Expression.md)

#### Returns

[`BinaryExpression`](BinaryExpression.md)

***

### updateBindingElement()

> **updateBindingElement**(`node`, `dotDotDotToken`, `propertyName`, `name`, `initializer`): [`BindingElement`](BindingElement.md)

#### Parameters

##### node

[`BindingElement`](BindingElement.md)

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### propertyName

`undefined` | [`PropertyName`](../type-aliases/PropertyName.md)

##### name

[`BindingName`](../type-aliases/BindingName.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`BindingElement`](BindingElement.md)

***

### updateBlock()

> **updateBlock**(`node`, `statements`): [`Block`](Block.md)

#### Parameters

##### node

[`Block`](Block.md)

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`Block`](Block.md)

***

### updateBreakStatement()

> **updateBreakStatement**(`node`, `label`): [`BreakStatement`](BreakStatement.md)

#### Parameters

##### node

[`BreakStatement`](BreakStatement.md)

##### label

`undefined` | [`Identifier`](Identifier.md)

#### Returns

[`BreakStatement`](BreakStatement.md)

***

### updateBundle()

> **updateBundle**(`node`, `sourceFiles`): [`Bundle`](Bundle.md)

#### Parameters

##### node

[`Bundle`](Bundle.md)

##### sourceFiles

readonly [`SourceFile`](SourceFile.md)[]

#### Returns

[`Bundle`](Bundle.md)

***

### updateCallChain()

> **updateCallChain**(`node`, `expression`, `questionDotToken`, `typeArguments`, `argumentsArray`): [`CallChain`](CallChain.md)

#### Parameters

##### node

[`CallChain`](CallChain.md)

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

readonly [`Expression`](Expression.md)[]

#### Returns

[`CallChain`](CallChain.md)

***

### updateCallExpression()

> **updateCallExpression**(`node`, `expression`, `typeArguments`, `argumentsArray`): [`CallExpression`](CallExpression.md)

#### Parameters

##### node

[`CallExpression`](CallExpression.md)

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

readonly [`Expression`](Expression.md)[]

#### Returns

[`CallExpression`](CallExpression.md)

***

### updateCallSignature()

> **updateCallSignature**(`node`, `typeParameters`, `parameters`, `type`): [`CallSignatureDeclaration`](CallSignatureDeclaration.md)

#### Parameters

##### node

[`CallSignatureDeclaration`](CallSignatureDeclaration.md)

##### typeParameters

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

##### parameters

[`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`CallSignatureDeclaration`](CallSignatureDeclaration.md)

***

### updateCaseBlock()

> **updateCaseBlock**(`node`, `clauses`): [`CaseBlock`](CaseBlock.md)

#### Parameters

##### node

[`CaseBlock`](CaseBlock.md)

##### clauses

readonly [`CaseOrDefaultClause`](../type-aliases/CaseOrDefaultClause.md)[]

#### Returns

[`CaseBlock`](CaseBlock.md)

***

### updateCaseClause()

> **updateCaseClause**(`node`, `expression`, `statements`): [`CaseClause`](CaseClause.md)

#### Parameters

##### node

[`CaseClause`](CaseClause.md)

##### expression

[`Expression`](Expression.md)

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`CaseClause`](CaseClause.md)

***

### updateCatchClause()

> **updateCatchClause**(`node`, `variableDeclaration`, `block`): [`CatchClause`](CatchClause.md)

#### Parameters

##### node

[`CatchClause`](CatchClause.md)

##### variableDeclaration

`undefined` | [`VariableDeclaration`](VariableDeclaration.md)

##### block

[`Block`](Block.md)

#### Returns

[`CatchClause`](CatchClause.md)

***

### updateClassDeclaration()

> **updateClassDeclaration**(`node`, `modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`ClassDeclaration`](ClassDeclaration.md)

#### Parameters

##### node

[`ClassDeclaration`](ClassDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`undefined` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`ClassElement`](ClassElement.md)[]

#### Returns

[`ClassDeclaration`](ClassDeclaration.md)

***

### updateClassExpression()

> **updateClassExpression**(`node`, `modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`ClassExpression`](ClassExpression.md)

#### Parameters

##### node

[`ClassExpression`](ClassExpression.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`undefined` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`ClassElement`](ClassElement.md)[]

#### Returns

[`ClassExpression`](ClassExpression.md)

***

### updateClassStaticBlockDeclaration()

> **updateClassStaticBlockDeclaration**(`node`, `body`): [`ClassStaticBlockDeclaration`](ClassStaticBlockDeclaration.md)

#### Parameters

##### node

[`ClassStaticBlockDeclaration`](ClassStaticBlockDeclaration.md)

##### body

[`Block`](Block.md)

#### Returns

[`ClassStaticBlockDeclaration`](ClassStaticBlockDeclaration.md)

***

### updateCommaListExpression()

> **updateCommaListExpression**(`node`, `elements`): [`CommaListExpression`](CommaListExpression.md)

#### Parameters

##### node

[`CommaListExpression`](CommaListExpression.md)

##### elements

readonly [`Expression`](Expression.md)[]

#### Returns

[`CommaListExpression`](CommaListExpression.md)

***

### updateComputedPropertyName()

> **updateComputedPropertyName**(`node`, `expression`): [`ComputedPropertyName`](ComputedPropertyName.md)

#### Parameters

##### node

[`ComputedPropertyName`](ComputedPropertyName.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`ComputedPropertyName`](ComputedPropertyName.md)

***

### updateConditionalExpression()

> **updateConditionalExpression**(`node`, `condition`, `questionToken`, `whenTrue`, `colonToken`, `whenFalse`): [`ConditionalExpression`](ConditionalExpression.md)

#### Parameters

##### node

[`ConditionalExpression`](ConditionalExpression.md)

##### condition

[`Expression`](Expression.md)

##### questionToken

[`QuestionToken`](../type-aliases/QuestionToken.md)

##### whenTrue

[`Expression`](Expression.md)

##### colonToken

[`ColonToken`](../type-aliases/ColonToken.md)

##### whenFalse

[`Expression`](Expression.md)

#### Returns

[`ConditionalExpression`](ConditionalExpression.md)

***

### updateConditionalTypeNode()

> **updateConditionalTypeNode**(`node`, `checkType`, `extendsType`, `trueType`, `falseType`): [`ConditionalTypeNode`](ConditionalTypeNode.md)

#### Parameters

##### node

[`ConditionalTypeNode`](ConditionalTypeNode.md)

##### checkType

[`TypeNode`](TypeNode.md)

##### extendsType

[`TypeNode`](TypeNode.md)

##### trueType

[`TypeNode`](TypeNode.md)

##### falseType

[`TypeNode`](TypeNode.md)

#### Returns

[`ConditionalTypeNode`](ConditionalTypeNode.md)

***

### updateConstructorDeclaration()

> **updateConstructorDeclaration**(`node`, `modifiers`, `parameters`, `body`): [`ConstructorDeclaration`](ConstructorDeclaration.md)

#### Parameters

##### node

[`ConstructorDeclaration`](ConstructorDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`ConstructorDeclaration`](ConstructorDeclaration.md)

***

### updateConstructorTypeNode()

> **updateConstructorTypeNode**(`node`, `modifiers`, `typeParameters`, `parameters`, `type`): [`ConstructorTypeNode`](ConstructorTypeNode.md)

#### Parameters

##### node

[`ConstructorTypeNode`](ConstructorTypeNode.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### typeParameters

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

##### parameters

[`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`ConstructorTypeNode`](ConstructorTypeNode.md)

***

### updateConstructSignature()

> **updateConstructSignature**(`node`, `typeParameters`, `parameters`, `type`): [`ConstructSignatureDeclaration`](ConstructSignatureDeclaration.md)

#### Parameters

##### node

[`ConstructSignatureDeclaration`](ConstructSignatureDeclaration.md)

##### typeParameters

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

##### parameters

[`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`ConstructSignatureDeclaration`](ConstructSignatureDeclaration.md)

***

### updateContinueStatement()

> **updateContinueStatement**(`node`, `label`): [`ContinueStatement`](ContinueStatement.md)

#### Parameters

##### node

[`ContinueStatement`](ContinueStatement.md)

##### label

`undefined` | [`Identifier`](Identifier.md)

#### Returns

[`ContinueStatement`](ContinueStatement.md)

***

### updateDecorator()

> **updateDecorator**(`node`, `expression`): [`Decorator`](Decorator.md)

#### Parameters

##### node

[`Decorator`](Decorator.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`Decorator`](Decorator.md)

***

### updateDefaultClause()

> **updateDefaultClause**(`node`, `statements`): [`DefaultClause`](DefaultClause.md)

#### Parameters

##### node

[`DefaultClause`](DefaultClause.md)

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`DefaultClause`](DefaultClause.md)

***

### updateDeleteExpression()

> **updateDeleteExpression**(`node`, `expression`): [`DeleteExpression`](DeleteExpression.md)

#### Parameters

##### node

[`DeleteExpression`](DeleteExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`DeleteExpression`](DeleteExpression.md)

***

### updateDoStatement()

> **updateDoStatement**(`node`, `statement`, `expression`): [`DoStatement`](DoStatement.md)

#### Parameters

##### node

[`DoStatement`](DoStatement.md)

##### statement

[`Statement`](Statement.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`DoStatement`](DoStatement.md)

***

### updateElementAccessChain()

> **updateElementAccessChain**(`node`, `expression`, `questionDotToken`, `argumentExpression`): [`ElementAccessChain`](ElementAccessChain.md)

#### Parameters

##### node

[`ElementAccessChain`](ElementAccessChain.md)

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### argumentExpression

[`Expression`](Expression.md)

#### Returns

[`ElementAccessChain`](ElementAccessChain.md)

***

### updateElementAccessExpression()

> **updateElementAccessExpression**(`node`, `expression`, `argumentExpression`): [`ElementAccessExpression`](ElementAccessExpression.md)

#### Parameters

##### node

[`ElementAccessExpression`](ElementAccessExpression.md)

##### expression

[`Expression`](Expression.md)

##### argumentExpression

[`Expression`](Expression.md)

#### Returns

[`ElementAccessExpression`](ElementAccessExpression.md)

***

### updateEnumDeclaration()

> **updateEnumDeclaration**(`node`, `modifiers`, `name`, `members`): [`EnumDeclaration`](EnumDeclaration.md)

#### Parameters

##### node

[`EnumDeclaration`](EnumDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`Identifier`](Identifier.md)

##### members

readonly [`EnumMember`](EnumMember.md)[]

#### Returns

[`EnumDeclaration`](EnumDeclaration.md)

***

### updateEnumMember()

> **updateEnumMember**(`node`, `name`, `initializer`): [`EnumMember`](EnumMember.md)

#### Parameters

##### node

[`EnumMember`](EnumMember.md)

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`EnumMember`](EnumMember.md)

***

### updateExportAssignment()

> **updateExportAssignment**(`node`, `modifiers`, `expression`): [`ExportAssignment`](ExportAssignment.md)

#### Parameters

##### node

[`ExportAssignment`](ExportAssignment.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExportAssignment`](ExportAssignment.md)

***

### updateExportDeclaration()

> **updateExportDeclaration**(`node`, `modifiers`, `isTypeOnly`, `exportClause`, `moduleSpecifier`, `attributes`): [`ExportDeclaration`](ExportDeclaration.md)

#### Parameters

##### node

[`ExportDeclaration`](ExportDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### isTypeOnly

`boolean`

##### exportClause

`undefined` | [`NamedExportBindings`](../type-aliases/NamedExportBindings.md)

##### moduleSpecifier

`undefined` | [`Expression`](Expression.md)

##### attributes

`undefined` | `ImportAttributes`

#### Returns

[`ExportDeclaration`](ExportDeclaration.md)

***

### updateExportSpecifier()

> **updateExportSpecifier**(`node`, `isTypeOnly`, `propertyName`, `name`): [`ExportSpecifier`](ExportSpecifier.md)

#### Parameters

##### node

[`ExportSpecifier`](ExportSpecifier.md)

##### isTypeOnly

`boolean`

##### propertyName

`undefined` | [`ModuleExportName`](../type-aliases/ModuleExportName.md)

##### name

[`ModuleExportName`](../type-aliases/ModuleExportName.md)

#### Returns

[`ExportSpecifier`](ExportSpecifier.md)

***

### updateExpressionStatement()

> **updateExpressionStatement**(`node`, `expression`): [`ExpressionStatement`](ExpressionStatement.md)

#### Parameters

##### node

[`ExpressionStatement`](ExpressionStatement.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExpressionStatement`](ExpressionStatement.md)

***

### updateExpressionWithTypeArguments()

> **updateExpressionWithTypeArguments**(`node`, `expression`, `typeArguments`): [`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)

#### Parameters

##### node

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)

***

### updateExternalModuleReference()

> **updateExternalModuleReference**(`node`, `expression`): [`ExternalModuleReference`](ExternalModuleReference.md)

#### Parameters

##### node

[`ExternalModuleReference`](ExternalModuleReference.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`ExternalModuleReference`](ExternalModuleReference.md)

***

### updateForInStatement()

> **updateForInStatement**(`node`, `initializer`, `expression`, `statement`): [`ForInStatement`](ForInStatement.md)

#### Parameters

##### node

[`ForInStatement`](ForInStatement.md)

##### initializer

[`ForInitializer`](../type-aliases/ForInitializer.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForInStatement`](ForInStatement.md)

***

### updateForOfStatement()

> **updateForOfStatement**(`node`, `awaitModifier`, `initializer`, `expression`, `statement`): [`ForOfStatement`](ForOfStatement.md)

#### Parameters

##### node

[`ForOfStatement`](ForOfStatement.md)

##### awaitModifier

`undefined` | [`AwaitKeyword`](../type-aliases/AwaitKeyword.md)

##### initializer

[`ForInitializer`](../type-aliases/ForInitializer.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForOfStatement`](ForOfStatement.md)

***

### updateForStatement()

> **updateForStatement**(`node`, `initializer`, `condition`, `incrementor`, `statement`): [`ForStatement`](ForStatement.md)

#### Parameters

##### node

[`ForStatement`](ForStatement.md)

##### initializer

`undefined` | [`ForInitializer`](../type-aliases/ForInitializer.md)

##### condition

`undefined` | [`Expression`](Expression.md)

##### incrementor

`undefined` | [`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`ForStatement`](ForStatement.md)

***

### updateFunctionDeclaration()

> **updateFunctionDeclaration**(`node`, `modifiers`, `asteriskToken`, `name`, `typeParameters`, `parameters`, `type`, `body`): [`FunctionDeclaration`](FunctionDeclaration.md)

#### Parameters

##### node

[`FunctionDeclaration`](FunctionDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

`undefined` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`FunctionDeclaration`](FunctionDeclaration.md)

***

### updateFunctionExpression()

> **updateFunctionExpression**(`node`, `modifiers`, `asteriskToken`, `name`, `typeParameters`, `parameters`, `type`, `body`): [`FunctionExpression`](FunctionExpression.md)

#### Parameters

##### node

[`FunctionExpression`](FunctionExpression.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

`undefined` | [`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

[`Block`](Block.md)

#### Returns

[`FunctionExpression`](FunctionExpression.md)

***

### updateFunctionTypeNode()

> **updateFunctionTypeNode**(`node`, `typeParameters`, `parameters`, `type`): [`FunctionTypeNode`](FunctionTypeNode.md)

#### Parameters

##### node

[`FunctionTypeNode`](FunctionTypeNode.md)

##### typeParameters

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

##### parameters

[`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`FunctionTypeNode`](FunctionTypeNode.md)

***

### updateGetAccessorDeclaration()

> **updateGetAccessorDeclaration**(`node`, `modifiers`, `name`, `parameters`, `type`, `body`): [`GetAccessorDeclaration`](GetAccessorDeclaration.md)

#### Parameters

##### node

[`GetAccessorDeclaration`](GetAccessorDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`GetAccessorDeclaration`](GetAccessorDeclaration.md)

***

### updateHeritageClause()

> **updateHeritageClause**(`node`, `types`): [`HeritageClause`](HeritageClause.md)

#### Parameters

##### node

[`HeritageClause`](HeritageClause.md)

##### types

readonly [`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md)[]

#### Returns

[`HeritageClause`](HeritageClause.md)

***

### updateIfStatement()

> **updateIfStatement**(`node`, `expression`, `thenStatement`, `elseStatement`): [`IfStatement`](IfStatement.md)

#### Parameters

##### node

[`IfStatement`](IfStatement.md)

##### expression

[`Expression`](Expression.md)

##### thenStatement

[`Statement`](Statement.md)

##### elseStatement

`undefined` | [`Statement`](Statement.md)

#### Returns

[`IfStatement`](IfStatement.md)

***

### updateImportAttribute()

> **updateImportAttribute**(`node`, `name`, `value`): `ImportAttribute`

#### Parameters

##### node

`ImportAttribute`

##### name

[`ImportAttributeName`](../type-aliases/ImportAttributeName.md)

##### value

[`Expression`](Expression.md)

#### Returns

`ImportAttribute`

***

### updateImportAttributes()

> **updateImportAttributes**(`node`, `elements`, `multiLine`?): `ImportAttributes`

#### Parameters

##### node

`ImportAttributes`

##### elements

[`NodeArray`](NodeArray.md)\<`ImportAttribute`\>

##### multiLine?

`boolean`

#### Returns

`ImportAttributes`

***

### updateImportClause()

> **updateImportClause**(`node`, `isTypeOnly`, `name`, `namedBindings`): [`ImportClause`](ImportClause.md)

#### Parameters

##### node

[`ImportClause`](ImportClause.md)

##### isTypeOnly

`boolean`

##### name

`undefined` | [`Identifier`](Identifier.md)

##### namedBindings

`undefined` | [`NamedImportBindings`](../type-aliases/NamedImportBindings.md)

#### Returns

[`ImportClause`](ImportClause.md)

***

### updateImportDeclaration()

> **updateImportDeclaration**(`node`, `modifiers`, `importClause`, `moduleSpecifier`, `attributes`): [`ImportDeclaration`](ImportDeclaration.md)

#### Parameters

##### node

[`ImportDeclaration`](ImportDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### importClause

`undefined` | [`ImportClause`](ImportClause.md)

##### moduleSpecifier

[`Expression`](Expression.md)

##### attributes

`undefined` | `ImportAttributes`

#### Returns

[`ImportDeclaration`](ImportDeclaration.md)

***

### updateImportEqualsDeclaration()

> **updateImportEqualsDeclaration**(`node`, `modifiers`, `isTypeOnly`, `name`, `moduleReference`): [`ImportEqualsDeclaration`](ImportEqualsDeclaration.md)

#### Parameters

##### node

[`ImportEqualsDeclaration`](ImportEqualsDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### isTypeOnly

`boolean`

##### name

[`Identifier`](Identifier.md)

##### moduleReference

[`ModuleReference`](../type-aliases/ModuleReference.md)

#### Returns

[`ImportEqualsDeclaration`](ImportEqualsDeclaration.md)

***

### updateImportSpecifier()

> **updateImportSpecifier**(`node`, `isTypeOnly`, `propertyName`, `name`): [`ImportSpecifier`](ImportSpecifier.md)

#### Parameters

##### node

[`ImportSpecifier`](ImportSpecifier.md)

##### isTypeOnly

`boolean`

##### propertyName

`undefined` | [`ModuleExportName`](../type-aliases/ModuleExportName.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`ImportSpecifier`](ImportSpecifier.md)

***

### ~~updateImportTypeAssertionContainer()~~

> **updateImportTypeAssertionContainer**(`node`, `clause`, `multiLine`?): [`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

#### Parameters

##### node

[`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

##### clause

`AssertClause`

##### multiLine?

`boolean`

#### Returns

[`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

#### Deprecated

***

### updateImportTypeNode()

> **updateImportTypeNode**(`node`, `argument`, `attributes`, `qualifier`, `typeArguments`, `isTypeOf`?): [`ImportTypeNode`](ImportTypeNode.md)

#### Parameters

##### node

[`ImportTypeNode`](ImportTypeNode.md)

##### argument

[`TypeNode`](TypeNode.md)

##### attributes

`undefined` | `ImportAttributes`

##### qualifier

`undefined` | [`EntityName`](../type-aliases/EntityName.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### isTypeOf?

`boolean`

#### Returns

[`ImportTypeNode`](ImportTypeNode.md)

***

### updateIndexedAccessTypeNode()

> **updateIndexedAccessTypeNode**(`node`, `objectType`, `indexType`): [`IndexedAccessTypeNode`](IndexedAccessTypeNode.md)

#### Parameters

##### node

[`IndexedAccessTypeNode`](IndexedAccessTypeNode.md)

##### objectType

[`TypeNode`](TypeNode.md)

##### indexType

[`TypeNode`](TypeNode.md)

#### Returns

[`IndexedAccessTypeNode`](IndexedAccessTypeNode.md)

***

### updateIndexSignature()

> **updateIndexSignature**(`node`, `modifiers`, `parameters`, `type`): [`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

#### Parameters

##### node

[`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

***

### updateInferTypeNode()

> **updateInferTypeNode**(`node`, `typeParameter`): [`InferTypeNode`](InferTypeNode.md)

#### Parameters

##### node

[`InferTypeNode`](InferTypeNode.md)

##### typeParameter

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

#### Returns

[`InferTypeNode`](InferTypeNode.md)

***

### updateInterfaceDeclaration()

> **updateInterfaceDeclaration**(`node`, `modifiers`, `name`, `typeParameters`, `heritageClauses`, `members`): [`InterfaceDeclaration`](InterfaceDeclaration.md)

#### Parameters

##### node

[`InterfaceDeclaration`](InterfaceDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### heritageClauses

`undefined` | readonly [`HeritageClause`](HeritageClause.md)[]

##### members

readonly [`TypeElement`](TypeElement.md)[]

#### Returns

[`InterfaceDeclaration`](InterfaceDeclaration.md)

***

### updateIntersectionTypeNode()

> **updateIntersectionTypeNode**(`node`, `types`): [`IntersectionTypeNode`](IntersectionTypeNode.md)

#### Parameters

##### node

[`IntersectionTypeNode`](IntersectionTypeNode.md)

##### types

[`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Returns

[`IntersectionTypeNode`](IntersectionTypeNode.md)

***

### updateJSDocAugmentsTag()

> **updateJSDocAugmentsTag**(`node`, `tagName`, `className`, `comment`): [`JSDocAugmentsTag`](JSDocAugmentsTag.md)

#### Parameters

##### node

[`JSDocAugmentsTag`](JSDocAugmentsTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### className

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md) & `object`

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocAugmentsTag`](JSDocAugmentsTag.md)

***

### updateJSDocAuthorTag()

> **updateJSDocAuthorTag**(`node`, `tagName`, `comment`): [`JSDocAuthorTag`](JSDocAuthorTag.md)

#### Parameters

##### node

[`JSDocAuthorTag`](JSDocAuthorTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocAuthorTag`](JSDocAuthorTag.md)

***

### updateJSDocCallbackTag()

> **updateJSDocCallbackTag**(`node`, `tagName`, `typeExpression`, `fullName`, `comment`): [`JSDocCallbackTag`](JSDocCallbackTag.md)

#### Parameters

##### node

[`JSDocCallbackTag`](JSDocCallbackTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocSignature`](JSDocSignature.md)

##### fullName

`undefined` | [`Identifier`](Identifier.md) | [`JSDocNamespaceDeclaration`](JSDocNamespaceDeclaration.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocCallbackTag`](JSDocCallbackTag.md)

***

### updateJSDocClassTag()

> **updateJSDocClassTag**(`node`, `tagName`, `comment`): [`JSDocClassTag`](JSDocClassTag.md)

#### Parameters

##### node

[`JSDocClassTag`](JSDocClassTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocClassTag`](JSDocClassTag.md)

***

### updateJSDocComment()

> **updateJSDocComment**(`node`, `comment`, `tags`): [`JSDoc`](JSDoc.md)

#### Parameters

##### node

[`JSDoc`](JSDoc.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

##### tags

`undefined` | readonly [`JSDocTag`](JSDocTag.md)[]

#### Returns

[`JSDoc`](JSDoc.md)

***

### updateJSDocDeprecatedTag()

> **updateJSDocDeprecatedTag**(`node`, `tagName`, `comment`?): [`JSDocDeprecatedTag`](JSDocDeprecatedTag.md)

#### Parameters

##### node

[`JSDocDeprecatedTag`](JSDocDeprecatedTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocDeprecatedTag`](JSDocDeprecatedTag.md)

***

### updateJSDocEnumTag()

> **updateJSDocEnumTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocEnumTag`](JSDocEnumTag.md)

#### Parameters

##### node

[`JSDocEnumTag`](JSDocEnumTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocEnumTag`](JSDocEnumTag.md)

***

### updateJSDocFunctionType()

> **updateJSDocFunctionType**(`node`, `parameters`, `type`): [`JSDocFunctionType`](JSDocFunctionType.md)

#### Parameters

##### node

[`JSDocFunctionType`](JSDocFunctionType.md)

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`JSDocFunctionType`](JSDocFunctionType.md)

***

### updateJSDocImplementsTag()

> **updateJSDocImplementsTag**(`node`, `tagName`, `className`, `comment`): [`JSDocImplementsTag`](JSDocImplementsTag.md)

#### Parameters

##### node

[`JSDocImplementsTag`](JSDocImplementsTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### className

[`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md) & `object`

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocImplementsTag`](JSDocImplementsTag.md)

***

### updateJSDocImportTag()

> **updateJSDocImportTag**(`node`, `tagName`, `importClause`, `moduleSpecifier`, `attributes`, `comment`): [`JSDocImportTag`](JSDocImportTag.md)

#### Parameters

##### node

[`JSDocImportTag`](JSDocImportTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### importClause

`undefined` | [`ImportClause`](ImportClause.md)

##### moduleSpecifier

[`Expression`](Expression.md)

##### attributes

`undefined` | `ImportAttributes`

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocImportTag`](JSDocImportTag.md)

***

### updateJSDocLink()

> **updateJSDocLink**(`node`, `name`, `text`): [`JSDocLink`](JSDocLink.md)

#### Parameters

##### node

[`JSDocLink`](JSDocLink.md)

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLink`](JSDocLink.md)

***

### updateJSDocLinkCode()

> **updateJSDocLinkCode**(`node`, `name`, `text`): [`JSDocLinkCode`](JSDocLinkCode.md)

#### Parameters

##### node

[`JSDocLinkCode`](JSDocLinkCode.md)

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLinkCode`](JSDocLinkCode.md)

***

### updateJSDocLinkPlain()

> **updateJSDocLinkPlain**(`node`, `name`, `text`): [`JSDocLinkPlain`](JSDocLinkPlain.md)

#### Parameters

##### node

[`JSDocLinkPlain`](JSDocLinkPlain.md)

##### name

`undefined` | [`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### text

`string`

#### Returns

[`JSDocLinkPlain`](JSDocLinkPlain.md)

***

### updateJSDocMemberName()

> **updateJSDocMemberName**(`node`, `left`, `right`): [`JSDocMemberName`](JSDocMemberName.md)

#### Parameters

##### node

[`JSDocMemberName`](JSDocMemberName.md)

##### left

[`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

##### right

[`Identifier`](Identifier.md)

#### Returns

[`JSDocMemberName`](JSDocMemberName.md)

***

### updateJSDocNamepathType()

> **updateJSDocNamepathType**(`node`, `type`): [`JSDocNamepathType`](JSDocNamepathType.md)

#### Parameters

##### node

[`JSDocNamepathType`](JSDocNamepathType.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocNamepathType`](JSDocNamepathType.md)

***

### updateJSDocNameReference()

> **updateJSDocNameReference**(`node`, `name`): [`JSDocNameReference`](JSDocNameReference.md)

#### Parameters

##### node

[`JSDocNameReference`](JSDocNameReference.md)

##### name

[`EntityName`](../type-aliases/EntityName.md) | [`JSDocMemberName`](JSDocMemberName.md)

#### Returns

[`JSDocNameReference`](JSDocNameReference.md)

***

### updateJSDocNonNullableType()

> **updateJSDocNonNullableType**(`node`, `type`): [`JSDocNonNullableType`](JSDocNonNullableType.md)

#### Parameters

##### node

[`JSDocNonNullableType`](JSDocNonNullableType.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocNonNullableType`](JSDocNonNullableType.md)

***

### updateJSDocNullableType()

> **updateJSDocNullableType**(`node`, `type`): [`JSDocNullableType`](JSDocNullableType.md)

#### Parameters

##### node

[`JSDocNullableType`](JSDocNullableType.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocNullableType`](JSDocNullableType.md)

***

### updateJSDocOptionalType()

> **updateJSDocOptionalType**(`node`, `type`): [`JSDocOptionalType`](JSDocOptionalType.md)

#### Parameters

##### node

[`JSDocOptionalType`](JSDocOptionalType.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocOptionalType`](JSDocOptionalType.md)

***

### updateJSDocOverloadTag()

> **updateJSDocOverloadTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocOverloadTag`](JSDocOverloadTag.md)

#### Parameters

##### node

[`JSDocOverloadTag`](JSDocOverloadTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocSignature`](JSDocSignature.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocOverloadTag`](JSDocOverloadTag.md)

***

### updateJSDocOverrideTag()

> **updateJSDocOverrideTag**(`node`, `tagName`, `comment`?): [`JSDocOverrideTag`](JSDocOverrideTag.md)

#### Parameters

##### node

[`JSDocOverrideTag`](JSDocOverrideTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocOverrideTag`](JSDocOverrideTag.md)

***

### updateJSDocParameterTag()

> **updateJSDocParameterTag**(`node`, `tagName`, `name`, `isBracketed`, `typeExpression`, `isNameFirst`, `comment`): [`JSDocParameterTag`](JSDocParameterTag.md)

#### Parameters

##### node

[`JSDocParameterTag`](JSDocParameterTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### name

[`EntityName`](../type-aliases/EntityName.md)

##### isBracketed

`boolean`

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### isNameFirst

`boolean`

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocParameterTag`](JSDocParameterTag.md)

***

### updateJSDocPrivateTag()

> **updateJSDocPrivateTag**(`node`, `tagName`, `comment`): [`JSDocPrivateTag`](JSDocPrivateTag.md)

#### Parameters

##### node

[`JSDocPrivateTag`](JSDocPrivateTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPrivateTag`](JSDocPrivateTag.md)

***

### updateJSDocPropertyTag()

> **updateJSDocPropertyTag**(`node`, `tagName`, `name`, `isBracketed`, `typeExpression`, `isNameFirst`, `comment`): [`JSDocPropertyTag`](JSDocPropertyTag.md)

#### Parameters

##### node

[`JSDocPropertyTag`](JSDocPropertyTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### name

[`EntityName`](../type-aliases/EntityName.md)

##### isBracketed

`boolean`

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### isNameFirst

`boolean`

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPropertyTag`](JSDocPropertyTag.md)

***

### updateJSDocProtectedTag()

> **updateJSDocProtectedTag**(`node`, `tagName`, `comment`): [`JSDocProtectedTag`](JSDocProtectedTag.md)

#### Parameters

##### node

[`JSDocProtectedTag`](JSDocProtectedTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocProtectedTag`](JSDocProtectedTag.md)

***

### updateJSDocPublicTag()

> **updateJSDocPublicTag**(`node`, `tagName`, `comment`): [`JSDocPublicTag`](JSDocPublicTag.md)

#### Parameters

##### node

[`JSDocPublicTag`](JSDocPublicTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocPublicTag`](JSDocPublicTag.md)

***

### updateJSDocReadonlyTag()

> **updateJSDocReadonlyTag**(`node`, `tagName`, `comment`): [`JSDocReadonlyTag`](JSDocReadonlyTag.md)

#### Parameters

##### node

[`JSDocReadonlyTag`](JSDocReadonlyTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocReadonlyTag`](JSDocReadonlyTag.md)

***

### updateJSDocReturnTag()

> **updateJSDocReturnTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocReturnTag`](JSDocReturnTag.md)

#### Parameters

##### node

[`JSDocReturnTag`](JSDocReturnTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocReturnTag`](JSDocReturnTag.md)

***

### updateJSDocSatisfiesTag()

> **updateJSDocSatisfiesTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocSatisfiesTag`](JSDocSatisfiesTag.md)

#### Parameters

##### node

[`JSDocSatisfiesTag`](JSDocSatisfiesTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocSatisfiesTag`](JSDocSatisfiesTag.md)

***

### updateJSDocSeeTag()

> **updateJSDocSeeTag**(`node`, `tagName`, `nameExpression`, `comment`?): [`JSDocSeeTag`](JSDocSeeTag.md)

#### Parameters

##### node

[`JSDocSeeTag`](JSDocSeeTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### nameExpression

`undefined` | [`JSDocNameReference`](JSDocNameReference.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocSeeTag`](JSDocSeeTag.md)

***

### updateJSDocSignature()

> **updateJSDocSignature**(`node`, `typeParameters`, `parameters`, `type`): [`JSDocSignature`](JSDocSignature.md)

#### Parameters

##### node

[`JSDocSignature`](JSDocSignature.md)

##### typeParameters

`undefined` | readonly [`JSDocTemplateTag`](JSDocTemplateTag.md)[]

##### parameters

readonly [`JSDocParameterTag`](JSDocParameterTag.md)[]

##### type

`undefined` | [`JSDocReturnTag`](JSDocReturnTag.md)

#### Returns

[`JSDocSignature`](JSDocSignature.md)

***

### updateJSDocTemplateTag()

> **updateJSDocTemplateTag**(`node`, `tagName`, `constraint`, `typeParameters`, `comment`): [`JSDocTemplateTag`](JSDocTemplateTag.md)

#### Parameters

##### node

[`JSDocTemplateTag`](JSDocTemplateTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### constraint

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### typeParameters

readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTemplateTag`](JSDocTemplateTag.md)

***

### updateJSDocText()

> **updateJSDocText**(`node`, `text`): [`JSDocText`](JSDocText.md)

#### Parameters

##### node

[`JSDocText`](JSDocText.md)

##### text

`string`

#### Returns

[`JSDocText`](JSDocText.md)

***

### updateJSDocThisTag()

> **updateJSDocThisTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocThisTag`](JSDocThisTag.md)

#### Parameters

##### node

[`JSDocThisTag`](JSDocThisTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocThisTag`](JSDocThisTag.md)

***

### updateJSDocThrowsTag()

> **updateJSDocThrowsTag**(`node`, `tagName`, `typeExpression`, `comment`?): [`JSDocThrowsTag`](JSDocThrowsTag.md)

#### Parameters

##### node

[`JSDocThrowsTag`](JSDocThrowsTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment?

`string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocThrowsTag`](JSDocThrowsTag.md)

***

### updateJSDocTypedefTag()

> **updateJSDocTypedefTag**(`node`, `tagName`, `typeExpression`, `fullName`, `comment`): [`JSDocTypedefTag`](JSDocTypedefTag.md)

#### Parameters

##### node

[`JSDocTypedefTag`](JSDocTypedefTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

`undefined` | [`JSDocTypeExpression`](JSDocTypeExpression.md) | [`JSDocTypeLiteral`](JSDocTypeLiteral.md)

##### fullName

`undefined` | [`Identifier`](Identifier.md) | [`JSDocNamespaceDeclaration`](JSDocNamespaceDeclaration.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTypedefTag`](JSDocTypedefTag.md)

***

### updateJSDocTypeExpression()

> **updateJSDocTypeExpression**(`node`, `type`): [`JSDocTypeExpression`](JSDocTypeExpression.md)

#### Parameters

##### node

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocTypeExpression`](JSDocTypeExpression.md)

***

### updateJSDocTypeLiteral()

> **updateJSDocTypeLiteral**(`node`, `jsDocPropertyTags`, `isArrayType`): [`JSDocTypeLiteral`](JSDocTypeLiteral.md)

#### Parameters

##### node

[`JSDocTypeLiteral`](JSDocTypeLiteral.md)

##### jsDocPropertyTags

`undefined` | readonly [`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md)[]

##### isArrayType

`undefined` | `boolean`

#### Returns

[`JSDocTypeLiteral`](JSDocTypeLiteral.md)

***

### updateJSDocTypeTag()

> **updateJSDocTypeTag**(`node`, `tagName`, `typeExpression`, `comment`): [`JSDocTypeTag`](JSDocTypeTag.md)

#### Parameters

##### node

[`JSDocTypeTag`](JSDocTypeTag.md)

##### tagName

`undefined` | [`Identifier`](Identifier.md)

##### typeExpression

[`JSDocTypeExpression`](JSDocTypeExpression.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocTypeTag`](JSDocTypeTag.md)

***

### updateJSDocUnknownTag()

> **updateJSDocUnknownTag**(`node`, `tagName`, `comment`): [`JSDocUnknownTag`](JSDocUnknownTag.md)

#### Parameters

##### node

[`JSDocUnknownTag`](JSDocUnknownTag.md)

##### tagName

[`Identifier`](Identifier.md)

##### comment

`undefined` | `string` | [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Returns

[`JSDocUnknownTag`](JSDocUnknownTag.md)

***

### updateJSDocVariadicType()

> **updateJSDocVariadicType**(`node`, `type`): [`JSDocVariadicType`](JSDocVariadicType.md)

#### Parameters

##### node

[`JSDocVariadicType`](JSDocVariadicType.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`JSDocVariadicType`](JSDocVariadicType.md)

***

### updateJsxAttribute()

> **updateJsxAttribute**(`node`, `name`, `initializer`): [`JsxAttribute`](JsxAttribute.md)

#### Parameters

##### node

[`JsxAttribute`](JsxAttribute.md)

##### name

[`JsxAttributeName`](../type-aliases/JsxAttributeName.md)

##### initializer

`undefined` | [`JsxAttributeValue`](../type-aliases/JsxAttributeValue.md)

#### Returns

[`JsxAttribute`](JsxAttribute.md)

***

### updateJsxAttributes()

> **updateJsxAttributes**(`node`, `properties`): [`JsxAttributes`](JsxAttributes.md)

#### Parameters

##### node

[`JsxAttributes`](JsxAttributes.md)

##### properties

readonly [`JsxAttributeLike`](../type-aliases/JsxAttributeLike.md)[]

#### Returns

[`JsxAttributes`](JsxAttributes.md)

***

### updateJsxClosingElement()

> **updateJsxClosingElement**(`node`, `tagName`): [`JsxClosingElement`](JsxClosingElement.md)

#### Parameters

##### node

[`JsxClosingElement`](JsxClosingElement.md)

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

#### Returns

[`JsxClosingElement`](JsxClosingElement.md)

***

### updateJsxElement()

> **updateJsxElement**(`node`, `openingElement`, `children`, `closingElement`): [`JsxElement`](JsxElement.md)

#### Parameters

##### node

[`JsxElement`](JsxElement.md)

##### openingElement

[`JsxOpeningElement`](JsxOpeningElement.md)

##### children

readonly [`JsxChild`](../type-aliases/JsxChild.md)[]

##### closingElement

[`JsxClosingElement`](JsxClosingElement.md)

#### Returns

[`JsxElement`](JsxElement.md)

***

### updateJsxExpression()

> **updateJsxExpression**(`node`, `expression`): [`JsxExpression`](JsxExpression.md)

#### Parameters

##### node

[`JsxExpression`](JsxExpression.md)

##### expression

`undefined` | [`Expression`](Expression.md)

#### Returns

[`JsxExpression`](JsxExpression.md)

***

### updateJsxFragment()

> **updateJsxFragment**(`node`, `openingFragment`, `children`, `closingFragment`): [`JsxFragment`](JsxFragment.md)

#### Parameters

##### node

[`JsxFragment`](JsxFragment.md)

##### openingFragment

[`JsxOpeningFragment`](JsxOpeningFragment.md)

##### children

readonly [`JsxChild`](../type-aliases/JsxChild.md)[]

##### closingFragment

[`JsxClosingFragment`](JsxClosingFragment.md)

#### Returns

[`JsxFragment`](JsxFragment.md)

***

### updateJsxNamespacedName()

> **updateJsxNamespacedName**(`node`, `namespace`, `name`): `JsxNamespacedName`

#### Parameters

##### node

`JsxNamespacedName`

##### namespace

[`Identifier`](Identifier.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

`JsxNamespacedName`

***

### updateJsxOpeningElement()

> **updateJsxOpeningElement**(`node`, `tagName`, `typeArguments`, `attributes`): [`JsxOpeningElement`](JsxOpeningElement.md)

#### Parameters

##### node

[`JsxOpeningElement`](JsxOpeningElement.md)

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### attributes

[`JsxAttributes`](JsxAttributes.md)

#### Returns

[`JsxOpeningElement`](JsxOpeningElement.md)

***

### updateJsxSelfClosingElement()

> **updateJsxSelfClosingElement**(`node`, `tagName`, `typeArguments`, `attributes`): [`JsxSelfClosingElement`](JsxSelfClosingElement.md)

#### Parameters

##### node

[`JsxSelfClosingElement`](JsxSelfClosingElement.md)

##### tagName

[`JsxTagNameExpression`](../type-aliases/JsxTagNameExpression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### attributes

[`JsxAttributes`](JsxAttributes.md)

#### Returns

[`JsxSelfClosingElement`](JsxSelfClosingElement.md)

***

### updateJsxSpreadAttribute()

> **updateJsxSpreadAttribute**(`node`, `expression`): [`JsxSpreadAttribute`](JsxSpreadAttribute.md)

#### Parameters

##### node

[`JsxSpreadAttribute`](JsxSpreadAttribute.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`JsxSpreadAttribute`](JsxSpreadAttribute.md)

***

### updateJsxText()

> **updateJsxText**(`node`, `text`, `containsOnlyTriviaWhiteSpaces`?): [`JsxText`](JsxText.md)

#### Parameters

##### node

[`JsxText`](JsxText.md)

##### text

`string`

##### containsOnlyTriviaWhiteSpaces?

`boolean`

#### Returns

[`JsxText`](JsxText.md)

***

### updateLabeledStatement()

> **updateLabeledStatement**(`node`, `label`, `statement`): [`LabeledStatement`](LabeledStatement.md)

#### Parameters

##### node

[`LabeledStatement`](LabeledStatement.md)

##### label

[`Identifier`](Identifier.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`LabeledStatement`](LabeledStatement.md)

***

### updateLiteralTypeNode()

> **updateLiteralTypeNode**(`node`, `literal`): [`LiteralTypeNode`](LiteralTypeNode.md)

#### Parameters

##### node

[`LiteralTypeNode`](LiteralTypeNode.md)

##### literal

[`LiteralExpression`](LiteralExpression.md) | [`BooleanLiteral`](../type-aliases/BooleanLiteral.md) | [`PrefixUnaryExpression`](PrefixUnaryExpression.md) | [`NullLiteral`](NullLiteral.md)

#### Returns

[`LiteralTypeNode`](LiteralTypeNode.md)

***

### updateMappedTypeNode()

> **updateMappedTypeNode**(`node`, `readonlyToken`, `typeParameter`, `nameType`, `questionToken`, `type`, `members`): [`MappedTypeNode`](MappedTypeNode.md)

#### Parameters

##### node

[`MappedTypeNode`](MappedTypeNode.md)

##### readonlyToken

`undefined` | [`ReadonlyKeyword`](../type-aliases/ReadonlyKeyword.md) | [`PlusToken`](../type-aliases/PlusToken.md) | [`MinusToken`](../type-aliases/MinusToken.md)

##### typeParameter

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

##### nameType

`undefined` | [`TypeNode`](TypeNode.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md) | [`PlusToken`](../type-aliases/PlusToken.md) | [`MinusToken`](../type-aliases/MinusToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### members

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeElement`](TypeElement.md)\>

#### Returns

[`MappedTypeNode`](MappedTypeNode.md)

***

### updateMetaProperty()

> **updateMetaProperty**(`node`, `name`): [`MetaProperty`](MetaProperty.md)

#### Parameters

##### node

[`MetaProperty`](MetaProperty.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`MetaProperty`](MetaProperty.md)

***

### updateMethodDeclaration()

> **updateMethodDeclaration**(`node`, `modifiers`, `asteriskToken`, `name`, `questionToken`, `typeParameters`, `parameters`, `type`, `body`): [`MethodDeclaration`](MethodDeclaration.md)

#### Parameters

##### node

[`MethodDeclaration`](MethodDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`MethodDeclaration`](MethodDeclaration.md)

***

### updateMethodSignature()

> **updateMethodSignature**(`node`, `modifiers`, `name`, `questionToken`, `typeParameters`, `parameters`, `type`): [`MethodSignature`](MethodSignature.md)

#### Parameters

##### node

[`MethodSignature`](MethodSignature.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### typeParameters

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

##### parameters

[`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`MethodSignature`](MethodSignature.md)

***

### updateModuleBlock()

> **updateModuleBlock**(`node`, `statements`): [`ModuleBlock`](ModuleBlock.md)

#### Parameters

##### node

[`ModuleBlock`](ModuleBlock.md)

##### statements

readonly [`Statement`](Statement.md)[]

#### Returns

[`ModuleBlock`](ModuleBlock.md)

***

### updateModuleDeclaration()

> **updateModuleDeclaration**(`node`, `modifiers`, `name`, `body`): [`ModuleDeclaration`](ModuleDeclaration.md)

#### Parameters

##### node

[`ModuleDeclaration`](ModuleDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`ModuleName`](../type-aliases/ModuleName.md)

##### body

`undefined` | [`ModuleBody`](../type-aliases/ModuleBody.md)

#### Returns

[`ModuleDeclaration`](ModuleDeclaration.md)

***

### updateNamedExports()

> **updateNamedExports**(`node`, `elements`): [`NamedExports`](NamedExports.md)

#### Parameters

##### node

[`NamedExports`](NamedExports.md)

##### elements

readonly [`ExportSpecifier`](ExportSpecifier.md)[]

#### Returns

[`NamedExports`](NamedExports.md)

***

### updateNamedImports()

> **updateNamedImports**(`node`, `elements`): [`NamedImports`](NamedImports.md)

#### Parameters

##### node

[`NamedImports`](NamedImports.md)

##### elements

readonly [`ImportSpecifier`](ImportSpecifier.md)[]

#### Returns

[`NamedImports`](NamedImports.md)

***

### updateNamedTupleMember()

> **updateNamedTupleMember**(`node`, `dotDotDotToken`, `name`, `questionToken`, `type`): [`NamedTupleMember`](NamedTupleMember.md)

#### Parameters

##### node

[`NamedTupleMember`](NamedTupleMember.md)

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### name

[`Identifier`](Identifier.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`NamedTupleMember`](NamedTupleMember.md)

***

### updateNamespaceExport()

> **updateNamespaceExport**(`node`, `name`): [`NamespaceExport`](NamespaceExport.md)

#### Parameters

##### node

[`NamespaceExport`](NamespaceExport.md)

##### name

[`ModuleExportName`](../type-aliases/ModuleExportName.md)

#### Returns

[`NamespaceExport`](NamespaceExport.md)

***

### updateNamespaceExportDeclaration()

> **updateNamespaceExportDeclaration**(`node`, `name`): [`NamespaceExportDeclaration`](NamespaceExportDeclaration.md)

#### Parameters

##### node

[`NamespaceExportDeclaration`](NamespaceExportDeclaration.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`NamespaceExportDeclaration`](NamespaceExportDeclaration.md)

***

### updateNamespaceImport()

> **updateNamespaceImport**(`node`, `name`): [`NamespaceImport`](NamespaceImport.md)

#### Parameters

##### node

[`NamespaceImport`](NamespaceImport.md)

##### name

[`Identifier`](Identifier.md)

#### Returns

[`NamespaceImport`](NamespaceImport.md)

***

### updateNewExpression()

> **updateNewExpression**(`node`, `expression`, `typeArguments`, `argumentsArray`): [`NewExpression`](NewExpression.md)

#### Parameters

##### node

[`NewExpression`](NewExpression.md)

##### expression

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### argumentsArray

`undefined` | readonly [`Expression`](Expression.md)[]

#### Returns

[`NewExpression`](NewExpression.md)

***

### updateNonNullChain()

> **updateNonNullChain**(`node`, `expression`): [`NonNullChain`](NonNullChain.md)

#### Parameters

##### node

[`NonNullChain`](NonNullChain.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`NonNullChain`](NonNullChain.md)

***

### updateNonNullExpression()

> **updateNonNullExpression**(`node`, `expression`): [`NonNullExpression`](NonNullExpression.md)

#### Parameters

##### node

[`NonNullExpression`](NonNullExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`NonNullExpression`](NonNullExpression.md)

***

### updateObjectBindingPattern()

> **updateObjectBindingPattern**(`node`, `elements`): [`ObjectBindingPattern`](ObjectBindingPattern.md)

#### Parameters

##### node

[`ObjectBindingPattern`](ObjectBindingPattern.md)

##### elements

readonly [`BindingElement`](BindingElement.md)[]

#### Returns

[`ObjectBindingPattern`](ObjectBindingPattern.md)

***

### updateObjectLiteralExpression()

> **updateObjectLiteralExpression**(`node`, `properties`): [`ObjectLiteralExpression`](ObjectLiteralExpression.md)

#### Parameters

##### node

[`ObjectLiteralExpression`](ObjectLiteralExpression.md)

##### properties

readonly [`ObjectLiteralElementLike`](../type-aliases/ObjectLiteralElementLike.md)[]

#### Returns

[`ObjectLiteralExpression`](ObjectLiteralExpression.md)

***

### updateOptionalTypeNode()

> **updateOptionalTypeNode**(`node`, `type`): [`OptionalTypeNode`](OptionalTypeNode.md)

#### Parameters

##### node

[`OptionalTypeNode`](OptionalTypeNode.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`OptionalTypeNode`](OptionalTypeNode.md)

***

### updateParameterDeclaration()

> **updateParameterDeclaration**(`node`, `modifiers`, `dotDotDotToken`, `name`, `questionToken`, `type`, `initializer`): [`ParameterDeclaration`](ParameterDeclaration.md)

#### Parameters

##### node

[`ParameterDeclaration`](ParameterDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### dotDotDotToken

`undefined` | [`DotDotDotToken`](../type-aliases/DotDotDotToken.md)

##### name

`string` | [`BindingName`](../type-aliases/BindingName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`ParameterDeclaration`](ParameterDeclaration.md)

***

### updateParenthesizedExpression()

> **updateParenthesizedExpression**(`node`, `expression`): [`ParenthesizedExpression`](ParenthesizedExpression.md)

#### Parameters

##### node

[`ParenthesizedExpression`](ParenthesizedExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`ParenthesizedExpression`](ParenthesizedExpression.md)

***

### updateParenthesizedType()

> **updateParenthesizedType**(`node`, `type`): [`ParenthesizedTypeNode`](ParenthesizedTypeNode.md)

#### Parameters

##### node

[`ParenthesizedTypeNode`](ParenthesizedTypeNode.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`ParenthesizedTypeNode`](ParenthesizedTypeNode.md)

***

### updatePartiallyEmittedExpression()

> **updatePartiallyEmittedExpression**(`node`, `expression`): [`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)

#### Parameters

##### node

[`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)

***

### updatePostfixUnaryExpression()

> **updatePostfixUnaryExpression**(`node`, `operand`): [`PostfixUnaryExpression`](PostfixUnaryExpression.md)

#### Parameters

##### node

[`PostfixUnaryExpression`](PostfixUnaryExpression.md)

##### operand

[`Expression`](Expression.md)

#### Returns

[`PostfixUnaryExpression`](PostfixUnaryExpression.md)

***

### updatePrefixUnaryExpression()

> **updatePrefixUnaryExpression**(`node`, `operand`): [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

#### Parameters

##### node

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

##### operand

[`Expression`](Expression.md)

#### Returns

[`PrefixUnaryExpression`](PrefixUnaryExpression.md)

***

### updatePropertyAccessChain()

> **updatePropertyAccessChain**(`node`, `expression`, `questionDotToken`, `name`): [`PropertyAccessChain`](PropertyAccessChain.md)

#### Parameters

##### node

[`PropertyAccessChain`](PropertyAccessChain.md)

##### expression

[`Expression`](Expression.md)

##### questionDotToken

`undefined` | [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

##### name

[`MemberName`](../type-aliases/MemberName.md)

#### Returns

[`PropertyAccessChain`](PropertyAccessChain.md)

***

### updatePropertyAccessExpression()

> **updatePropertyAccessExpression**(`node`, `expression`, `name`): [`PropertyAccessExpression`](PropertyAccessExpression.md)

#### Parameters

##### node

[`PropertyAccessExpression`](PropertyAccessExpression.md)

##### expression

[`Expression`](Expression.md)

##### name

[`MemberName`](../type-aliases/MemberName.md)

#### Returns

[`PropertyAccessExpression`](PropertyAccessExpression.md)

***

### updatePropertyAssignment()

> **updatePropertyAssignment**(`node`, `name`, `initializer`): [`PropertyAssignment`](PropertyAssignment.md)

#### Parameters

##### node

[`PropertyAssignment`](PropertyAssignment.md)

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### initializer

[`Expression`](Expression.md)

#### Returns

[`PropertyAssignment`](PropertyAssignment.md)

***

### updatePropertyDeclaration()

> **updatePropertyDeclaration**(`node`, `modifiers`, `name`, `questionOrExclamationToken`, `type`, `initializer`): [`PropertyDeclaration`](PropertyDeclaration.md)

#### Parameters

##### node

[`PropertyDeclaration`](PropertyDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

`string` | [`PropertyName`](../type-aliases/PropertyName.md)

##### questionOrExclamationToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md) | [`ExclamationToken`](../type-aliases/ExclamationToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`PropertyDeclaration`](PropertyDeclaration.md)

***

### updatePropertySignature()

> **updatePropertySignature**(`node`, `modifiers`, `name`, `questionToken`, `type`): [`PropertySignature`](PropertySignature.md)

#### Parameters

##### node

[`PropertySignature`](PropertySignature.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### questionToken

`undefined` | [`QuestionToken`](../type-aliases/QuestionToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`PropertySignature`](PropertySignature.md)

***

### updateQualifiedName()

> **updateQualifiedName**(`node`, `left`, `right`): [`QualifiedName`](QualifiedName.md)

#### Parameters

##### node

[`QualifiedName`](QualifiedName.md)

##### left

[`EntityName`](../type-aliases/EntityName.md)

##### right

[`Identifier`](Identifier.md)

#### Returns

[`QualifiedName`](QualifiedName.md)

***

### updateRestTypeNode()

> **updateRestTypeNode**(`node`, `type`): [`RestTypeNode`](RestTypeNode.md)

#### Parameters

##### node

[`RestTypeNode`](RestTypeNode.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`RestTypeNode`](RestTypeNode.md)

***

### updateReturnStatement()

> **updateReturnStatement**(`node`, `expression`): [`ReturnStatement`](ReturnStatement.md)

#### Parameters

##### node

[`ReturnStatement`](ReturnStatement.md)

##### expression

`undefined` | [`Expression`](Expression.md)

#### Returns

[`ReturnStatement`](ReturnStatement.md)

***

### updateSatisfiesExpression()

> **updateSatisfiesExpression**(`node`, `expression`, `type`): `SatisfiesExpression`

#### Parameters

##### node

`SatisfiesExpression`

##### expression

[`Expression`](Expression.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

`SatisfiesExpression`

***

### updateSetAccessorDeclaration()

> **updateSetAccessorDeclaration**(`node`, `modifiers`, `name`, `parameters`, `body`): [`SetAccessorDeclaration`](SetAccessorDeclaration.md)

#### Parameters

##### node

[`SetAccessorDeclaration`](SetAccessorDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`PropertyName`](../type-aliases/PropertyName.md)

##### parameters

readonly [`ParameterDeclaration`](ParameterDeclaration.md)[]

##### body

`undefined` | [`Block`](Block.md)

#### Returns

[`SetAccessorDeclaration`](SetAccessorDeclaration.md)

***

### updateShorthandPropertyAssignment()

> **updateShorthandPropertyAssignment**(`node`, `name`, `objectAssignmentInitializer`): [`ShorthandPropertyAssignment`](ShorthandPropertyAssignment.md)

#### Parameters

##### node

[`ShorthandPropertyAssignment`](ShorthandPropertyAssignment.md)

##### name

[`Identifier`](Identifier.md)

##### objectAssignmentInitializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`ShorthandPropertyAssignment`](ShorthandPropertyAssignment.md)

***

### updateSourceFile()

> **updateSourceFile**(`node`, `statements`, `isDeclarationFile`?, `referencedFiles`?, `typeReferences`?, `hasNoDefaultLib`?, `libReferences`?): [`SourceFile`](SourceFile.md)

#### Parameters

##### node

[`SourceFile`](SourceFile.md)

##### statements

readonly [`Statement`](Statement.md)[]

##### isDeclarationFile?

`boolean`

##### referencedFiles?

readonly [`FileReference`](FileReference.md)[]

##### typeReferences?

readonly [`FileReference`](FileReference.md)[]

##### hasNoDefaultLib?

`boolean`

##### libReferences?

readonly [`FileReference`](FileReference.md)[]

#### Returns

[`SourceFile`](SourceFile.md)

***

### updateSpreadAssignment()

> **updateSpreadAssignment**(`node`, `expression`): [`SpreadAssignment`](SpreadAssignment.md)

#### Parameters

##### node

[`SpreadAssignment`](SpreadAssignment.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`SpreadAssignment`](SpreadAssignment.md)

***

### updateSpreadElement()

> **updateSpreadElement**(`node`, `expression`): [`SpreadElement`](SpreadElement.md)

#### Parameters

##### node

[`SpreadElement`](SpreadElement.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`SpreadElement`](SpreadElement.md)

***

### updateSwitchStatement()

> **updateSwitchStatement**(`node`, `expression`, `caseBlock`): [`SwitchStatement`](SwitchStatement.md)

#### Parameters

##### node

[`SwitchStatement`](SwitchStatement.md)

##### expression

[`Expression`](Expression.md)

##### caseBlock

[`CaseBlock`](CaseBlock.md)

#### Returns

[`SwitchStatement`](SwitchStatement.md)

***

### updateTaggedTemplateExpression()

> **updateTaggedTemplateExpression**(`node`, `tag`, `typeArguments`, `template`): [`TaggedTemplateExpression`](TaggedTemplateExpression.md)

#### Parameters

##### node

[`TaggedTemplateExpression`](TaggedTemplateExpression.md)

##### tag

[`Expression`](Expression.md)

##### typeArguments

`undefined` | readonly [`TypeNode`](TypeNode.md)[]

##### template

[`TemplateLiteral`](../type-aliases/TemplateLiteral.md)

#### Returns

[`TaggedTemplateExpression`](TaggedTemplateExpression.md)

***

### updateTemplateExpression()

> **updateTemplateExpression**(`node`, `head`, `templateSpans`): [`TemplateExpression`](TemplateExpression.md)

#### Parameters

##### node

[`TemplateExpression`](TemplateExpression.md)

##### head

[`TemplateHead`](TemplateHead.md)

##### templateSpans

readonly [`TemplateSpan`](TemplateSpan.md)[]

#### Returns

[`TemplateExpression`](TemplateExpression.md)

***

### updateTemplateLiteralType()

> **updateTemplateLiteralType**(`node`, `head`, `templateSpans`): [`TemplateLiteralTypeNode`](TemplateLiteralTypeNode.md)

#### Parameters

##### node

[`TemplateLiteralTypeNode`](TemplateLiteralTypeNode.md)

##### head

[`TemplateHead`](TemplateHead.md)

##### templateSpans

readonly [`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)[]

#### Returns

[`TemplateLiteralTypeNode`](TemplateLiteralTypeNode.md)

***

### updateTemplateLiteralTypeSpan()

> **updateTemplateLiteralTypeSpan**(`node`, `type`, `literal`): [`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

#### Parameters

##### node

[`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

##### type

[`TypeNode`](TypeNode.md)

##### literal

[`TemplateMiddle`](TemplateMiddle.md) | [`TemplateTail`](TemplateTail.md)

#### Returns

[`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

***

### updateTemplateSpan()

> **updateTemplateSpan**(`node`, `expression`, `literal`): [`TemplateSpan`](TemplateSpan.md)

#### Parameters

##### node

[`TemplateSpan`](TemplateSpan.md)

##### expression

[`Expression`](Expression.md)

##### literal

[`TemplateMiddle`](TemplateMiddle.md) | [`TemplateTail`](TemplateTail.md)

#### Returns

[`TemplateSpan`](TemplateSpan.md)

***

### updateThrowStatement()

> **updateThrowStatement**(`node`, `expression`): [`ThrowStatement`](ThrowStatement.md)

#### Parameters

##### node

[`ThrowStatement`](ThrowStatement.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`ThrowStatement`](ThrowStatement.md)

***

### updateTryStatement()

> **updateTryStatement**(`node`, `tryBlock`, `catchClause`, `finallyBlock`): [`TryStatement`](TryStatement.md)

#### Parameters

##### node

[`TryStatement`](TryStatement.md)

##### tryBlock

[`Block`](Block.md)

##### catchClause

`undefined` | [`CatchClause`](CatchClause.md)

##### finallyBlock

`undefined` | [`Block`](Block.md)

#### Returns

[`TryStatement`](TryStatement.md)

***

### updateTupleTypeNode()

> **updateTupleTypeNode**(`node`, `elements`): [`TupleTypeNode`](TupleTypeNode.md)

#### Parameters

##### node

[`TupleTypeNode`](TupleTypeNode.md)

##### elements

readonly ([`TypeNode`](TypeNode.md) \| [`NamedTupleMember`](NamedTupleMember.md))[]

#### Returns

[`TupleTypeNode`](TupleTypeNode.md)

***

### updateTypeAliasDeclaration()

> **updateTypeAliasDeclaration**(`node`, `modifiers`, `name`, `typeParameters`, `type`): [`TypeAliasDeclaration`](TypeAliasDeclaration.md)

#### Parameters

##### node

[`TypeAliasDeclaration`](TypeAliasDeclaration.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### name

[`Identifier`](Identifier.md)

##### typeParameters

`undefined` | readonly [`TypeParameterDeclaration`](TypeParameterDeclaration.md)[]

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`TypeAliasDeclaration`](TypeAliasDeclaration.md)

***

### updateTypeAssertion()

> **updateTypeAssertion**(`node`, `type`, `expression`): [`TypeAssertion`](TypeAssertion.md)

#### Parameters

##### node

[`TypeAssertion`](TypeAssertion.md)

##### type

[`TypeNode`](TypeNode.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`TypeAssertion`](TypeAssertion.md)

***

### updateTypeLiteralNode()

> **updateTypeLiteralNode**(`node`, `members`): [`TypeLiteralNode`](TypeLiteralNode.md)

#### Parameters

##### node

[`TypeLiteralNode`](TypeLiteralNode.md)

##### members

[`NodeArray`](NodeArray.md)\<[`TypeElement`](TypeElement.md)\>

#### Returns

[`TypeLiteralNode`](TypeLiteralNode.md)

***

### updateTypeOfExpression()

> **updateTypeOfExpression**(`node`, `expression`): [`TypeOfExpression`](TypeOfExpression.md)

#### Parameters

##### node

[`TypeOfExpression`](TypeOfExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`TypeOfExpression`](TypeOfExpression.md)

***

### updateTypeOperatorNode()

> **updateTypeOperatorNode**(`node`, `type`): [`TypeOperatorNode`](TypeOperatorNode.md)

#### Parameters

##### node

[`TypeOperatorNode`](TypeOperatorNode.md)

##### type

[`TypeNode`](TypeNode.md)

#### Returns

[`TypeOperatorNode`](TypeOperatorNode.md)

***

### updateTypeParameterDeclaration()

> **updateTypeParameterDeclaration**(`node`, `modifiers`, `name`, `constraint`, `defaultType`): [`TypeParameterDeclaration`](TypeParameterDeclaration.md)

#### Parameters

##### node

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

##### modifiers

`undefined` | readonly [`Modifier`](../type-aliases/Modifier.md)[]

##### name

[`Identifier`](Identifier.md)

##### constraint

`undefined` | [`TypeNode`](TypeNode.md)

##### defaultType

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`TypeParameterDeclaration`](TypeParameterDeclaration.md)

***

### updateTypePredicateNode()

> **updateTypePredicateNode**(`node`, `assertsModifier`, `parameterName`, `type`): [`TypePredicateNode`](TypePredicateNode.md)

#### Parameters

##### node

[`TypePredicateNode`](TypePredicateNode.md)

##### assertsModifier

`undefined` | [`AssertsKeyword`](../type-aliases/AssertsKeyword.md)

##### parameterName

[`Identifier`](Identifier.md) | [`ThisTypeNode`](ThisTypeNode.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

#### Returns

[`TypePredicateNode`](TypePredicateNode.md)

***

### updateTypeQueryNode()

> **updateTypeQueryNode**(`node`, `exprName`, `typeArguments`?): [`TypeQueryNode`](TypeQueryNode.md)

#### Parameters

##### node

[`TypeQueryNode`](TypeQueryNode.md)

##### exprName

[`EntityName`](../type-aliases/EntityName.md)

##### typeArguments?

readonly [`TypeNode`](TypeNode.md)[]

#### Returns

[`TypeQueryNode`](TypeQueryNode.md)

***

### updateTypeReferenceNode()

> **updateTypeReferenceNode**(`node`, `typeName`, `typeArguments`): [`TypeReferenceNode`](TypeReferenceNode.md)

#### Parameters

##### node

[`TypeReferenceNode`](TypeReferenceNode.md)

##### typeName

[`EntityName`](../type-aliases/EntityName.md)

##### typeArguments

`undefined` | [`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Returns

[`TypeReferenceNode`](TypeReferenceNode.md)

***

### updateUnionTypeNode()

> **updateUnionTypeNode**(`node`, `types`): [`UnionTypeNode`](UnionTypeNode.md)

#### Parameters

##### node

[`UnionTypeNode`](UnionTypeNode.md)

##### types

[`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Returns

[`UnionTypeNode`](UnionTypeNode.md)

***

### updateVariableDeclaration()

> **updateVariableDeclaration**(`node`, `name`, `exclamationToken`, `type`, `initializer`): [`VariableDeclaration`](VariableDeclaration.md)

#### Parameters

##### node

[`VariableDeclaration`](VariableDeclaration.md)

##### name

[`BindingName`](../type-aliases/BindingName.md)

##### exclamationToken

`undefined` | [`ExclamationToken`](../type-aliases/ExclamationToken.md)

##### type

`undefined` | [`TypeNode`](TypeNode.md)

##### initializer

`undefined` | [`Expression`](Expression.md)

#### Returns

[`VariableDeclaration`](VariableDeclaration.md)

***

### updateVariableDeclarationList()

> **updateVariableDeclarationList**(`node`, `declarations`): [`VariableDeclarationList`](VariableDeclarationList.md)

#### Parameters

##### node

[`VariableDeclarationList`](VariableDeclarationList.md)

##### declarations

readonly [`VariableDeclaration`](VariableDeclaration.md)[]

#### Returns

[`VariableDeclarationList`](VariableDeclarationList.md)

***

### updateVariableStatement()

> **updateVariableStatement**(`node`, `modifiers`, `declarationList`): [`VariableStatement`](VariableStatement.md)

#### Parameters

##### node

[`VariableStatement`](VariableStatement.md)

##### modifiers

`undefined` | readonly [`ModifierLike`](../type-aliases/ModifierLike.md)[]

##### declarationList

[`VariableDeclarationList`](VariableDeclarationList.md)

#### Returns

[`VariableStatement`](VariableStatement.md)

***

### updateVoidExpression()

> **updateVoidExpression**(`node`, `expression`): [`VoidExpression`](VoidExpression.md)

#### Parameters

##### node

[`VoidExpression`](VoidExpression.md)

##### expression

[`Expression`](Expression.md)

#### Returns

[`VoidExpression`](VoidExpression.md)

***

### updateWhileStatement()

> **updateWhileStatement**(`node`, `expression`, `statement`): [`WhileStatement`](WhileStatement.md)

#### Parameters

##### node

[`WhileStatement`](WhileStatement.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`WhileStatement`](WhileStatement.md)

***

### updateWithStatement()

> **updateWithStatement**(`node`, `expression`, `statement`): [`WithStatement`](WithStatement.md)

#### Parameters

##### node

[`WithStatement`](WithStatement.md)

##### expression

[`Expression`](Expression.md)

##### statement

[`Statement`](Statement.md)

#### Returns

[`WithStatement`](WithStatement.md)

***

### updateYieldExpression()

> **updateYieldExpression**(`node`, `asteriskToken`, `expression`): [`YieldExpression`](YieldExpression.md)

#### Parameters

##### node

[`YieldExpression`](YieldExpression.md)

##### asteriskToken

`undefined` | [`AsteriskToken`](../type-aliases/AsteriskToken.md)

##### expression

`undefined` | [`Expression`](Expression.md)

#### Returns

[`YieldExpression`](YieldExpression.md)
