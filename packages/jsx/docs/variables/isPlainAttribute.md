[@eslint-react/jsx](../README.md) / isPlainAttribute

# Variable: isPlainAttribute

```ts
const isPlainAttribute: {
  (name: string): (node: Node | null | undefined) => node is JSXAttribute;
  (node: Node | null | undefined, name: string): node is JSXAttribute;
};
```

Check if the node is a `JSXAttribute` with the given plain identifier name.

Namespaced attributes (ex: `xml:space`) never match; use
[isAttributeNamed](isAttributeNamed.md) for full-name matching.

Supports both data-first and data-last (curried) call styles:

- `isPlainAttribute(node, "className")`
- `isPlainAttribute("className")(node)`.

## Call Signature

```ts
(name: string): (node: Node | null | undefined) => node is JSXAttribute;
```

### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |

### Returns

(`node`: `Node` \| `null` \| `undefined`) => `node is JSXAttribute`

## Call Signature

```ts
(node: Node | null | undefined, name: string): node is JSXAttribute;
```

### Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |
| `name`    | `string`                        |

### Returns

`node is JSXAttribute`

## Param

**node**

The node to check.

## Param

**name**

The plain attribute name to match (ex: "className").

## Returns

`true` if the node is a `JSXAttribute` whose identifier name is `name`.
