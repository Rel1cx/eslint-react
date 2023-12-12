@eslint-react/ast

# @eslint-react/ast

## Table of contents

### Type Aliases

- [Construction](README.md#construction)
- [ReadableNodeType](README.md#readablenodetype)
- [TSESTreeArrayTupleType](README.md#tsestreearraytupletype)
- [TSESTreeClass](README.md#tsestreeclass)
- [TSESTreeDestructuringPattern](README.md#tsestreedestructuringpattern)
- [TSESTreeFunction](README.md#tsestreefunction)
- [TSESTreeFunctionType](README.md#tsestreefunctiontype)
- [TSESTreeJSX](README.md#tsestreejsx)
- [TSESTreeLoop](README.md#tsestreeloop)
- [TSESTreeProperty](README.md#tsestreeproperty)
- [TSESTreeTypeDeclaration](README.md#tsestreetypedeclaration)

### Variables

- [Construction](README.md#construction-1)
- [NodeType](README.md#nodetype)
- [unstableAssignmentPatternTypes](README.md#unstableassignmentpatterntypes)

### Functions

- [constructionDetector](README.md#constructiondetector)
- [findPropertyWithIdentifierKey](README.md#findpropertywithidentifierkey)
- [findVariableByName](README.md#findvariablebyname)
- [findVariableByNameUpToGlobal](README.md#findvariablebynameuptoglobal)
- [getClassIdentifier](README.md#getclassidentifier)
- [getExternalRefs](README.md#getexternalrefs)
- [getFunctionHeadLocation](README.md#getfunctionheadlocation)
- [getFunctionIdentifier](README.md#getfunctionidentifier)
- [getFunctionNameWithKind](README.md#getfunctionnamewithkind)
- [getNestedCallExpressions](README.md#getnestedcallexpressions)
- [getNestedIdentifiers](README.md#getnestedidentifiers)
- [getNestedReturnStatements](README.md#getnestedreturnstatements)
- [getPropertyName](README.md#getpropertyname)
- [getStaticValue](README.md#getstaticvalue)
- [getStringIfConstant](README.md#getstringifconstant)
- [getVariableInit](README.md#getvariableinit)
- [getVariableInitExpression](README.md#getvariableinitexpression)
- [getVariablesUpToGlobal](README.md#getvariablesuptoglobal)
- [hasSideEffect](README.md#hassideeffect)
- [is](README.md#is)
- [isArrayTupleType](README.md#isarraytupletype)
- [isClass](README.md#isclass)
- [isDeclaredInNode](README.md#isdeclaredinnode)
- [isDestructuringPattern](README.md#isdestructuringpattern)
- [isFunction](README.md#isfunction)
- [isFunctionOfClassMethod](README.md#isfunctionofclassmethod)
- [isFunctionOfClassProperty](README.md#isfunctionofclassproperty)
- [isFunctionOfObjectMethod](README.md#isfunctionofobjectmethod)
- [isFunctionType](README.md#isfunctiontype)
- [isIdentifierWithName](README.md#isidentifierwithname)
- [isIdentifierWithOneOfNames](README.md#isidentifierwithoneofnames)
- [isJSX](README.md#isjsx)
- [isJSXElement](README.md#isjsxelement)
- [isJSXFragment](README.md#isjsxfragment)
- [isJSXTagNameExpression](README.md#isjsxtagnameexpression)
- [isLeftHandSideExpression](README.md#islefthandsideexpression)
- [isLeftHandSideExpressionType](README.md#islefthandsideexpressiontype)
- [isLoop](README.md#isloop)
- [isMultiLine](README.md#ismultiline)
- [isNodeEqual](README.md#isnodeequal)
- [isOneOf](README.md#isoneof)
- [isParenthesized](README.md#isparenthesized)
- [isProperty](README.md#isproperty)
- [isPropertyOfObjectExpression](README.md#ispropertyofobjectexpression)
- [isPropertyWithIdentifierKey](README.md#ispropertywithidentifierkey)
- [isRegExpLiteral](README.md#isregexpliteral)
- [isStringLiteral](README.md#isstringliteral)
- [isTypeDeclaration](README.md#istypedeclaration)
- [isUnstableAssignmentPattern](README.md#isunstableassignmentpattern)
- [readableNodeType](README.md#readablenodetype-1)
- [resolveDefinitionInit](README.md#resolvedefinitioninit)
- [traverseUp](README.md#traverseup)
- [traverseUpGuard](README.md#traverseupguard)
- [unsafeIsArrayFromCall](README.md#unsafeisarrayfromcall)
- [unsafeIsMapCall](README.md#unsafeismapcall)
- [unsafeIsStringCall](README.md#unsafeisstringcall)
- [unsafeIsToStringCall](README.md#unsafeistostringcall)

## Type Aliases

### Construction

Ƭ **Construction**: `Data.TaggedEnum`\<\{ `Array`: \{ `node`: `TSESTree.ArrayExpression` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `AssignmentExpression`: \{ `node`: `TSESTree.Node` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `ClassExpression`: \{ `node`: `TSESTree.ClassExpression` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `FunctionDeclaration`: \{ `node`: `TSESTree.FunctionDeclaration` ; `usage`: `O.Option`\<`TSESTree.Expression` \| `TSESTree.Identifier`\> } ; `FunctionExpression`: \{ `node`: `TSESTree.ArrowFunctionExpression` \| `TSESTree.FunctionExpression` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `JSXElement`: \{ `node`: `TSESTree.JSXElement` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `JSXFragment`: \{ `node`: `TSESTree.JSXFragment` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `NewExpression`: \{ `node`: `TSESTree.NewExpression` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `None`: {} ; `ObjectExpression`: \{ `node`: `TSESTree.ObjectExpression` ; `usage`: `O.Option`\<`TSESTree.Node`\> } ; `RegExpLiteral`: \{ `node`: `TSESTree.Literal` ; `usage`: `O.Option`\<`TSESTree.Node`\> } }\>

---

### ReadableNodeType

Ƭ **ReadableNodeType**: `ReturnType`\<typeof [`readableNodeType`](README.md#readablenodetype-1)\>

---

### TSESTreeArrayTupleType

Ƭ **TSESTreeArrayTupleType**: `TSESTree.TSArrayType` \| `TSESTree.TSTupleType`

---

### TSESTreeClass

Ƭ **TSESTreeClass**: `TSESTree.ClassDeclaration` \| `TSESTree.ClassExpression`

---

### TSESTreeDestructuringPattern

Ƭ **TSESTreeDestructuringPattern**: `TSESTree.ArrayPattern` \| `TSESTree.AssignmentPattern` \| `TSESTree.ObjectPattern` \| `TSESTree.RestElement`

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

### Construction

• **Construction**: `Object`

#### Type declaration

| Name                   | Type                                                                                                                                                               |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Array`                | `Constructor`\<`Data`\<\{ `_tag`: `"Array"` ; `node`: `ArrayExpression` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                              |
| `AssignmentExpression` | `Constructor`\<`Data`\<\{ `_tag`: `"AssignmentExpression"` ; `node`: `Node` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                          |
| `ClassExpression`      | `Constructor`\<`Data`\<\{ `_tag`: `"ClassExpression"` ; `node`: `ClassExpression` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                    |
| `FunctionDeclaration`  | `Constructor`\<`Data`\<\{ `_tag`: `"FunctionDeclaration"` ; `node`: `FunctionDeclaration` ; `usage`: `Option`\<`Expression`\> }\>, `"_tag"`\>                      |
| `FunctionExpression`   | `Constructor`\<`Data`\<\{ `_tag`: `"FunctionExpression"` ; `node`: `ArrowFunctionExpression` \| `FunctionExpression` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\> |
| `JSXElement`           | `Constructor`\<`Data`\<\{ `_tag`: `"JSXElement"` ; `node`: `JSXElement` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                              |
| `JSXFragment`          | `Constructor`\<`Data`\<\{ `_tag`: `"JSXFragment"` ; `node`: `JSXFragment` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                            |
| `NewExpression`        | `Constructor`\<`Data`\<\{ `_tag`: `"NewExpression"` ; `node`: `NewExpression` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                        |
| `None`                 | `Constructor`\<`Data`\<\{ `_tag`: `"None"` }\>, `"_tag"`\>                                                                                                         |
| `ObjectExpression`     | `Constructor`\<`Data`\<\{ `_tag`: `"ObjectExpression"` ; `node`: `ObjectExpression` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                  |
| `RegExpLiteral`        | `Constructor`\<`Data`\<\{ `_tag`: `"RegExpLiteral"` ; `node`: `Literal` ; `usage`: `Option`\<`Node`\> }\>, `"_tag"`\>                                              |

---

### NodeType

• `Const` **NodeType**: typeof `AST_NODE_TYPES` = `AST_NODE_TYPES`

---

### unstableAssignmentPatternTypes

• `Const` **unstableAssignmentPatternTypes**: readonly [`JSXElement`, `ArrayExpression`, `ObjectExpression`, `FunctionExpression`, `ArrowFunctionExpression`, `ClassExpression`, `NewExpression`, `CallExpression`]

## Functions

### constructionDetector

▸ **constructionDetector**\<`T`\>(`context`): (`node`: `TSESTree.Node`) => [`Construction`](README.md#construction-1)

Get a function that detects the construction of a given node.

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Parameters

| Name      | Type | Description      |
| :-------- | :--- | :--------------- |
| `context` | `T`  | The rule context |

#### Returns

`fn`

A function that detects the construction of a given node

▸ (`node`): [`Construction`](README.md#construction-1)

##### Parameters

| Name   | Type            |
| :----- | :-------------- |
| `node` | `TSESTree.Node` |

##### Returns

[`Construction`](README.md#construction-1)

---

### findPropertyWithIdentifierKey

▸ **findPropertyWithIdentifierKey**(`properties`, `key`): `Option`\<`NonNullable`\<`undefined` \| `ObjectLiteralElement`\>\>

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `properties` | `ObjectLiteralElement`[] |
| `key`        | `string`                 |

#### Returns

`Option`\<`NonNullable`\<`undefined` \| `ObjectLiteralElement`\>\>

---

### findVariableByName

▸ **findVariableByName**(`name`): (`variables`: `Variable`[]) => `Option`\<`Variable`\>

Find a variable through a list of variables by name

#### Parameters

| Name   | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `name` | `string` | The name of the variable to find |

#### Returns

`fn`

▸ (`variables`): `Option`\<`Variable`\>

##### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `variables` | `Variable`[] |

##### Returns

`Option`\<`Variable`\>

---

### findVariableByNameUpToGlobal

▸ **findVariableByNameUpToGlobal**(`name`, `initialScope`): `O.Option`\<`NonNullable`\<`Variable`\>\>

Find a variable through a list of variables by name, starting from the given scope and going up to the global scope

#### Parameters

| Name           | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `name`         | `string` | The name of the variable to find |
| `initialScope` | `Scope`  | The scope to start from          |

#### Returns

`O.Option`\<`NonNullable`\<`Variable`\>\>

---

### getClassIdentifier

▸ **getClassIdentifier**(`node`): `O.Option`\<`TSESTree.Identifier`\>

Gets class identifier from ClassDeclaration or ClassExpression

#### Parameters

| Name   | Type                                       | Description           |
| :----- | :----------------------------------------- | :-------------------- |
| `node` | [`TSESTreeClass`](README.md#tsestreeclass) | The AST node to check |

#### Returns

`O.Option`\<`TSESTree.Identifier`\>

class identifier or null

---

### getExternalRefs

▸ **getExternalRefs**(`params`): `TSESLint.Scope.Reference`[]

#### Parameters

| Name                  | Type                       |
| :-------------------- | :------------------------- |
| `params`              | `Object`                   |
| `params.node`         | `Node`                     |
| `params.scopeManager` | `ScopeManager`             |
| `params.sourceCode`   | `Readonly`\<`SourceCode`\> |

#### Returns

`TSESLint.Scope.Reference`[]

---

### getFunctionHeadLocation

▸ **getFunctionHeadLocation**(`node`, `sourceCode`): `SourceLocation`

Get the proper location of a given function node to report.

#### Parameters

| Name         | Type                                                                       |
| :----------- | :------------------------------------------------------------------------- |
| `node`       | `ArrowFunctionExpression` \| `FunctionDeclaration` \| `FunctionExpression` |
| `sourceCode` | `SourceCode`                                                               |

#### Returns

`SourceLocation`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionheadlocation](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionheadlocation)

---

### getFunctionIdentifier

▸ **getFunctionIdentifier**(`node`): `O.Option`\<`TSESTree.Identifier`\>

Gets FunctionDeclaration's identifier or FunctionExpression's parent identifier if it exists

#### Parameters

| Name   | Type                                             | Description           |
| :----- | :----------------------------------------------- | :-------------------- |
| `node` | [`TSESTreeFunction`](README.md#tsestreefunction) | The AST node to check |

#### Returns

`O.Option`\<`TSESTree.Identifier`\>

function identifier or null

---

### getFunctionNameWithKind

▸ **getFunctionNameWithKind**(`node`, `sourceCode?`): `string`

Get the name and kind of a given function node.

#### Parameters

| Name          | Type                                                                       |
| :------------ | :------------------------------------------------------------------------- |
| `node`        | `ArrowFunctionExpression` \| `FunctionDeclaration` \| `FunctionExpression` |
| `sourceCode?` | `SourceCode`                                                               |

#### Returns

`string`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionnamewithkind](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getfunctionnamewithkind)

---

### getNestedCallExpressions

▸ **getNestedCallExpressions**(`node`): `TSESTree.CallExpression`[]

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`TSESTree.CallExpression`[]

---

### getNestedIdentifiers

▸ **getNestedIdentifiers**(`node`): `TSESTree.Identifier`[]

Gets nested identifiers in a node

#### Parameters

| Name   | Type   | Description  |
| :----- | :----- | :----------- |
| `node` | `Node` | The AST node |

#### Returns

`TSESTree.Identifier`[]

The nested identifiers

---

### getNestedReturnStatements

▸ **getNestedReturnStatements**(`node`): `TSESTree.ReturnStatement`[]

Gets nested return statements in a node

#### Parameters

| Name   | Type   | Description  |
| :----- | :----- | :----------- |
| `node` | `Node` | The AST node |

#### Returns

`TSESTree.ReturnStatement`[]

The nested return statements

---

### getPropertyName

▸ **getPropertyName**(`node`, `initialScope?`): `null` \| `string`

Get the property name of a given property node.
If the node is a computed property, this tries to compute the property name by the getStringIfConstant function.

#### Parameters

| Name            | Type                                                                           |
| :-------------- | :----------------------------------------------------------------------------- |
| `node`          | `PropertyDefinition` \| `MemberExpression` \| `MethodDefinition` \| `Property` |
| `initialScope?` | `Scope`                                                                        |

#### Returns

`null` \| `string`

The property name of the node. If the property name is not constant then it returns `null`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getpropertyname](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getpropertyname)

---

### getStaticValue

▸ **getStaticValue**(`node`, `initialScope?`): `null` \| \{ `value`: `unknown` }

Get the value of a given node if it can decide the value statically.
If the 2nd parameter `initialScope` was given, this function tries to resolve identifier references which are in the
given node as much as possible. In the resolving way, it does on the assumption that built-in global objects have
not been modified.
For example, it considers `Symbol.iterator`, `String.raw`hello``, and `Object.freeze({a: 1}).a` as static.

#### Parameters

| Name            | Type    |
| :-------------- | :------ |
| `node`          | `Node`  |
| `initialScope?` | `Scope` |

#### Returns

`null` \| \{ `value`: `unknown` }

The `{ value: any }` shaped object. The `value` property is the static value. If it couldn't compute the
static value of the node, it returns `null`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue)

---

### getStringIfConstant

▸ **getStringIfConstant**(`node`, `initialScope?`): `null` \| `string`

Get the string value of a given node.
This function is a tiny wrapper of the getStaticValue function.

#### Parameters

| Name            | Type    |
| :-------------- | :------ |
| `node`          | `Node`  |
| `initialScope?` | `Scope` |

#### Returns

`null` \| `string`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstringifconstant](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstringifconstant)

---

### getVariableInit

▸ **getVariableInit**(`at`): (`variable`: `Variable`) => `Option`\<`LetOrConstOrVarDeclaration` \| `Expression`\>

Get the init node of the nth definition of a variable

#### Parameters

| Name | Type     | Description                     |
| :--- | :------- | :------------------------------ |
| `at` | `number` | The index number of def in defs |

#### Returns

`fn`

A function that takes a variable and returns the init node of the nth definition of that variable

▸ (`variable`): `Option`\<`LetOrConstOrVarDeclaration` \| `Expression`\>

##### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `variable` | `Variable` |

##### Returns

`Option`\<`LetOrConstOrVarDeclaration` \| `Expression`\>

---

### getVariableInitExpression

▸ **getVariableInitExpression**(`at`): (`variable`: `Variable`) => `Option`\<`Expression`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `at` | `number` |

#### Returns

`fn`

▸ (`variable`): `Option`\<`Expression`\>

##### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `variable` | `Variable` |

##### Returns

`Option`\<`Expression`\>

---

### getVariablesUpToGlobal

▸ **getVariablesUpToGlobal**(`initialScope`): `Variable`[]

Get all variables from the given scope up to the global scope

#### Parameters

| Name           | Type    | Description             |
| :------------- | :------ | :---------------------- |
| `initialScope` | `Scope` | The scope to start from |

#### Returns

`Variable`[]

---

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

| Name                                      | Type         |
| :---------------------------------------- | :----------- |
| `node`                                    | `Node`       |
| `sourceCode`                              | `SourceCode` |
| `options?`                                | `Object`     |
| `options.considerGetters?`                | `boolean`    |
| `options.considerImplicitTypeConversion?` | `boolean`    |

#### Returns

`boolean`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#hassideeffect](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#hassideeffect)

---

### is

▸ **is**\<`NodeType`\>(`nodeType`): (`node`: `undefined` \| `null` \| `Node`) => node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

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

▸ (`node`): node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

##### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

##### Returns

node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

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

### isDestructuringPattern

▸ **isDestructuringPattern**(`node`): node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

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

### isFunctionOfClassMethod

▸ **isFunctionOfClassMethod**(`node`): `boolean`

Checks if the given node is a function expression or arrow function expression of a class method.

#### Parameters

| Name   | Type   | Description        |
| :----- | :----- | :----------------- |
| `node` | `Node` | The node to check. |

#### Returns

`boolean`

`true` if the node is a function expression or arrow function expression of a class method, `false` otherwise.

---

### isFunctionOfClassProperty

▸ **isFunctionOfClassProperty**(`node`): `boolean`

Checks if the given node is a function expression or arrow function expression of a class property.

#### Parameters

| Name   | Type   | Description        |
| :----- | :----- | :----------------- |
| `node` | `Node` | The node to check. |

#### Returns

`boolean`

`true` if the node is a function expression or arrow function expression of a class property, `false` otherwise.

---

### isFunctionOfObjectMethod

▸ **isFunctionOfObjectMethod**(`node`): `boolean`

Checks if the given node is a function expression or arrow function expression of a object method.

#### Parameters

| Name   | Type   | Description        |
| :----- | :----- | :----------------- |
| `node` | `Node` | The node to check. |

#### Returns

`boolean`

`true` if the node is a function expression or arrow function expression of a object method, `false` otherwise.

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

▸ **isIdentifierWithName**\<`T`\>(`node`, `name`): node is Identifier & Object

Checks if a node is an identifier with a given name

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `string` |

#### Parameters

| Name   | Type   | Description  |
| :----- | :----- | :----------- |
| `node` | `Node` | The AST node |
| `name` | `T`    | The name     |

#### Returns

node is Identifier & Object

`true if the node is an identifier with the given name

---

### isIdentifierWithOneOfNames

▸ **isIdentifierWithOneOfNames**\<`T`\>(`node`, `name`): node is Identifier & Object

Checks if a node is an identifier with one of names

#### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `T`  | extends `string`[] |

#### Parameters

| Name   | Type   | Description  |
| :----- | :----- | :----------- |
| `node` | `Node` | The AST node |
| `name` | `T`    | The name     |

#### Returns

node is Identifier & Object

`true` if the node is an identifier with one of names

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

### isLeftHandSideExpression

▸ **isLeftHandSideExpression**(`node`): node is ArrowFunctionExpression \| FunctionExpression \| ClassExpression \| JSXElement \| JSXFragment \| ArrayPattern \| ObjectPattern \| ArrayExpression \| CallExpression \| Identifier \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| ObjectExpression \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionExpression \| ClassExpression \| JSXElement \| JSXFragment \| ArrayPattern \| ObjectPattern \| ArrayExpression \| CallExpression \| Identifier \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| ObjectExpression \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression

---

### isLeftHandSideExpressionType

▸ **isLeftHandSideExpressionType**(`node`): node is ArrowFunctionExpression \| FunctionExpression \| ClassExpression \| JSXElement \| JSXFragment \| ArrayPattern \| ObjectPattern \| ArrayExpression \| CallExpression \| Identifier \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| ObjectExpression \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression \| TSAsExpression \| TSNonNullExpression \| TSTypeAssertion

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionExpression \| ClassExpression \| JSXElement \| JSXFragment \| ArrayPattern \| ObjectPattern \| ArrayExpression \| CallExpression \| Identifier \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| ObjectExpression \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression \| TSAsExpression \| TSNonNullExpression \| TSTypeAssertion

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

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if the node is multiline

---

### isNodeEqual

▸ **isNodeEqual**(`a`, `b`): `boolean`

Determines whether node equals to another node

#### Parameters

| Name | Type   | Description     |
| :--- | :----- | :-------------- |
| `a`  | `Node` | node to compare |
| `b`  | `Node` | node to compare |

#### Returns

`boolean`

`true` if node equal

**`See`**

https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts

---

### isOneOf

▸ **isOneOf**\<`NodeTypes`\>(`nodeTypes`): (`node`: `undefined` \| `null` \| `Node`) => node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

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

▸ (`node`): node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

##### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

##### Returns

node is Extract\<Program, Object\> \| Extract\<AccessorPropertyComputedName, Object\> \| Extract\<AccessorPropertyNonComputedName, Object\> \| Extract\<ArrayExpression, Object\> \| Extract\<ArrayPattern, Object\> \| Extract\<ArrowFunctionExpression, Object\> \| Extract\<AssignmentExpression, Object\> \| Extract\<AssignmentPattern, Object\> \| Extract\<AwaitExpression, Object\> \| Extract\<BinaryExpression, Object\> \| Extract\<BlockStatement, Object\> \| Extract\<BreakStatement, Object\> \| Extract\<CallExpression, Object\> \| Extract\<CatchClause, Object\> \| Extract\<ChainExpression, Object\> \| Extract\<ClassBody, Object\> \| Extract\<ClassDeclarationWithName, Object\> \| Extract\<ClassDeclarationWithOptionalName, Object\> \| Extract\<ClassExpression, Object\> \| Extract\<ConditionalExpression, Object\> \| Extract\<ContinueStatement, Object\> \| Extract\<DebuggerStatement, Object\> \| Extract\<Decorator, Object\> \| Extract\<DoWhileStatement, Object\> \| Extract\<EmptyStatement, Object\> \| Extract\<ExportAllDeclaration, Object\> \| Extract\<ExportDefaultDeclaration, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract\<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract\<ExportNamedDeclarationWithSource, Object\> \| Extract\<ExportSpecifier, Object\> \| Extract\<ExpressionStatement, Object\> \| Extract\<ForInStatement, Object\> \| Extract\<ForOfStatement, Object\> \| Extract\<ForStatement, Object\> \| Extract\<FunctionDeclarationWithName, Object\> \| Extract\<FunctionDeclarationWithOptionalName, Object\> \| Extract\<FunctionExpression, Object\> \| Extract\<Identifier, Object\> \| Extract\<IfStatement, Object\> \| Extract\<ImportAttribute, Object\> \| Extract\<ImportDeclaration, Object\> \| Extract\<ImportDefaultSpecifier, Object\> \| Extract\<ImportExpression, Object\> \| Extract\<ImportNamespaceSpecifier, Object\> \| Extract\<ImportSpecifier, Object\> \| Extract\<JSXAttribute, Object\> \| Extract\<JSXClosingElement, Object\> \| Extract\<JSXClosingFragment, Object\> \| Extract\<JSXElement, Object\> \| Extract\<JSXEmptyExpression, Object\> \| Extract\<JSXExpressionContainer, Object\> \| Extract\<JSXFragment, Object\> \| Extract\<JSXIdentifier, Object\> \| Extract\<JSXMemberExpression, Object\> \| Extract\<JSXNamespacedName, Object\> \| Extract\<JSXOpeningElement, Object\> \| Extract\<JSXOpeningFragment, Object\> \| Extract\<JSXSpreadAttribute, Object\> \| Extract\<JSXSpreadChild, Object\> \| Extract\<JSXText, Object\> \| Extract\<LabeledStatement, Object\> \| Extract\<BigIntLiteral, Object\> \| Extract\<BooleanLiteral, Object\> \| Extract\<NullLiteral, Object\> \| Extract\<NumberLiteral, Object\> \| Extract\<RegExpLiteral, Object\> \| Extract\<StringLiteral, Object\> \| Extract\<LogicalExpression, Object\> \| Extract\<MemberExpressionComputedName, Object\> \| Extract\<MemberExpressionNonComputedName, Object\> \| Extract\<MetaProperty, Object\> \| Extract\<MethodDefinitionComputedName, Object\> \| Extract\<MethodDefinitionNonComputedName, Object\> \| Extract\<NewExpression, Object\> \| Extract\<ObjectExpression, Object\> \| Extract\<ObjectPattern, Object\> \| Extract\<PrivateIdentifier, Object\> \| Extract\<PropertyComputedName, Object\> \| Extract\<PropertyNonComputedName, Object\> \| Extract\<PropertyDefinitionComputedName, Object\> \| Extract\<PropertyDefinitionNonComputedName, Object\> \| Extract\<RestElement, Object\> \| Extract\<ReturnStatement, Object\> \| Extract\<SequenceExpression, Object\> \| Extract\<SpreadElement, Object\> \| Extract\<StaticBlock, Object\> \| Extract\<Super, Object\> \| Extract\<SwitchCase, Object\> \| Extract\<SwitchStatement, Object\> \| Extract\<TaggedTemplateExpression, Object\> \| Extract\<TemplateElement, Object\> \| Extract\<TemplateLiteral, Object\> \| Extract\<ThisExpression, Object\> \| Extract\<ThrowStatement, Object\> \| Extract\<TryStatement, Object\> \| Extract\<TSAbstractAccessorPropertyComputedName, Object\> \| Extract\<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract\<TSAbstractKeyword, Object\> \| Extract\<TSAbstractMethodDefinitionComputedName, Object\> \| Extract\<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract\<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract\<TSAnyKeyword, Object\> \| Extract\<TSArrayType, Object\> \| Extract\<TSAsExpression, Object\> \| Extract\<TSAsyncKeyword, Object\> \| Extract\<TSBigIntKeyword, Object\> \| Extract\<TSBooleanKeyword, Object\> \| Extract\<TSCallSignatureDeclaration, Object\> \| Extract\<TSClassImplements, Object\> \| Extract\<TSConditionalType, Object\> \| Extract\<TSConstructorType, Object\> \| Extract\<TSConstructSignatureDeclaration, Object\> \| Extract\<TSDeclareFunction, Object\> \| Extract\<TSDeclareKeyword, Object\> \| Extract\<TSEmptyBodyFunctionExpression, Object\> \| Extract\<TSEnumDeclaration, Object\> \| Extract\<TSEnumMemberComputedName, Object\> \| Extract\<TSEnumMemberNonComputedName, Object\> \| Extract\<TSExportAssignment, Object\> \| Extract\<TSExportKeyword, Object\> \| Extract\<TSExternalModuleReference, Object\> \| Extract\<TSFunctionType, Object\> \| Extract\<TSImportEqualsDeclaration, Object\> \| Extract\<TSImportType, Object\> \| Extract\<TSIndexedAccessType, Object\> \| Extract\<TSIndexSignature, Object\> \| Extract\<TSInferType, Object\> \| Extract\<TSInstantiationExpression, Object\> \| Extract\<TSInterfaceBody, Object\> \| Extract\<TSInterfaceDeclaration, Object\> \| Extract\<TSInterfaceHeritage, Object\> \| Extract\<TSIntersectionType, Object\> \| Extract\<TSIntrinsicKeyword, Object\> \| Extract\<TSLiteralType, Object\> \| Extract\<TSMappedType, Object\> \| Extract\<TSMethodSignatureComputedName, Object\> \| Extract\<TSMethodSignatureNonComputedName, Object\> \| Extract\<TSModuleBlock, Object\> \| Extract\<TSModuleDeclarationGlobal, Object\> \| Extract\<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract\<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract\<TSModuleDeclarationNamespace, Object\> \| Extract\<TSNamedTupleMember, Object\> \| Extract\<TSNamespaceExportDeclaration, Object\> \| Extract\<TSNeverKeyword, Object\> \| Extract\<TSNonNullExpression, Object\> \| Extract\<TSNullKeyword, Object\> \| Extract\<TSNumberKeyword, Object\> \| Extract\<TSObjectKeyword, Object\> \| Extract\<TSOptionalType, Object\> \| Extract\<TSParameterProperty, Object\> \| Extract\<TSPrivateKeyword, Object\> \| Extract\<TSPropertySignatureComputedName, Object\> \| Extract\<TSPropertySignatureNonComputedName, Object\> \| Extract\<TSProtectedKeyword, Object\> \| Extract\<TSPublicKeyword, Object\> \| Extract\<TSQualifiedName, Object\> \| Extract\<TSReadonlyKeyword, Object\> \| Extract\<TSRestType, Object\> \| Extract\<TSSatisfiesExpression, Object\> \| Extract\<TSStaticKeyword, Object\> \| Extract\<TSStringKeyword, Object\> \| Extract\<TSSymbolKeyword, Object\> \| Extract\<TSTemplateLiteralType, Object\> \| Extract\<TSThisType, Object\> \| Extract\<TSTupleType, Object\> \| Extract\<TSTypeAliasDeclaration, Object\> \| Extract\<TSTypeAnnotation, Object\> \| Extract\<TSTypeAssertion, Object\> \| Extract\<TSTypeLiteral, Object\> \| Extract\<TSTypeOperator, Object\> \| Extract\<TSTypeParameter, Object\> \| Extract\<TSTypeParameterDeclaration, Object\> \| Extract\<TSTypeParameterInstantiation, Object\> \| Extract\<TSTypePredicate, Object\> \| Extract\<TSTypeQuery, Object\> \| Extract\<TSTypeReference, Object\> \| Extract\<TSUndefinedKeyword, Object\> \| Extract\<TSUnionType, Object\> \| Extract\<TSUnknownKeyword, Object\> \| Extract\<TSVoidKeyword, Object\> \| Extract\<UnaryExpression, Object\> \| Extract\<UpdateExpression, Object\> \| Extract\<LetOrConstOrVarDeclaration, Object\> \| Extract\<UsingInForOfDeclaration, Object\> \| Extract\<UsingInNormalContextDeclaration, Object\> \| Extract\<LetOrConstOrVarDeclarator, Object\> \| Extract\<UsingInForOfDeclarator, Object\> \| Extract\<UsingInNomalConextDeclarator, Object\> \| Extract\<WhileStatement, Object\> \| Extract\<WithStatement, Object\> \| Extract\<YieldExpression, Object\>

---

### isParenthesized

▸ **isParenthesized**(`node`, `sourceCode`): `boolean`

Check whether a given node is parenthesized or not.
This function detects it correctly even if it's parenthesized by specific syntax.

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `node`       | `Node`       |
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

| Name         | Type         |
| :----------- | :----------- |
| `times`      | `number`     |
| `node`       | `Node`       |
| `sourceCode` | `SourceCode` |

#### Returns

`boolean`

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

▸ **isPropertyWithIdentifierKey**\<`T`\>(`node`, `key`): node is Object

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

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

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

### isUnstableAssignmentPattern

▸ **isUnstableAssignmentPattern**(`node`): node is AssignmentPattern & Object

Check if the given node is an unstable assignment pattern (will change between assignments)

#### Parameters

| Name   | Type                | Description           |
| :----- | :------------------ | :-------------------- |
| `node` | `AssignmentPattern` | The AST node to check |

#### Returns

node is AssignmentPattern & Object

---

### readableNodeType

▸ **readableNodeType**(`node`): `"RegExp literal"` \| `"Object literal"` \| `"Number literal"` \| `"Boolean literal"` \| `"String literal"` \| `"Null literal"` \| `"Array literal"` \| `"NaN literal"` \| `"Function literal"` \| `"Undefined literal"` \| `"Async literal"` \| `"Promise literal"` \| `"Symbol literal"` \| `"Set literal"` \| `"Error literal"` \| `"Map literal"` \| `"WeakMap literal"` \| `"Generator literal"` \| `"GeneratorFunction literal"` \| `"BigInt literal"` \| `"ArrayBuffer literal"` \| `"Date literal"` \| `"identifier"` \| `"member expression"` \| `"JSX attribute"` \| `"JSX element"` \| `"JSX fragment"` \| `"JSX identifier"` \| `"JSX text"` \| `"JSX closing element"` \| `"JSX closing fragment"` \| `"JSX empty expression"` \| `"JSX expression container"` \| `"JSX member expression"` \| `"JSX namespaced name"` \| `"JSX opening element"` \| `"JSX opening fragment"` \| `"JSX spread attribute"` \| `"JSX spread child"` \| `"decorator"` \| `"program"` \| `"property"` \| `"super"` \| `"accessor property"` \| `"array expression"` \| `"array pattern"` \| `"function expression"` \| `"arrow function expression"` \| `"assignment expression"` \| `"assignment pattern"` \| `"await expression"` \| `"binary expression"` \| `"block statement"` \| `"break statement"` \| `"call expression"` \| `"catch clause"` \| `"chain expression"` \| `"class body"` \| `"class declaration"` \| `"class expression"` \| `"conditional expression"` \| `"continue statement"` \| `"debugger statement"` \| `"while statement"` \| `"do while statement"` \| `"empty statement"` \| `"export all declaration"` \| `"export default declaration"` \| `"export named declaration"` \| `"export specifier"` \| `"expression statement"` \| `"for in statement"` \| `"for of statement"` \| `"for statement"` \| `"function declaration"` \| `"if statement"` \| `"import attribute"` \| `"import declaration"` \| `"import default specifier"` \| `"import expression"` \| `"import namespace specifier"` \| `"import specifier"` \| `"labeled statement"` \| `"logical expression"` \| `"meta property"` \| `"method definition"` \| `"new expression"` \| `"object expression"` \| `"object pattern"` \| `"private identifier"` \| `"property definition"` \| `"rest element"` \| `"return statement"` \| `"sequence expression"` \| `"spread element"` \| `"static block"` \| `"switch case"` \| `"switch statement"` \| `"tagged template expression"` \| `"template element"` \| `"template literal"` \| `"this expression"` \| `"throw statement"` \| `"try statement"` \| `"unary expression"` \| `"update expression"` \| `"variable declaration"` \| `"variable declarator"` \| `"with statement"` \| `"yield expression"` \| `"ts abstract accessor property"` \| `"ts abstract keyword"` \| `"ts abstract method definition"` \| `"ts abstract property definition"` \| `"ts any keyword"` \| `"ts array type"` \| `"ts as expression"` \| `"ts async keyword"` \| `"ts big int keyword"` \| `"ts boolean keyword"` \| `"ts call signature declaration"` \| `"ts class implements"` \| `"ts conditional type"` \| `"ts constructor type"` \| `"ts construct signature declaration"` \| `"ts declare function"` \| `"ts declare keyword"` \| `"ts empty body function expression"` \| `"ts enum declaration"` \| `"ts enum member"` \| `"ts export assignment"` \| `"ts export keyword"` \| `"ts external module reference"` \| `"ts function type"` \| `"ts instantiation expression"` \| `"ts import equals declaration"` \| `"ts import type"` \| `"ts indexed access type"` \| `"ts index signature"` \| `"ts infer type"` \| `"ts interface body"` \| `"ts interface declaration"` \| `"ts interface heritage"` \| `"ts intersection type"` \| `"ts intrinsic keyword"` \| `"ts literal type"` \| `"ts mapped type"` \| `"ts method signature"` \| `"ts module block"` \| `"ts module declaration"` \| `"ts named tuple member"` \| `"ts namespace export declaration"` \| `"ts never keyword"` \| `"ts non null expression"` \| `"ts null keyword"` \| `"ts number keyword"` \| `"ts object keyword"` \| `"ts optional type"` \| `"ts parameter property"` \| `"ts private keyword"` \| `"ts property signature"` \| `"ts protected keyword"` \| `"ts public keyword"` \| `"ts qualified name"` \| `"ts readonly keyword"` \| `"ts rest type"` \| `"ts satisfies expression"` \| `"ts static keyword"` \| `"ts string keyword"` \| `"ts symbol keyword"` \| `"ts template literal type"` \| `"ts this type"` \| `"ts tuple type"` \| `"ts type alias declaration"` \| `"ts type annotation"` \| `"ts type assertion"` \| `"ts type literal"` \| `"ts type operator"` \| `"ts type parameter"` \| `"ts type parameter declaration"` \| `"ts type parameter instantiation"` \| `"ts type predicate"` \| `"ts type query"` \| `"ts type reference"` \| `"ts undefined keyword"` \| `"ts union type"` \| `"ts unknown keyword"` \| `"ts void keyword"`

Returns human readable node type for given AST node

#### Parameters

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| `node` | `Node` | AST node    |

#### Returns

`"RegExp literal"` \| `"Object literal"` \| `"Number literal"` \| `"Boolean literal"` \| `"String literal"` \| `"Null literal"` \| `"Array literal"` \| `"NaN literal"` \| `"Function literal"` \| `"Undefined literal"` \| `"Async literal"` \| `"Promise literal"` \| `"Symbol literal"` \| `"Set literal"` \| `"Error literal"` \| `"Map literal"` \| `"WeakMap literal"` \| `"Generator literal"` \| `"GeneratorFunction literal"` \| `"BigInt literal"` \| `"ArrayBuffer literal"` \| `"Date literal"` \| `"identifier"` \| `"member expression"` \| `"JSX attribute"` \| `"JSX element"` \| `"JSX fragment"` \| `"JSX identifier"` \| `"JSX text"` \| `"JSX closing element"` \| `"JSX closing fragment"` \| `"JSX empty expression"` \| `"JSX expression container"` \| `"JSX member expression"` \| `"JSX namespaced name"` \| `"JSX opening element"` \| `"JSX opening fragment"` \| `"JSX spread attribute"` \| `"JSX spread child"` \| `"decorator"` \| `"program"` \| `"property"` \| `"super"` \| `"accessor property"` \| `"array expression"` \| `"array pattern"` \| `"function expression"` \| `"arrow function expression"` \| `"assignment expression"` \| `"assignment pattern"` \| `"await expression"` \| `"binary expression"` \| `"block statement"` \| `"break statement"` \| `"call expression"` \| `"catch clause"` \| `"chain expression"` \| `"class body"` \| `"class declaration"` \| `"class expression"` \| `"conditional expression"` \| `"continue statement"` \| `"debugger statement"` \| `"while statement"` \| `"do while statement"` \| `"empty statement"` \| `"export all declaration"` \| `"export default declaration"` \| `"export named declaration"` \| `"export specifier"` \| `"expression statement"` \| `"for in statement"` \| `"for of statement"` \| `"for statement"` \| `"function declaration"` \| `"if statement"` \| `"import attribute"` \| `"import declaration"` \| `"import default specifier"` \| `"import expression"` \| `"import namespace specifier"` \| `"import specifier"` \| `"labeled statement"` \| `"logical expression"` \| `"meta property"` \| `"method definition"` \| `"new expression"` \| `"object expression"` \| `"object pattern"` \| `"private identifier"` \| `"property definition"` \| `"rest element"` \| `"return statement"` \| `"sequence expression"` \| `"spread element"` \| `"static block"` \| `"switch case"` \| `"switch statement"` \| `"tagged template expression"` \| `"template element"` \| `"template literal"` \| `"this expression"` \| `"throw statement"` \| `"try statement"` \| `"unary expression"` \| `"update expression"` \| `"variable declaration"` \| `"variable declarator"` \| `"with statement"` \| `"yield expression"` \| `"ts abstract accessor property"` \| `"ts abstract keyword"` \| `"ts abstract method definition"` \| `"ts abstract property definition"` \| `"ts any keyword"` \| `"ts array type"` \| `"ts as expression"` \| `"ts async keyword"` \| `"ts big int keyword"` \| `"ts boolean keyword"` \| `"ts call signature declaration"` \| `"ts class implements"` \| `"ts conditional type"` \| `"ts constructor type"` \| `"ts construct signature declaration"` \| `"ts declare function"` \| `"ts declare keyword"` \| `"ts empty body function expression"` \| `"ts enum declaration"` \| `"ts enum member"` \| `"ts export assignment"` \| `"ts export keyword"` \| `"ts external module reference"` \| `"ts function type"` \| `"ts instantiation expression"` \| `"ts import equals declaration"` \| `"ts import type"` \| `"ts indexed access type"` \| `"ts index signature"` \| `"ts infer type"` \| `"ts interface body"` \| `"ts interface declaration"` \| `"ts interface heritage"` \| `"ts intersection type"` \| `"ts intrinsic keyword"` \| `"ts literal type"` \| `"ts mapped type"` \| `"ts method signature"` \| `"ts module block"` \| `"ts module declaration"` \| `"ts named tuple member"` \| `"ts namespace export declaration"` \| `"ts never keyword"` \| `"ts non null expression"` \| `"ts null keyword"` \| `"ts number keyword"` \| `"ts object keyword"` \| `"ts optional type"` \| `"ts parameter property"` \| `"ts private keyword"` \| `"ts property signature"` \| `"ts protected keyword"` \| `"ts public keyword"` \| `"ts qualified name"` \| `"ts readonly keyword"` \| `"ts rest type"` \| `"ts satisfies expression"` \| `"ts static keyword"` \| `"ts string keyword"` \| `"ts symbol keyword"` \| `"ts template literal type"` \| `"ts this type"` \| `"ts tuple type"` \| `"ts type alias declaration"` \| `"ts type annotation"` \| `"ts type assertion"` \| `"ts type literal"` \| `"ts type operator"` \| `"ts type parameter"` \| `"ts type parameter declaration"` \| `"ts type parameter instantiation"` \| `"ts type predicate"` \| `"ts type query"` \| `"ts type reference"` \| `"ts undefined keyword"` \| `"ts union type"` \| `"ts unknown keyword"` \| `"ts void keyword"`

Human readable node type

---

### resolveDefinitionInit

▸ **resolveDefinitionInit**(`def`): `O.Option`\<`TSESTree.Expression` \| `TSESTree.LetOrConstOrVarDeclaration`\>

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `def` | `Definition` |

#### Returns

`O.Option`\<`TSESTree.Expression` \| `TSESTree.LetOrConstOrVarDeclaration`\>

---

### traverseUp

▸ **traverseUp**(`node`, `predicate`): `O.Option`\<`TSESTree.Node`\>

Traverses up the AST tree until the predicate returns `true` or the root node is reached

#### Parameters

| Name        | Type                          | Description                           |
| :---------- | :---------------------------- | :------------------------------------ |
| `node`      | `Node`                        | The AST node to start traversing from |
| `predicate` | (`node`: `Node`) => `boolean` | The predicate to check each node      |

#### Returns

`O.Option`\<`TSESTree.Node`\>

The first node that matches the predicate or `null` if no node matches

---

### traverseUpGuard

▸ **traverseUpGuard**\<`T`\>(`node`, `predicate`): `O.Option`\<`T`\>

Traverses up the AST tree until the predicate returns `true` or the root node is reached

#### Type parameters

| Name | Type           |
| :--- | :------------- |
| `T`  | extends `Node` |

#### Parameters

| Name        | Type                          | Description                                                |
| :---------- | :---------------------------- | :--------------------------------------------------------- |
| `node`      | `Node`                        | The AST node to start traversing from                      |
| `predicate` | (`node`: `Node`) => node is T | The predicate to check each node. **must be a type guard** |

#### Returns

`O.Option`\<`T`\>

The first node that matches the predicate or `null` if no node matches

---

### unsafeIsArrayFromCall

▸ **unsafeIsArrayFromCall**(`node`): node is CallExpression

Unsafe check whether given node or its parent is directly inside `Array.from` call

#### Parameters

| Name   | Type             | Description           |
| :----- | :--------------- | :-------------------- |
| `node` | `null` \| `Node` | The AST node to check |

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
