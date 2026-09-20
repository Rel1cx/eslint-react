[@eslint-react/core](../../../../README.md) / [isAPI](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  (context: RichContext, node: Node | null): boolean;
  (context: RichContext): (node: Node | null) => boolean;
};
```

The dual-signature predicate type returned by [isAPI](../../../../functions/isAPI.md).

## Call Signature

```ts
(context: RichContext, node: Node | null): boolean;
```

### Parameters

| Parameter | Type                                                     |
| --------- | -------------------------------------------------------- |
| `context` | [`RichContext`](../../../../type-aliases/RichContext.md) |
| `node`    | `Node` \| `null`                                         |

### Returns

`boolean`

## Call Signature

```ts
(context: RichContext): (node: Node | null) => boolean;
```

### Parameters

| Parameter | Type                                                     |
| --------- | -------------------------------------------------------- |
| `context` | [`RichContext`](../../../../type-aliases/RichContext.md) |

### Returns

(`node`: `Node` \| `null`) => `boolean`
