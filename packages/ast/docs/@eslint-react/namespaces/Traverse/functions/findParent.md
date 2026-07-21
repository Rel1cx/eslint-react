[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / findParent

# Function: findParent()

## Call Signature

```ts
function findParent<T>(
  node: Node | null,
  test: Predicate<T>,
  stop?: NodePredicate,
): T | null;
```

Walk up the AST from `node` to find the nearest ancestor matching a predicate.

### Type Parameters

| Type Parameter       |
| -------------------- |
| `T` _extends_ `Node` |

### Parameters

| Parameter | Type               | Description                                                          |
| --------- | ------------------ | -------------------------------------------------------------------- |
| `node`    | `Node` \| `null`   | The starting node for the upward search.                             |
| `test`    | `Predicate`\<`T`\> | The predicate a candidate ancestor must satisfy.                     |
| `stop?`   | `NodePredicate`    | An optional predicate that aborts the search when it returns `true`. |

### Returns

`T` \| `null`

The first matching ancestor, or `null` when none is found.

## Call Signature

```ts
function findParent(
  node: Node | null,
  test: NodePredicate,
  stop?: NodePredicate,
): Node | null;
```

Walk up the AST from `node` to find the nearest ancestor matching a predicate.

### Parameters

| Parameter | Type             | Description                                                          |
| --------- | ---------------- | -------------------------------------------------------------------- |
| `node`    | `Node` \| `null` | The starting node for the upward search.                             |
| `test`    | `NodePredicate`  | The predicate a candidate ancestor must satisfy.                     |
| `stop?`   | `NodePredicate`  | An optional predicate that aborts the search when it returns `true`. |

### Returns

`Node` \| `null`

The first matching ancestor, or `null` when none is found.
