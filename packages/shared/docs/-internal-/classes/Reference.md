[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Reference

# Class: Reference

A Reference represents a single occurrence of an identifier in code.

## Constructors

### new Reference()

> **new Reference**(`identifier`, `scope`, `flag`, `writeExpr`?, `maybeImplicitGlobal`?, `init`?, `referenceType`?): [`Reference`](Reference.md)

#### Parameters

##### identifier

[`Identifier`](../interfaces/Identifier.md) | [`JSXIdentifier`](../interfaces/JSXIdentifier.md)

##### scope

[`Scope`](../type-aliases/Scope.md)

##### flag

[`ReferenceFlag`](../enumerations/ReferenceFlag.md)

##### writeExpr?

`null` | [`Node`](../type-aliases/Node.md)

##### maybeImplicitGlobal?

`null` | [`ReferenceImplicitGlobal`](../interfaces/ReferenceImplicitGlobal.md)

##### init?

`boolean`

##### referenceType?

[`ReferenceTypeFlag`](../enumerations/ReferenceTypeFlag.md)

#### Returns

[`Reference`](Reference.md)

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

***

### from

> `readonly` **from**: [`Scope`](../type-aliases/Scope.md)

Reference to the enclosing Scope.

***

### identifier

> `readonly` **identifier**: [`Identifier`](../interfaces/Identifier.md) \| [`JSXIdentifier`](../interfaces/JSXIdentifier.md)

Identifier syntax node.

***

### init?

> `readonly` `optional` **init**: `boolean`

`true` if this writing reference is a variable initializer or a default value.

***

### maybeImplicitGlobal?

> `readonly` `optional` **maybeImplicitGlobal**: `null` \| [`ReferenceImplicitGlobal`](../interfaces/ReferenceImplicitGlobal.md)

***

### resolved

> **resolved**: `null` \| [`Variable`](Variable.md)

The [Variable](Variable.md) object that this reference refers to. If such variable was not defined, this is `null`.

***

### writeExpr?

> `readonly` `optional` **writeExpr**: `null` \| [`Node`](../type-aliases/Node.md)

If reference is writeable, this is the node being written to it.

## Accessors

### isTypeReference

#### Get Signature

> **get** **isTypeReference**(): `boolean`

True if this reference can reference types

##### Returns

`boolean`

***

### isValueReference

#### Get Signature

> **get** **isValueReference**(): `boolean`

True if this reference can reference values

##### Returns

`boolean`

## Methods

### isRead()

> **isRead**(): `boolean`

Whether the reference is readable.

#### Returns

`boolean`

***

### isReadOnly()

> **isReadOnly**(): `boolean`

Whether the reference is read-only.

#### Returns

`boolean`

***

### isReadWrite()

> **isReadWrite**(): `boolean`

Whether the reference is read-write.

#### Returns

`boolean`

***

### isWrite()

> **isWrite**(): `boolean`

Whether the reference is writeable.

#### Returns

`boolean`

***

### isWriteOnly()

> **isWriteOnly**(): `boolean`

Whether the reference is write-only.

#### Returns

`boolean`
