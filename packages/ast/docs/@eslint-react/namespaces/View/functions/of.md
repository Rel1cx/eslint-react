[@eslint-react/ast](../../../../README.md) / [View](../README.md) / of

# Function: of()

## Call Signature

```ts
function of(node: AssignmentExpression, context?: ViewContext): AssignmentExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `AssignmentExpression`                        | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`AssignmentExpressionView`](../classes/AssignmentExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: AwaitExpression, context?: ViewContext): AwaitExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `AwaitExpression`                             | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`AwaitExpressionView`](../classes/AwaitExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: BinaryExpression, context?: ViewContext): BinaryExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `BinaryExpression`                            | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`BinaryExpressionView`](../classes/BinaryExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: CallExpression, context?: ViewContext): CallExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `CallExpression`                              | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`CallExpressionView`](../classes/CallExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: ConditionalExpression, context?: ViewContext): ConditionalExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `ConditionalExpression`                       | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`ConditionalExpressionView`](../classes/ConditionalExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: ExpressionStatement, context?: ViewContext): ExpressionStatementView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `ExpressionStatement`                         | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`ExpressionStatementView`](../classes/ExpressionStatementView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: JSXExpressionContainer, context?: ViewContext): JSXExpressionContainerView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `JSXExpressionContainer`                      | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`JSXExpressionContainerView`](../classes/JSXExpressionContainerView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: LogicalExpression, context?: ViewContext): LogicalExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `LogicalExpression`                           | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`LogicalExpressionView`](../classes/LogicalExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: MemberExpression, context?: ViewContext): MemberExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `MemberExpression`                            | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`MemberExpressionView`](../classes/MemberExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: NewExpression, context?: ViewContext): NewExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `NewExpression`                               | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`NewExpressionView`](../classes/NewExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: Property, context?: ViewContext): PropertyView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `Property`                                    | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`PropertyView`](../classes/PropertyView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: ReturnStatement, context?: ViewContext): ReturnStatementView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `ReturnStatement`                             | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`ReturnStatementView`](../classes/ReturnStatementView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: ThrowStatement, context?: ViewContext): ThrowStatementView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `ThrowStatement`                              | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`ThrowStatementView`](../classes/ThrowStatementView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: UnaryExpression, context?: ViewContext): UnaryExpressionView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `UnaryExpression`                             | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`UnaryExpressionView`](../classes/UnaryExpressionView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: VariableDeclarator, context?: ViewContext): VariableDeclaratorView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `VariableDeclarator`                          | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`VariableDeclaratorView`](../classes/VariableDeclaratorView.md)

A view exposing unwrapping `get*` accessors for the node.

## Call Signature

```ts
function of(node: Node, context?: ViewContext): View;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`.

### Parameters

| Parameter  | Type                                          | Description                                              |
| ---------- | --------------------------------------------- | -------------------------------------------------------- |
| `node`     | `Node`                                        | The node to wrap. The tree is never modified or copied.  |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) | Optional rule context for getters that need source text. |

### Returns

[`View`](../interfaces/View.md)

A view exposing unwrapping `get*` accessors for the node.
