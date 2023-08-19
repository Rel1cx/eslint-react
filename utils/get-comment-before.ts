import * as TSESLintUtils from "@typescript-eslint/utils";

export const getCommentBefore = (
    node: TSESLintUtils.TSESTree.Node,
    source: TSESLintUtils.TSESLint.SourceCode,
): TSESLintUtils.TSESTree.Comment | null => {
    const [tokenBefore, tokenOrCommentBefore] = source.getTokensBefore(node, {
        count: 2,
        filter: ({ type, value }) =>
            !(
                type === TSESLintUtils.AST_TOKEN_TYPES.Punctuator &&
                [",", ";"].includes(value)
            ),
        includeComments: true,
    }) as (TSESLintUtils.TSESTree.Token | null)[];

    if (
        (tokenOrCommentBefore?.type === TSESLintUtils.AST_TOKEN_TYPES.Block ||
            tokenOrCommentBefore?.type ===
                TSESLintUtils.AST_TOKEN_TYPES.Line) &&
        node.loc.start.line - tokenOrCommentBefore.loc.end.line <= 1 &&
        tokenBefore?.loc.end.line !== tokenOrCommentBefore.loc.start.line
    ) {
        return tokenOrCommentBefore;
    }

    return null;
};
