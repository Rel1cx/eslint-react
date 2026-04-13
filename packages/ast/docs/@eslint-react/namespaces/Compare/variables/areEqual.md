[@eslint-react/ast](../../../../README.md) / [Compare](../README.md) / areEqual

# Variable: areEqual

```ts
const areEqual: {
  (a: Node): (b: Node) => boolean;
  (a: Node, b: Node): boolean;
};
```

Check if two nodes are equal

## Call Signature

```ts
(a: Node): (b: Node) => boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | `Node` |

### Returns

(`b`: `Node`) => `boolean`

## Call Signature

```ts
(a: Node, b: Node): boolean;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | `Node` |
| `b` | `Node` |

### Returns

`boolean`

## Param

node to compare

## Param

node to compare

## Returns

`true` if node equal

## See

https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
