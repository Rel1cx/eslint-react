[**@eslint-react/shared**](../README.md) • **Docs**

***

[@eslint-react/shared](../README.md) / CustomComponentExpanded

# Interface: CustomComponentExpanded

## Extends

- [`CustomComponent`](../type-aliases/CustomComponent.md)

## Properties

### as?

> `optional` **as**: `string`

The name of the built-in component that the user-defined component represents.

#### Example

```ts
"a"
```

#### Inherited from

`CustomComponent.as`

***

### attributes

> **attributes**: `object`[]

Pre-defined attributes that are used in the user-defined component.

#### Example

```ts
`Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
```

#### Overrides

`CustomComponent.attributes`

***

### name

> **name**: `string`

The name of the user-defined component.

#### Example

```ts
"Link"
```

#### Inherited from

`CustomComponent.name`

***

### re

> **re**: `RegExp`

***

### selector?

> `optional` **selector**: `string`

The ESQuery selector to select the component precisely.

#### Example

```ts
`JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])`
```

#### Inherited from

`CustomComponent.selector`
