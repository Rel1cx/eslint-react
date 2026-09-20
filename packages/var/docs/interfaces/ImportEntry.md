[@eslint-react/var](../README.md) / ImportEntry

# Interface: ImportEntry

One entry per local import binding, mirroring the specification's ImportEntry model.

Entries are the ground truth of the lookup; every query derives from them.

## Properties

| Property                                    | Type                       | Description                                                                            |
| ------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| <a id="property-kind"></a> `kind`           | `"named"` \| `"namespace"` | The import form: `"named"` also covers default imports (whose `name` is `"default"`).  |
| <a id="property-local"></a> `local`         | `string`                   | The local binding name.                                                                |
| <a id="property-name"></a> `name`           | `string`                   | The imported export name; `"default"` for default imports, `""` for namespace imports. |
| <a id="property-specifier"></a> `specifier` | `string`                   | The decoded module specifier as written, e.g. `"react-dom/client"`.                    |
