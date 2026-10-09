[@eslint-react/ast](../../../../README.md) / [View](../README.md) / PropertyView

# Class: PropertyView

View over an object literal property.

## Extends

- [`NodeViewBase`](NodeViewBase.md)\<`TSESTree.Property`\>

## Constructors

### Constructor

```ts
new PropertyView(node: Property, context?: NodeViewContext): PropertyView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `Property`                                            |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`PropertyView`

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`constructor`](NodeViewBase.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                                  |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeViewBase`](NodeViewBase.md).[`context`](NodeViewBase.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `Property`                                                           | The original node, as delivered by ESLint.               | [`NodeViewBase`](NodeViewBase.md).[`node`](NodeViewBase.md#property-node)       |

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

### getKey()

```ts
getKey(): TSESTreeUnwrapped<
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
  | AssignmentExpression
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
  | ClassExpression
  | ConditionalExpression
  | FunctionExpression
  | Identifier
  | ImportExpression
  | JSXElement
  | JSXFragment
  | BigIntLiteral
  | BooleanLiteral
  | NullLiteral
  | NumberLiteral
  | RegExpLiteral
  | StringLiteral
  | LogicalExpression
  | MemberExpressionComputedName
  | MemberExpressionNonComputedName
  | MetaProperty
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | SequenceExpression
  | Super
  | TaggedTemplateExpression
  | TemplateLiteral
  | ThisExpression
  | TSAsExpression
  | TSInstantiationExpression
  | TSNonNullExpression
  | TSSatisfiesExpression
  | TSTypeAssertion
  | UnaryExpressionBitwiseNot
  | UnaryExpressionDelete
  | UnaryExpressionMinus
  | UnaryExpressionNot
  | UnaryExpressionPlus
  | UnaryExpressionTypeof
  | UnaryExpressionVoid
  | UpdateExpression
  | YieldNoStarExpression
| YieldStarExpression>;
```

Get the key with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<
\| `ArrayExpression`
\| `ArrayPattern`
\| `ArrowFunctionExpressionWithBlockBody`
\| `ArrowFunctionExpressionWithExpressionBody`
\| `AssignmentExpression`
\| `AwaitExpression`
\| `PrivateInExpression`
\| `SymmetricBinaryExpression`
\| `CallExpression`
\| `ChainExpression`
\| `ClassExpression`
\| `ConditionalExpression`
\| `FunctionExpression`
\| `Identifier`
\| `ImportExpression`
\| `JSXElement`
\| `JSXFragment`
\| `BigIntLiteral`
\| `BooleanLiteral`
\| `NullLiteral`
\| `NumberLiteral`
\| `RegExpLiteral`
\| `StringLiteral`
\| `LogicalExpression`
\| `MemberExpressionComputedName`
\| `MemberExpressionNonComputedName`
\| `MetaProperty`
\| `NewExpression`
\| `ObjectExpression`
\| `ObjectPattern`
\| `SequenceExpression`
\| `Super`
\| `TaggedTemplateExpression`
\| `TemplateLiteral`
\| `ThisExpression`
\| `TSAsExpression`
\| `TSInstantiationExpression`
\| `TSNonNullExpression`
\| `TSSatisfiesExpression`
\| `TSTypeAssertion`
\| `UnaryExpressionBitwiseNot`
\| `UnaryExpressionDelete`
\| `UnaryExpressionMinus`
\| `UnaryExpressionNot`
\| `UnaryExpressionPlus`
\| `UnaryExpressionTypeof`
\| `UnaryExpressionVoid`
\| `UpdateExpression`
\| `YieldNoStarExpression`
\| `YieldStarExpression`\>

---

### getName()

```ts
getName(effort?: "min" | "max"): string | null;
```

Get the static property name, or `null` when it cannot be statically determined.

#### Parameters

| Parameter | Type               | Default value |
| --------- | ------------------ | ------------- |
| `effort`  | `"min"` \| `"max"` | `"min"`       |

#### Returns

`string` \| `null`

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

### getValue()

```ts
getValue(): TSESTreeUnwrapped<
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
  | AssignmentExpression
  | AssignmentPattern
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
  | ClassExpression
  | ConditionalExpression
  | FunctionExpression
  | Identifier
  | ImportExpression
  | JSXElement
  | JSXFragment
  | BigIntLiteral
  | BooleanLiteral
  | NullLiteral
  | NumberLiteral
  | RegExpLiteral
  | StringLiteral
  | LogicalExpression
  | MemberExpressionComputedName
  | MemberExpressionNonComputedName
  | MetaProperty
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | SequenceExpression
  | Super
  | TaggedTemplateExpression
  | TemplateLiteral
  | ThisExpression
  | TSAsExpression
  | TSEmptyBodyFunctionExpression
  | TSInstantiationExpression
  | TSNonNullExpression
  | TSSatisfiesExpression
  | TSTypeAssertion
  | UnaryExpressionBitwiseNot
  | UnaryExpressionDelete
  | UnaryExpressionMinus
  | UnaryExpressionNot
  | UnaryExpressionPlus
  | UnaryExpressionTypeof
  | UnaryExpressionVoid
  | UpdateExpression
  | YieldNoStarExpression
| YieldStarExpression>;
```

Get the value with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<
\| `ArrayExpression`
\| `ArrayPattern`
\| `ArrowFunctionExpressionWithBlockBody`
\| `ArrowFunctionExpressionWithExpressionBody`
\| `AssignmentExpression`
\| `AssignmentPattern`
\| `AwaitExpression`
\| `PrivateInExpression`
\| `SymmetricBinaryExpression`
\| `CallExpression`
\| `ChainExpression`
\| `ClassExpression`
\| `ConditionalExpression`
\| `FunctionExpression`
\| `Identifier`
\| `ImportExpression`
\| `JSXElement`
\| `JSXFragment`
\| `BigIntLiteral`
\| `BooleanLiteral`
\| `NullLiteral`
\| `NumberLiteral`
\| `RegExpLiteral`
\| `StringLiteral`
\| `LogicalExpression`
\| `MemberExpressionComputedName`
\| `MemberExpressionNonComputedName`
\| `MetaProperty`
\| `NewExpression`
\| `ObjectExpression`
\| `ObjectPattern`
\| `SequenceExpression`
\| `Super`
\| `TaggedTemplateExpression`
\| `TemplateLiteral`
\| `ThisExpression`
\| `TSAsExpression`
\| `TSEmptyBodyFunctionExpression`
\| `TSInstantiationExpression`
\| `TSNonNullExpression`
\| `TSSatisfiesExpression`
\| `TSTypeAssertion`
\| `UnaryExpressionBitwiseNot`
\| `UnaryExpressionDelete`
\| `UnaryExpressionMinus`
\| `UnaryExpressionNot`
\| `UnaryExpressionPlus`
\| `UnaryExpressionTypeof`
\| `UnaryExpressionVoid`
\| `UpdateExpression`
\| `YieldNoStarExpression`
\| `YieldStarExpression`\>

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
