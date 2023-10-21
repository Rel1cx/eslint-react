@eslint-react/ast

# @eslint-react/ast

## Table of contents

### Type Aliases

- [ReadableNodeType](README.md#readablenodetype)
- [TSESTreeArrayTupleType](README.md#tsestreearraytupletype)
- [TSESTreeClass](README.md#tsestreeclass)
- [TSESTreeFunction](README.md#tsestreefunction)
- [TSESTreeFunctionType](README.md#tsestreefunctiontype)
- [TSESTreeJSX](README.md#tsestreejsx)
- [TSESTreeLoop](README.md#tsestreeloop)
- [TSESTreeProperty](README.md#tsestreeproperty)
- [TSESTreeTypeDeclaration](README.md#tsestreetypedeclaration)

### Variables

- [NodeType](README.md#nodetype)

### Functions

- [findPropertyWithIdentifierKey](README.md#findpropertywithidentifierkey)
- [getClassIdentifier](README.md#getclassidentifier)
- [getExternalRefs](README.md#getexternalrefs)
- [getFunctionIdentifier](README.md#getfunctionidentifier)
- [getNestedIdentifiers](README.md#getnestedidentifiers)
- [getNestedReturnStatements](README.md#getnestedreturnstatements)
- [is](README.md#is)
- [isArrayTupleType](README.md#isarraytupletype)
- [isClass](README.md#isclass)
- [isDeclaredInNode](README.md#isdeclaredinnode)
- [isDestructorParameter](README.md#isdestructorparameter)
- [isFunction](README.md#isfunction)
- [isFunctionType](README.md#isfunctiontype)
- [isIdentifierWithName](README.md#isidentifierwithname)
- [isIdentifierWithOneOfNames](README.md#isidentifierwithoneofnames)
- [isJSX](README.md#isjsx)
- [isJSXElement](README.md#isjsxelement)
- [isJSXFragment](README.md#isjsxfragment)
- [isJSXTagNameExpression](README.md#isjsxtagnameexpression)
- [isLoop](README.md#isloop)
- [isMultiLine](README.md#ismultiline)
- [isNodeEqual](README.md#isnodeequal)
- [isOneOf](README.md#isoneof)
- [isProperty](README.md#isproperty)
- [isPropertyOfObjectExpression](README.md#ispropertyofobjectexpression)
- [isPropertyWithIdentifierKey](README.md#ispropertywithidentifierkey)
- [isRegExpLiteral](README.md#isregexpliteral)
- [isStringLiteral](README.md#isstringliteral)
- [isTypeDeclaration](README.md#istypedeclaration)
- [readableNodeType](README.md#readablenodetype-1)
- [traverseUp](README.md#traverseup)
- [traverseUpGuard](README.md#traverseupguard)
- [unsafeIsArrayFromCall](README.md#unsafeisarrayfromcall)
- [unsafeIsMapCall](README.md#unsafeismapcall)
- [unsafeIsStringCall](README.md#unsafeisstringcall)
- [unsafeIsToStringCall](README.md#unsafeistostringcall)

## Type Aliases

### ReadableNodeType

Ƭ **ReadableNodeType**: `ReturnType`<typeof [`readableNodeType`](README.md#readablenodetype-1)\>

---

### TSESTreeArrayTupleType

Ƭ **TSESTreeArrayTupleType**: `TSESTree.TSArrayType` \| `TSESTree.TSTupleType`

---

### TSESTreeClass

Ƭ **TSESTreeClass**: `TSESTree.ClassDeclaration` \| `TSESTree.ClassExpression`

---

### TSESTreeFunction

Ƭ **TSESTreeFunction**: `TSESTree.ArrowFunctionExpression` \| `TSESTree.FunctionDeclaration` \| `TSESTree.FunctionExpression`

---

### TSESTreeFunctionType

Ƭ **TSESTreeFunctionType**: `TSESTree.TSCallSignatureDeclaration` \| `TSESTree.TSConstructSignatureDeclaration` \| `TSESTree.TSDeclareFunction` \| `TSESTree.TSEmptyBodyFunctionExpression` \| `TSESTree.TSFunctionType` \| `TSESTree.TSMethodSignature` \| [`TSESTreeFunction`](README.md#tsestreefunction)

---

### TSESTreeJSX

Ƭ **TSESTreeJSX**: `TSESTree.JSXAttribute` \| `TSESTree.JSXChild` \| `TSESTree.JSXClosingElement` \| `TSESTree.JSXClosingFragment` \| `TSESTree.JSXElement` \| `TSESTree.JSXEmptyExpression` \| `TSESTree.JSXExpression` \| `TSESTree.JSXExpressionContainer` \| `TSESTree.JSXFragment` \| `TSESTree.JSXIdentifier` \| `TSESTree.JSXIdentifierToken` \| `TSESTree.JSXMemberExpression` \| `TSESTree.JSXNamespacedName` \| `TSESTree.JSXOpeningElement` \| `TSESTree.JSXOpeningFragment` \| `TSESTree.JSXSpreadAttribute` \| `TSESTree.JSXSpreadChild` \| `TSESTree.JSXTagNameExpression` \| `TSESTree.JSXText` \| `TSESTree.JSXTextToken`

---

### TSESTreeLoop

Ƭ **TSESTreeLoop**: `TSESTree.DoWhileStatement` \| `TSESTree.ForInStatement` \| `TSESTree.ForOfStatement` \| `TSESTree.ForStatement` \| `TSESTree.WhileStatement`

---

### TSESTreeProperty

Ƭ **TSESTreeProperty**: `TSESTree.PropertyDefinition` \| `TSESTree.TSIndexSignature` \| `TSESTree.TSParameterProperty` \| `TSESTree.TSPropertySignature`

---

### TSESTreeTypeDeclaration

Ƭ **TSESTreeTypeDeclaration**: `TSESTree.TSInterfaceDeclaration` \| `TSESTree.TSTypeAliasDeclaration`

## Variables

### NodeType

• `Const` **NodeType**: typeof `AST_NODE_TYPES` = `AST_NODE_TYPES`

## Functions

### findPropertyWithIdentifierKey

▸ **findPropertyWithIdentifierKey**(`properties`, `key`): `undefined` \| `ObjectLiteralElement`

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `properties` | `ObjectLiteralElement`[] |
| `key`        | `string`                 |

#### Returns

`undefined` \| `ObjectLiteralElement`

---

### getClassIdentifier

▸ **getClassIdentifier**(`node`): `TSESTree.Identifier` \| `null`

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `node` | [`TSESTreeClass`](README.md#tsestreeclass) |

#### Returns

`TSESTree.Identifier` \| `null`

---

### getExternalRefs

▸ **getExternalRefs**(`params`): `TSESLint.Scope.Reference`[]

#### Parameters

| Name                  | Type                      |
| :-------------------- | :------------------------ |
| `params`              | `Object`                  |
| `params.node`         | `Node`                    |
| `params.scopeManager` | `ScopeManager`            |
| `params.sourceCode`   | `Readonly`<`SourceCode`\> |

#### Returns

`TSESLint.Scope.Reference`[]

---

### getFunctionIdentifier

▸ **getFunctionIdentifier**(`node`): `TSESTree.Identifier` \| `null`

Gets FunctionDeclaration's identifier or FunctionExpression's parent identifier if it exists

#### Parameters

| Name   | Type                                             | Description           |
| :----- | :----------------------------------------------- | :-------------------- |
| `node` | [`TSESTreeFunction`](README.md#tsestreefunction) | The AST node to check |

#### Returns

`TSESTree.Identifier` \| `null`

function identifier or null

---

### getNestedIdentifiers

▸ **getNestedIdentifiers**(`node`): `TSESTree.Identifier`[]

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`TSESTree.Identifier`[]

---

### getNestedReturnStatements

▸ **getNestedReturnStatements**(`node`): `TSESTree.ReturnStatement`[]

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`TSESTree.ReturnStatement`[]

---

### is

▸ **is**<`NodeType`\>(`nodeType`): (`node`: `undefined` \| `null` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name       | Type                     |
| :--------- | :----------------------- |
| `NodeType` | extends `AST_NODE_TYPES` |

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `nodeType` | `NodeType` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

---

### isArrayTupleType

▸ **isArrayTupleType**(`node`): node is TSArrayType \| TSTupleType

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is TSArrayType \| TSTupleType

---

### isClass

▸ **isClass**(`node`): node is ClassDeclarationWithName \| ClassDeclarationWithOptionalName \| ClassExpression

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ClassDeclarationWithName \| ClassDeclarationWithOptionalName \| ClassExpression

---

### isDeclaredInNode

▸ **isDeclaredInNode**(`«destructured»`): `boolean`

#### Parameters

| Name             | Type           |
| :--------------- | :------------- |
| `«destructured»` | `Object`       |
| › `functionNode` | `Node`         |
| › `reference`    | `Reference`    |
| › `scopeManager` | `ScopeManager` |

#### Returns

`boolean`

---

### isDestructorParameter

▸ **isDestructorParameter**(`node`): node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

Check if a Parameter node is a destructor parameter

#### Parameters

| Name   | Type   | Description       |
| :----- | :----- | :---------------- |
| `node` | `Node` | The node to check |

#### Returns

node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

boolean indicating whether the node is a destructor parameter

---

### isFunction

▸ **isFunction**(`node`): node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

---

### isFunctionType

▸ **isFunctionType**(`node`): node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression \| TSCallSignatureDeclaration \| TSConstructSignatureDeclaration \| TSDeclareFunction \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression \| TSCallSignatureDeclaration \| TSConstructSignatureDeclaration \| TSDeclareFunction \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

---

### isIdentifierWithName

▸ **isIdentifierWithName**<`T`\>(`node`, `name`): node is Identifier & Object

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `string` |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |
| `name` | `T`    |

#### Returns

node is Identifier & Object

---

### isIdentifierWithOneOfNames

▸ **isIdentifierWithOneOfNames**<`T`\>(`node`, `name`): node is Identifier & Object

#### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `T`  | extends `string`[] |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |
| `name` | `T`    |

#### Returns

node is Identifier & Object

---

### isJSX

▸ **isJSX**(`node`): node is JSXAttribute \| JSXElement \| JSXExpressionContainer \| JSXSpreadChild \| JSXFragment \| JSXText \| JSXClosingElement \| JSXClosingFragment \| JSXEmptyExpression \| JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName \| JSXOpeningElement \| JSXOpeningFragment \| JSXSpreadAttribute

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is JSXAttribute \| JSXElement \| JSXExpressionContainer \| JSXSpreadChild \| JSXFragment \| JSXText \| JSXClosingElement \| JSXClosingFragment \| JSXEmptyExpression \| JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName \| JSXOpeningElement \| JSXOpeningFragment \| JSXSpreadAttribute

---

### isJSXElement

▸ **isJSXElement**(`node`): node is JSXElement

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is JSXElement

---

### isJSXFragment

▸ **isJSXFragment**(`node`): node is JSXFragment

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is JSXFragment

---

### isJSXTagNameExpression

▸ **isJSXTagNameExpression**(`node`): node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

---

### isLoop

▸ **isLoop**(`node`): node is DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| WhileStatement

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| WhileStatement

---

### isMultiLine

▸ **isMultiLine**(`node`): `boolean`

Check if a node is multiline

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`boolean`

`true` if the node is multiline

---

### isNodeEqual

▸ **isNodeEqual**(`a`, `b`): `boolean`

Determines whether node equals to another node

#### Parameters

| Name | Type   | Description |
| :--- | :----- | :---------- |
| `a`  | `Node` | node        |
| `b`  | `Node` | node        |

#### Returns

`boolean`

`true` if node equal

**`See`**

https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts

---

### isOneOf

▸ **isOneOf**<`NodeTypes`\>(`nodeTypes`): (`node`: `undefined` \| `null` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `NodeTypes` | extends readonly `AST_NODE_TYPES`[] |

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `nodeTypes` | `NodeTypes` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

---

### isProperty

▸ **isProperty**(`node`): node is PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSIndexSignature \| TSParameterProperty \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSIndexSignature \| TSParameterProperty \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

---

### isPropertyOfObjectExpression

▸ **isPropertyOfObjectExpression**(`node`): node is Node & Object

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

node is Node & Object

---

### isPropertyWithIdentifierKey

▸ **isPropertyWithIdentifierKey**<`T`\>(`node`, `key`): node is Object

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `string` |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |
| `key`  | `T`    |

#### Returns

node is Object

---

### isRegExpLiteral

▸ **isRegExpLiteral**(`node`): node is RegExpLiteral

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

node is RegExpLiteral

---

### isStringLiteral

▸ **isStringLiteral**(`node`): node is StringLiteral

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is StringLiteral

---

### isTypeDeclaration

▸ **isTypeDeclaration**(`node`): node is TSInterfaceDeclaration \| TSTypeAliasDeclaration

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is TSInterfaceDeclaration \| TSTypeAliasDeclaration

---

### readableNodeType

▸ **readableNodeType**(`node`): `"property"` \| `"RegExp literal"` \| `"String literal"` \| `"Object literal"` \| `"Number literal"` \| `"Boolean literal"` \| `"Null literal"` \| `"Array literal"` \| `"NaN literal"` \| `"Function literal"` \| `"Undefined literal"` \| `"Async literal"` \| `"Promise literal"` \| `"Symbol literal"` \| `"Set literal"` \| `"Error literal"` \| `"Map literal"` \| `"WeakMap literal"` \| `"Generator literal"` \| `"GeneratorFunction literal"` \| `"BigInt literal"` \| `"ArrayBuffer literal"` \| `"Date literal"` \| `"identifier"` \| `"member expression"` \| `"JSX attribute"` \| `"JSX element"` \| `"JSX fragment"` \| `"JSX identifier"` \| `"JSX text"` \| `"JSX closing element"` \| `"JSX closing fragment"` \| `"JSX empty expression"` \| `"JSX expression container"` \| `"JSX member expression"` \| `"JSX namespaced name"` \| `"JSX opening element"` \| `"JSX opening fragment"` \| `"JSX spread attribute"` \| `"JSX spread child"` \| `"decorator"` \| `"program"` \| `"super"` \| `"accessor property"` \| `"array expression"` \| `"array pattern"` \| `"function expression"` \| `"arrow function expression"` \| `"assignment expression"` \| `"assignment pattern"` \| `"await expression"` \| `"binary expression"` \| `"block statement"` \| `"break statement"` \| `"call expression"` \| `"catch clause"` \| `"chain expression"` \| `"class body"` \| `"class declaration"` \| `"class expression"` \| `"conditional expression"` \| `"continue statement"` \| `"debugger statement"` \| `"while statement"` \| `"do while statement"` \| `"empty statement"` \| `"export all declaration"` \| `"export default declaration"` \| `"export named declaration"` \| `"export specifier"` \| `"expression statement"` \| `"for in statement"` \| `"for of statement"` \| `"for statement"` \| `"function declaration"` \| `"if statement"` \| `"import attribute"` \| `"import declaration"` \| `"import default specifier"` \| `"import expression"` \| `"import namespace specifier"` \| `"import specifier"` \| `"labeled statement"` \| `"logical expression"` \| `"meta property"` \| `"method definition"` \| `"new expression"` \| `"object expression"` \| `"object pattern"` \| `"private identifier"` \| `"property definition"` \| `"rest element"` \| `"return statement"` \| `"sequence expression"` \| `"spread element"` \| `"static block"` \| `"switch case"` \| `"switch statement"` \| `"tagged template expression"` \| `"template element"` \| `"template literal"` \| `"this expression"` \| `"throw statement"` \| `"try statement"` \| `"unary expression"` \| `"update expression"` \| `"variable declaration"` \| `"variable declarator"` \| `"with statement"` \| `"yield expression"` \| `"ts abstract accessor property"` \| `"ts abstract keyword"` \| `"ts abstract method definition"` \| `"ts abstract property definition"` \| `"ts any keyword"` \| `"ts array type"` \| `"ts as expression"` \| `"ts async keyword"` \| `"ts big int keyword"` \| `"ts boolean keyword"` \| `"ts call signature declaration"` \| `"ts class implements"` \| `"ts conditional type"` \| `"ts constructor type"` \| `"ts construct signature declaration"` \| `"ts declare function"` \| `"ts declare keyword"` \| `"ts empty body function expression"` \| `"ts enum declaration"` \| `"ts enum member"` \| `"ts export assignment"` \| `"ts export keyword"` \| `"ts external module reference"` \| `"ts function type"` \| `"ts instantiation expression"` \| `"ts import equals declaration"` \| `"ts import type"` \| `"ts indexed access type"` \| `"ts index signature"` \| `"ts infer type"` \| `"ts interface body"` \| `"ts interface declaration"` \| `"ts interface heritage"` \| `"ts intersection type"` \| `"ts intrinsic keyword"` \| `"ts literal type"` \| `"ts mapped type"` \| `"ts method signature"` \| `"ts module block"` \| `"ts module declaration"` \| `"ts named tuple member"` \| `"ts namespace export declaration"` \| `"ts never keyword"` \| `"ts non null expression"` \| `"ts null keyword"` \| `"ts number keyword"` \| `"ts object keyword"` \| `"ts optional type"` \| `"ts parameter property"` \| `"ts private keyword"` \| `"ts property signature"` \| `"ts protected keyword"` \| `"ts public keyword"` \| `"ts qualified name"` \| `"ts readonly keyword"` \| `"ts rest type"` \| `"ts satisfies expression"` \| `"ts static keyword"` \| `"ts string keyword"` \| `"ts symbol keyword"` \| `"ts template literal type"` \| `"ts this type"` \| `"ts tuple type"` \| `"ts type alias declaration"` \| `"ts type annotation"` \| `"ts type assertion"` \| `"ts type literal"` \| `"ts type operator"` \| `"ts type parameter"` \| `"ts type parameter declaration"` \| `"ts type parameter instantiation"` \| `"ts type predicate"` \| `"ts type query"` \| `"ts type reference"` \| `"ts undefined keyword"` \| `"ts union type"` \| `"ts unknown keyword"` \| `"ts void keyword"`

Returns human readable node type for given AST node

#### Parameters

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| `node` | `Node` | AST node    |

#### Returns

`"property"` \| `"RegExp literal"` \| `"String literal"` \| `"Object literal"` \| `"Number literal"` \| `"Boolean literal"` \| `"Null literal"` \| `"Array literal"` \| `"NaN literal"` \| `"Function literal"` \| `"Undefined literal"` \| `"Async literal"` \| `"Promise literal"` \| `"Symbol literal"` \| `"Set literal"` \| `"Error literal"` \| `"Map literal"` \| `"WeakMap literal"` \| `"Generator literal"` \| `"GeneratorFunction literal"` \| `"BigInt literal"` \| `"ArrayBuffer literal"` \| `"Date literal"` \| `"identifier"` \| `"member expression"` \| `"JSX attribute"` \| `"JSX element"` \| `"JSX fragment"` \| `"JSX identifier"` \| `"JSX text"` \| `"JSX closing element"` \| `"JSX closing fragment"` \| `"JSX empty expression"` \| `"JSX expression container"` \| `"JSX member expression"` \| `"JSX namespaced name"` \| `"JSX opening element"` \| `"JSX opening fragment"` \| `"JSX spread attribute"` \| `"JSX spread child"` \| `"decorator"` \| `"program"` \| `"super"` \| `"accessor property"` \| `"array expression"` \| `"array pattern"` \| `"function expression"` \| `"arrow function expression"` \| `"assignment expression"` \| `"assignment pattern"` \| `"await expression"` \| `"binary expression"` \| `"block statement"` \| `"break statement"` \| `"call expression"` \| `"catch clause"` \| `"chain expression"` \| `"class body"` \| `"class declaration"` \| `"class expression"` \| `"conditional expression"` \| `"continue statement"` \| `"debugger statement"` \| `"while statement"` \| `"do while statement"` \| `"empty statement"` \| `"export all declaration"` \| `"export default declaration"` \| `"export named declaration"` \| `"export specifier"` \| `"expression statement"` \| `"for in statement"` \| `"for of statement"` \| `"for statement"` \| `"function declaration"` \| `"if statement"` \| `"import attribute"` \| `"import declaration"` \| `"import default specifier"` \| `"import expression"` \| `"import namespace specifier"` \| `"import specifier"` \| `"labeled statement"` \| `"logical expression"` \| `"meta property"` \| `"method definition"` \| `"new expression"` \| `"object expression"` \| `"object pattern"` \| `"private identifier"` \| `"property definition"` \| `"rest element"` \| `"return statement"` \| `"sequence expression"` \| `"spread element"` \| `"static block"` \| `"switch case"` \| `"switch statement"` \| `"tagged template expression"` \| `"template element"` \| `"template literal"` \| `"this expression"` \| `"throw statement"` \| `"try statement"` \| `"unary expression"` \| `"update expression"` \| `"variable declaration"` \| `"variable declarator"` \| `"with statement"` \| `"yield expression"` \| `"ts abstract accessor property"` \| `"ts abstract keyword"` \| `"ts abstract method definition"` \| `"ts abstract property definition"` \| `"ts any keyword"` \| `"ts array type"` \| `"ts as expression"` \| `"ts async keyword"` \| `"ts big int keyword"` \| `"ts boolean keyword"` \| `"ts call signature declaration"` \| `"ts class implements"` \| `"ts conditional type"` \| `"ts constructor type"` \| `"ts construct signature declaration"` \| `"ts declare function"` \| `"ts declare keyword"` \| `"ts empty body function expression"` \| `"ts enum declaration"` \| `"ts enum member"` \| `"ts export assignment"` \| `"ts export keyword"` \| `"ts external module reference"` \| `"ts function type"` \| `"ts instantiation expression"` \| `"ts import equals declaration"` \| `"ts import type"` \| `"ts indexed access type"` \| `"ts index signature"` \| `"ts infer type"` \| `"ts interface body"` \| `"ts interface declaration"` \| `"ts interface heritage"` \| `"ts intersection type"` \| `"ts intrinsic keyword"` \| `"ts literal type"` \| `"ts mapped type"` \| `"ts method signature"` \| `"ts module block"` \| `"ts module declaration"` \| `"ts named tuple member"` \| `"ts namespace export declaration"` \| `"ts never keyword"` \| `"ts non null expression"` \| `"ts null keyword"` \| `"ts number keyword"` \| `"ts object keyword"` \| `"ts optional type"` \| `"ts parameter property"` \| `"ts private keyword"` \| `"ts property signature"` \| `"ts protected keyword"` \| `"ts public keyword"` \| `"ts qualified name"` \| `"ts readonly keyword"` \| `"ts rest type"` \| `"ts satisfies expression"` \| `"ts static keyword"` \| `"ts string keyword"` \| `"ts symbol keyword"` \| `"ts template literal type"` \| `"ts this type"` \| `"ts tuple type"` \| `"ts type alias declaration"` \| `"ts type annotation"` \| `"ts type assertion"` \| `"ts type literal"` \| `"ts type operator"` \| `"ts type parameter"` \| `"ts type parameter declaration"` \| `"ts type parameter instantiation"` \| `"ts type predicate"` \| `"ts type query"` \| `"ts type reference"` \| `"ts undefined keyword"` \| `"ts union type"` \| `"ts unknown keyword"` \| `"ts void keyword"`

Human readable node type

---

### traverseUp

▸ **traverseUp**(`node`, `predicate`): `TSESTree.Node` \| `null`

Traverses up the AST tree until the predicate returns `true` or the root node is reached.

#### Parameters

| Name        | Type                          | Description                            |
| :---------- | :---------------------------- | :------------------------------------- |
| `node`      | `Node`                        | The AST node to start traversing from. |
| `predicate` | (`node`: `Node`) => `boolean` | The predicate to check each node.      |

#### Returns

`TSESTree.Node` \| `null`

The first node that matches the predicate or `null` if no node matches.

---

### traverseUpGuard

▸ **traverseUpGuard**<`T`\>(`node`, `predicate`): `T` \| `null`

Traverses up the AST tree until the predicate returns `true` or the root node is reached.

#### Type parameters

| Name | Type           |
| :--- | :------------- |
| `T`  | extends `Node` |

#### Parameters

| Name        | Type                          | Description                                                 |
| :---------- | :---------------------------- | :---------------------------------------------------------- |
| `node`      | `Node`                        | The AST node to start traversing from.                      |
| `predicate` | (`node`: `Node`) => node is T | The predicate to check each node. **must be a type guard**. |

#### Returns

`T` \| `null`

The first node that matches the predicate or `null` if no node matches.

---

### unsafeIsArrayFromCall

▸ **unsafeIsArrayFromCall**(`node`): node is CallExpression

Unsafe check whether given node or its parent is directly inside `Array.from` call

#### Parameters

| Name   | Type             | Description       |
| :----- | :--------------- | :---------------- |
| `node` | `null` \| `Node` | AST node to check |

#### Returns

node is CallExpression

`true` if node is directly inside `Array.from` call, `false` if not

---

### unsafeIsMapCall

▸ **unsafeIsMapCall**(`node`): node is CallExpression

Unsafe check whether given node or its parent is directly inside `map` call

```jsx
_ = <div>{items.map(item => <li />)}</div>;
`                   ^^^^^^^^^^^^^^       `;
```

#### Parameters

| Name   | Type             | Description           |
| :----- | :--------------- | :-------------------- |
| `node` | `null` \| `Node` | The AST node to check |

#### Returns

node is CallExpression

`true` if node is directly inside `map` call, `false` if not

---

### unsafeIsStringCall

▸ **unsafeIsStringCall**(`node`): node is CallExpression & Object

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

node is CallExpression & Object

---

### unsafeIsToStringCall

▸ **unsafeIsToStringCall**(`node`): node is CallExpression & Object

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

node is CallExpression & Object
