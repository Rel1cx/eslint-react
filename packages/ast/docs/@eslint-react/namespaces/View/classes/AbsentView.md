[@eslint-react/ast](../../../../README.md) / [View](../README.md) / AbsentView

# Class: AbsentView

View over the absence of a node, consumed as `View.AbsentView`.

A null-object view returned by accessors whose child may be absent (ex: the
argument of a bare `return`) and by `from()` when given `null` or `undefined`.
It wraps no node: `node`, `type`, and `parent` are always `undefined`.
Unlike node views, it is not created from the tree, so there is nothing to
unwrap. Use `isAbsentView()` to narrow a `View | AbsentView` union, or
compare `type` directly.

## Extends

- `Class`

## Constructors

### Constructor

```ts
new AbsentView(): AbsentView;
```

#### Returns

`AbsentView`

#### Inherited from

```ts
Inspectable.Class.constructor;
```

## Accessors

### node

#### Get Signature

```ts
get node(): undefined;
```

Always `undefined`: an absent view wraps no node.

##### Returns

`undefined`

---

### parent

#### Get Signature

```ts
get parent(): undefined;
```

Always `undefined`: an absent view has no parent.

##### Returns

`undefined`

---

### type

#### Get Signature

```ts
get type(): undefined;
```

Always `undefined`: an absent view wraps no node.

##### Returns

`undefined`

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

#### Inherited from

```ts
Inspectable.Class.[NodeInspectSymbol]
```

---

### toJSON()

```ts
toJSON(): {
};
```

Returns a JSON representation of this object.

**Details**

Subclasses must implement this method to define how the object
should be serialized for debugging and inspection purposes.

#### Returns

```ts
{
}
```

#### Since

2.0.0

#### Overrides

```ts
Inspectable.Class.toJSON;
```

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

#### Inherited from

```ts
Inspectable.Class.toString;
```
