[eslint-plugin-react-ts](../README.md) / src/utils/ast

# Module: src/utils/ast

## Table of contents

### Namespaces

- [ReferenceTracker](src_utils_ast.ReferenceTracker.md)

### Interfaces

- [PatternMatcher](../interfaces/src_utils_ast.PatternMatcher.md)
- [ReferenceTracker](../interfaces/src_utils_ast.ReferenceTracker-1.md)

### Type Aliases

- [FunctionNode](src_utils_ast.md#functionnode)

### Variables

- [LINEBREAK\_MATCHER](src_utils_ast.md#linebreak_matcher)
- [PatternMatcher](src_utils_ast.md#patternmatcher)
- [ReferenceTracker](src_utils_ast.md#referencetracker)

### Functions

- [findPropertyWithIdentifierKey](src_utils_ast.md#findpropertywithidentifierkey)
- [findVariable](src_utils_ast.md#findvariable)
- [getExternalRefs](src_utils_ast.md#getexternalrefs)
- [getFunctionAncestor](src_utils_ast.md#getfunctionancestor)
- [getFunctionHeadLocation](src_utils_ast.md#getfunctionheadlocation)
- [getFunctionNameWithKind](src_utils_ast.md#getfunctionnamewithkind)
- [getInnermostScope](src_utils_ast.md#getinnermostscope)
- [getNestedIdentifiers](src_utils_ast.md#getnestedidentifiers)
- [getNestedReturnStatements](src_utils_ast.md#getnestedreturnstatements)
- [getPropertyName](src_utils_ast.md#getpropertyname)
- [getReactComponentIdentifier](src_utils_ast.md#getreactcomponentidentifier)
- [getReferencedExpressionByIdentifier](src_utils_ast.md#getreferencedexpressionbyidentifier)
- [getStaticValue](src_utils_ast.md#getstaticvalue)
- [getStringIfConstant](src_utils_ast.md#getstringifconstant)
- [hasSideEffect](src_utils_ast.md#hassideeffect)
- [is](src_utils_ast.md#is)
- [isArrowToken](src_utils_ast.md#isarrowtoken)
- [isAwaitExpression](src_utils_ast.md#isawaitexpression)
- [isAwaitKeyword](src_utils_ast.md#isawaitkeyword)
- [isClassOrTypeElement](src_utils_ast.md#isclassortypeelement)
- [isClosingBraceToken](src_utils_ast.md#isclosingbracetoken)
- [isClosingBracketToken](src_utils_ast.md#isclosingbrackettoken)
- [isClosingParenToken](src_utils_ast.md#isclosingparentoken)
- [isColonToken](src_utils_ast.md#iscolontoken)
- [isCommaToken](src_utils_ast.md#iscommatoken)
- [isCommentToken](src_utils_ast.md#iscommenttoken)
- [isConstructor](src_utils_ast.md#isconstructor)
- [isDeclaredInNode](src_utils_ast.md#isdeclaredinnode)
- [isDestructorParameter](src_utils_ast.md#isdestructorparameter)
- [isFunction](src_utils_ast.md#isfunction)
- [isFunctionNode](src_utils_ast.md#isfunctionnode)
- [isFunctionOrFunctionType](src_utils_ast.md#isfunctionorfunctiontype)
- [isFunctionType](src_utils_ast.md#isfunctiontype)
- [isIdentifier](src_utils_ast.md#isidentifier)
- [isIdentifierWithName](src_utils_ast.md#isidentifierwithname)
- [isIdentifierWithOneOfNames](src_utils_ast.md#isidentifierwithoneofnames)
- [isImportKeyword](src_utils_ast.md#isimportkeyword)
- [isLogicalOrOperator](src_utils_ast.md#islogicaloroperator)
- [isLoop](src_utils_ast.md#isloop)
- [isNodeOfType](src_utils_ast.md#isnodeoftype)
- [isNodeOfTypeWithConditions](src_utils_ast.md#isnodeoftypewithconditions)
- [isNodeOfTypes](src_utils_ast.md#isnodeoftypes)
- [isNonNullAssertionPunctuator](src_utils_ast.md#isnonnullassertionpunctuator)
- [isNotArrowToken](src_utils_ast.md#isnotarrowtoken)
- [isNotClosingBraceToken](src_utils_ast.md#isnotclosingbracetoken)
- [isNotClosingBracketToken](src_utils_ast.md#isnotclosingbrackettoken)
- [isNotClosingParenToken](src_utils_ast.md#isnotclosingparentoken)
- [isNotColonToken](src_utils_ast.md#isnotcolontoken)
- [isNotCommaToken](src_utils_ast.md#isnotcommatoken)
- [isNotCommentToken](src_utils_ast.md#isnotcommenttoken)
- [isNotNonNullAssertionPunctuator](src_utils_ast.md#isnotnonnullassertionpunctuator)
- [isNotOpeningBraceToken](src_utils_ast.md#isnotopeningbracetoken)
- [isNotOpeningBracketToken](src_utils_ast.md#isnotopeningbrackettoken)
- [isNotOpeningParenToken](src_utils_ast.md#isnotopeningparentoken)
- [isNotOptionalChainPunctuator](src_utils_ast.md#isnotoptionalchainpunctuator)
- [isNotSemicolonToken](src_utils_ast.md#isnotsemicolontoken)
- [isNotTokenOfTypeWithConditions](src_utils_ast.md#isnottokenoftypewithconditions)
- [isOneOf](src_utils_ast.md#isoneof)
- [isOpeningBraceToken](src_utils_ast.md#isopeningbracetoken)
- [isOpeningBracketToken](src_utils_ast.md#isopeningbrackettoken)
- [isOpeningParenToken](src_utils_ast.md#isopeningparentoken)
- [isOptionalCallExpression](src_utils_ast.md#isoptionalcallexpression)
- [isOptionalChainPunctuator](src_utils_ast.md#isoptionalchainpunctuator)
- [isParenthesized](src_utils_ast.md#isparenthesized)
- [isPossibleNamedReactComponent](src_utils_ast.md#ispossiblenamedreactcomponent)
- [isPropertyOfObjectExpression](src_utils_ast.md#ispropertyofobjectexpression)
- [isPropertyWithIdentifierKey](src_utils_ast.md#ispropertywithidentifierkey)
- [isSemicolonToken](src_utils_ast.md#issemicolontoken)
- [isSetter](src_utils_ast.md#issetter)
- [isStringLiteral](src_utils_ast.md#isstringliteral)
- [isTSConstructorType](src_utils_ast.md#istsconstructortype)
- [isTSFunctionType](src_utils_ast.md#istsfunctiontype)
- [isTokenOfTypeWithConditions](src_utils_ast.md#istokenoftypewithconditions)
- [isTokenOnSameLine](src_utils_ast.md#istokenonsameline)
- [isTypeAssertion](src_utils_ast.md#istypeassertion)
- [isTypeKeyword](src_utils_ast.md#istypekeyword)
- [isValidReactComponentName](src_utils_ast.md#isvalidreactcomponentname)
- [isValidReactHookName](src_utils_ast.md#isvalidreacthookname)
- [isVariableDeclarator](src_utils_ast.md#isvariabledeclarator)
- [mapKeyNodeToText](src_utils_ast.md#mapkeynodetotext)
- [traverseUpOnly](src_utils_ast.md#traverseuponly)
- [traverseUpOnlyPredicate](src_utils_ast.md#traverseuponlypredicate)

## Type Aliases

### FunctionNode

Ƭ **FunctionNode**: `TSESTree.ArrowFunctionExpression` \| `TSESTree.FunctionDeclaration` \| `TSESTree.FunctionExpression`

#### Defined in

[src/utils/ast.ts:11](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L11)

## Variables

### LINEBREAK\_MATCHER

• `Const` **LINEBREAK\_MATCHER**: `RegExp`

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/misc.d.ts:2

___

### PatternMatcher

• **PatternMatcher**: (`pattern`: `RegExp`, `options?`: { `escaped?`: `boolean`  }) => [`PatternMatcher`](src_utils_ast.md#patternmatcher)

#### Type declaration

• **new PatternMatcher**(`pattern`, `options?`)

The class to find a pattern in strings as handling escape sequences.
It ignores the found pattern if it's escaped with ``.

##### Parameters

| Name | Type |
| :------ | :------ |
| `pattern` | `RegExp` |
| `options?` | `Object` |
| `options.escaped?` | `boolean` |

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#patternmatcher-class](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#patternmatcher-class)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.d.ts:1

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.d.ts:44

___

### ReferenceTracker

• **ReferenceTracker**: `ReferenceTrackerStatic`

The tracker for references. This provides reference tracking for global variables, CommonJS modules, and ES modules.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#referencetracker-class](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#referencetracker-class)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/ReferenceTracker.d.ts:7

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/ReferenceTracker.d.ts:48

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/ReferenceTracker.d.ts:74

## Functions

### findPropertyWithIdentifierKey

▸ **findPropertyWithIdentifierKey**(`properties`, `key`): `TSESTree.Property` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `ObjectLiteralElement`[] |
| `key` | `string` |

#### Returns

`TSESTree.Property` \| `undefined`

#### Defined in

[src/utils/ast.ts:90](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L90)

___

### findVariable

▸ **findVariable**(`initialScope`, `nameOrNode`): ``null`` \| `Variable`

Get the variable of a given name.

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialScope` | `Scope` |
| `nameOrNode` | `string` \| `Identifier` |

#### Returns

``null`` \| `Variable`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#findvariable](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#findvariable)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/scopeAnalysis.d.ts:8

___

### getExternalRefs

▸ **getExternalRefs**(`params`): `TSESLint.Scope.Reference`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.node` | `Node` |
| `params.scopeManager` | `ScopeManager` |
| `params.sourceCode` | `Readonly`<`SourceCode`\> |

#### Returns

`TSESLint.Scope.Reference`[]

#### Defined in

[src/utils/ast.ts:124](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L124)

___

### getFunctionAncestor

▸ **getFunctionAncestor**(`context`): `undefined` \| `Node`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`undefined` \| `Node`

#### Defined in

[src/utils/ast.ts:155](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L155)

___

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

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:8

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

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:14

___

### getInnermostScope

▸ **getInnermostScope**(`initialScope`, `node`): `Scope`

Get the innermost scope which contains a given node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialScope` | `Scope` |
| `node` | `Node` |

#### Returns

`Scope`

The innermost scope which contains the given node.
If such scope doesn't exist then it returns the 1st argument `initialScope`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#getinnermostscope](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#getinnermostscope)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/scopeAnalysis.d.ts:16

___

### getNestedIdentifiers

▸ **getNestedIdentifiers**(`node`): `Identifier`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`Identifier`[]

#### Defined in

[src/utils/ast.ts:173](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L173)

___

### getNestedReturnStatements

▸ **getNestedReturnStatements**(`node`): `ReturnStatement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`ReturnStatement`[]

#### Defined in

[src/utils/ast.ts:233](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L233)

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

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:22

___

### getReactComponentIdentifier

▸ **getReactComponentIdentifier**(`node`): `TSESTree.Identifier` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FunctionNode`](src_utils_ast.md#functionnode) |

#### Returns

`TSESTree.Identifier` \| ``null``

#### Defined in

[src/utils/ast.ts:296](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L296)

___

### getReferencedExpressionByIdentifier

▸ **getReferencedExpressionByIdentifier**(`params`): ``null`` \| `Expression`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |
| `params.node` | `Node` |

#### Returns

``null`` \| `Expression`

#### Defined in

[src/utils/ast.ts:312](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L312)

___

### getStaticValue

▸ **getStaticValue**(`node`, `initialScope?`): ``null`` \| { `value`: `unknown`  }

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

``null`` \| { `value`: `unknown`  }

The `{ value: any }` shaped object. The `value` property is the static value. If it couldn't compute the
static value of the node, it returns `null`.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#getstaticvalue)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:34

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

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:43

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

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:67

___

### is

▸ **is**<`NodeType`\>(`nodeType`): (`node`: `undefined` \| ``null`` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeType` | extends `AST_NODE_TYPES` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeType` | `NodeType` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

___

### isArrowToken

▸ **isArrowToken**(`token`): token is PunctuatorTokenWithValue<"=\>"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"=\>"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isAwaitExpression

▸ **isAwaitExpression**(`node`): node is AwaitExpression

Checks if a node represents an `await …` expression.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is AwaitExpression

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:49

___

### isAwaitKeyword

▸ **isAwaitKeyword**(`token`): token is Object & IdentifierToken

Checks if a possible token is the `await` keyword.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is Object & IdentifierToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:53

___

### isClassOrTypeElement

▸ **isClassOrTypeElement**(`node`): node is FunctionExpression \| MethodDefinitionComputedName \| MethodDefinitionNonComputedName \| PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSAbstractMethodDefinitionComputedName \| TSAbstractMethodDefinitionNonComputedName \| TSAbstractPropertyDefinitionComputedName \| TSAbstractPropertyDefinitionNonComputedName \| TSCallSignatureDeclaration \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSIndexSignature \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is FunctionExpression \| MethodDefinitionComputedName \| MethodDefinitionNonComputedName \| PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSAbstractMethodDefinitionComputedName \| TSAbstractMethodDefinitionNonComputedName \| TSAbstractPropertyDefinitionComputedName \| TSAbstractPropertyDefinitionNonComputedName \| TSCallSignatureDeclaration \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSIndexSignature \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:34

___

### isClosingBraceToken

▸ **isClosingBraceToken**(`token`): token is PunctuatorTokenWithValue<"}"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"}"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isClosingBracketToken

▸ **isClosingBracketToken**(`token`): token is PunctuatorTokenWithValue<"]"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"]"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isClosingParenToken

▸ **isClosingParenToken**(`token`): token is PunctuatorTokenWithValue<")"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<")"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isColonToken

▸ **isColonToken**(`token`): token is PunctuatorTokenWithValue<":"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<":"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isCommaToken

▸ **isCommaToken**(`token`): token is PunctuatorTokenWithValue<","\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<","\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isCommentToken

▸ **isCommentToken**(`token`): token is Comment

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is Comment

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isConstructor

▸ **isConstructor**(`node`): node is Partial<MethodDefinitionComputedName\> & MethodDefinitionComputedName \| Partial<MethodDefinitionNonComputedName\> & MethodDefinitionNonComputedName

Checks if a node is a constructor method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is Partial<MethodDefinitionComputedName\> & MethodDefinitionComputedName \| Partial<MethodDefinitionNonComputedName\> & MethodDefinitionNonComputedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:38

___

### isDeclaredInNode

▸ **isDeclaredInNode**(`params`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.functionNode` | `Node` |
| `params.reference` | `Reference` |
| `params.scopeManager` | `ScopeManager` |

#### Returns

`boolean`

#### Defined in

[src/utils/ast.ts:22](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L22)

___

### isDestructorParameter

▸ **isDestructorParameter**(`node`): node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Parameter` |

#### Returns

node is ArrayPattern \| AssignmentPattern \| ObjectPattern \| RestElement

#### Defined in

[src/utils/ast.ts:36](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L36)

___

### isFunction

▸ **isFunction**(`node`): node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:29

___

### isFunctionNode

▸ **isFunctionNode**(`node`): node is FunctionNode

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is FunctionNode

#### Defined in

[src/utils/ast.ts:47](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L47)

___

### isFunctionOrFunctionType

▸ **isFunctionOrFunctionType**(`node`): node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression \| TSCallSignatureDeclaration \| TSConstructorType \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression \| TSCallSignatureDeclaration \| TSConstructorType \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:31

___

### isFunctionType

▸ **isFunctionType**(`node`): node is TSCallSignatureDeclaration \| TSConstructorType \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is TSCallSignatureDeclaration \| TSConstructorType \| TSConstructSignatureDeclaration \| TSEmptyBodyFunctionExpression \| TSFunctionType \| TSMethodSignatureComputedName \| TSMethodSignatureNonComputedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:30

___

### isIdentifier

▸ **isIdentifier**(`node`): node is Identifier

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is Identifier

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:45

___

### isIdentifierWithName

▸ **isIdentifierWithName**(`node`, `name`): node is Identifier

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `name` | `string` |

#### Returns

node is Identifier

#### Defined in

[src/utils/ast.ts:55](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L55)

___

### isIdentifierWithOneOfNames

▸ **isIdentifierWithOneOfNames**<`T`\>(`node`, `name`): node is Identifier & Object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `name` | `T` |

#### Returns

node is Identifier & Object

#### Defined in

[src/utils/ast.ts:59](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L59)

___

### isImportKeyword

▸ **isImportKeyword**(`token`): token is Object & KeywordToken

Checks if a possible token is the `import` keyword.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is Object & KeywordToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:65

___

### isLogicalOrOperator

▸ **isLogicalOrOperator**(`node`): node is Partial<LogicalExpression\> & LogicalExpression

Returns true if and only if the node represents logical OR

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is Partial<LogicalExpression\> & LogicalExpression

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:19

___

### isLoop

▸ **isLoop**(`node`): node is DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| WhileStatement

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| WhileStatement

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:68

___

### isNodeOfType

▸ **isNodeOfType**<`NodeType`\>(`nodeType`): (`node`: `undefined` \| ``null`` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeType` | extends `AST_NODE_TYPES` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeType` | `NodeType` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

___

### isNodeOfTypeWithConditions

▸ **isNodeOfTypeWithConditions**<`NodeType`, `ExtractedNode`, `Conditions`\>(`nodeType`, `conditions`): (`node`: `undefined` \| ``null`` \| `Node`) => node is Conditions & ExtractedNode

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeType` | extends `AST_NODE_TYPES` |
| `ExtractedNode` | extends { `type`: `NodeType`  } & `AccessorPropertyComputedName` \| { `type`: `NodeType`  } & `AccessorPropertyNonComputedName` \| { `type`: `NodeType`  } & `ArrayExpression` \| { `type`: `NodeType`  } & `ArrayPattern` \| { `type`: `NodeType`  } & `ArrowFunctionExpression` \| { `type`: `NodeType`  } & `AssignmentExpression` \| { `type`: `NodeType`  } & `AssignmentPattern` \| { `type`: `NodeType`  } & `AwaitExpression` \| { `type`: `NodeType`  } & `BinaryExpression` \| { `type`: `NodeType`  } & `BlockStatement` \| { `type`: `NodeType`  } & `BreakStatement` \| { `type`: `NodeType`  } & `CallExpression` \| { `type`: `NodeType`  } & `CatchClause` \| { `type`: `NodeType`  } & `ChainExpression` \| { `type`: `NodeType`  } & `ClassBody` \| { `type`: `NodeType`  } & `ClassDeclarationWithName` \| { `type`: `NodeType`  } & `ClassDeclarationWithOptionalName` \| { `type`: `NodeType`  } & `ClassExpression` \| { `type`: `NodeType`  } & `ConditionalExpression` \| { `type`: `NodeType`  } & `ContinueStatement` \| { `type`: `NodeType`  } & `DebuggerStatement` \| { `type`: `NodeType`  } & `Decorator` \| { `type`: `NodeType`  } & `DoWhileStatement` \| { `type`: `NodeType`  } & `EmptyStatement` \| { `type`: `NodeType`  } & `ExportAllDeclaration` \| { `type`: `NodeType`  } & `ExportDefaultDeclaration` \| { `type`: `NodeType`  } & `ExportNamedDeclarationWithoutSourceWithMultiple` \| { `type`: `NodeType`  } & `ExportNamedDeclarationWithoutSourceWithSingle` \| { `type`: `NodeType`  } & `ExportNamedDeclarationWithSource` \| { `type`: `NodeType`  } & `ExportSpecifier` \| { `type`: `NodeType`  } & `ExpressionStatement` \| { `type`: `NodeType`  } & `ForInStatement` \| { `type`: `NodeType`  } & `ForOfStatement` \| { `type`: `NodeType`  } & `ForStatement` \| { `type`: `NodeType`  } & `FunctionDeclarationWithName` \| { `type`: `NodeType`  } & `FunctionDeclarationWithOptionalName` \| { `type`: `NodeType`  } & `FunctionExpression` \| { `type`: `NodeType`  } & `Identifier` \| { `type`: `NodeType`  } & `IfStatement` \| { `type`: `NodeType`  } & `ImportAttribute` \| { `type`: `NodeType`  } & `ImportDeclaration` \| { `type`: `NodeType`  } & `ImportDefaultSpecifier` \| { `type`: `NodeType`  } & `ImportExpression` \| { `type`: `NodeType`  } & `ImportNamespaceSpecifier` \| { `type`: `NodeType`  } & `ImportSpecifier` \| { `type`: `NodeType`  } & `JSXAttribute` \| { `type`: `NodeType`  } & `JSXClosingElement` \| { `type`: `NodeType`  } & `JSXClosingFragment` \| { `type`: `NodeType`  } & `JSXElement` \| { `type`: `NodeType`  } & `JSXEmptyExpression` \| { `type`: `NodeType`  } & `JSXExpressionContainer` \| { `type`: `NodeType`  } & `JSXFragment` \| { `type`: `NodeType`  } & `JSXIdentifier` \| { `type`: `NodeType`  } & `JSXMemberExpression` \| { `type`: `NodeType`  } & `JSXNamespacedName` \| { `type`: `NodeType`  } & `JSXOpeningElement` \| { `type`: `NodeType`  } & `JSXOpeningFragment` \| { `type`: `NodeType`  } & `JSXSpreadAttribute` \| { `type`: `NodeType`  } & `JSXSpreadChild` \| { `type`: `NodeType`  } & `JSXText` \| { `type`: `NodeType`  } & `LabeledStatement` \| { `type`: `NodeType`  } & `BigIntLiteral` \| { `type`: `NodeType`  } & `BooleanLiteral` \| { `type`: `NodeType`  } & `NullLiteral` \| { `type`: `NodeType`  } & `NumberLiteral` \| { `type`: `NodeType`  } & `RegExpLiteral` \| { `type`: `NodeType`  } & `StringLiteral` \| { `type`: `NodeType`  } & `LogicalExpression` \| { `type`: `NodeType`  } & `MemberExpressionComputedName` \| { `type`: `NodeType`  } & `MemberExpressionNonComputedName` \| { `type`: `NodeType`  } & `MetaProperty` \| { `type`: `NodeType`  } & `MethodDefinitionComputedName` \| { `type`: `NodeType`  } & `MethodDefinitionNonComputedName` \| { `type`: `NodeType`  } & `NewExpression` \| { `type`: `NodeType`  } & `ObjectExpression` \| { `type`: `NodeType`  } & `ObjectPattern` \| { `type`: `NodeType`  } & `PrivateIdentifier` \| { `type`: `NodeType`  } & `Program` \| { `type`: `NodeType`  } & `PropertyComputedName` \| { `type`: `NodeType`  } & `PropertyNonComputedName` \| { `type`: `NodeType`  } & `PropertyDefinitionComputedName` \| { `type`: `NodeType`  } & `PropertyDefinitionNonComputedName` \| { `type`: `NodeType`  } & `RestElement` \| { `type`: `NodeType`  } & `ReturnStatement` \| { `type`: `NodeType`  } & `SequenceExpression` \| { `type`: `NodeType`  } & `SpreadElement` \| { `type`: `NodeType`  } & `StaticBlock` \| { `type`: `NodeType`  } & `Super` \| { `type`: `NodeType`  } & `SwitchCase` \| { `type`: `NodeType`  } & `SwitchStatement` \| { `type`: `NodeType`  } & `TaggedTemplateExpression` \| { `type`: `NodeType`  } & `TemplateElement` \| { `type`: `NodeType`  } & `TemplateLiteral` \| { `type`: `NodeType`  } & `ThisExpression` \| { `type`: `NodeType`  } & `ThrowStatement` \| { `type`: `NodeType`  } & `TryStatement` \| { `type`: `NodeType`  } & `TSAbstractAccessorPropertyComputedName` \| { `type`: `NodeType`  } & `TSAbstractAccessorPropertyNonComputedName` \| { `type`: `NodeType`  } & `TSAbstractKeyword` \| { `type`: `NodeType`  } & `TSAbstractMethodDefinitionComputedName` \| { `type`: `NodeType`  } & `TSAbstractMethodDefinitionNonComputedName` \| { `type`: `NodeType`  } & `TSAbstractPropertyDefinitionComputedName` \| { `type`: `NodeType`  } & `TSAbstractPropertyDefinitionNonComputedName` \| { `type`: `NodeType`  } & `TSAnyKeyword` \| { `type`: `NodeType`  } & `TSArrayType` \| { `type`: `NodeType`  } & `TSAsExpression` \| { `type`: `NodeType`  } & `TSAsyncKeyword` \| { `type`: `NodeType`  } & `TSBigIntKeyword` \| { `type`: `NodeType`  } & `TSBooleanKeyword` \| { `type`: `NodeType`  } & `TSCallSignatureDeclaration` \| { `type`: `NodeType`  } & `TSClassImplements` \| { `type`: `NodeType`  } & `TSConditionalType` \| { `type`: `NodeType`  } & `TSConstructorType` \| { `type`: `NodeType`  } & `TSConstructSignatureDeclaration` \| { `type`: `NodeType`  } & `TSDeclareFunction` \| { `type`: `NodeType`  } & `TSDeclareKeyword` \| { `type`: `NodeType`  } & `TSEmptyBodyFunctionExpression` \| { `type`: `NodeType`  } & `TSEnumDeclaration` \| { `type`: `NodeType`  } & `TSEnumMemberComputedName` \| { `type`: `NodeType`  } & `TSEnumMemberNonComputedName` \| { `type`: `NodeType`  } & `TSExportAssignment` \| { `type`: `NodeType`  } & `TSExportKeyword` \| { `type`: `NodeType`  } & `TSExternalModuleReference` \| { `type`: `NodeType`  } & `TSFunctionType` \| { `type`: `NodeType`  } & `TSImportEqualsDeclaration` \| { `type`: `NodeType`  } & `TSImportType` \| { `type`: `NodeType`  } & `TSIndexedAccessType` \| { `type`: `NodeType`  } & `TSIndexSignature` \| { `type`: `NodeType`  } & `TSInferType` \| { `type`: `NodeType`  } & `TSInstantiationExpression` \| { `type`: `NodeType`  } & `TSInterfaceBody` \| { `type`: `NodeType`  } & `TSInterfaceDeclaration` \| { `type`: `NodeType`  } & `TSInterfaceHeritage` \| { `type`: `NodeType`  } & `TSIntersectionType` \| { `type`: `NodeType`  } & `TSIntrinsicKeyword` \| { `type`: `NodeType`  } & `TSLiteralType` \| { `type`: `NodeType`  } & `TSMappedType` \| { `type`: `NodeType`  } & `TSMethodSignatureComputedName` \| { `type`: `NodeType`  } & `TSMethodSignatureNonComputedName` \| { `type`: `NodeType`  } & `TSModuleBlock` \| { `type`: `NodeType`  } & `TSModuleDeclarationGlobal` \| { `type`: `NodeType`  } & `TSModuleDeclarationModuleWithIdentifierId` \| { `type`: `NodeType`  } & `TSModuleDeclarationModuleWithStringIdDeclared` \| { `type`: `NodeType`  } & `TSModuleDeclarationModuleWithStringIdNotDeclared` \| { `type`: `NodeType`  } & `TSModuleDeclarationNamespace` \| { `type`: `NodeType`  } & `TSNamedTupleMember` \| { `type`: `NodeType`  } & `TSNamespaceExportDeclaration` \| { `type`: `NodeType`  } & `TSNeverKeyword` \| { `type`: `NodeType`  } & `TSNonNullExpression` \| { `type`: `NodeType`  } & `TSNullKeyword` \| { `type`: `NodeType`  } & `TSNumberKeyword` \| { `type`: `NodeType`  } & `TSObjectKeyword` \| { `type`: `NodeType`  } & `TSOptionalType` \| { `type`: `NodeType`  } & `TSParameterProperty` \| { `type`: `NodeType`  } & `TSPrivateKeyword` \| { `type`: `NodeType`  } & `TSPropertySignatureComputedName` \| { `type`: `NodeType`  } & `TSPropertySignatureNonComputedName` \| { `type`: `NodeType`  } & `TSProtectedKeyword` \| { `type`: `NodeType`  } & `TSPublicKeyword` \| { `type`: `NodeType`  } & `TSQualifiedName` \| { `type`: `NodeType`  } & `TSReadonlyKeyword` \| { `type`: `NodeType`  } & `TSRestType` \| { `type`: `NodeType`  } & `TSSatisfiesExpression` \| { `type`: `NodeType`  } & `TSStaticKeyword` \| { `type`: `NodeType`  } & `TSStringKeyword` \| { `type`: `NodeType`  } & `TSSymbolKeyword` \| { `type`: `NodeType`  } & `TSTemplateLiteralType` \| { `type`: `NodeType`  } & `TSThisType` \| { `type`: `NodeType`  } & `TSTupleType` \| { `type`: `NodeType`  } & `TSTypeAliasDeclaration` \| { `type`: `NodeType`  } & `TSTypeAnnotation` \| { `type`: `NodeType`  } & `TSTypeAssertion` \| { `type`: `NodeType`  } & `TSTypeLiteral` \| { `type`: `NodeType`  } & `TSTypeOperator` \| { `type`: `NodeType`  } & `TSTypeParameter` \| { `type`: `NodeType`  } & `TSTypeParameterDeclaration` \| { `type`: `NodeType`  } & `TSTypeParameterInstantiation` \| { `type`: `NodeType`  } & `TSTypePredicate` \| { `type`: `NodeType`  } & `TSTypeQuery` \| { `type`: `NodeType`  } & `TSTypeReference` \| { `type`: `NodeType`  } & `TSUndefinedKeyword` \| { `type`: `NodeType`  } & `TSUnionType` \| { `type`: `NodeType`  } & `TSUnknownKeyword` \| { `type`: `NodeType`  } & `TSVoidKeyword` \| { `type`: `NodeType`  } & `UnaryExpression` \| { `type`: `NodeType`  } & `UpdateExpression` \| { `type`: `NodeType`  } & `LetOrConstOrVarDeclaration` \| { `type`: `NodeType`  } & `UsingInForOfDeclaration` \| { `type`: `NodeType`  } & `UsingInNomalConextDeclaration` \| { `type`: `NodeType`  } & `LetOrConstOrVarDeclarator` \| { `type`: `NodeType`  } & `UsingInForOfDeclarator` \| { `type`: `NodeType`  } & `UsingInNomalConextDeclarator` \| { `type`: `NodeType`  } & `WhileStatement` \| { `type`: `NodeType`  } & `WithStatement` \| { `type`: `NodeType`  } & `YieldExpression` |
| `Conditions` | extends `Partial`<`ExtractedNode`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeType` | `NodeType` |
| `conditions` | `Conditions` |

#### Returns

`fn`

▸ (`node`): node is Conditions & ExtractedNode

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

##### Returns

node is Conditions & ExtractedNode

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:784

___

### isNodeOfTypes

▸ **isNodeOfTypes**<`NodeTypes`\>(`nodeTypes`): (`node`: `undefined` \| ``null`` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeTypes` | extends readonly `AST_NODE_TYPES`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeTypes` | `NodeTypes` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:393

___

### isNonNullAssertionPunctuator

▸ **isNonNullAssertionPunctuator**(`token`): token is Object & PunctuatorToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is Object & PunctuatorToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:6

___

### isNotArrowToken

▸ **isNotArrowToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotClosingBraceToken

▸ **isNotClosingBraceToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotClosingBracketToken

▸ **isNotClosingBracketToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotClosingParenToken

▸ **isNotClosingParenToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotColonToken

▸ **isNotColonToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotCommaToken

▸ **isNotCommaToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotCommentToken

▸ **isNotCommentToken**(`token`): token is BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotNonNullAssertionPunctuator

▸ **isNotNonNullAssertionPunctuator**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:9

___

### isNotOpeningBraceToken

▸ **isNotOpeningBraceToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotOpeningBracketToken

▸ **isNotOpeningBracketToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotOpeningParenToken

▸ **isNotOpeningParenToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotOptionalChainPunctuator

▸ **isNotOptionalChainPunctuator**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:5

___

### isNotSemicolonToken

▸ **isNotSemicolonToken**(`token`): token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is BlockComment \| LineComment \| BooleanToken \| IdentifierToken \| JSXIdentifierToken \| JSXTextToken \| KeywordToken \| NullToken \| NumericToken \| PunctuatorToken \| RegularExpressionToken \| StringToken \| TemplateToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:3

___

### isNotTokenOfTypeWithConditions

▸ **isNotTokenOfTypeWithConditions**<`TokenType`, `ExtractedToken`, `Conditions`\>(`tokenType`, `conditions`): (`token`: `undefined` \| ``null`` \| `Token`) => token is Exclude<BooleanToken, Conditions & ExtractedToken\> \| Exclude<BlockComment, Conditions & ExtractedToken\> \| Exclude<LineComment, Conditions & ExtractedToken\> \| Exclude<IdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXIdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXTextToken, Conditions & ExtractedToken\> \| Exclude<KeywordToken, Conditions & ExtractedToken\> \| Exclude<NullToken, Conditions & ExtractedToken\> \| Exclude<NumericToken, Conditions & ExtractedToken\> \| Exclude<PunctuatorToken, Conditions & ExtractedToken\> \| Exclude<RegularExpressionToken, Conditions & ExtractedToken\> \| Exclude<StringToken, Conditions & ExtractedToken\> \| Exclude<TemplateToken, Conditions & ExtractedToken\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TokenType` | extends `AST_TOKEN_TYPES` |
| `ExtractedToken` | extends { `type`: `TokenType`  } & `BooleanToken` \| { `type`: `TokenType`  } & `BlockComment` \| { `type`: `TokenType`  } & `LineComment` \| { `type`: `TokenType`  } & `IdentifierToken` \| { `type`: `TokenType`  } & `JSXIdentifierToken` \| { `type`: `TokenType`  } & `JSXTextToken` \| { `type`: `TokenType`  } & `KeywordToken` \| { `type`: `TokenType`  } & `NullToken` \| { `type`: `TokenType`  } & `NumericToken` \| { `type`: `TokenType`  } & `PunctuatorToken` \| { `type`: `TokenType`  } & `RegularExpressionToken` \| { `type`: `TokenType`  } & `StringToken` \| { `type`: `TokenType`  } & `TemplateToken` |
| `Conditions` | extends `Partial`<`ExtractedToken`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenType` | `TokenType` |
| `conditions` | `Conditions` |

#### Returns

`fn`

▸ (`token`): token is Exclude<BooleanToken, Conditions & ExtractedToken\> \| Exclude<BlockComment, Conditions & ExtractedToken\> \| Exclude<LineComment, Conditions & ExtractedToken\> \| Exclude<IdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXIdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXTextToken, Conditions & ExtractedToken\> \| Exclude<KeywordToken, Conditions & ExtractedToken\> \| Exclude<NullToken, Conditions & ExtractedToken\> \| Exclude<NumericToken, Conditions & ExtractedToken\> \| Exclude<PunctuatorToken, Conditions & ExtractedToken\> \| Exclude<RegularExpressionToken, Conditions & ExtractedToken\> \| Exclude<StringToken, Conditions & ExtractedToken\> \| Exclude<TemplateToken, Conditions & ExtractedToken\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

##### Returns

token is Exclude<BooleanToken, Conditions & ExtractedToken\> \| Exclude<BlockComment, Conditions & ExtractedToken\> \| Exclude<LineComment, Conditions & ExtractedToken\> \| Exclude<IdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXIdentifierToken, Conditions & ExtractedToken\> \| Exclude<JSXTextToken, Conditions & ExtractedToken\> \| Exclude<KeywordToken, Conditions & ExtractedToken\> \| Exclude<NullToken, Conditions & ExtractedToken\> \| Exclude<NumericToken, Conditions & ExtractedToken\> \| Exclude<PunctuatorToken, Conditions & ExtractedToken\> \| Exclude<RegularExpressionToken, Conditions & ExtractedToken\> \| Exclude<StringToken, Conditions & ExtractedToken\> \| Exclude<TemplateToken, Conditions & ExtractedToken\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:1204

___

### isOneOf

▸ **isOneOf**<`NodeTypes`\>(`nodeTypes`): (`node`: `undefined` \| ``null`` \| `Node`) => node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeTypes` | extends readonly `AST_NODE_TYPES`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeTypes` | `NodeTypes` |

#### Returns

`fn`

▸ (`node`): node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

##### Returns

node is Extract<AccessorPropertyComputedName, Object\> \| Extract<AccessorPropertyNonComputedName, Object\> \| Extract<ArrayExpression, Object\> \| Extract<ArrayPattern, Object\> \| Extract<ArrowFunctionExpression, Object\> \| Extract<AssignmentExpression, Object\> \| Extract<AssignmentPattern, Object\> \| Extract<AwaitExpression, Object\> \| Extract<BinaryExpression, Object\> \| Extract<BlockStatement, Object\> \| Extract<BreakStatement, Object\> \| Extract<CallExpression, Object\> \| Extract<CatchClause, Object\> \| Extract<ChainExpression, Object\> \| Extract<ClassBody, Object\> \| Extract<ClassDeclarationWithName, Object\> \| Extract<ClassDeclarationWithOptionalName, Object\> \| Extract<ClassExpression, Object\> \| Extract<ConditionalExpression, Object\> \| Extract<ContinueStatement, Object\> \| Extract<DebuggerStatement, Object\> \| Extract<Decorator, Object\> \| Extract<DoWhileStatement, Object\> \| Extract<EmptyStatement, Object\> \| Extract<ExportAllDeclaration, Object\> \| Extract<ExportDefaultDeclaration, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithMultiple, Object\> \| Extract<ExportNamedDeclarationWithoutSourceWithSingle, Object\> \| Extract<ExportNamedDeclarationWithSource, Object\> \| Extract<ExportSpecifier, Object\> \| Extract<ExpressionStatement, Object\> \| Extract<ForInStatement, Object\> \| Extract<ForOfStatement, Object\> \| Extract<ForStatement, Object\> \| Extract<FunctionDeclarationWithName, Object\> \| Extract<FunctionDeclarationWithOptionalName, Object\> \| Extract<FunctionExpression, Object\> \| Extract<Identifier, Object\> \| Extract<IfStatement, Object\> \| Extract<ImportAttribute, Object\> \| Extract<ImportDeclaration, Object\> \| Extract<ImportDefaultSpecifier, Object\> \| Extract<ImportExpression, Object\> \| Extract<ImportNamespaceSpecifier, Object\> \| Extract<ImportSpecifier, Object\> \| Extract<JSXAttribute, Object\> \| Extract<JSXClosingElement, Object\> \| Extract<JSXClosingFragment, Object\> \| Extract<JSXElement, Object\> \| Extract<JSXEmptyExpression, Object\> \| Extract<JSXExpressionContainer, Object\> \| Extract<JSXFragment, Object\> \| Extract<JSXIdentifier, Object\> \| Extract<JSXMemberExpression, Object\> \| Extract<JSXNamespacedName, Object\> \| Extract<JSXOpeningElement, Object\> \| Extract<JSXOpeningFragment, Object\> \| Extract<JSXSpreadAttribute, Object\> \| Extract<JSXSpreadChild, Object\> \| Extract<JSXText, Object\> \| Extract<LabeledStatement, Object\> \| Extract<BigIntLiteral, Object\> \| Extract<BooleanLiteral, Object\> \| Extract<NullLiteral, Object\> \| Extract<NumberLiteral, Object\> \| Extract<RegExpLiteral, Object\> \| Extract<StringLiteral, Object\> \| Extract<LogicalExpression, Object\> \| Extract<MemberExpressionComputedName, Object\> \| Extract<MemberExpressionNonComputedName, Object\> \| Extract<MetaProperty, Object\> \| Extract<MethodDefinitionComputedName, Object\> \| Extract<MethodDefinitionNonComputedName, Object\> \| Extract<NewExpression, Object\> \| Extract<ObjectExpression, Object\> \| Extract<ObjectPattern, Object\> \| Extract<PrivateIdentifier, Object\> \| Extract<Program, Object\> \| Extract<PropertyComputedName, Object\> \| Extract<PropertyNonComputedName, Object\> \| Extract<PropertyDefinitionComputedName, Object\> \| Extract<PropertyDefinitionNonComputedName, Object\> \| Extract<RestElement, Object\> \| Extract<ReturnStatement, Object\> \| Extract<SequenceExpression, Object\> \| Extract<SpreadElement, Object\> \| Extract<StaticBlock, Object\> \| Extract<Super, Object\> \| Extract<SwitchCase, Object\> \| Extract<SwitchStatement, Object\> \| Extract<TaggedTemplateExpression, Object\> \| Extract<TemplateElement, Object\> \| Extract<TemplateLiteral, Object\> \| Extract<ThisExpression, Object\> \| Extract<ThrowStatement, Object\> \| Extract<TryStatement, Object\> \| Extract<TSAbstractAccessorPropertyComputedName, Object\> \| Extract<TSAbstractAccessorPropertyNonComputedName, Object\> \| Extract<TSAbstractKeyword, Object\> \| Extract<TSAbstractMethodDefinitionComputedName, Object\> \| Extract<TSAbstractMethodDefinitionNonComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionComputedName, Object\> \| Extract<TSAbstractPropertyDefinitionNonComputedName, Object\> \| Extract<TSAnyKeyword, Object\> \| Extract<TSArrayType, Object\> \| Extract<TSAsExpression, Object\> \| Extract<TSAsyncKeyword, Object\> \| Extract<TSBigIntKeyword, Object\> \| Extract<TSBooleanKeyword, Object\> \| Extract<TSCallSignatureDeclaration, Object\> \| Extract<TSClassImplements, Object\> \| Extract<TSConditionalType, Object\> \| Extract<TSConstructorType, Object\> \| Extract<TSConstructSignatureDeclaration, Object\> \| Extract<TSDeclareFunction, Object\> \| Extract<TSDeclareKeyword, Object\> \| Extract<TSEmptyBodyFunctionExpression, Object\> \| Extract<TSEnumDeclaration, Object\> \| Extract<TSEnumMemberComputedName, Object\> \| Extract<TSEnumMemberNonComputedName, Object\> \| Extract<TSExportAssignment, Object\> \| Extract<TSExportKeyword, Object\> \| Extract<TSExternalModuleReference, Object\> \| Extract<TSFunctionType, Object\> \| Extract<TSImportEqualsDeclaration, Object\> \| Extract<TSImportType, Object\> \| Extract<TSIndexedAccessType, Object\> \| Extract<TSIndexSignature, Object\> \| Extract<TSInferType, Object\> \| Extract<TSInstantiationExpression, Object\> \| Extract<TSInterfaceBody, Object\> \| Extract<TSInterfaceDeclaration, Object\> \| Extract<TSInterfaceHeritage, Object\> \| Extract<TSIntersectionType, Object\> \| Extract<TSIntrinsicKeyword, Object\> \| Extract<TSLiteralType, Object\> \| Extract<TSMappedType, Object\> \| Extract<TSMethodSignatureComputedName, Object\> \| Extract<TSMethodSignatureNonComputedName, Object\> \| Extract<TSModuleBlock, Object\> \| Extract<TSModuleDeclarationGlobal, Object\> \| Extract<TSModuleDeclarationModuleWithIdentifierId, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdDeclared, Object\> \| Extract<TSModuleDeclarationModuleWithStringIdNotDeclared, Object\> \| Extract<TSModuleDeclarationNamespace, Object\> \| Extract<TSNamedTupleMember, Object\> \| Extract<TSNamespaceExportDeclaration, Object\> \| Extract<TSNeverKeyword, Object\> \| Extract<TSNonNullExpression, Object\> \| Extract<TSNullKeyword, Object\> \| Extract<TSNumberKeyword, Object\> \| Extract<TSObjectKeyword, Object\> \| Extract<TSOptionalType, Object\> \| Extract<TSParameterProperty, Object\> \| Extract<TSPrivateKeyword, Object\> \| Extract<TSPropertySignatureComputedName, Object\> \| Extract<TSPropertySignatureNonComputedName, Object\> \| Extract<TSProtectedKeyword, Object\> \| Extract<TSPublicKeyword, Object\> \| Extract<TSQualifiedName, Object\> \| Extract<TSReadonlyKeyword, Object\> \| Extract<TSRestType, Object\> \| Extract<TSSatisfiesExpression, Object\> \| Extract<TSStaticKeyword, Object\> \| Extract<TSStringKeyword, Object\> \| Extract<TSSymbolKeyword, Object\> \| Extract<TSTemplateLiteralType, Object\> \| Extract<TSThisType, Object\> \| Extract<TSTupleType, Object\> \| Extract<TSTypeAliasDeclaration, Object\> \| Extract<TSTypeAnnotation, Object\> \| Extract<TSTypeAssertion, Object\> \| Extract<TSTypeLiteral, Object\> \| Extract<TSTypeOperator, Object\> \| Extract<TSTypeParameter, Object\> \| Extract<TSTypeParameterDeclaration, Object\> \| Extract<TSTypeParameterInstantiation, Object\> \| Extract<TSTypePredicate, Object\> \| Extract<TSTypeQuery, Object\> \| Extract<TSTypeReference, Object\> \| Extract<TSUndefinedKeyword, Object\> \| Extract<TSUnionType, Object\> \| Extract<TSUnknownKeyword, Object\> \| Extract<TSVoidKeyword, Object\> \| Extract<UnaryExpression, Object\> \| Extract<UpdateExpression, Object\> \| Extract<LetOrConstOrVarDeclaration, Object\> \| Extract<UsingInForOfDeclaration, Object\> \| Extract<UsingInNomalConextDeclaration, Object\> \| Extract<LetOrConstOrVarDeclarator, Object\> \| Extract<UsingInForOfDeclarator, Object\> \| Extract<UsingInNomalConextDeclarator, Object\> \| Extract<WhileStatement, Object\> \| Extract<WithStatement, Object\> \| Extract<YieldExpression, Object\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:393

___

### isOpeningBraceToken

▸ **isOpeningBraceToken**(`token`): token is PunctuatorTokenWithValue<"{"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"{"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isOpeningBracketToken

▸ **isOpeningBracketToken**(`token`): token is PunctuatorTokenWithValue<"["\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"["\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isOpeningParenToken

▸ **isOpeningParenToken**(`token`): token is PunctuatorTokenWithValue<"("\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<"("\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isOptionalCallExpression

▸ **isOptionalCallExpression**(`node`): node is Object & CallExpression

Returns true if and only if the node represents: foo?.() or foo.bar?.()

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is Object & CallExpression

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:13

___

### isOptionalChainPunctuator

▸ **isOptionalChainPunctuator**(`token`): token is Object & PunctuatorToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is Object & PunctuatorToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:2

___

### isParenthesized

▸ **isParenthesized**(`node`, `sourceCode`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `sourceCode` | `SourceCode` |

#### Returns

`boolean`

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:72

▸ **isParenthesized**(`times`, `node`, `sourceCode`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `times` | `number` |
| `node` | `Node` |
| `sourceCode` | `SourceCode` |

#### Returns

`boolean`

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.d.ts:73

___

### isPossibleNamedReactComponent

▸ **isPossibleNamedReactComponent**(`node`): node is FunctionNode

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is FunctionNode

#### Defined in

[src/utils/ast.ts:78](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L78)

___

### isPropertyOfObjectExpression

▸ **isPropertyOfObjectExpression**(`node`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[src/utils/ast.ts:82](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L82)

___

### isPropertyWithIdentifierKey

▸ **isPropertyWithIdentifierKey**(`node`, `key`): node is Property

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `key` | `string` |

#### Returns

node is Property

#### Defined in

[src/utils/ast.ts:86](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L86)

___

### isSemicolonToken

▸ **isSemicolonToken**(`token`): token is PunctuatorTokenWithValue<";"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |

#### Returns

token is PunctuatorTokenWithValue<";"\>

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.d.ts:2

___

### isSetter

▸ **isSetter**(`node`): node is Object

Checks if a node is a setter method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| `Node` |

#### Returns

node is Object

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:42

___

### isStringLiteral

▸ **isStringLiteral**(`node`): node is StringLiteral

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is StringLiteral

#### Defined in

[src/utils/ast.ts:66](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L66)

___

### isTSConstructorType

▸ **isTSConstructorType**(`node`): node is TSConstructorType

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is TSConstructorType

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:33

___

### isTSFunctionType

▸ **isTSFunctionType**(`node`): node is TSFunctionType

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is TSFunctionType

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:32

___

### isTokenOfTypeWithConditions

▸ **isTokenOfTypeWithConditions**<`TokenType`, `ExtractedToken`, `Conditions`\>(`tokenType`, `conditions`): (`token`: `undefined` \| ``null`` \| `Token`) => token is Conditions & ExtractedToken

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TokenType` | extends `AST_TOKEN_TYPES` |
| `ExtractedToken` | extends { `type`: `TokenType`  } & `BooleanToken` \| { `type`: `TokenType`  } & `BlockComment` \| { `type`: `TokenType`  } & `LineComment` \| { `type`: `TokenType`  } & `IdentifierToken` \| { `type`: `TokenType`  } & `JSXIdentifierToken` \| { `type`: `TokenType`  } & `JSXTextToken` \| { `type`: `TokenType`  } & `KeywordToken` \| { `type`: `TokenType`  } & `NullToken` \| { `type`: `TokenType`  } & `NumericToken` \| { `type`: `TokenType`  } & `PunctuatorToken` \| { `type`: `TokenType`  } & `RegularExpressionToken` \| { `type`: `TokenType`  } & `StringToken` \| { `type`: `TokenType`  } & `TemplateToken` |
| `Conditions` | extends `Partial`<`Object`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenType` | `TokenType` |
| `conditions` | `Conditions` |

#### Returns

`fn`

▸ (`token`): token is Conditions & ExtractedToken

##### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

##### Returns

token is Conditions & ExtractedToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:1175

___

### isTokenOnSameLine

▸ **isTokenOnSameLine**(`left`, `right`): `boolean`

Determines whether two adjacent tokens are on the same line

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `Node` \| `Token` |
| `right` | `Node` \| `Token` |

#### Returns

`boolean`

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/misc.d.ts:6

___

### isTypeAssertion

▸ **isTypeAssertion**(`node`): node is TSAsExpression \| TSTypeAssertion

Checks if a node is a type assertion:
```
x as foo
<foo>x
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is TSAsExpression \| TSTypeAssertion

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:27

___

### isTypeKeyword

▸ **isTypeKeyword**(`token`): token is Object & IdentifierToken

Checks if a possible token is the `type` keyword.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `undefined` \| ``null`` \| `Token` |

#### Returns

token is Object & IdentifierToken

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:59

___

### isValidReactComponentName

▸ **isValidReactComponentName**(`identifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | ``null`` \| `Identifier` |

#### Returns

`boolean`

#### Defined in

[src/utils/ast.ts:70](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L70)

___

### isValidReactHookName

▸ **isValidReactHookName**(`identifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | ``null`` \| `Identifier` |

#### Returns

`boolean`

#### Defined in

[src/utils/ast.ts:74](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L74)

___

### isVariableDeclarator

▸ **isVariableDeclarator**(`node`): node is LetOrConstOrVarDeclarator \| UsingInForOfDeclarator \| UsingInNomalConextDeclarator

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is LetOrConstOrVarDeclarator \| UsingInForOfDeclarator \| UsingInNomalConextDeclarator

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.d.ts:28

___

### mapKeyNodeToText

▸ **mapKeyNodeToText**(`node`, `sourceCode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `sourceCode` | `Readonly`<`SourceCode`\> |

#### Returns

`string`

#### Defined in

[src/utils/ast.ts:118](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L118)

___

### traverseUpOnly

▸ **traverseUpOnly**(`node`, `allowedNodeTypes`): `TSESTree.Node`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `allowedNodeTypes` | `AST_NODE_TYPES`[] |

#### Returns

`TSESTree.Node`

#### Defined in

[src/utils/ast.ts:97](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L97)

___

### traverseUpOnlyPredicate

▸ **traverseUpOnlyPredicate**<`T`\>(`node`, `predicate`): `T` \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `predicate` | (`node`: `Node`) => node is T |

#### Returns

`T` \| ``null``

#### Defined in

[src/utils/ast.ts:107](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/63c5f09/src/utils/ast.ts#L107)
