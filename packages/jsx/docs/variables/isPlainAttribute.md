[@eslint-react/jsx](../README.md) / isPlainAttribute

# Variable: isPlainAttribute

```ts
const isPlainAttribute: {
  (name: string): (node: Node | null | undefined) => boolean;
  (node: Node | null | undefined, name: string): boolean;
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
(name: string): (node: Node | null | undefined) => boolean;
```

### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |

### Returns

(`node`: `Node` \| `null` \| `undefined`) => `boolean`

## Call Signature

```ts
(node: Node | null | undefined, name: string): boolean;
```

### Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |
| `name`    | `string`                        |

### Returns

`boolean`

## Param

**node**

The node to check.

## Param

**name**

The plain attribute name to match (ex: "className").

## Returns

`true` if the node is a `JSXAttribute` whose identifier name is `name`.

## Remarks

This is a name predicate, not a type guard: a `false` result does not mean
the node is not a `JSXAttribute`, only that it does not match `name`.
