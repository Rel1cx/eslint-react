[@eslint-react/core](../README.md) / isInversePhase

# Variable: isInversePhase()

```ts
const isInversePhase: {
  (a: ComponentPhaseKind): (b: ComponentPhaseKind) => boolean;
  (a: ComponentPhaseKind, b: ComponentPhaseKind): boolean;
};
```

## Call Signature

```ts
(a: ComponentPhaseKind): (b: ComponentPhaseKind) => boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | [`ComponentPhaseKind`](../type-aliases/ComponentPhaseKind.md) |

### Returns

```ts
(b: ComponentPhaseKind): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `b` | [`ComponentPhaseKind`](../type-aliases/ComponentPhaseKind.md) |

#### Returns

`boolean`

## Call Signature

```ts
(a: ComponentPhaseKind, b: ComponentPhaseKind): boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | [`ComponentPhaseKind`](../type-aliases/ComponentPhaseKind.md) |
| `b` | [`ComponentPhaseKind`](../type-aliases/ComponentPhaseKind.md) |

### Returns

`boolean`
