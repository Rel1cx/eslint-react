[@eslint-react/ast](../../../../README.md) / [View](../README.md) / MemberExpressionView

# Class: MemberExpressionView

View over a member expression.

## Extends

- [`NodeViewBase`](NodeViewBase.md)\<`TSESTree.MemberExpression`\>

## Constructors

### Constructor

```ts
new MemberExpressionView(node: MemberExpression, context?: NodeViewContext): MemberExpressionView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `MemberExpression`                                    |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`MemberExpressionView`

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`constructor`](NodeViewBase.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                                  |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeViewBase`](NodeViewBase.md).[`context`](NodeViewBase.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `MemberExpression`                                                   | The original node, as delivered by ESLint.               | [`NodeViewBase`](NodeViewBase.md).[`node`](NodeViewBase.md#property-node)       |

## Methods

### \[NodeInspectSymbol\]()

```ts
NodeInspectSymbol: unknown;
```

Node.js custom inspection method.

#### Returns

`unknown`

#### Since

2.0.0

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`[NodeInspectSymbol]`](NodeViewBase.md#nodeinspectsymbol)

---

### getMemberChain()

```ts
getMemberChain(): (
  | AccessorProperty
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AssignmentPattern
  | AwaitExpression
  | BinaryExpression
  | BlockStatement
  | BreakStatement
  | CallExpression
  | CatchClause
  | ChainExpression
  | ClassBody
  | ClassDeclaration
  | ClassExpression
  | ConditionalExpression
  | ContinueStatement
  | DebuggerStatement
  | Decorator
  | DoWhileStatement
  | EmptyStatement
  | ExportAllDeclaration
  | ExportDefaultDeclaration
  | ExportNamedDeclaration
  | ExportSpecifier
  | ExpressionStatement
  | ForInStatement
  | ForOfStatement
  | ForStatement
  | FunctionDeclaration
  | FunctionExpression
  | Identifier
  | IfStatement
  | ImportAttribute
  | ImportDeclaration
  | ImportDefaultSpecifier
  | ImportExpression
  | ImportNamespaceSpecifier
  | ImportSpecifier
  | JSXAttribute
  | JSXClosingElement
  | JSXClosingFragment
  | JSXElement
  | JSXEmptyExpression
  | JSXExpressionContainer
  | JSXFragment
  | JSXIdentifier
  | JSXMemberExpression
  | JSXNamespacedName
  | JSXOpeningElement
  | JSXOpeningFragment
  | JSXSpreadAttribute
  | JSXSpreadChild
  | JSXText
  | LabeledStatement
  | Literal
  | LogicalExpression
  | MemberExpression
  | MetaProperty
  | MethodDefinition
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | PrivateIdentifier
  | Program
  | Property
  | PropertyDefinition
  | RestElement
  | ReturnStatement
  | SequenceExpression
  | SpreadElement
  | StaticBlock
  | Super
  | SwitchCase
  | SwitchStatement
  | TaggedTemplateExpression
  | TemplateElement
  | TemplateLiteral
  | ThisExpression
  | ThrowStatement
  | TryStatement
  | TSAbstractAccessorProperty
  | TSAbstractKeyword
  | TSAbstractMethodDefinition
  | TSAbstractPropertyDefinition
  | TSAnyKeyword
  | TSArrayType
  | TSAsyncKeyword
  | TSBigIntKeyword
  | TSBooleanKeyword
  | TSCallSignatureDeclaration
  | TSClassImplements
  | TSConditionalType
  | TSConstructorType
  | TSConstructSignatureDeclaration
  | TSDeclareFunction
  | TSDeclareKeyword
  | TSEmptyBodyFunctionExpression
  | TSEnumBody
  | TSEnumDeclaration
  | TSEnumMember
  | TSExportAssignment
  | TSExportKeyword
  | TSExternalModuleReference
  | TSFunctionType
  | TSImportEqualsDeclaration
  | TSImportType
  | TSIndexedAccessType
  | TSIndexSignature
  | TSInferType
  | TSInterfaceBody
  | TSInterfaceDeclaration
  | TSInterfaceHeritage
  | TSIntersectionType
  | TSIntrinsicKeyword
  | TSLiteralType
  | TSMappedType
  | TSMethodSignature
  | TSModuleBlock
  | TSModuleDeclaration
  | TSNamedTupleMember
  | TSNamespaceExportDeclaration
  | TSNeverKeyword
  | TSNullKeyword
  | TSNumberKeyword
  | TSObjectKeyword
  | TSOptionalType
  | TSParameterProperty
  | TSPrivateKeyword
  | TSPropertySignature
  | TSProtectedKeyword
  | TSPublicKeyword
  | TSQualifiedName
  | TSReadonlyKeyword
  | TSRestType
  | TSStaticKeyword
  | TSStringKeyword
  | TSSymbolKeyword
  | TSTemplateLiteralType
  | TSThisType
  | TSTupleType
  | TSTypeAliasDeclaration
  | TSTypeAnnotation
  | TSTypeLiteral
  | TSTypeOperator
  | TSTypeParameter
  | TSTypeParameterDeclaration
  | TSTypeParameterInstantiation
  | TSTypePredicate
  | TSTypeQuery
  | TSTypeReference
  | TSUndefinedKeyword
  | TSUnionType
  | TSUnknownKeyword
  | TSVoidKeyword
  | UnaryExpression
  | UpdateExpression
  | VariableDeclaration
  | VariableDeclarator
  | WhileStatement
  | WithStatement
  | YieldExpression)[];
```

Get the member chain from the base object (ex: `[a, b, c]` for `a.b.c`).

#### Returns

(
\| `AccessorProperty`
\| `ArrayExpression`
\| `ArrayPattern`
\| `ArrowFunctionExpression`
\| `AssignmentExpression`
\| `AssignmentPattern`
\| `AwaitExpression`
\| `BinaryExpression`
\| `BlockStatement`
\| `BreakStatement`
\| `CallExpression`
\| `CatchClause`
\| `ChainExpression`
\| `ClassBody`
\| `ClassDeclaration`
\| `ClassExpression`
\| `ConditionalExpression`
\| `ContinueStatement`
\| `DebuggerStatement`
\| `Decorator`
\| `DoWhileStatement`
\| `EmptyStatement`
\| `ExportAllDeclaration`
\| `ExportDefaultDeclaration`
\| `ExportNamedDeclaration`
\| `ExportSpecifier`
\| `ExpressionStatement`
\| `ForInStatement`
\| `ForOfStatement`
\| `ForStatement`
\| `FunctionDeclaration`
\| `FunctionExpression`
\| `Identifier`
\| `IfStatement`
\| `ImportAttribute`
\| `ImportDeclaration`
\| `ImportDefaultSpecifier`
\| `ImportExpression`
\| `ImportNamespaceSpecifier`
\| `ImportSpecifier`
\| `JSXAttribute`
\| `JSXClosingElement`
\| `JSXClosingFragment`
\| `JSXElement`
\| `JSXEmptyExpression`
\| `JSXExpressionContainer`
\| `JSXFragment`
\| `JSXIdentifier`
\| `JSXMemberExpression`
\| `JSXNamespacedName`
\| `JSXOpeningElement`
\| `JSXOpeningFragment`
\| `JSXSpreadAttribute`
\| `JSXSpreadChild`
\| `JSXText`
\| `LabeledStatement`
\| `Literal`
\| `LogicalExpression`
\| `MemberExpression`
\| `MetaProperty`
\| `MethodDefinition`
\| `NewExpression`
\| `ObjectExpression`
\| `ObjectPattern`
\| `PrivateIdentifier`
\| `Program`
\| `Property`
\| `PropertyDefinition`
\| `RestElement`
\| `ReturnStatement`
\| `SequenceExpression`
\| `SpreadElement`
\| `StaticBlock`
\| `Super`
\| `SwitchCase`
\| `SwitchStatement`
\| `TaggedTemplateExpression`
\| `TemplateElement`
\| `TemplateLiteral`
\| `ThisExpression`
\| `ThrowStatement`
\| `TryStatement`
\| `TSAbstractAccessorProperty`
\| `TSAbstractKeyword`
\| `TSAbstractMethodDefinition`
\| `TSAbstractPropertyDefinition`
\| `TSAnyKeyword`
\| `TSArrayType`
\| `TSAsyncKeyword`
\| `TSBigIntKeyword`
\| `TSBooleanKeyword`
\| `TSCallSignatureDeclaration`
\| `TSClassImplements`
\| `TSConditionalType`
\| `TSConstructorType`
\| `TSConstructSignatureDeclaration`
\| `TSDeclareFunction`
\| `TSDeclareKeyword`
\| `TSEmptyBodyFunctionExpression`
\| `TSEnumBody`
\| `TSEnumDeclaration`
\| `TSEnumMember`
\| `TSExportAssignment`
\| `TSExportKeyword`
\| `TSExternalModuleReference`
\| `TSFunctionType`
\| `TSImportEqualsDeclaration`
\| `TSImportType`
\| `TSIndexedAccessType`
\| `TSIndexSignature`
\| `TSInferType`
\| `TSInterfaceBody`
\| `TSInterfaceDeclaration`
\| `TSInterfaceHeritage`
\| `TSIntersectionType`
\| `TSIntrinsicKeyword`
\| `TSLiteralType`
\| `TSMappedType`
\| `TSMethodSignature`
\| `TSModuleBlock`
\| `TSModuleDeclaration`
\| `TSNamedTupleMember`
\| `TSNamespaceExportDeclaration`
\| `TSNeverKeyword`
\| `TSNullKeyword`
\| `TSNumberKeyword`
\| `TSObjectKeyword`
\| `TSOptionalType`
\| `TSParameterProperty`
\| `TSPrivateKeyword`
\| `TSPropertySignature`
\| `TSProtectedKeyword`
\| `TSPublicKeyword`
\| `TSQualifiedName`
\| `TSReadonlyKeyword`
\| `TSRestType`
\| `TSStaticKeyword`
\| `TSStringKeyword`
\| `TSSymbolKeyword`
\| `TSTemplateLiteralType`
\| `TSThisType`
\| `TSTupleType`
\| `TSTypeAliasDeclaration`
\| `TSTypeAnnotation`
\| `TSTypeLiteral`
\| `TSTypeOperator`
\| `TSTypeParameter`
\| `TSTypeParameterDeclaration`
\| `TSTypeParameterInstantiation`
\| `TSTypePredicate`
\| `TSTypeQuery`
\| `TSTypeReference`
\| `TSUndefinedKeyword`
\| `TSUnionType`
\| `TSUnknownKeyword`
\| `TSVoidKeyword`
\| `UnaryExpression`
\| `UpdateExpression`
\| `VariableDeclaration`
\| `VariableDeclarator`
\| `WhileStatement`
\| `WithStatement`
\| `YieldExpression`)[]

---

### getObject()

```ts
getObject(): TSESTreeUnwrapped<Expression>;
```

Get the object with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

---

### getParent()

```ts
getParent(): Node | undefined;
```

Get the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

#### Returns

`Node` \| `undefined`

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`getParent`](NodeViewBase.md#getparent)

---

### getProperty()

```ts
getProperty(): TSESTreeUnwrapped<PrivateIdentifier | Expression>;
```

Get the property with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`PrivateIdentifier` \| `Expression`\>

---

### toJSON()

```ts
toJSON(): NodeViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`NodeViewJSON`](../interfaces/NodeViewJSON.md)

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`toJSON`](NodeViewBase.md#tojson)

---

### toString()

```ts
toString(): string;
```

Returns a formatted string representation of this object.

#### Returns

`string`

#### Since

2.0.0

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`toString`](NodeViewBase.md#tostring)
