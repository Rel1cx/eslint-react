[@eslint-react/ast](../../../../README.md) / [View](../README.md) / BinaryLikeView

# Class: BinaryLikeView\<N _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression`\>

Base view over binary-like expressions sharing `left`/`right` operands.

## Extends

- [`Class`](Class.md)\<`N`\>

## Extended by

- [`BinaryExpressionView`](BinaryExpressionView.md)
- [`LogicalExpressionView`](LogicalExpressionView.md)

## Type Parameters

| Type Parameter                                                            |
| ------------------------------------------------------------------------- |
| `N` _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression` |

## Constructors

### Constructor

```ts
new BinaryLikeView<N extends BinaryExpression | LogicalExpression>(node: N, context?: ViewContext): BinaryLikeView<N>;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `N`                                           |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`BinaryLikeView`\<`N`\>

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              | Inherited from                                             |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`Class`](Class.md).[`context`](Class.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                          | The original node, as delivered by ESLint.               | [`Class`](Class.md).[`node`](Class.md#property-node)       |

## Accessors

### left

#### Get Signature

```ts
get left(): 
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

A view over the left operand with type and chain expressions unwrapped.

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

### right

#### Get Signature

```ts
get right(): 
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

A view over the right operand with type and chain expressions unwrapped.

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
