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

readonly [`ImportEntry`](ImportEntry.md)[]

---

### binding()

```ts
binding(local: string): ImportEntry | undefined;
```

Look up the import entry a local name is bound to.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `local`   | `string` | The local binding name. |

#### Returns

[`ImportEntry`](ImportEntry.md) \| `undefined`

The matching entry, or `undefined` if the name is not imported.

---

### bindingsOf()

```ts
bindingsOf(name: string): readonly ImportEntry[];
```

Look up all local bindings of a given imported export name.

#### Parameters

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| `name`    | `string` | The imported export name (`"default"` for default imports). |

#### Returns

readonly [`ImportEntry`](ImportEntry.md)[]

The matching entries in source order, possibly empty.

---

### has()

```ts
has(local: string, name: string): boolean;
```

Check whether a local name is bound to a specific imported export.

#### Parameters

| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
| `local`   | `string` | The local binding name.   |
| `name`    | `string` | The imported export name. |

#### Returns

`boolean`

---

### hasNamespace()

```ts
hasNamespace(local: string): boolean;
```

Check whether a local name is a default or namespace binding, i.e. one
that refers to the module as a whole rather than to a single named export.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `local`   | `string` | The local binding name. |

#### Returns

`boolean`
