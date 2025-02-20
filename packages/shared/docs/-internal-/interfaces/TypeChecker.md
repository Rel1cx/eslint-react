[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TypeChecker

# Interface: TypeChecker

## Properties

### getIndexInfosOfIndexSymbol()

> **getIndexInfosOfIndexSymbol**: (`indexSymbol`, `siblingSymbols`?) => [`IndexInfo`](IndexInfo.md)[]

#### Parameters

##### indexSymbol

[`Symbol`](Symbol.md)

##### siblingSymbols?

[`Symbol`](Symbol.md)[]

#### Returns

[`IndexInfo`](IndexInfo.md)[]

## Methods

### getAliasedSymbol()

> **getAliasedSymbol**(`symbol`): [`Symbol`](Symbol.md)

Follow all aliases to get the original symbol.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

[`Symbol`](Symbol.md)

***

### getAmbientModules()

> **getAmbientModules**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

***

### getAnyType()

> **getAnyType**(): [`Type`](Type.md)

Gets the intrinsic `any` type. There are multiple types that act as `any` used internally in the compiler,
so the type returned by this function should not be used in equality checks to determine if another type
is `any`. Instead, use `type.flags & TypeFlags.Any`.

#### Returns

[`Type`](Type.md)

***

### getApparentType()

> **getApparentType**(`type`): [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getAugmentedPropertiesOfType()

> **getAugmentedPropertiesOfType**(`type`): [`Symbol`](Symbol.md)[]

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Symbol`](Symbol.md)[]

***

### getAwaitedType()

> **getAwaitedType**(`type`): `undefined` \| [`Type`](Type.md)

Gets the "awaited type" of a type.

If an expression has a Promise-like type, the "awaited type" of the expression is
derived from the type of the first argument of the fulfillment callback for that
Promise's `then` method. If the "awaited type" is itself a Promise-like, it is
recursively unwrapped in the same manner until a non-promise type is found.

If an expression does not have a Promise-like type, its "awaited type" is the type
of the expression.

If the resulting "awaited type" is a generic object type, then it is wrapped in
an `Awaited<T>`.

In the event the "awaited type" circularly references itself, or is a non-Promise
object-type with a callable `then()` method, an "awaited type" cannot be determined
and the value `undefined` will be returned.

This is used to reflect the runtime behavior of the `await` keyword.

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getBaseConstraintOfType()

> **getBaseConstraintOfType**(`type`): `undefined` \| [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getBaseTypeOfLiteralType()

> **getBaseTypeOfLiteralType**(`type`): [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getBaseTypes()

> **getBaseTypes**(`type`): [`BaseType`](../type-aliases/BaseType.md)[]

#### Parameters

##### type

[`InterfaceType`](InterfaceType.md)

#### Returns

[`BaseType`](../type-aliases/BaseType.md)[]

***

### getBigIntLiteralType()

> **getBigIntLiteralType**(`value`): [`BigIntLiteralType`](BigIntLiteralType.md)

#### Parameters

##### value

[`PseudoBigInt`](PseudoBigInt.md)

#### Returns

[`BigIntLiteralType`](BigIntLiteralType.md)

***

### getBigIntType()

> **getBigIntType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getBooleanType()

> **getBooleanType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getConstantValue()

> **getConstantValue**(`node`): `undefined` \| `string` \| `number`

#### Parameters

##### node

[`ElementAccessExpression`](ElementAccessExpression.md) | [`EnumMember`](EnumMember.md) | [`PropertyAccessExpression`](PropertyAccessExpression.md)

#### Returns

`undefined` \| `string` \| `number`

***

### getContextualType()

> **getContextualType**(`node`): `undefined` \| [`Type`](Type.md)

#### Parameters

##### node

[`Expression`](Expression.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getDeclaredTypeOfSymbol()

> **getDeclaredTypeOfSymbol**(`symbol`): [`Type`](Type.md)

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

[`Type`](Type.md)

***

### getDefaultFromTypeParameter()

> **getDefaultFromTypeParameter**(`type`): `undefined` \| [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getESSymbolType()

> **getESSymbolType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getExportsOfModule()

> **getExportsOfModule**(`moduleSymbol`): [`Symbol`](Symbol.md)[]

#### Parameters

##### moduleSymbol

[`Symbol`](Symbol.md)

#### Returns

[`Symbol`](Symbol.md)[]

***

### getExportSpecifierLocalTargetSymbol()

> **getExportSpecifierLocalTargetSymbol**(`location`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### location

[`ExportSpecifier`](ExportSpecifier.md) | [`Identifier`](Identifier.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getExportSymbolOfSymbol()

> **getExportSymbolOfSymbol**(`symbol`): [`Symbol`](Symbol.md)

If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
Otherwise returns its input.
For example, at `export type T = number;`:
    - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
    - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
    - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

[`Symbol`](Symbol.md)

***

### getFalseType()

> **getFalseType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getFullyQualifiedName()

> **getFullyQualifiedName**(`symbol`): `string`

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

`string`

***

### getImmediateAliasedSymbol()

> **getImmediateAliasedSymbol**(`symbol`): `undefined` \| [`Symbol`](Symbol.md)

Follow a *single* alias to get the immediately aliased symbol.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getIndexInfoOfType()

> **getIndexInfoOfType**(`type`, `kind`): `undefined` \| [`IndexInfo`](IndexInfo.md)

#### Parameters

##### type

[`Type`](Type.md)

##### kind

[`IndexKind`](../enumerations/IndexKind.md)

#### Returns

`undefined` \| [`IndexInfo`](IndexInfo.md)

***

### getIndexInfosOfType()

> **getIndexInfosOfType**(`type`): readonly [`IndexInfo`](IndexInfo.md)[]

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

readonly [`IndexInfo`](IndexInfo.md)[]

***

### getIndexTypeOfType()

> **getIndexTypeOfType**(`type`, `kind`): `undefined` \| [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

##### kind

[`IndexKind`](../enumerations/IndexKind.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getJsxIntrinsicTagNamesAt()

> **getJsxIntrinsicTagNamesAt**(`location`): [`Symbol`](Symbol.md)[]

#### Parameters

##### location

[`Node`](Node.md)

#### Returns

[`Symbol`](Symbol.md)[]

***

### getMergedSymbol()

> **getMergedSymbol**(`symbol`): [`Symbol`](Symbol.md)

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

[`Symbol`](Symbol.md)

***

### getNeverType()

> **getNeverType**(): [`Type`](Type.md)

Gets the intrinsic `never` type. There are multiple types that act as `never` used internally in the compiler,
so the type returned by this function should not be used in equality checks to determine if another type
is `never`. Instead, use `type.flags & TypeFlags.Never`.

#### Returns

[`Type`](Type.md)

***

### getNonNullableType()

> **getNonNullableType**(`type`): [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getNullableType()

> **getNullableType**(`type`, `flags`): [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

##### flags

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`Type`](Type.md)

***

### getNullType()

> **getNullType**(): [`Type`](Type.md)

Gets the intrinsic `null` type. There are multiple types that act as `null` used internally in the compiler,
so the type returned by this function should not be used in equality checks to determine if another type
is `null`. Instead, use `type.flags & TypeFlags.Null`.

#### Returns

[`Type`](Type.md)

***

### getNumberLiteralType()

> **getNumberLiteralType**(`value`): [`NumberLiteralType`](NumberLiteralType.md)

#### Parameters

##### value

`number`

#### Returns

[`NumberLiteralType`](NumberLiteralType.md)

***

### getNumberType()

> **getNumberType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getPrivateIdentifierPropertyOfType()

> **getPrivateIdentifierPropertyOfType**(`leftType`, `name`, `location`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### leftType

[`Type`](Type.md)

##### name

`string`

##### location

[`Node`](Node.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getPropertiesOfType()

> **getPropertiesOfType**(`type`): [`Symbol`](Symbol.md)[]

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Symbol`](Symbol.md)[]

***

### getPropertyOfType()

> **getPropertyOfType**(`type`, `propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### type

[`Type`](Type.md)

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getPropertySymbolOfDestructuringAssignment()

> **getPropertySymbolOfDestructuringAssignment**(`location`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### location

[`Identifier`](Identifier.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getResolvedSignature()

> **getResolvedSignature**(`node`, `candidatesOutArray`?, `argumentCount`?): `undefined` \| [`Signature`](Signature.md)

returns unknownSignature in the case of an error.
returns undefined if the node is not valid.

#### Parameters

##### node

[`CallLikeExpression`](../type-aliases/CallLikeExpression.md)

##### candidatesOutArray?

[`Signature`](Signature.md)[]

##### argumentCount?

`number`

Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.

#### Returns

`undefined` \| [`Signature`](Signature.md)

***

### getReturnTypeOfSignature()

> **getReturnTypeOfSignature**(`signature`): [`Type`](Type.md)

#### Parameters

##### signature

[`Signature`](Signature.md)

#### Returns

[`Type`](Type.md)

***

### getRootSymbols()

> **getRootSymbols**(`symbol`): readonly [`Symbol`](Symbol.md)[]

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

readonly [`Symbol`](Symbol.md)[]

***

### getShorthandAssignmentValueSymbol()

> **getShorthandAssignmentValueSymbol**(`location`): `undefined` \| [`Symbol`](Symbol.md)

The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.

#### Parameters

##### location

`undefined` | [`Node`](Node.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getSignatureFromDeclaration()

> **getSignatureFromDeclaration**(`declaration`): `undefined` \| [`Signature`](Signature.md)

#### Parameters

##### declaration

[`SignatureDeclaration`](../type-aliases/SignatureDeclaration.md)

#### Returns

`undefined` \| [`Signature`](Signature.md)

***

### getSignaturesOfType()

> **getSignaturesOfType**(`type`, `kind`): readonly [`Signature`](Signature.md)[]

#### Parameters

##### type

[`Type`](Type.md)

##### kind

[`SignatureKind`](../enumerations/SignatureKind.md)

#### Returns

readonly [`Signature`](Signature.md)[]

***

### getStringLiteralType()

> **getStringLiteralType**(`value`): [`StringLiteralType`](StringLiteralType.md)

#### Parameters

##### value

`string`

#### Returns

[`StringLiteralType`](StringLiteralType.md)

***

### getStringType()

> **getStringType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getSymbolAtLocation()

> **getSymbolAtLocation**(`node`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getSymbolOfExpando()

> **getSymbolOfExpando**(`node`, `allowDeclaration`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### node

[`Node`](Node.md)

##### allowDeclaration

`boolean`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getSymbolsInScope()

> **getSymbolsInScope**(`location`, `meaning`): [`Symbol`](Symbol.md)[]

#### Parameters

##### location

[`Node`](Node.md)

##### meaning

[`SymbolFlags`](../enumerations/SymbolFlags.md)

#### Returns

[`Symbol`](Symbol.md)[]

***

### getSymbolsOfParameterPropertyDeclaration()

> **getSymbolsOfParameterPropertyDeclaration**(`parameter`, `parameterName`): [`Symbol`](Symbol.md)[]

#### Parameters

##### parameter

[`ParameterDeclaration`](ParameterDeclaration.md)

##### parameterName

`string`

#### Returns

[`Symbol`](Symbol.md)[]

***

### getTrueType()

> **getTrueType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getTypeArguments()

> **getTypeArguments**(`type`): readonly [`Type`](Type.md)[]

#### Parameters

##### type

[`TypeReference`](TypeReference.md)

#### Returns

readonly [`Type`](Type.md)[]

***

### getTypeArgumentsForResolvedSignature()

> **getTypeArgumentsForResolvedSignature**(`signature`): `undefined` \| readonly [`Type`](Type.md)[]

#### Parameters

##### signature

[`Signature`](Signature.md)

#### Returns

`undefined` \| readonly [`Type`](Type.md)[]

***

### getTypeAtLocation()

> **getTypeAtLocation**(`node`): [`Type`](Type.md)

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

[`Type`](Type.md)

***

### getTypeFromTypeNode()

> **getTypeFromTypeNode**(`node`): [`Type`](Type.md)

#### Parameters

##### node

[`TypeNode`](TypeNode.md)

#### Returns

[`Type`](Type.md)

***

### getTypeOfAssignmentPattern()

> **getTypeOfAssignmentPattern**(`pattern`): [`Type`](Type.md)

#### Parameters

##### pattern

[`AssignmentPattern`](../type-aliases/AssignmentPattern.md)

#### Returns

[`Type`](Type.md)

***

### getTypeOfSymbol()

> **getTypeOfSymbol**(`symbol`): [`Type`](Type.md)

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

[`Type`](Type.md)

***

### getTypeOfSymbolAtLocation()

> **getTypeOfSymbolAtLocation**(`symbol`, `node`): [`Type`](Type.md)

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### node

[`Node`](Node.md)

#### Returns

[`Type`](Type.md)

***

### getTypePredicateOfSignature()

> **getTypePredicateOfSignature**(`signature`): `undefined` \| [`TypePredicate`](../type-aliases/TypePredicate.md)

#### Parameters

##### signature

[`Signature`](Signature.md)

#### Returns

`undefined` \| [`TypePredicate`](../type-aliases/TypePredicate.md)

***

### getUndefinedType()

> **getUndefinedType**(): [`Type`](Type.md)

Gets the intrinsic `undefined` type. There are multiple types that act as `undefined` used internally in the compiler
depending on compiler options, so the type returned by this function should not be used in equality checks to determine
if another type is `undefined`. Instead, use `type.flags & TypeFlags.Undefined`.

#### Returns

[`Type`](Type.md)

***

### getUnknownType()

> **getUnknownType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getVoidType()

> **getVoidType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getWidenedType()

> **getWidenedType**(`type`): [`Type`](Type.md)

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### indexInfoToIndexSignatureDeclaration()

> **indexInfoToIndexSignatureDeclaration**(`indexInfo`, `enclosingDeclaration`, `flags`): `undefined` \| [`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### indexInfo

[`IndexInfo`](IndexInfo.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`IndexSignatureDeclaration`](IndexSignatureDeclaration.md)

***

### isArgumentsSymbol()

> **isArgumentsSymbol**(`symbol`): `boolean`

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

`boolean`

***

### isArrayLikeType()

> **isArrayLikeType**(`type`): `boolean`

True if this type is assignable to `ReadonlyArray<any>`.

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`boolean`

***

### isArrayType()

> **isArrayType**(`type`): `boolean`

True if this type is the `Array` or `ReadonlyArray` type from lib.d.ts.
This function will _not_ return true if passed a type which
extends `Array` (for example, the TypeScript AST's `NodeArray` type).

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`boolean`

***

### isImplementationOfOverload()

> **isImplementationOfOverload**(`node`): `undefined` \| `boolean`

#### Parameters

##### node

[`SignatureDeclaration`](../type-aliases/SignatureDeclaration.md)

#### Returns

`undefined` \| `boolean`

***

### isOptionalParameter()

> **isOptionalParameter**(`node`): `boolean`

#### Parameters

##### node

[`ParameterDeclaration`](ParameterDeclaration.md)

#### Returns

`boolean`

***

### isTupleType()

> **isTupleType**(`type`): `boolean`

True if this type is a tuple type. This function will _not_ return true if
passed a type which extends from a tuple.

#### Parameters

##### type

[`Type`](Type.md)

#### Returns

`boolean`

***

### isTypeAssignableTo()

> **isTypeAssignableTo**(`source`, `target`): `boolean`

Returns true if the "source" type is assignable to the "target" type.

```ts
declare const abcLiteral: ts.Type; // Type of "abc"
declare const stringType: ts.Type; // Type of string

isTypeAssignableTo(abcLiteral, abcLiteral); // true; "abc" is assignable to "abc"
isTypeAssignableTo(abcLiteral, stringType); // true; "abc" is assignable to string
isTypeAssignableTo(stringType, abcLiteral); // false; string is not assignable to "abc"
isTypeAssignableTo(stringType, stringType); // true; string is assignable to string
```

#### Parameters

##### source

[`Type`](Type.md)

##### target

[`Type`](Type.md)

#### Returns

`boolean`

***

### isUndefinedSymbol()

> **isUndefinedSymbol**(`symbol`): `boolean`

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

`boolean`

***

### isUnknownSymbol()

> **isUnknownSymbol**(`symbol`): `boolean`

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

#### Returns

`boolean`

***

### isValidPropertyAccess()

> **isValidPropertyAccess**(`node`, `propertyName`): `boolean`

#### Parameters

##### node

[`ImportTypeNode`](ImportTypeNode.md) | [`PropertyAccessExpression`](PropertyAccessExpression.md) | [`QualifiedName`](QualifiedName.md)

##### propertyName

`string`

#### Returns

`boolean`

***

### resolveName()

> **resolveName**(`name`, `location`, `meaning`, `excludeGlobals`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### name

`string`

##### location

`undefined` | [`Node`](Node.md)

##### meaning

[`SymbolFlags`](../enumerations/SymbolFlags.md)

##### excludeGlobals

`boolean`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### runWithCancellationToken()

> **runWithCancellationToken**\<`T`\>(`token`, `cb`): `T`

Depending on the operation performed, it may be appropriate to throw away the checker
if the cancellation token is triggered. Typically, if it is used for error checking
and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.

#### Type Parameters

• **T**

#### Parameters

##### token

[`CancellationToken`](CancellationToken.md)

##### cb

(`checker`) => `T`

#### Returns

`T`

***

### signatureToSignatureDeclaration()

> **signatureToSignatureDeclaration**(`signature`, `kind`, `enclosingDeclaration`, `flags`): `undefined` \| SignatureDeclaration & \{ typeArguments?: NodeArray\<TypeNode\>; \}

Note that the resulting nodes cannot be checked.

#### Parameters

##### signature

[`Signature`](Signature.md)

##### kind

[`SyntaxKind`](../enumerations/SyntaxKind.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| SignatureDeclaration & \{ typeArguments?: NodeArray\<TypeNode\>; \}

***

### signatureToString()

> **signatureToString**(`signature`, `enclosingDeclaration`?, `flags`?, `kind`?): `string`

#### Parameters

##### signature

[`Signature`](Signature.md)

##### enclosingDeclaration?

[`Node`](Node.md)

##### flags?

[`TypeFormatFlags`](../enumerations/TypeFormatFlags.md)

##### kind?

[`SignatureKind`](../enumerations/SignatureKind.md)

#### Returns

`string`

***

### symbolToEntityName()

> **symbolToEntityName**(`symbol`, `meaning`, `enclosingDeclaration`, `flags`): `undefined` \| [`EntityName`](../type-aliases/EntityName.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### meaning

[`SymbolFlags`](../enumerations/SymbolFlags.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`EntityName`](../type-aliases/EntityName.md)

***

### symbolToExpression()

> **symbolToExpression**(`symbol`, `meaning`, `enclosingDeclaration`, `flags`): `undefined` \| [`Expression`](Expression.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### meaning

[`SymbolFlags`](../enumerations/SymbolFlags.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`Expression`](Expression.md)

***

### symbolToParameterDeclaration()

> **symbolToParameterDeclaration**(`symbol`, `enclosingDeclaration`, `flags`): `undefined` \| [`ParameterDeclaration`](ParameterDeclaration.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`ParameterDeclaration`](ParameterDeclaration.md)

***

### symbolToString()

> **symbolToString**(`symbol`, `enclosingDeclaration`?, `meaning`?, `flags`?): `string`

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### enclosingDeclaration?

[`Node`](Node.md)

##### meaning?

[`SymbolFlags`](../enumerations/SymbolFlags.md)

##### flags?

[`SymbolFormatFlags`](../enumerations/SymbolFormatFlags.md)

#### Returns

`string`

***

### symbolToTypeParameterDeclarations()

> **symbolToTypeParameterDeclarations**(`symbol`, `enclosingDeclaration`, `flags`): `undefined` \| [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

Note that the resulting nodes cannot be checked.

#### Parameters

##### symbol

[`Symbol`](Symbol.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

***

### tryGetMemberInModuleExports()

> **tryGetMemberInModuleExports**(`memberName`, `moduleSymbol`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### memberName

`string`

##### moduleSymbol

[`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### typeParameterToDeclaration()

> **typeParameterToDeclaration**(`parameter`, `enclosingDeclaration`, `flags`): `undefined` \| [`TypeParameterDeclaration`](TypeParameterDeclaration.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### parameter

[`TypeParameter`](TypeParameter.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`TypeParameterDeclaration`](TypeParameterDeclaration.md)

***

### typePredicateToString()

> **typePredicateToString**(`predicate`, `enclosingDeclaration`?, `flags`?): `string`

#### Parameters

##### predicate

[`TypePredicate`](../type-aliases/TypePredicate.md)

##### enclosingDeclaration?

[`Node`](Node.md)

##### flags?

[`TypeFormatFlags`](../enumerations/TypeFormatFlags.md)

#### Returns

`string`

***

### typeToString()

> **typeToString**(`type`, `enclosingDeclaration`?, `flags`?): `string`

#### Parameters

##### type

[`Type`](Type.md)

##### enclosingDeclaration?

[`Node`](Node.md)

##### flags?

[`TypeFormatFlags`](../enumerations/TypeFormatFlags.md)

#### Returns

`string`

***

### typeToTypeNode()

> **typeToTypeNode**(`type`, `enclosingDeclaration`, `flags`): `undefined` \| [`TypeNode`](TypeNode.md)

Note that the resulting nodes cannot be checked.

#### Parameters

##### type

[`Type`](Type.md)

##### enclosingDeclaration

`undefined` | [`Node`](Node.md)

##### flags

`undefined` | [`NodeBuilderFlags`](../enumerations/NodeBuilderFlags.md)

#### Returns

`undefined` \| [`TypeNode`](TypeNode.md)
