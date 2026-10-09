[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / hasParent

# Function: hasParent()

## Call Signature

```ts
function hasParent<T extends Node>(node: Node | null, test: Predicate<T>, stop?: NodePredicate): boolean;
```

Check whether `node` has an ancestor matching a predicate.

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

`boolean`

`true` when a matching ancestor exists.

## Call Signature

```ts
function hasParent(node: Node | null, test: NodePredicate, stop?: NodePredicate): boolean;
```

Check whether `node` has an ancestor matching a predicate.

### Parameters

| Parameter | Type             | Description                                                          |
| --------- | ---------------- | -------------------------------------------------------------------- |
| `node`    | `Node` \| `null` | The starting node for the upward search.                             |
| `test`    | `NodePredicate`  | The predicate a candidate ancestor must satisfy.                     |
| `stop?`   | `NodePredicate`  | An optional predicate that aborts the search when it returns `true`. |

### Returns

`boolean`

`true` when a matching ancestor exists.
