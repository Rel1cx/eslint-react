[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSONSchema4AllOfSchema

# Interface: JSONSchema4AllOfSchema

## Extends

- [`JSONSchema4Base`](JSONSchema4Base.md)

## Properties

### $defs?

> `optional` **$defs**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`$defs`](JSONSchema4Base.md#$defs)

***

### $ref?

> `optional` **$ref**: `string`

Path to a schema defined in `definitions`/`$defs` that will form the base
for this schema.

If you are defining an "array" schema (`schema: [ ... ]`) for your rule
then you should prefix this with `items/0` so that the validator can find
your definitions.

eg: `'#/items/0/definitions/myDef'`

Otherwise if you are defining an "object" schema (`schema: { ... }`) for
your rule you can directly reference your definitions

eg: `'#/definitions/myDef'`

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`$ref`](JSONSchema4Base.md#$ref)

***

### $schema?

> `optional` **$schema**: `string`

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`$schema`](JSONSchema4Base.md#$schema)

***

### allOf

> **allOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(AND) Must be valid against all of the sub-schemas

#### Overrides

[`JSONSchema4Base`](JSONSchema4Base.md).[`allOf`](JSONSchema4Base.md#allof)

***

### anyOf?

> `optional` **anyOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(OR) Must be valid against any of the sub-schemas

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`anyOf`](JSONSchema4Base.md#anyof)

***

### default?

> `optional` **default**: [`JSONSchema4TypeExtended`](../type-aliases/JSONSchema4TypeExtended.md)

The default value for the item if not present

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`default`](JSONSchema4Base.md#default)

***

### definitions?

> `optional` **definitions**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`definitions`](JSONSchema4Base.md#definitions)

***

### description?

> `optional` **description**: `string`

This attribute is a string that provides a full description of the of
purpose the instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.22

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`description`](JSONSchema4Base.md#description)

***

### extends?

> `optional` **extends**: `string` \| `string`[]

The value of this property MUST be another schema which will provide
a base schema which the current schema will inherit from.  The
inheritance rules are such that any instance that is valid according
to the current schema MUST be valid according to the referenced
schema.  This MAY also be an array, in which case, the instance MUST
be valid for all the schemas in the array.  A schema that extends
another schema MAY define additional attributes, constrain existing
attributes, or add other constraints.

Conceptually, the behavior of extends can be seen as validating an
instance against all constraints in the extending schema as well as
the extended schema(s).

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.26

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`extends`](JSONSchema4Base.md#extends)

***

### id?

> `optional` **id**: `string`

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`id`](JSONSchema4Base.md#id)

***

### not?

> `optional` **not**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)

(NOT) Must not be valid against the given schema

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`not`](JSONSchema4Base.md#not)

***

### oneOf?

> `optional` **oneOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(XOR) Must be valid against exactly one of the sub-schemas

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`oneOf`](JSONSchema4Base.md#oneof)

***

### required?

> `optional` **required**: `boolean` \| `string`[]

This attribute indicates if the instance must have a value, and not
be undefined. This is false by default, making the instance
optional.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.7

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`required`](JSONSchema4Base.md#required)

***

### title?

> `optional` **title**: `string`

This attribute is a string that provides a short description of the
instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.21

#### Inherited from

[`JSONSchema4Base`](JSONSchema4Base.md).[`title`](JSONSchema4Base.md#title)

***

### type?

> `optional` **type**: `undefined`

A single type, or a union of simple types

#### Overrides

[`JSONSchema4Base`](JSONSchema4Base.md).[`type`](JSONSchema4Base.md#type)
