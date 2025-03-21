[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TryStatement

# Interface: TryStatement

## Extends

- `BaseNode`

## Properties

### block

> **block**: [`BlockStatement`](BlockStatement.md)

***

### finalizer

> **finalizer**: `null` \| [`BlockStatement`](BlockStatement.md)

***

### handler

> **handler**: `null` \| `CatchClause`

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

> **type**: [`TryStatement`](../README.md#trystatement)

#### Overrides

`BaseNode.type`
