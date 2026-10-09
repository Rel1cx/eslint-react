[@local/eff](../README.md) / InspectableClass

# Abstract Class: InspectableClass

Provides an abstract base class that implements the Inspectable interface.
Named `InspectableClass` instead of `Class` (its name in the upstream
`Inspectable` module) to avoid colliding with the `Pipeable` base class
exported from this file.

**Details**

This class provides a convenient way to create inspectable objects by extending it.
Subclasses only need to implement the `toJSON()` method, and they automatically
get proper `toString()` and Node.js inspection support.

## Since

2.0.0

## Constructors

### Constructor

```ts
new InspectableClass(): InspectableClass;
```

#### Returns

`InspectableClass`

## Methods

### \[NodeInspectSymbol\]()

```ts
NodeInspectSymbol: unknown;
```

Node.js custom inspection method.

#### Returns

`unknown`

#### Since

2.0.0

---

### toJSON()

```ts
abstract toJSON(): unknown;
```

Returns a JSON representation of this object.

**Details**

Subclasses must implement this method to define how the object
should be serialized for debugging and inspection purposes.

#### Returns

`unknown`

#### Since

2.0.0

---

### toString()

```ts
toString(): string;
```

Returns a formatted string representation of this object.

#### Returns

`string`

#### Since

2.0.0
