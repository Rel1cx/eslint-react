[@eslint-react/ast](../../../../README.md) / [Compare](../README.md) / isEqual

# Variable: isEqual

```ts
const isEqual: {
  (a: Node): (b: Node) => boolean;
  (a: Node, b: Node): boolean;
};
```

Check if two nodes are structurally equal.

- Supports identifiers, literals, template literals/elements, member/call/chain expressions, JSX identifiers/namespaced names/member expressions/attributes, and `this`.
- Node types outside that list (including functions and classes) are equal only when they are the same node.
- Compares chain expressions through their inner expression, so optional segments remain significant (`a?.b` equals `a?.b` but not `a.b`).
- Compares literals by value and regex literals by `pattern` and `flags`.
- Ignores source locations (`loc`, `range`) and `parent` pointers.
- Ignores type-level syntax: type annotations and type arguments are not compared, and type expressions are unwrapped, so `foo as string` equals `foo`.

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
