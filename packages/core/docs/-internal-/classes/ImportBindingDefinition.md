[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ImportBindingDefinition

# Class: ImportBindingDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`ImportBinding`](../README.md#importbinding), `TSESTree.ImportDefaultSpecifier` \| `TSESTree.ImportNamespaceSpecifier` \| `TSESTree.ImportSpecifier` \| [`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md), [`ImportDeclaration`](../interfaces/ImportDeclaration.md) \| [`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md), [`Identifier`](../interfaces/Identifier.md)\>

## Constructors

### new ImportBindingDefinition()

> **new ImportBindingDefinition**(`name`, `node`, `decl`): [`ImportBindingDefinition`](ImportBindingDefinition.md)

#### Parameters

##### name

[`Identifier`](../interfaces/Identifier.md)

##### node

[`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md)

##### decl

[`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md)

#### Returns

[`ImportBindingDefinition`](ImportBindingDefinition.md)

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`constructor`](DefinitionBase.md#constructors)

### new ImportBindingDefinition()

> **new ImportBindingDefinition**(`name`, `node`, `decl`): [`ImportBindingDefinition`](ImportBindingDefinition.md)

#### Parameters

##### name

[`Identifier`](../interfaces/Identifier.md)

##### node

`ImportDefaultSpecifier` | `ImportNamespaceSpecifier` | `ImportSpecifier`

##### decl

[`ImportDeclaration`](../interfaces/ImportDeclaration.md)

#### Returns

[`ImportBindingDefinition`](ImportBindingDefinition.md)

#### Overrides

DefinitionBase\<DefinitionType.ImportBinding, TSESTree.ImportDefaultSpecifier \| TSESTree.ImportNamespaceSpecifier \| TSESTree.ImportSpecifier \| TSESTree.TSImportEqualsDeclaration, TSESTree.ImportDeclaration \| TSESTree.TSImportEqualsDeclaration, TSESTree.Identifier\>.constructor

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`$id`](DefinitionBase.md#$id)

***

### isTypeDefinition

> `readonly` **isTypeDefinition**: `true` = `true`

`true` if the variable is valid in a type context, false otherwise

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`isTypeDefinition`](DefinitionBase.md#istypedefinition)

***

### isVariableDefinition

> `readonly` **isVariableDefinition**: `true` = `true`

`true` if the variable is valid in a value context, false otherwise

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`isVariableDefinition`](DefinitionBase.md#isvariabledefinition)

***

### name

> `readonly` **name**: [`Identifier`](../interfaces/Identifier.md)

The `Identifier` node of this definition

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`name`](DefinitionBase.md#name-1)

***

### node

> `readonly` **node**: `ImportDefaultSpecifier` \| `ImportNamespaceSpecifier` \| `ImportSpecifier` \| [`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md)

The enclosing node of the name.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`node`](DefinitionBase.md#node-1)

***

### parent

> `readonly` **parent**: [`ImportDeclaration`](../interfaces/ImportDeclaration.md) \| [`TSImportEqualsDeclaration`](../type-aliases/TSImportEqualsDeclaration.md)

the enclosing statement node of the identifier.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`parent`](DefinitionBase.md#parent-1)

***

### type

> `readonly` **type**: [`ImportBinding`](../README.md#importbinding)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)
