[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSESTreeToTSNode

# Type Alias: TSESTreeToTSNode\<T\>

> **TSESTreeToTSNode**\<`T`\>: [`Extract`](Extract.md)\<[`Token`](../interfaces/Token.md)\<[`ImportKeyword`](../enumerations/SyntaxKind.md#importkeyword) \| [`NewKeyword`](../enumerations/SyntaxKind.md#newkeyword)\> \| [`TSNode`](TSNode.md), [`EstreeToTsNodeTypes`](../interfaces/EstreeToTsNodeTypes.md)\[`T`\[`"type"`\]\]\>

Maps TSESTree AST Node type to the expected TypeScript AST Node type(s).
This mapping is based on the internal logic of the parser.

## Type Parameters

• **T** *extends* [`Node`](Node.md) = [`Node`](Node.md)
