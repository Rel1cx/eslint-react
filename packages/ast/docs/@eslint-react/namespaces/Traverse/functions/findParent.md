[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / findParent

# Function: findParent()

## Call Signature

```ts
function findParent<T>(
   node: Node | null, 
   test: Predicate<T>, 
   stop?: NodePredicate): T | null;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` \| `null` |
| `test` | `Predicate`\<`T`\> |
| `stop?` | `NodePredicate` |

### Returns

`T` \| `null`

## Call Signature

```ts
function findParent(
   node: Node | null, 
   test: NodePredicate, 
   stop?: NodePredicate): Node | null;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` \| `null` |
| `test` | `NodePredicate` |
| `stop?` | `NodePredicate` |

### Returns

`Node` \| `null`
