[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSONSchema4ArraySchema

# Interface: JSONSchema4ArraySchema

## See

https://json-schema.org/understanding-json-schema/reference/array.html

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

### additionalItems?

> `optional` **additionalItems**: `boolean` \| [`JSONSchema4`](../type-aliases/JSONSchema4.md)

May only be defined when "items" is defined, and is a tuple of JSONSchemas.

This provides a definition for additional items in an array instance
when tuple definitions of the items is provided.  This can be false
to indicate additional items in the array are not allowed, or it can
be a schema that defines the schema of the additional items.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.6

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

### items?

> `optional` **items**: [`JSONSchema4`](../type-aliases/JSONSchema4.md) \| [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

This attribute defines the allowed items in an instance array, and
MUST be a schema or an array of schemas.  The default value is an
empty schema which allows any value for items in the instance array.

When this attribute value is a schema and the instance value is an
array, then all the items in the array MUST be valid according to the
schema.

When this attribute value is an array of schemas and the instance
value is an array, each position in the instance array MUST conform
to the schema in the corresponding position for this array.  This
called tuple typing.  When tuple typing is used, additional items are
allowed, disallowed, or constrained by the "additionalItems"
(Section 5.6) attribute using the same rules as
"additionalProperties" (Section 5.4) for objects.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.5

***

### maxItems?

> `optional` **maxItems**: `number`

Defines the maximum length of an array

***

### minItems?

> `optional` **minItems**: `number`

Defines the minimum length of an array

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

### type

> **type**: `"array"`

A single type, or a union of simple types

#### Overrides

[`JSONSchema4Base`](JSONSchema4Base.md).[`type`](JSONSchema4Base.md#type)

***

### uniqueItems?

> `optional` **uniqueItems**: `boolean`

Enforces that all items in the array are unique
