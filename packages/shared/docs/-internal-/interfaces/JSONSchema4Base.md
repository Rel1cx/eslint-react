[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSONSchema4Base

# Interface: JSONSchema4Base

## Extended by

- [`JSONSchema4AllOfSchema`](JSONSchema4AllOfSchema.md)
- [`JSONSchema4AnyOfSchema`](JSONSchema4AnyOfSchema.md)
- [`JSONSchema4AnySchema`](JSONSchema4AnySchema.md)
- [`JSONSchema4ArraySchema`](JSONSchema4ArraySchema.md)
- [`JSONSchema4BooleanSchema`](JSONSchema4BooleanSchema.md)
- [`JSONSchema4NullSchema`](JSONSchema4NullSchema.md)
- [`JSONSchema4NumberSchema`](JSONSchema4NumberSchema.md)
- [`JSONSchema4ObjectSchema`](JSONSchema4ObjectSchema.md)
- [`JSONSchema4OneOfSchema`](JSONSchema4OneOfSchema.md)
- [`JSONSchema4RefSchema`](JSONSchema4RefSchema.md)
- [`JSONSchema4StringSchema`](JSONSchema4StringSchema.md)

## Properties

### $defs?

> `optional` **$defs**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

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

***

### $schema?

> `optional` **$schema**: `string`

***

### allOf?

> `optional` **allOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(AND) Must be valid against all of the sub-schemas

***

### anyOf?

> `optional` **anyOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(OR) Must be valid against any of the sub-schemas

***

### default?

> `optional` **default**: [`JSONSchema4TypeExtended`](../type-aliases/JSONSchema4TypeExtended.md)

The default value for the item if not present

***

### definitions?

> `optional` **definitions**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

***

### description?

> `optional` **description**: `string`

This attribute is a string that provides a full description of the of
purpose the instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.22

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

***

### id?

> `optional` **id**: `string`

***

### not?

> `optional` **not**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)

(NOT) Must not be valid against the given schema

***

### oneOf?

> `optional` **oneOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(XOR) Must be valid against exactly one of the sub-schemas

***

### required?

> `optional` **required**: `boolean` \| `string`[]

This attribute indicates if the instance must have a value, and not
be undefined. This is false by default, making the instance
optional.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.7

***

### title?

> `optional` **title**: `string`

This attribute is a string that provides a short description of the
instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.21

***

### type?

> `optional` **type**: [`JSONSchema4TypeName`](../type-aliases/JSONSchema4TypeName.md) \| [`JSONSchema4TypeName`](../type-aliases/JSONSchema4TypeName.md)[]

A single type, or a union of simple types
