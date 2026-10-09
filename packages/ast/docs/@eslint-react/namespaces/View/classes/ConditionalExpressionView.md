[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ConditionalExpressionView

# Class: ConditionalExpressionView

View over a conditional expression.

## Extends

- [`Class`](Class.md)\<`TSESTree.ConditionalExpression`\>

## Constructors

### Constructor

```ts
new ConditionalExpressionView(node: ConditionalExpression): ConditionalExpressionView;
```

#### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `node`    | `ConditionalExpression` |

#### Returns

`ConditionalExpressionView`

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                          | Modifier   | Type                    | Description                                | Inherited from                                       |
| --------------------------------- | ---------- | ----------------------- | ------------------------------------------ | ---------------------------------------------------- |
| <a id="property-node"></a> `node` | `readonly` | `ConditionalExpression` | The original node, as delivered by ESLint. | [`Class`](Class.md).[`node`](Class.md#property-node) |

## Accessors

### alternate

#### Get Signature

```ts
get alternate(): 
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

A view over the alternate with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| `ConditionalExpressionView`
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

### consequent

#### Get Signature

```ts
get consequent(): 
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

A view over the consequent with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| `ConditionalExpressionView`
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

### test

#### Get Signature

```ts
get test(): 
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

A view over the test with type and chain expressions unwrapped.

##### Returns

\| [`AssignmentExpressionView`](AssignmentExpressionView.md)
\| [`AwaitExpressionView`](AwaitExpressionView.md)
\| [`BinaryExpressionView`](BinaryExpressionView.md)
\| [`CallExpressionView`](CallExpressionView.md)
\| `ConditionalExpressionView`
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
