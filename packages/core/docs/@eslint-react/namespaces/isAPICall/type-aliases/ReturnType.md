[@eslint-react/core](../../../../README.md) / [isAPICall](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  (context: RichContext, node: Node | null): node is CallExpression;
  (context: RichContext): (node: Node | null) => node is CallExpression;
};
```

The dual-signature predicate type returned by [isAPICall](../../../../functions/isAPICall.md).

## Call Signature

```ts
(context: RichContext, node: Node | null): node is CallExpression;
```

### Parameters

| Parameter | Type                                                     |
| --------- | -------------------------------------------------------- |
| `context` | [`RichContext`](../../../../type-aliases/RichContext.md) |
| `node`    | `Node` \| `null`                                         |

### Returns

`node is CallExpression`

## Call Signature

```ts
(context: RichContext): (node: Node | null) => node is CallExpression;
```

### Parameters

| Parameter | Type                                                     |
| --------- | -------------------------------------------------------- |
| `context` | [`RichContext`](../../../../type-aliases/RichContext.md) |

### Returns

(`node`: `Node` \| `null`) => `node is CallExpression`
