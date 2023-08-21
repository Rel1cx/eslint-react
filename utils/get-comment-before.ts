import { AST_TOKEN_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";

export const getCommentBefore = (node: TSESTree.Node, source: TSESLint.SourceCode): TSESTree.Comment | null => {
    const [tokenBefore, tokenOrCommentBefore] = source.getTokensBefore(node, {
        count: 2,
        filter: ({ type, value }) => !(type === AST_TOKEN_TYPES.Punctuator && [",", ";"].includes(value)),
        includeComments: true,
    }) as (TSESTree.Token | null)[];

    if (
        (tokenOrCommentBefore?.type === AST_TOKEN_TYPES.Block || tokenOrCommentBefore?.type === AST_TOKEN_TYPES.Line) &&
        node.loc.start.line - tokenOrCommentBefore.loc.end.line <= 1 &&
        tokenBefore?.loc.end.line !== tokenOrCommentBefore.loc.start.line
    ) {
        return tokenOrCommentBefore;
    }

    return null;
};
