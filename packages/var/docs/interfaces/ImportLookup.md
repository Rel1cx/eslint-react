[@eslint-react/var](../README.md) / ImportLookup

# Interface: ImportLookup

## Methods

### all()

```ts
all(): readonly ImportEntry[];
```

Every import entry, in source order.

#### Returns

readonly [`ImportEntry`](ImportEntry.md)[]

---

### binding()

```ts
binding(local: string): ImportEntry | undefined;
```

By local name: the import entry a local name is bound to, if any.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `local`   | `string` |

#### Returns

[`ImportEntry`](ImportEntry.md) \| `undefined`

---

### bindingsOf()

```ts
bindingsOf(name: string): readonly ImportEntry[];
```

By imported name: all local bindings of the export `name`, in source order.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |

#### Returns

readonly [`ImportEntry`](ImportEntry.md)[]

---

### has()

```ts
has(local: string, name: string): boolean;
```

Derived: `local` is bound to the named export `name`.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `local`   | `string` |
| `name`    | `string` |

#### Returns

`boolean`

---

### hasNamespace()

```ts
hasNamespace(local: string): boolean;
```

Derived: `local` is a default or namespace binding.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `local`   | `string` |

#### Returns

`boolean`
