[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / ImportExpression

# Interface: ImportExpression

## Extends

- `BaseNode`

## Properties

### ~~attributes~~

> **attributes**: `null` \| [`Expression`](../type-aliases/Expression.md)

The attributes declared for the dynamic import.

#### Example

```ts
import('mod', \{ assert: \{ type: 'json' \} \});
```

#### Deprecated

Replaced with \`options\`.

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### options

> **options**: `null` \| [`Expression`](../type-aliases/Expression.md)

The options bag declared for the dynamic import.

#### Example

```ts
import('mod', \{ assert: \{ type: 'json' \} \});
```

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### source

> **source**: [`Expression`](../type-aliases/Expression.md)

***

### type

> **type**: [`ImportExpression`](../README.md#importexpression)

#### Overrides

`BaseNode.type`
