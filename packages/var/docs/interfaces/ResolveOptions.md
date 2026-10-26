[@eslint-react/var](../README.md) / ResolveOptions

# Interface: ResolveOptions

Options shared by the identifier-resolution helpers.

Used by [resolve](../functions/resolve.md), [resolveOrigin](../functions/resolveOrigin.md), and the internal binding
helpers.

## Extended by

- [`ResolveOriginChainOptions`](ResolveOriginChainOptions.md)

## Properties

| Property                                     | Type      | Description                                                                                                                                                                                                                                                                |
| -------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-at"></a> `at?`               | `number`  | Index of the definition to select (default: `0`; negative indexes count from the end). `resolve` and `resolveOrigin` default to the first definition. `resolveOriginChain` applies this index at every step. `resolveObjectType` defaults to `-1` (the latest definition). |
| <a id="property-localonly"></a> `localOnly?` | `boolean` | Only look up the variable in the identifier's own scope (default: `false`). When `false`, the scope chain is traversed upward so references to outer-scope bindings are resolved. `resolveObjectType` exposes the same concept as `scope: "local" \| "chain"`.             |
