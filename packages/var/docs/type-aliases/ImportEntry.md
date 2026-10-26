[@eslint-react/var](../README.md) / ImportEntry

# Type Alias: ImportEntry

```ts
type ImportEntry =
  | {
    kind: "named" | "default";
    local: string;
    name: string;
    specifier: string;
  }
  | {
    kind: "namespace";
    local: string;
    specifier: string;
  };
```

A single local import binding, modeled after the specification's ImportEntry.

Entries are the ground truth of the lookup: one is recorded per import
specifier (or pre-registered builtin namespace), and every query on
[ImportLookup](../interfaces/ImportLookup.md) is answered from them.

## Union Members

### Type Literal

```ts
{
  kind: "named" | "default";
  local: string;
  name: string;
  specifier: string;
}
```

| Name        | Type                     | Description                                                               |
| ----------- | ------------------------ | ------------------------------------------------------------------------- |
| `kind`      | `"named"` \| `"default"` | A named or default import; both are bound to a single export.             |
| `local`     | `string`                 | The local name the import is bound to (the alias when one is used).       |
| `name`      | `string`                 | The name of the imported export (`"default"` for default imports).        |
| `specifier` | `string`                 | The module specifier as written in the source, e.g. `"react-dom/client"`. |

---

### Type Literal

```ts
{
  kind: "namespace";
  local: string;
  specifier: string;
}
```

| Name        | Type          | Description                                            |
| ----------- | ------------- | ------------------------------------------------------ |
| `kind`      | `"namespace"` | A namespace import, which binds the module as a whole. |
| `local`     | `string`      | The local name the import is bound to.                 |
| `specifier` | `string`      | The module specifier as written in the source.         |
