[@eslint-react/jsx](../README.md) / isAttributeNamed

# Variable: isAttributeNamed

```ts
const isAttributeNamed: {
  (name: string): (node: Node | null | undefined) => boolean;
  (node: Node | null | undefined, name: string): boolean;
};
```

Check if the node is a `JSXAttribute` with the given full name.

The name includes the namespace when present, so `xml:space` can be matched.
This is the name semantics used by [findAttribute](../functions/findAttribute.md) and the string form
of [AttributeTest](../type-aliases/AttributeTest.md).

Supports both data-first and data-last (curried) call styles.

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

The full attribute name to match (ex: "className", "xml:space").

## Returns

`true` if the node is a `JSXAttribute` whose full name is `name`.

## Remarks

This is a name predicate, not a type guard: a `false` result does not mean
the node is not a `JSXAttribute`, only that it does not match `name`.
