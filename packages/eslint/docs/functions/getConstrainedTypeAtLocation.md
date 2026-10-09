[@eslint-react/eslint](../README.md) / getConstrainedTypeAtLocation

# Function: getConstrainedTypeAtLocation()

```ts
function getConstrainedTypeAtLocation(services: ParserServicesWithTypeInformation, node: Node): Type;
```

Resolves the given node's type. Will return the type's generic constraint, if it has one.

Warning - if the type is generic and does _not_ have a constraint, the type will be
returned as-is, rather than returning an `unknown` type. This can be checked
for by checking for the type flag ts.TypeFlags.TypeParameter.

Adapted from `getConstrainedTypeAtLocation` in `@typescript-eslint/type-utils`
(MIT License, Copyright (c) 2019 typescript-eslint and other contributors,
https://github.com/typescript-eslint/typescript-eslint) so that consumers don't
need to load `@typescript-eslint/type-utils`, whose entry point eagerly loads
the `eslint` package.

## Parameters

| Parameter  | Type                                |
| ---------- | ----------------------------------- |
| `services` | `ParserServicesWithTypeInformation` |
| `node`     | `Node`                              |

## Returns

`Type`

## See

https://github.com/typescript-eslint/typescript-eslint/issues/10438
