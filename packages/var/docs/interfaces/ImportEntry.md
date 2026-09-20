[@eslint-react/var](../README.md) / ImportEntry

# Interface: ImportEntry

A single local import binding, modeled after the specification's ImportEntry.

Entries are the ground truth of the lookup: one is recorded per import
specifier (or pre-registered builtin namespace), and every query on
[ImportLookup](ImportLookup.md) is answered from them.

## Properties

| Property                                    | Type                       | Description                                                                                                                                                              |
| ------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="property-kind"></a> `kind`           | `"named"` \| `"namespace"` | The import form. `"named"` covers both named imports and default imports; a default import is distinguished by its [ImportEntry.name](#property-name) being `"default"`. |
| <a id="property-local"></a> `local`         | `string`                   | The local name the import is bound to (the alias when one is used).                                                                                                      |
| <a id="property-name"></a> `name`           | `string`                   | The name of the imported export. `"default"` for default imports and `""` for namespace imports, which bind the module as a whole rather than a single export.           |
| <a id="property-specifier"></a> `specifier` | `string`                   | The module specifier as written in the source, e.g. `"react-dom/client"`.                                                                                                |
