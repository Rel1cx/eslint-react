[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / unwrap

# Function: unwrap()

## Call Signature

```ts
function unwrap(
  node:
    | ChainExpression
    | TSESTreeTypeExpression,
): TSESTreeUnwrapped<Expression>;
```

Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.

### Parameters

| Parameter | Type                                                                                                   | Description         |
| --------- | ------------------------------------------------------------------------------------------------------ | ------------------- |
| `node`    | \| `ChainExpression` \| [`TSESTreeTypeExpression`](../../../../type-aliases/TSESTreeTypeExpression.md) | The node to unwrap. |

### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

The innermost non-type-expression node — a reference into the original tree, never a copy.

## Call Signature

```ts
function unwrap<T extends Node>(node: T): TSESTreeUnwrapped<T>;
```

Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.

### Type Parameters

| Type Parameter       |
| -------------------- |
| `T` _extends_ `Node` |

### Parameters

| Parameter | Type | Description         |
| --------- | ---- | ------------------- |
| `node`    | `T`  | The node to unwrap. |

### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`T`\>

The innermost non-type-expression node — a reference into the original tree, never a copy.
