[@eslint-react/core](../../../../README.md) / [isReactAPI](../README.md) / ReturnType

# Type Alias: ReturnType()

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

```ts
(node: Node | null): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` \| `null` |

#### Returns

`boolean`
