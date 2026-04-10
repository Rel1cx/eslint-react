[@eslint-react/core](../../../../README.md) / [isAPI](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  (context: RuleContext, node: Node | null): boolean;
  (context: RuleContext): (node: Node | null) => boolean;
};
```

## Call Signature

```ts
(context: RuleContext, node: Node | null): boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |
| `node` | `Node` \| `null` |

### Returns

`boolean`

## Call Signature

```ts
(context: RuleContext): (node: Node | null) => boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |

### Returns

(`node`: `Node` \| `null`) => `boolean`
