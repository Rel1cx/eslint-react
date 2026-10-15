[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / unwrap

# Function: unwrap()

## Call Signature

```ts
function unwrap(node: TSESTreeTypeOrChainExpression):
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AwaitExpression
  | BinaryExpression
  | CallExpression
  | ClassExpression
  | ConditionalExpression
  | FunctionExpression
  | Identifier
  | ImportExpression
  | JSXElement
  | JSXFragment
  | LogicalExpression
  | MemberExpression
  | MetaProperty
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | SequenceExpression
  | Super
  | TaggedTemplateExpression
  | ThisExpression
  | UnaryExpression
  | UpdateExpression
  | YieldExpression
  | LiteralExpression;
```

Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.

### Parameters

| Parameter | Type                                                                                         | Description         |
| --------- | -------------------------------------------------------------------------------------------- | ------------------- |
| `node`    | [`TSESTreeTypeOrChainExpression`](../../../../type-aliases/TSESTreeTypeOrChainExpression.md) | The node to unwrap. |

### Returns

\| `ArrayExpression`
\| `ArrayPattern`
\| `ArrowFunctionExpression`
\| `AssignmentExpression`
\| `AwaitExpression`
\| `BinaryExpression`
\| `CallExpression`
\| `ClassExpression`
\| `ConditionalExpression`
\| `FunctionExpression`
\| `Identifier`
\| `ImportExpression`
\| `JSXElement`
\| `JSXFragment`
\| `LogicalExpression`
\| `MemberExpression`
\| `MetaProperty`
\| `NewExpression`
\| `ObjectExpression`
\| `ObjectPattern`
\| `SequenceExpression`
\| `Super`
\| `TaggedTemplateExpression`
\| `ThisExpression`
\| `UnaryExpression`
\| `UpdateExpression`
\| `YieldExpression`
\| `LiteralExpression`

The innermost non-type-expression node — a reference into the original tree, never a copy.

## Call Signature

```ts
function unwrap<T extends Node>(node: T): Exclude<T, TSESTreeTypeOrChainExpression>;
```

Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.

### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| <a id="type-parameter-t"></a> `T` _extends_ `Node` |

### Parameters

| Parameter | Type | Description         |
| --------- | ---- | ------------------- |
| `node`    | `T`  | The node to unwrap. |

### Returns

[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)\<`T`, [`TSESTreeTypeOrChainExpression`](../../../../type-aliases/TSESTreeTypeOrChainExpression.md)\>

The innermost non-type-expression node — a reference into the original tree, never a copy.
