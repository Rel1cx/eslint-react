[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSONSchema4MultiSchema

# Interface: JSONSchema4MultiSchema

Construct a type with the properties of T except for those in type K.

## Extends

- [`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4ObjectSchema`](JSONSchema4ObjectSchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4ArraySchema`](JSONSchema4ArraySchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4StringSchema`](JSONSchema4StringSchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4NumberSchema`](JSONSchema4NumberSchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4BooleanSchema`](JSONSchema4BooleanSchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4NullSchema`](JSONSchema4NullSchema.md), `"enum"` \| `"type"`\>.[`Omit`](../type-aliases/Omit.md)\<[`JSONSchema4AnySchema`](JSONSchema4AnySchema.md), `"enum"` \| `"type"`\>

## Properties

### $defs?

> `optional` **$defs**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

#### Inherited from

`Omit.$defs`

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

`Omit.$ref`

***

### $schema?

> `optional` **$schema**: `string`

#### Inherited from

`Omit.$schema`

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

#### Inherited from

`Omit.additionalItems`

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

#### Inherited from

`Omit.additionalProperties`

***

### allOf?

> `optional` **allOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(AND) Must be valid against all of the sub-schemas

#### Inherited from

`Omit.allOf`

***

### anyOf?

> `optional` **anyOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(OR) Must be valid against any of the sub-schemas

#### Inherited from

`Omit.anyOf`

***

### default?

> `optional` **default**: [`JSONSchema4TypeExtended`](../type-aliases/JSONSchema4TypeExtended.md)

The default value for the item if not present

#### Inherited from

`Omit.default`

***

### definitions?

> `optional` **definitions**: [`Record`](../type-aliases/Record.md)\<`string`, [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

Reusable definitions that can be referenced via `$ref`

#### Inherited from

`Omit.definitions`

***

### dependencies?

> `optional` **dependencies**: [`Record`](../type-aliases/Record.md)\<`string`, `string`[] \| [`JSONSchema4`](../type-aliases/JSONSchema4.md)\>

The `dependencies` keyword conditionally applies a sub-schema when a given
property is present. This schema is applied in the same way `allOf` applies
schemas. Nothing is merged or extended. Both schemas apply independently.

#### Inherited from

`Omit.dependencies`

***

### description?

> `optional` **description**: `string`

This attribute is a string that provides a full description of the of
purpose the instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.22

#### Inherited from

`Omit.description`

***

### enum?

> `optional` **enum**: [`JSONSchema4Type`](../type-aliases/JSONSchema4Type.md)[]

This provides an enumeration of all possible values that are valid
for the instance property. This MUST be an array, and each item in
the array represents a possible value for the instance value. If
this attribute is defined, the instance value MUST be one of the
values in the array in order for the schema to be valid.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.19

***

### exclusiveMaximum?

> `optional` **exclusiveMaximum**: `boolean`

The exclusive minimum allowed value for the number
- `true` = `x < maximum`
- `false` = `x <= maximum`

Default is `false`

#### Inherited from

`Omit.exclusiveMaximum`

***

### exclusiveMinimum?

> `optional` **exclusiveMinimum**: `boolean`

Indicates whether or not `minimum` is the inclusive or exclusive minimum
- `true` = `x > minimum`
- `false` = `x ≥ minimum`

Default is `false`

#### Inherited from

`Omit.exclusiveMinimum`

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

`Omit.extends`

***

### format?

> `optional` **format**: `"time"` \| `"regex"` \| `"date"` \| `"date-time"` \| `"email"` \| `"hostname"` \| `"ipv4"` \| `"ipv6"` \| `"json-pointer"` \| `"json-pointer-uri-fragment"` \| `"relative-json-pointer"` \| `"uri"` \| `"uri-reference"` \| `"uri-template"` \| `"url"` \| `"uuid"`

The `format` keyword allows for basic semantic identification of certain
kinds of string values that are commonly used.

For example, because JSON doesn’t have a “DateTime” type, dates need to be
encoded as strings. `format` allows the schema author to indicate that the
string value should be interpreted as a date.

ajv v6 provides a few built-in formats - all other strings will cause AJV
to throw during schema compilation

#### Inherited from

`Omit.format`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`Omit.id`

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

#### Inherited from

`Omit.items`

***

### maximum?

> `optional` **maximum**: `number`

The maximum allowed value for the number

#### Inherited from

`Omit.maximum`

***

### maxItems?

> `optional` **maxItems**: `number`

Defines the maximum length of an array

#### Inherited from

`Omit.maxItems`

***

### maxLength?

> `optional` **maxLength**: `number`

The maximum allowed length for the string

#### Inherited from

`Omit.maxLength`

***

### maxProperties?

> `optional` **maxProperties**: `number`

The maximum number of properties allowed for record-style schemas

#### Inherited from

`Omit.maxProperties`

***

### minimum?

> `optional` **minimum**: `number`

The minimum allowed value for the number

#### Inherited from

`Omit.minimum`

***

### minItems?

> `optional` **minItems**: `number`

Defines the minimum length of an array

#### Inherited from

`Omit.minItems`

***

### minLength?

> `optional` **minLength**: `number`

The minimum allowed length for the string

#### Inherited from

`Omit.minLength`

***

### minProperties?

> `optional` **minProperties**: `number`

The minimum number of properties required for record-style schemas

#### Inherited from

`Omit.minProperties`

***

### multipleOf?

> `optional` **multipleOf**: `number`

Numbers can be restricted to a multiple of a given number, using the
`multipleOf` keyword. It may be set to any positive number.

#### Inherited from

`Omit.multipleOf`

***

### not?

> `optional` **not**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)

(NOT) Must not be valid against the given schema

#### Inherited from

`Omit.not`

***

### oneOf?

> `optional` **oneOf**: [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

(XOR) Must be valid against exactly one of the sub-schemas

#### Inherited from

`Omit.oneOf`

***

### pattern?

> `optional` **pattern**: `string`

The `pattern` keyword is used to restrict a string to a particular regular
expression. The regular expression syntax is the one defined in JavaScript
(ECMA 262 specifically) with Unicode support.

When defining the regular expressions, it’s important to note that the
string is considered valid if the expression matches anywhere within the
string. For example, the regular expression "p" will match any string with
a p in it, such as "apple" not just a string that is simply "p". Therefore,
it is usually less confusing, as a matter of course, to surround the
regular expression in ^...$, for example, "^p$", unless there is a good
reason not to do so.

#### Inherited from

`Omit.pattern`

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

#### Inherited from

`Omit.patternProperties`

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

#### Inherited from

`Omit.properties`

***

### required?

> `optional` **required**: `boolean` \| `string`[]

This attribute indicates if the instance must have a value, and not
be undefined. This is false by default, making the instance
optional.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.7

#### Inherited from

`Omit.required`

***

### title?

> `optional` **title**: `string`

This attribute is a string that provides a short description of the
instance property.

#### See

https://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.21

#### Inherited from

`Omit.title`

***

### type

> **type**: [`JSONSchema4TypeName`](../type-aliases/JSONSchema4TypeName.md)[]

***

### uniqueItems?

> `optional` **uniqueItems**: `boolean`

Enforces that all items in the array are unique

#### Inherited from

`Omit.uniqueItems`
