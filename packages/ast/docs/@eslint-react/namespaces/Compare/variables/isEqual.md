[@eslint-react/ast](../../../../README.md) / [Compare](../README.md) / isEqual

# Variable: isEqual

```ts
const isEqual: {
  (a: Node): (b: Node) => boolean;
  (a: Node, b: Node): boolean;
};
```

Check if two nodes are structurally equal.

## Call Signature

```ts
(a: Node): (b: Node) => boolean;
```

### Parameters

| Parameter | Type   |
| --------- | ------ |
| `a`       | `Node` |

### Returns

(`b`: `Node`) => `boolean`

## Call Signature

```ts
(a: Node, b: Node): boolean;
```

### Parameters

| Parameter | Type   |
| --------- | ------ |
| `a`       | `Node` |
| `b`       | `Node` |

### Returns

`boolean`

## Param

**a**

The first node to compare.

## Param

**b**

The second node to compare.

## Returns

`true` if the nodes are equal.

## See

https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
