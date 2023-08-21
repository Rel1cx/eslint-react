import { AST_TOKEN_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";

export const getCommentAfter = (node: TSESTree.Node, source: TSESLint.SourceCode): TSESTree.Comment | null => {
    const token = source.getTokenAfter(node, {
        filter: ({ type, value }) => !(type === AST_TOKEN_TYPES.Punctuator && [",", ";"].includes(value)),
        includeComments: true,
    });

    if (
        (token?.type === AST_TOKEN_TYPES.Block || token?.type === AST_TOKEN_TYPES.Line) &&
        node.loc.end.line === token.loc.end.line
    ) {
        return token;
    }

    return null;
};
