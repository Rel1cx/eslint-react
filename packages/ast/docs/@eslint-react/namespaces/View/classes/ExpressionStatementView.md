[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ExpressionStatementView

# Class: ExpressionStatementView

View over an expression statement.

## Extends

- [`Class`](Class.md)\<`TSESTree.ExpressionStatement`\>

## Constructors

### Constructor

```ts
new ExpressionStatementView(node: ExpressionStatement, context?: ViewContext): ExpressionStatementView;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `ExpressionStatement`                         |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`ExpressionStatementView`

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              | Inherited from                                             |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`Class`](Class.md).[`context`](Class.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `ExpressionStatement`                                        | The original node, as delivered by ESLint.               | [`Class`](Class.md).[`node`](Class.md#property-node)       |

## Accessors

### expression

#### Get Signature

```ts
get expression(): 
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

A view over the expression with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| [`ConditionalExpressionView`](ConditionalExpressionView.md)
\| [`LogicalExpressionView`](LogicalExpressionView.md)
\| [`MemberExpressionView`](MemberExpressionView.md)
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

### type

#### Get Signature

```ts
get type(): N["type"];
```

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | EmptyView` union without touching `.node`.

##### Returns

`N`\[`"type"`\]

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | EmptyView` union without touching `.node`.

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
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

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
