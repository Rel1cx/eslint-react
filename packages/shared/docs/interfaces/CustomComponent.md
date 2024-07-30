[**@eslint-react/shared**](../README.md) • **Docs**

***

[@eslint-react/shared](../README.md) / CustomComponent

# Interface: CustomComponent

## Extends

- `InferOutput`\<*typeof* `CustomComponentSchema`\>

## Properties

### as?

> `optional` **as**: `string`

The name of the built-in component that the user-defined component represents.

#### Example

```ts
"a"
```

#### Inherited from

`InferOutput.as`

***

### attributes

> **attributes**: `object`[]

Pre-defined attributes that are used in the user-defined component.

#### Example

```ts
`Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
```

#### Inherited from

`InferOutput.attributes`

***

### name

> **name**: `string`

The name of the user-defined component.

#### Example

```ts
"Link"
```

#### Inherited from

`InferOutput.name`

***

### selector?

> `optional` **selector**: `string`

The ESQuery selector to select the component precisely.

#### Example

```ts
`JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])`
```

#### Inherited from

`InferOutput.selector`
