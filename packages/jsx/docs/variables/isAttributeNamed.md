[@eslint-react/jsx](../README.md) / isAttributeNamed

# Variable: isAttributeNamed

```ts
const isAttributeNamed: {
  (name: string): (node: Node | null | undefined) => node is JSXAttribute;
  (node: Node | null | undefined, name: string): node is JSXAttribute;
};
```

Check if the node is a `JSXAttribute` with the given full name.

The name includes the namespace when present, so `xml:space` can be matched.
This is the name semantics used by [findAttribute](../functions/findAttribute.md) and the string form
of [AttributeTest](../type-aliases/AttributeTest.md).

Supports both data-first and data-last (curried) call styles.

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

The full attribute name to match (ex: "className", "xml:space").

## Returns

`true` if the node is a `JSXAttribute` whose full name is `name`.
