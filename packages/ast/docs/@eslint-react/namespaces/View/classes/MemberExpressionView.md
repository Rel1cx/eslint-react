[@eslint-react/ast](../../../../README.md) / [View](../README.md) / MemberExpressionView

# Class: MemberExpressionView

View over a member expression.

## Extends

- [`Class`](Class.md)\<`TSESTree.MemberExpression`\>

## Constructors

### Constructor

```ts
new MemberExpressionView(node: MemberExpression): MemberExpressionView;
```

#### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `node`    | `MemberExpression` |

#### Returns

`MemberExpressionView`

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                          | Modifier   | Type               | Description                                | Inherited from                                       |
| --------------------------------- | ---------- | ------------------ | ------------------------------------------ | ---------------------------------------------------- |
| <a id="property-node"></a> `node` | `readonly` | `MemberExpression` | The original node, as delivered by ESLint. | [`Class`](Class.md).[`node`](Class.md#property-node) |

## Accessors

### memberChain

#### Get Signature

```ts
get memberChain(): (
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

The member chain from the base object (ex: `[a, b, c]` for `a.b.c`).
Returns bare nodes, not views: the chain is a derived list, not a child node.

##### Returns

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

### object

#### Get Signature

```ts
get object(): 
  | AssignmentExpressionView
  | AwaitExpressionView
  | BinaryExpressionView
  | CallExpressionView
  | ConditionalExpressionView
  | LogicalExpressionView
  | MemberExpressionView
  | NewExpressionView
  | UnaryExpressionView
  | Class<ArrayExpression>
  | Class<ArrayPattern>
  | Class<ArrowFunctionExpressionWithBlockBody>
  | Class<ArrowFunctionExpressionWithExpressionBody>
  | Class<ClassExpression>
  | Class<FunctionExpression>
  | Class<Identifier>
  | Class<ImportExpression>
  | Class<JSXElement>
  | Class<JSXFragment>
  | Class<BigIntLiteral>
  | Class<BooleanLiteral>
  | Class<NullLiteral>
  | Class<NumberLiteral>
  | Class<RegExpLiteral>
  | Class<StringLiteral>
  | Class<MetaProperty>
  | Class<ObjectExpression>
  | Class<ObjectPattern>
  | Class<SequenceExpression>
  | Class<Super>
  | Class<TaggedTemplateExpression>
  | Class<TemplateLiteral>
  | Class<ThisExpression>
  | Class<UpdateExpression>
  | Class<YieldNoStarExpression>
| Class<YieldStarExpression>;
```

A view over the object with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| [`ConditionalExpressionView`](ConditionalExpressionView.md)
\| [`LogicalExpressionView`](LogicalExpressionView.md)
\| `MemberExpressionView`
\| [`NewExpressionView`](NewExpressionView.md)
\| [`UnaryExpressionView`](UnaryExpressionView.md)
\| [`Class`](Class.md)\<`ArrayExpression`\>
\| [`Class`](Class.md)\<`ArrayPattern`\>
\| [`Class`](Class.md)\<`ArrowFunctionExpressionWithBlockBody`\>
\| [`Class`](Class.md)\<`ArrowFunctionExpressionWithExpressionBody`\>
\| [`Class`](Class.md)\<`ClassExpression`\>
\| [`Class`](Class.md)\<`FunctionExpression`\>
\| [`Class`](Class.md)\<`Identifier`\>
\| [`Class`](Class.md)\<`ImportExpression`\>
\| [`Class`](Class.md)\<`JSXElement`\>
\| [`Class`](Class.md)\<`JSXFragment`\>
\| [`Class`](Class.md)\<`BigIntLiteral`\>
\| [`Class`](Class.md)\<`BooleanLiteral`\>
\| [`Class`](Class.md)\<`NullLiteral`\>
\| [`Class`](Class.md)\<`NumberLiteral`\>
\| [`Class`](Class.md)\<`RegExpLiteral`\>
\| [`Class`](Class.md)\<`StringLiteral`\>
\| [`Class`](Class.md)\<`MetaProperty`\>
\| [`Class`](Class.md)\<`ObjectExpression`\>
\| [`Class`](Class.md)\<`ObjectPattern`\>
\| [`Class`](Class.md)\<`SequenceExpression`\>
\| [`Class`](Class.md)\<`Super`\>
\| [`Class`](Class.md)\<`TaggedTemplateExpression`\>
\| [`Class`](Class.md)\<`TemplateLiteral`\>
\| [`Class`](Class.md)\<`ThisExpression`\>
\| [`Class`](Class.md)\<`UpdateExpression`\>
\| [`Class`](Class.md)\<`YieldNoStarExpression`\>
\| [`Class`](Class.md)\<`YieldStarExpression`\>

---

### parent

#### Get Signature

```ts
get parent(): View<Node> | undefined;
```

A view over the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

##### Returns

[`View`](../interfaces/View.md)\<`Node`\> \| `undefined`

A view over the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

#### Inherited from

[`Class`](Class.md).[`parent`](Class.md#parent)

---

### property

#### Get Signature

```ts
get property(): 
  | AssignmentExpressionView
  | AwaitExpressionView
  | BinaryExpressionView
  | CallExpressionView
  | ConditionalExpressionView
  | LogicalExpressionView
  | MemberExpressionView
  | NewExpressionView
  | UnaryExpressionView
  | Class<ArrayExpression>
  | Class<ArrayPattern>
  | Class<ArrowFunctionExpressionWithBlockBody>
  | Class<ArrowFunctionExpressionWithExpressionBody>
  | Class<ClassExpression>
  | Class<FunctionExpression>
  | Class<Identifier>
  | Class<ImportExpression>
  | Class<JSXElement>
  | Class<JSXFragment>
  | Class<BigIntLiteral>
  | Class<BooleanLiteral>
  | Class<NullLiteral>
  | Class<NumberLiteral>
  | Class<RegExpLiteral>
  | Class<StringLiteral>
  | Class<MetaProperty>
  | Class<ObjectExpression>
  | Class<ObjectPattern>
  | Class<PrivateIdentifier>
  | Class<SequenceExpression>
  | Class<Super>
  | Class<TaggedTemplateExpression>
  | Class<TemplateLiteral>
  | Class<ThisExpression>
  | Class<UpdateExpression>
  | Class<YieldNoStarExpression>
| Class<YieldStarExpression>;
```

A view over the property with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| [`ConditionalExpressionView`](ConditionalExpressionView.md)
\| [`LogicalExpressionView`](LogicalExpressionView.md)
\| `MemberExpressionView`
\| [`NewExpressionView`](NewExpressionView.md)
\| [`UnaryExpressionView`](UnaryExpressionView.md)
\| [`Class`](Class.md)\<`ArrayExpression`\>
\| [`Class`](Class.md)\<`ArrayPattern`\>
\| [`Class`](Class.md)\<`ArrowFunctionExpressionWithBlockBody`\>
\| [`Class`](Class.md)\<`ArrowFunctionExpressionWithExpressionBody`\>
\| [`Class`](Class.md)\<`ClassExpression`\>
\| [`Class`](Class.md)\<`FunctionExpression`\>
\| [`Class`](Class.md)\<`Identifier`\>
\| [`Class`](Class.md)\<`ImportExpression`\>
\| [`Class`](Class.md)\<`JSXElement`\>
\| [`Class`](Class.md)\<`JSXFragment`\>
\| [`Class`](Class.md)\<`BigIntLiteral`\>
\| [`Class`](Class.md)\<`BooleanLiteral`\>
\| [`Class`](Class.md)\<`NullLiteral`\>
\| [`Class`](Class.md)\<`NumberLiteral`\>
\| [`Class`](Class.md)\<`RegExpLiteral`\>
\| [`Class`](Class.md)\<`StringLiteral`\>
\| [`Class`](Class.md)\<`MetaProperty`\>
\| [`Class`](Class.md)\<`ObjectExpression`\>
\| [`Class`](Class.md)\<`ObjectPattern`\>
\| [`Class`](Class.md)\<`PrivateIdentifier`\>
\| [`Class`](Class.md)\<`SequenceExpression`\>
\| [`Class`](Class.md)\<`Super`\>
\| [`Class`](Class.md)\<`TaggedTemplateExpression`\>
\| [`Class`](Class.md)\<`TemplateLiteral`\>
\| [`Class`](Class.md)\<`ThisExpression`\>
\| [`Class`](Class.md)\<`UpdateExpression`\>
\| [`Class`](Class.md)\<`YieldNoStarExpression`\>
\| [`Class`](Class.md)\<`YieldStarExpression`\>

---

### type

#### Get Signature

```ts
get type(): N["type"];
```

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | AbsentView` union without touching `.node`.

##### Returns

`N`\[`"type"`\]

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | AbsentView` union without touching `.node`.

#### Inherited from

[`Class`](Class.md).[`type`](Class.md#type)

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

[`Class`](Class.md).[`[NodeInspectSymbol]`](Class.md#nodeinspectsymbol)

---

### toJSON()

```ts
toJSON(): {
};
```

Returns a JSON representation of this object.

**Details**

Subclasses must implement this method to define how the object
should be serialized for debugging and inspection purposes.

#### Returns

```ts
{
}
```

#### Since

2.0.0

#### Inherited from

[`Class`](Class.md).[`toJSON`](Class.md#tojson)

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

[`Class`](Class.md).[`toString`](Class.md#tostring)
