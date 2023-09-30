[eslint-plugin-react-ts](../README.md) / src/utils/construction-detector

# Module: src/utils/construction-detector

## Table of contents

### Type Aliases

- [ConstructionType](src_utils_construction_detector.md#constructiontype)

### Functions

- [ConstructionType](src_utils_construction_detector.md#constructiontype-1)

## Type Aliases

### ConstructionType

Ƭ **ConstructionType**: [`TaggedEnum`](src_lib_primitives.Data.md#taggedenum)<{ `ARRAY`: { `name`: ``"array"`` ; `node`: `TSESTree.ArrayExpression`  } ; `ASSIGNMENT_EXPRESSION`: { `name`: ``"assignment expression"`` ; `node`: `TSESTree.Node` ; `usage`: `TSESTree.Node`  } ; `CLASS_EXPRESSION`: { `name`: ``"class expression"`` ; `node`: `TSESTree.ClassExpression`  } ; `FUNCTION_DECLARATION`: { `name`: ``"function declaration"`` ; `node`: `TSESTree.FunctionDeclaration` ; `usage`: `TSESTree.Expression` \| `TSESTree.Identifier`  } ; `FUNCTION_EXPRESSION`: { `name`: ``"function expression"`` ; `node`: `TSESTree.ArrowFunctionExpression` \| `TSESTree.FunctionExpression`  } ; `JSX_ELEMENT`: { `name`: ``"JSX element"`` ; `node`: `TSESTree.JSXElement`  } ; `JSX_FRAGMENT`: { `name`: ``"JSX fragment"`` ; `node`: `TSESTree.JSXFragment`  } ; `NEW_EXPRESSION`: { `name`: ``"new expression"`` ; `node`: `TSESTree.NewExpression`  } ; `NONE`: {} ; `OBJECT_EXPRESSION`: { `name`: ``"object"`` ; `node`: `TSESTree.ObjectExpression`  } ; `REGULAR_EXPRESSION`: { `name`: ``"regular expression"`` ; `node`: `TSESTree.Literal`  }  }\>

## Functions

### ConstructionType

▸ **ConstructionType**<`K`\>(`tag`): [`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"NONE"``  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"ARRAY"`` ; `name`: ``"array"`` ; `node`: `ArrayExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"ASSIGNMENT_EXPRESSION"`` ; `name`: ``"assignment expression"`` ; `node`: `Node` ; `usage`: `Node`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"CLASS_EXPRESSION"`` ; `name`: ``"class expression"`` ; `node`: `ClassExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"FUNCTION_DECLARATION"`` ; `name`: ``"function declaration"`` ; `node`: `FunctionDeclaration` ; `usage`: `Expression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"FUNCTION_EXPRESSION"`` ; `name`: ``"function expression"`` ; `node`: `ArrowFunctionExpression` \| `FunctionExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"JSX_ELEMENT"`` ; `name`: ``"JSX element"`` ; `node`: `JSXElement`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"JSX_FRAGMENT"`` ; `name`: ``"JSX fragment"`` ; `node`: `JSXFragment`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"NEW_EXPRESSION"`` ; `name`: ``"new expression"`` ; `node`: `NewExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"OBJECT_EXPRESSION"`` ; `name`: ``"object"`` ; `node`: `ObjectExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"REGULAR_EXPRESSION"`` ; `name`: ``"regular expression"`` ; `node`: `Literal`  }\>\>, { `_tag`: `K`  }\>, ``"_tag"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"NONE"`` \| ``"ARRAY"`` \| ``"ASSIGNMENT_EXPRESSION"`` \| ``"CLASS_EXPRESSION"`` \| ``"FUNCTION_DECLARATION"`` \| ``"FUNCTION_EXPRESSION"`` \| ``"JSX_ELEMENT"`` \| ``"JSX_FRAGMENT"`` \| ``"NEW_EXPRESSION"`` \| ``"OBJECT_EXPRESSION"`` \| ``"REGULAR_EXPRESSION"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

#### Returns

[`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"NONE"``  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"ARRAY"`` ; `name`: ``"array"`` ; `node`: `ArrayExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"ASSIGNMENT_EXPRESSION"`` ; `name`: ``"assignment expression"`` ; `node`: `Node` ; `usage`: `Node`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"CLASS_EXPRESSION"`` ; `name`: ``"class expression"`` ; `node`: `ClassExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"FUNCTION_DECLARATION"`` ; `name`: ``"function declaration"`` ; `node`: `FunctionDeclaration` ; `usage`: `Expression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"FUNCTION_EXPRESSION"`` ; `name`: ``"function expression"`` ; `node`: `ArrowFunctionExpression` \| `FunctionExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"JSX_ELEMENT"`` ; `name`: ``"JSX element"`` ; `node`: `JSXElement`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"JSX_FRAGMENT"`` ; `name`: ``"JSX fragment"`` ; `node`: `JSXFragment`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"NEW_EXPRESSION"`` ; `name`: ``"new expression"`` ; `node`: `NewExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"OBJECT_EXPRESSION"`` ; `name`: ``"object"`` ; `node`: `ObjectExpression`  }\>\>, { `_tag`: `K`  }\> \| `Extract`<[`Data`](src_lib_primitives.Data.md#data)<`Readonly`<{ `_tag`: ``"REGULAR_EXPRESSION"`` ; `name`: ``"regular expression"`` ; `node`: `Literal`  }\>\>, { `_tag`: `K`  }\>, ``"_tag"``\>
