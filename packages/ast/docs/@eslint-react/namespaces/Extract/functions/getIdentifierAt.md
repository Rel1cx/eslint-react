[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getIdentifierAt

# Function: getIdentifierAt()

```ts
function getIdentifierAt(node: PrivateIdentifier | Expression, position: number): Identifier | null;
```

Get the identifier at a given position in a member expression chain (ex: position `0` in `a.b.c` is `a`).

## Parameters

| Parameter  | Type                                | Description                               |
| ---------- | ----------------------------------- | ----------------------------------------- |
| `node`     | `PrivateIdentifier` \| `Expression` | The expression to walk.                   |
| `position` | `number`                            | The position of the identifier to return. |

## Returns

`Identifier` \| `null`

The identifier at the given position, or `null` when there is none.
