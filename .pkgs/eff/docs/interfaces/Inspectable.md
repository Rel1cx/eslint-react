[@local/eff](../README.md) / Inspectable

# Interface: Inspectable

Interface for objects that can be inspected and provide custom string representations.

**Details**

Objects implementing this interface can control how they appear in debugging contexts,
JSON serialization, and Node.js inspection. This is particularly useful for creating
custom data types that display meaningful information during development.

## Since

2.0.0

## Methods

### \[NodeInspectSymbol\]()

```ts
NodeInspectSymbol: unknown;
```

#### Returns

`unknown`

---

### toJSON()

```ts
toJSON(): unknown;
```

#### Returns

`unknown`

---

### toString()

```ts
toString(): string;
```

#### Returns

`string`
