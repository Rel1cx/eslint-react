[@eslint-react/var](../README.md) / ResolveOriginChainOptions

# Interface: ResolveOriginChainOptions

Options for [resolveOriginChain](../functions/resolveOriginChain.md).

## Extends

- [`ResolveOptions`](ResolveOptions.md)

## Properties

| Property                                     | Type      | Description                                                                                                                                                                                                                                                                | Inherited from                                                                            |
| -------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| <a id="property-at"></a> `at?`               | `number`  | Index of the definition to select (default: `0`; negative indexes count from the end). `resolve` and `resolveOrigin` default to the first definition. `resolveOriginChain` applies this index at every step. `resolveObjectType` defaults to `-1` (the latest definition). | [`ResolveOptions`](ResolveOptions.md).[`at`](ResolveOptions.md#property-at)               |
| <a id="property-localonly"></a> `localOnly?` | `boolean` | Only look up the variable in the identifier's own scope (default: `false`). When `false`, the scope chain is traversed upward so references to outer-scope bindings are resolved. `resolveObjectType` exposes the same concept as `scope: "local" \| "chain"`.             | [`ResolveOptions`](ResolveOptions.md).[`localOnly`](ResolveOptions.md#property-localonly) |
| <a id="property-maxdepth"></a> `maxDepth?`   | `number`  | Maximum number of resolution steps before giving up (default: `32`).                                                                                                                                                                                                       | -                                                                                         |
