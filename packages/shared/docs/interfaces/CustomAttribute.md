[**@eslint-react/shared**](../README.md) • **Docs**

***

[@eslint-react/shared](../README.md) / CustomAttribute

# Interface: CustomAttribute

## Extends

- `InferOutput`\<*typeof* `CustomAttributeSchema`\>

## Properties

### as?

> `optional` **as**: `string`

The name of the attribute in the built-in component.

#### Example

```ts
"href"
```

#### Inherited from

`InferOutput.as`

***

### controlled?

> `optional` **controlled**: `boolean`

Whether the attribute is controlled or not in the user-defined component.

#### Example

```ts
`true`
```

#### Inherited from

`InferOutput.controlled`

***

### defaultValue?

> `optional` **defaultValue**: `string`

The default value of the attribute in the user-defined component.

#### Example

```ts
`"/"`
```

#### Inherited from

`InferOutput.defaultValue`

***

### name

> **name**: `string`

The name of the attribute in the user-defined component.

#### Example

```ts
"to"
```

#### Inherited from

`InferOutput.name`
