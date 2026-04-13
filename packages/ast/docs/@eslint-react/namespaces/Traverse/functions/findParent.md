[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / findParent

# Function: findParent()

## Call Signature

```ts
function findParent<T>(of: Node | null, where: Predicate<T>): T | null;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `of` | `Node` \| `null` |
| `where` | [`Predicate`](../type-aliases/Predicate.md)\<`T`\> |

### Returns

`T` \| `null`

## Call Signature

```ts
function findParent(of: Node | null, where: NodePredicate): Node | null;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `of` | `Node` \| `null` |
| `where` | [`NodePredicate`](../type-aliases/NodePredicate.md) |

### Returns

`Node` \| `null`
