[@eslint-react/ast](../../../../README.md) / [View](../README.md) / EmptyView

# Class: EmptyView

View over the absence of a node, consumed as `View.EmptyView`.

A null-object view returned by accessors whose child may be absent (ex: the
argument of a bare `return`) and by `from()` when given `null` or `undefined`.
It wraps no node: `node`, `type`, and `parent` are always `undefined`.
Unlike node views, it is not created from the tree, so there is nothing to
unwrap and no source text to read. Use `isEmptyView()` to narrow a
`View | EmptyView` union, or compare `type` directly.

## Extends

- `Class`

## Constructors

### Constructor

```ts
new EmptyView(context?: ViewContext): EmptyView;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`EmptyView`

#### Overrides

```ts
InspectableClass.constructor;
```

## Properties

| Property                                | Modifier   | Type                                                         | Description                                               |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context, kept for symmetry with node views. |

## Accessors

### node

#### Get Signature

```ts
get node(): undefined;
```

Always `undefined`: an empty view wraps no node.

##### Returns

`undefined`

---

### parent

#### Get Signature

```ts
get parent(): undefined;
```

Always `undefined`: an empty view has no parent.

##### Returns

`undefined`

---

### type

#### Get Signature

```ts
get type(): undefined;
```

Always `undefined`: an empty view wraps no node.

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
InspectableClass.[NodeInspectSymbol]
```

---

### toJSON()

```ts
toJSON(): EmptyViewJSON;
```

Return the structured representation of this empty view.

#### Returns

[`EmptyViewJSON`](../interfaces/EmptyViewJSON.md)

#### Overrides

```ts
InspectableClass.toJSON;
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
InspectableClass.toString;
```
