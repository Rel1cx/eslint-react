[@eslint-react/jsx](../README.md) / isAttribute

# Variable: isAttribute

```ts
const isAttribute: {
  (name: string): (node: Node) => node is JSXAttribute;
  (node: Node, name: string): node is JSXAttribute;
};
```

Check whether a node is a `JSXAttribute` with the given name.

Only plain identifier names are matched (ex: `className`); namespaced
attributes (ex: `xml:space`) do not match.

Supports both data-first and data-last (curried) call styles:

- `isAttribute(node, "className")`
- `isAttribute("className")(node)`.

## Call Signature

```ts
(name: string): (node: Node) => node is JSXAttribute;
```

### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |

### Returns

(`node`: `Node`) => `node is JSXAttribute`

## Call Signature

```ts
(node: Node, name: string): node is JSXAttribute;
```

### Parameters

| Parameter | Type     |
| --------- | -------- |
| `node`    | `Node`   |
| `name`    | `string` |

### Returns

`node is JSXAttribute`

## Param

**node**

The AST node to test.

## Param

**name**

The attribute name to match (ex: "className").

## Returns

`true` when the node is a `JSXAttribute` named `name`.
