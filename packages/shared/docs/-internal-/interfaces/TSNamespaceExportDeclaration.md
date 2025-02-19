[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSNamespaceExportDeclaration

# Interface: TSNamespaceExportDeclaration

For the following declaration:
```
export as namespace X;
```

## Extends

- `BaseNode`

## Properties

### id

> **id**: [`Identifier`](Identifier.md)

The name of the global variable that's exported as namespace

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

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

### type

> **type**: [`TSNamespaceExportDeclaration`](../README.md#tsnamespaceexportdeclaration)

#### Overrides

`BaseNode.type`
