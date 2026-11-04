[@local/testkit](../README.md) / TypeTestBed

# Interface: TypeTestBed

A minimal in-memory TypeScript program exposing its type checker.
Built for tests that need real `ts.Type`/`ts.Symbol` objects without fixture files on disk.

## Properties

| Property                                | Type          | Description                                |
| --------------------------------------- | ------------- | ------------------------------------------ |
| <a id="property-checker"></a> `checker` | `TypeChecker` | The type checker of the in-memory program. |
| <a id="property-program"></a> `program` | `Program`     | The in-memory program.                     |

## Methods

### getSymbolOf()

```ts
getSymbolOf(name: string): Symbol;
```

Resolves the symbol of the first declaration named `name` in the virtual files.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `name`    | `string` | The declaration name to look up. |

#### Returns

`Symbol`

The symbol of the declaration.

---

### getTypeOf()

```ts
getTypeOf(name: string): Type;
```

Resolves the declared type of the first declaration named `name` in the virtual files.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `name`    | `string` | The declaration name to look up. |

#### Returns

`Type`

The declared type of the declaration.

---

### getUnionPartsOf()

```ts
getUnionPartsOf(name: string): Type[];
```

Resolves the type of `name` and splits it into union constituents.
Non-union types yield a single-element array.

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `name`    | `string` | The declaration name to look up. |

#### Returns

`Type`[]

The union constituents of the type, or the type itself.
