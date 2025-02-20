[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSONSchema4ObjectSchema

# Interface: JSONSchema4ObjectSchema

## See

https://json-schema.org/understanding-json-schema/reference/object.html

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

### additionalProperties?

> `optional` **additionalProperties**: `boolean` \| [`JSONSchema4`](../type-aliases/JSONSchema4.md)

This attribute defines a schema for all properties that are not
explicitly defined in an object type definition. If specified, the
value MUST be a schema or a boolean. If false is provided, no
additional properties are allowed beyond the properties defined in
the schema. The default value is an empty schema which allows any
value for additional properties.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.4

***

### allOf?

> `optional` **allOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(AND) Must be valid against all of the sub-schemas

#### Inherited from

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

### dependencies?

> `optional` **dependencies**: [`Record`](../type-aliases/Record.md)\<`string`, `string`[] \| [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

The `dependencies` keyword conditionally applies a sub-schema when a given
property is present. This schema is applied in the same way `allOf` applies
schemas. Nothing is merged or extended. Both schemas apply independently.

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

### maxProperties?

> `optional` **maxProperties**: `number`

The maximum number of properties allowed for record-style schemas

***

### minProperties?

> `optional` **minProperties**: `number`

The minimum number of properties required for record-style schemas

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

### patternProperties?

> `optional` **patternProperties**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

This attribute is an object that defines the schema for a set of
property names of an object instance. The name of each property of
this attribute's object is a regular expression pattern in the ECMA
262/Perl 5 format, while the value is a schema. If the pattern
matches the name of a property on the instance object, the value of
the instance's property MUST be valid against the pattern name's
schema value.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.3

***

### properties?

> `optional` **properties**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

This attribute is an object with property definitions that define the
valid values of instance object property values. When the instance
value is an object, the property values of the instance object MUST
conform to the property definitions in this object. In this object,
each property definition's value MUST be a schema, and the property's
name MUST be the name of the instance property that it defines.  The
instance property value MUST be valid according to the schema from
the property definition. Properties are considered unordered, the
order of the instance properties MAY be in any order.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.2

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

### type

> **type**: `"object"`

A single type, or a union of simple types

#### Overrides

[`JSONSchema4Base`](JSONSchema4Base.md).[`type`](JSONSchema4Base.md#type)
