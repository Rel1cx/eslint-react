[**@eslint-react/shared**](../../../../README.md)

***

[@eslint-react/shared](../../../../README.md) / [\<internal\>](../../../README.md) / [SourceCode](../README.md) / Program

# Interface: Program

## Extends

- `Program`

## Properties

### body

> **body**: [`ProgramStatement`](../../../type-aliases/ProgramStatement.md)[]

#### Inherited from

`TSESTree.Program.body`

***

### comments

> **comments**: [`Comment`](../../../type-aliases/Comment.md)[]

#### Overrides

`TSESTree.Program.comments`

***

### loc

> **loc**: [`SourceLocation`](../../../interfaces/SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`TSESTree.Program.loc`

***

### parent?

> `optional` **parent**: `undefined`

#### Remarks

This never-used property exists only as a convenience for code that tries to access node parents repeatedly.

#### Inherited from

`TSESTree.Program.parent`

***

### range

> **range**: [`Range`](../../../type-aliases/Range.md)

#### Inherited from

`TSESTree.Program.range`

***

### sourceType

> **sourceType**: `"module"` \| `"script"`

#### Inherited from

`TSESTree.Program.sourceType`

***

### tokens

> **tokens**: [`Token`](../../../type-aliases/Token.md)[]

#### Overrides

`TSESTree.Program.tokens`

***

### type

> **type**: [`Program`](../../../README.md#program)

#### Inherited from

`TSESTree.Program.type`
