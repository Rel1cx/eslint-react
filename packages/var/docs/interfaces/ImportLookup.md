[@eslint-react/var](../README.md) / ImportLookup

# Interface: ImportLookup

A read-only index over the local import bindings of a program.

All queries are O(1) or O(k) lookups over indexes built once at creation
time, and results preserve source order.

## Methods

### all()

```ts
all(): readonly ImportEntry[];
```

Return every import entry, in source order.

#### Returns

readonly [`ImportEntry`](../type-aliases/ImportEntry.md)[]

---

### binding()

```ts
binding(local: string): ImportEntry | null;
```

Look up the import entry a local name is bound to.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `local`   | `string` | The local binding name. |

#### Returns

[`ImportEntry`](../type-aliases/ImportEntry.md) \| `null`

The matching entry, or `null` if the name is not imported.

---

### bindingsOf()

```ts
bindingsOf(name: string): readonly ImportEntry[];
```

Look up all local bindings of a given imported export name.

#### Parameters

| Parameter | Type     | Description                                                                             |
| --------- | -------- | --------------------------------------------------------------------------------------- |
| `name`    | `string` | The imported export name (`"default"` for default imports, `""` for namespace imports). |

#### Returns

readonly [`ImportEntry`](../type-aliases/ImportEntry.md)[]

The matching entries in source order, possibly empty.

---

### has()

```ts
has(local: string, name: string): boolean;
```

Check whether a local name is bound to a specific imported export.

`"default"` matches default imports; namespace imports never match because
they bind the module as a whole rather than a single export.

#### Parameters

| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
| `local`   | `string` | The local binding name.   |
| `name`    | `string` | The imported export name. |

#### Returns

`boolean`

---

### hasDefault()

```ts
hasDefault(local: string): boolean;
```

Check whether a local name is a default import.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `local`   | `string` | The local binding name. |

#### Returns

`boolean`

---

### isModuleBinding()

```ts
isModuleBinding(local: string): boolean;
```

Check whether a local name refers to the module as a whole, i.e. it is a
default or namespace binding rather than a single named export.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `local`   | `string` | The local binding name. |

#### Returns

`boolean`
